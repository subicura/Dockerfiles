#
# Grafana Dockerfile
#
# - whisper (master)
# - carbon  (0.9.12)
# - graphite (0.9.12)
# - elasticsearch (1.3.2)
# - grafana (1.8.1)
#
# build command
# * default: docker build --force-rm=true -t subicura/grafana .
# * nocache: docker build --force-rm=true --no-cache=true -t subicura/grafana .
#
# configuration
# -v {whisper directory}:/opt/graphite/storage/whisper
#
# run command
#  docker pull subicura/grafana
#  docker rm -f grafana
#  docker run -it --rm -p 2003:2003 -p 80:80 -v /grafana/elasticsearch:/data -v /grafana/whisper:/opt/graphite/storage/whisper subicura/grafana /bin/bash
#  docker run --rm -e HOST_IP=10.211.55.41 -e HOST_PORT=80 -p 2003:2003 -p 80:80 --name grafana -v /grafana/elasticsearch:/data -v /grafana/whisper:/opt/graphite/storage/whisper subicura/grafana
#  docker run -d -e HOST_IP=10.211.55.41 -e HOST_PORT=80 -e GRAPHITE_API_HOST=10.211.55.41 -p 2003:2003 -p 80:80 --name grafana -v /grafana/elasticsearch:/data -v /grafana/whisper:/opt/graphite/storage/whisper subicura/grafana
#
# reference: https://github.com/nacyot/docker-graphite
#

FROM ubuntu:14.04
MAINTAINER subicura@subicura.com

# default env
ENV DEBIAN_FRONTEND noninteractive 

# update ubuntu latest
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common python-software-properties git curl

# install python
RUN \
  apt-get -qq -y install python python-dev python-pip \
                        python-simplejson python-memcache python-ldap python-cairo \
                        python-twisted python-pysqlite2 python-support \
                        python-pip gunicorn

# install java
RUN \
  echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java7-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk7-installer
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

# install nginx
RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get -qq update && \
  apt-get -qq -y install nginx

# install supervisor
RUN apt-get -qq -y install supervisor

# whisper & carbon & graphite & elasticsearch & grafana
WORKDIR /usr/local/src

RUN pip install 'Twisted<12.0' pytz pyparsing django==1.5 django-tagging==0.3.1

RUN \
  git clone https://github.com/graphite-project/whisper.git && \
  cd whisper && git checkout master && python setup.py install

RUN \
  git clone https://github.com/graphite-project/carbon.git && \
  cd carbon && git checkout 0.9.12 && python setup.py install

RUN \
  git clone https://github.com/graphite-project/graphite-web.git && \
  cd graphite-web && git checkout 0.9.12 && python setup.py install

RUN \
  cd /tmp && \
  wget -q -O - https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.3.2.tar.gz | tar xfz - && \
  mv /tmp/elasticsearch-1.3.2 /elasticsearch

RUN \
  cd /opt && wget -q -O - http://grafanarel.s3.amazonaws.com/grafana-1.8.1.tar.gz | tar xfz - && \
  mv grafana-1.8.1 grafana

# carbon setting
ADD ./carbon /opt/graphite/conf/

# graphite setting
ENV GRAPHITE_STORAGE_DIR /opt/graphite/storage
ENV GRAPHITE_CONF_DIR /opt/graphite/conf
ENV PYTHONPATH /opt/graphite/webapp
ENV LOG_DIR /var/log/graphite
ENV DEFAULT_INDEX_TABLESPACE graphite

RUN mkdir -p /opt/graphite/webapp
RUN mkdir -p /var/log/graphite
RUN cd /var/log/graphite/ && touch info.log
RUN mkdir -p /opt/graphite/storage/whisper
RUN touch /opt/graphite/storage/graphite.db /opt/graphite/storage/index
RUN chmod 0775 /opt/graphite/storage /opt/graphite/storage/whisper
RUN chmod 0664 /opt/graphite/storage/graphite.db

ADD ./graphite/local_settings.py /opt/graphite/webapp/graphite/local_settings.py 
ADD ./graphite/initial_data.json /opt/graphite/webapp/graphite/initial_data.json

RUN cd /opt/graphite/webapp/graphite && django-admin.py syncdb --settings=graphite.settings --noinput
RUN cd /opt/graphite/webapp/graphite && django-admin.py loaddata --settings=graphite.settings initial_data.json

# elasticsearch setting
ADD elasticsearch/elasticsearch.yml /elasticsearch/config/elasticsearch.yml

# grafana setting
ADD ./grafana/config.js /opt/grafana/config.js

# nginx setting
ADD ./nginx.conf /etc/nginx/nginx.conf

# supervisord setting
ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# add setup file
ADD ./setup.sh /opt/grafana/setup.sh
RUN chmod +x /opt/grafana/setup.sh

# expose port
# 2003 - carbon cache - line receiver
# 7002 - grafana http
EXPOSE 2003 80

# run
WORKDIR /opt/grafana
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
CMD /opt/grafana/setup.sh && /usr/bin/supervisord -n
