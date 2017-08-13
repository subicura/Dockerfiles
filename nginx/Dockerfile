#
# nginx (http://nginx.org)
#
# build:
#   docker build --force-rm=true -t subicura/nginx:1.13.4 .
# run:
#   docker run -p 80:80 -v /data/nginx/sites:/usr/local/nginx/conf/sites -d subicura/nginx:1.11.10
# reload
#   docker exec [container id] /usr/local/sbin/nginx -s reload
#

FROM subicura/ubuntu:16.04

MAINTAINER subicura@subicura.com

ENV NGINX_VERSION 1.13.3
ENV NGX_PAGESPEED_VERSION 1.11.33.4

RUN apt-get -qq -y install build-essential wget && \
    apt-get -qq -y install libssl-dev libpcre3-dev && \
    mkdir -p /tmp/src && cd /tmp/src && \
    wget -q -O - http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz | tar xfz - && \
    wget -q -O - https://github.com/pagespeed/ngx_pagespeed/archive/v${NGX_PAGESPEED_VERSION}-beta.tar.gz | tar xfz - && \
    cd /tmp/src/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-beta && \
    wget -q -O - https://dl.google.com/dl/page-speed/psol/${NGX_PAGESPEED_VERSION}.tar.gz | tar xfz - && \
    cd /tmp/src/nginx-${NGINX_VERSION} && \
    ./configure \
        --prefix=/usr/local/nginx \
        --sbin-path=/usr/local/sbin \
        --with-http_realip_module \
        --with-http_ssl_module \
        --with-stream \
        --with-stream_ssl_module \
        --with-http_stub_status_module \
        --with-http_gzip_static_module \
        --with-http_v2_module \
        --add-dynamic-module=/tmp/src/ngx_pagespeed-${NGX_PAGESPEED_VERSION}-beta && \
    make --silent && \
    make install --silent && \
    apt-get -qq -y --purge remove build-essential wget && \
    apt-get -qq -y autoremove && \
    apt-get clean && \
    rm -rf /tmp/src

ADD ./nginx.conf /usr/local/nginx/conf/nginx.conf
ADD ./proxy_params /usr/local/nginx/conf/proxy_params

# volume
VOLUME /usr/local/nginx/conf/certs
VOLUME /usr/local/nginx/conf/conf.d
VOLUME /usr/local/nginx/conf/sites
VOLUME /usr/local/nginx/conf/streams

WORKDIR /usr/local/nginx

EXPOSE 80 443

CMD /usr/local/sbin/nginx
