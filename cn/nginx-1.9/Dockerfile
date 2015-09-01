#
# nginx 1.9.4 (http://nginx.org)
#
# build:
#   docker build --force-rm=true -t subicura/nginx:1.9 .
# run:
#   docker run -p 80:80 -v /home/ubuntu/sites:/usr/local/nginx/conf/sites -d subicura/nginx:1.9
# reload
#   docker exec [container id] /usr/local/nginx/sbin/nginx -s reload
#

FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

ENV DEBIAN_FRONTEND noninteractive

# update ubuntu
RUN \
  sudo sed -i 's/archive.ubuntu.com/ubuntu.mirrors.yg.ucloud.cn/' /etc/apt/sources.list && \
  sudo sed -i 's/security.ubuntu.com/ubuntu.mirrors.yg.ucloud.cn/' /etc/apt/sources.list

# update ubuntu latest
RUN echo "2015.09.01"
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common git wget

# install nginx-1.9.4
RUN \
  apt-get -qq -y install libssl-dev libpcre3-dev

RUN \
  cd /tmp && \
  wget -q -O - http://nginx.org/download/nginx-1.9.4.tar.gz | tar xfz - && \
  cd nginx-1.9.4 && \
  ./configure --prefix=/usr/local/nginx --with-stream --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module && \
  make && make install

# set config path
ADD ./nginx.conf /usr/local/nginx/conf/nginx.conf
ADD ./proxy_params /usr/local/nginx/conf/proxy_params
RUN mkdir /usr/local/nginx/conf/sites && mkdir /usr/local/nginx/conf/streams

# volume
VOLUME ["/usr/local/nginx/conf/sites", "/usr/local/nginx/conf/streams"]

# expose
EXPOSE 80 443

# run
CMD /usr/local/nginx/sbin/nginx
