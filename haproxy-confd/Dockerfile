FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

ENV DEBIAN_FRONTEND noninteractive 

# update ubuntu latest
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade #2014.11.05

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common python-software-properties git curl

# install confd
RUN \
  mkdir -p /app && \
  curl -s -L -o /app/confd https://github.com/kelseyhightower/confd/releases/download/v0.6.3/confd-0.6.3-linux-amd64 && \
  chmod +x /app/confd

# install haproxy
RUN \
  add-apt-repository ppa:vbernat/haproxy-1.5 && \
  DEBIAN_FRONTEND=noninteractive apt-get -qq update && \
  DEBIAN_FRONTEND=noninteractive apt-get -qq -y install haproxy

# syslog configuration
RUN \
  echo "$ModLoad imudp" >> /etc/rsyslog.conf && \
  echo "$UDPServerAddress 127.0.0.1" >> /etc/rsyslog.conf && \
  echo "$UDPServerRun 514" >> /etc/rsyslog.conf

# add confd config
ADD haproxy.cfg.tmpl /root/haproxy.cfg.tmpl
ADD haproxy.toml /root/haproxy.toml

# volume
VOLUME ["/etc/confd"]

# expose
EXPOSE 80

# run
ADD run.sh /app/run.sh
RUN chmod +x /app/run.sh
CMD /app/run.sh

