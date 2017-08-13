# php7.0-fpm
#
# build:
#   docker build --force-rm=true -t subicura/php7.0-fpm:latest .
#

FROM subicura/ubuntu:16.04

MAINTAINER subicura@subicura.com

ENV XDEBUG_VERSION 2.5.5
ENV V8_VERSION 5.9.223
ENV V8JS_VERSION 1.4.0

# install php7.0 fpm
RUN apt-get -qq -y install build-essential wget && \
	apt-get -qq -y install software-properties-common python-software-properties && \
	apt-get -qq -y install php-pear \
		php7.0-fpm php7.0-mysql php7.0-curl php7.0-gd php7.0-intl \
  		php7.0-imap php7.0-soap php7.0-mcrypt php7.0-ps php7.0-pspell \
		php7.0-recode php7.0-tidy php7.0-xmlrpc php7.0-xsl php7.0-mbstring php7.0-zip

# install v8
RUN apt-get -qq -y install php7.0-dev git subversion re2c libglib2.0-dev
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /usr/local/depot_tools
ENV PATH $PATH:/usr/local/depot_tools
RUN mkdir -p /tmp/src && cd /tmp/src && fetch v8 && cd v8 && git checkout ${V8_VERSION} && gclient sync && \
	echo "# Setup GN" && \
    tools/dev/v8gen.py -vv x64.release -- is_component_build=true && \
	echo "# Build" && \
	ninja -C out.gn/x64.release/ && \
	echo "# Install to /opt/v8/" && \
	mkdir -p /opt/v8/lib /opt/v8/include && \
	cp out.gn/x64.release/lib*.so out.gn/x64.release/*_blob.bin /opt/v8/lib/ && \
	cp -R include/* /opt/v8/include/ && \
    rm -rf /tmp/src/v8

RUN git clone -b ${V8JS_VERSION} https://github.com/phpv8/v8js.git /tmp/src/v8js && \
	cd /tmp/src/v8js && \
	phpize && ./configure --with-v8js=/opt/v8 && \
	make all install && \
	make clean && rm -rf /tmp/src/v8js

# xdebug
RUN pear config-create ${HOME} ${HOME}/.pearrc && \
	pecl channel-update pecl.php.net && \
	pecl install xdebug-${XDEBUG_VERSION}

# clean up
RUN apt-get -qq -y --purge remove php7.0-dev git subversion

# remove package
RUN apt-get -qq -y --purge remove build-essential wget && \
    apt-get -qq -y autoremove && \
    apt-get clean && \
    rm -rf /tmp/src

# add config
ADD 99-php-custom.ini /etc/php/7.0/fpm/conf.d/99-php-custom.ini
ADD global.conf /etc/php/7.0/fpm/pool.d/global.conf
ADD www2.conf /etc/php/7.0/fpm/pool.d/www2.conf
ADD v8js.ini /etc/php/7.0/mods-available/v8js.ini
ADD xdebug.ini /etc/php/7.0/mods-available/xdebug.ini

# RUN
COPY entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["/usr/sbin/php-fpm7.0", "-F"]
