#
# php5-fpm
#
# build:
#   docker build --force-rm=true -t subicura/php5-fpm:latest .
# run:
#   docker run -v /data/php5-fpm/php5-fpm.sock:/var/run/php5-fpm.sock -d subicura/php5-fpm:latest
#

FROM subicura/ubuntu:14.04

MAINTAINER subicura@subicura.com

ENV XDEBUG_VERSION 2.4.0
ENV V8_VERSION 5.1.285
ENV V8JS_VERSION 1.2.0

# install php5 fpm
RUN apt-get -qq -y install build-essential wget && \
	apt-get -qq -y install software-properties-common python-software-properties && \
	add-apt-repository ppa:ondrej/php && apt-get -qq update && \
	apt-get -qq -y install php5-fpm php5-mysql php5-curl php5-gd php5-intl \
  		php-pear php5-imap php5-mcrypt php5-ps \
  		php5-pspell php5-recode php5-tidy php5-xmlrpc php5-xsl php-soap

# install v8
RUN apt-get -qq -y install php5-dev libv8-dev && \
	pecl install v8js-0.1.3

# xdebug
RUN pear config-create ${HOME} ${HOME}/.pearrc && \
	pecl channel-update pecl.php.net && \
	pecl install xdebug-${XDEBUG_VERSION}

# clean up
RUN apt-get -qq -y --purge remove php5-dev git subversion

# remove package
RUN apt-get -qq -y --purge remove build-essential wget && \
    apt-get -qq -y autoremove && \
    apt-get clean && \
    rm -rf /tmp/src

# add config
ADD php.ini /etc/php5/fpm/php.ini
ADD php-fpm.conf /etc/php5/fpm/php-fpm.conf
ADD www.conf /etc/php5/fpm/pool.d/www.conf
ADD v8js.ini /etc/php5/mods-available/v8js.ini
ADD xdebug.ini /etc/php5/mods-available/xdebug.ini

# RUN
COPY entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["/usr/sbin/php-fpm5", "-F"]
