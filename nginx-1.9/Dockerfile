#
# nginx 1.9.x (http://nginx.org)
#
# build:
#   docker build --force-rm=true -t subicura/nginx-1.9 .
# run:
#   docker run -p 80:80 -v /data/nginx/sites:/usr/local/nginx/conf/sites -d subicura/nginx-1.9
# reload
#   docker exec [container id] /usr/local/nginx/sbin/nginx -s reload
#

FROM alpine:latest

MAINTAINER subicura@subicura.com

ENV NGINX_VERSION nginx-1.9.12

RUN apk --update add openssl-dev pcre-dev zlib-dev wget build-base && \
    mkdir -p /tmp/src && \
    cd /tmp/src && \
    wget -q -O - http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz | tar xfz - && \
    cd nginx-${NGINX_VERSION} && \
    ./configure \
    	--with-stream \
    	--with-http_ssl_module \
        --with-http_stub_status_module \
        --with-http_gzip_static_module \
        --with-http_realip_module \
        --sbin-path=/usr/local/sbin/nginx && \
    make && \
    make install && \
    apk del build-base && \
    rm -rf /tmp/src && \
    rm -rf /var/cache/apk/*

ADD ./nginx.conf /usr/local/nginx/conf/nginx.conf
ADD ./proxy_params /usr/local/nginx/conf/proxy_params
RUN mkdir /usr/local/nginx/conf/sites && mkdir /usr/local/nginx/conf/streams

# volume
VOLUME ["/usr/local/nginx/conf/sites", "/usr/local/nginx/conf/streams"]

WORKDIR /usr/local/nginx-${NGINX_VERSION}

EXPOSE 80 443

CMD /usr/local/sbin/nginx
