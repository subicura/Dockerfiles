#
# php7-fpm
#
# build:
#   docker build --force-rm=true -t subicura/php7-fpm:latest .
# run:
#   docker run -v /data/php7-fpm/php7.0-fpm.sock:/var/run/php/php7.0-fpm.sock -d subicura/php7-fpm:latest
#

FROM subicura/ubuntu:14.04

MAINTAINER subicura@subicura.com

ENV V8_VERSION 5.1.285
ENV V8JS_VERSION 1.2.0

# install php7.0 fpm
RUN apt-get -qq -y install build-essential wget && \
	apt-get -qq -y install software-properties-common python-software-properties && \
	add-apt-repository ppa:ondrej/php && apt-get -qq update && \
	apt-get -qq -y install php7.0-fpm php7.0-mysql php7.0-curl php7.0-gd php7.0-intl \
  		php-pear php7.0-imap php7.0-mcrypt php7.0-ps \
  		php7.0-pspell php7.0-recode php7.0-tidy php7.0-xmlrpc php7.0-xsl php7.0-mbstring

# install v8
RUN apt-get -qq -y install php7.0-dev git subversion
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /usr/local/depot_tools
ENV PATH $PATH:/usr/local/depot_tools
RUN mkdir -p /tmp/src && cd /tmp/src && fetch v8 && cd v8 && git checkout ${V8_VERSION} && gclient sync && \
    make native library=shared snapshot=off -j8 && \
    mkdir -p /usr/lib /usr/include && \
    cp out/native/lib.target/lib*.so /usr/lib/ && \
    cp -R include/* /usr/include && \
	echo "create /usr/lib/libv8_libplatform.a\naddlib out/native/obj.target/tools/gyp/libv8_libplatform.a\nsave\nend" | sudo ar -M && \
    make clean && rm -rf /tmp/src/v8

RUN git clone -b ${V8JS_VERSION} https://github.com/phpv8/v8js.git /tmp/src/v8js && \
	cd /tmp/src/v8js && \
	phpize && ./configure && \
	make all install && \
	make clean && rm -rf /tmp/src/v8js

# xdebug
RUN pear config-create ${HOME} ${HOME}/.pearrc && \
	pecl channel-update pecl.php.net && \
	pecl install xdebug-2.4.0

# clean up
RUN apt-get -qq -y --purge remove php7.0-dev git subversion

# remove package
RUN apt-get -qq -y --purge remove build-essential wget && \
    apt-get -qq -y autoremove && \
    apt-get clean && \
    rm -rf /tmp/src

# add config
ADD php.ini /etc/php/7.0/fpm/php.ini
ADD php-fpm.conf /etc/php/7.0/fpm/php-fpm.conf
ADD www.conf /etc/php/7.0/fpm/pool.d/www.conf
ADD v8js.ini /etc/php/7.0/mods-available/v8js.ini
ADD xdebug.ini /etc/php/7.0/mods-available/xdebug.ini

# RUN
COPY entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["/usr/sbin/php-fpm7.0", "-F"]
