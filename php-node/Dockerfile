#
# ubuntu latest upgrade version
#
# build:
#   docker build --force-rm=true -t subicura/php-node:7_6 .

FROM subicura/ubuntu:16.04

MAINTAINER subicura@subicura.com

# install essential packages
RUN apt-get -qq -y update
RUN \
  apt-get -qq -y install build-essential software-properties-common python-software-properties git curl wget 

# install php7.0
RUN \
    apt-get -qq -y install php7.0 php7.0-mysql php7.0-curl php7.0-gd php7.0-intl \
        php7.0-imap php7.0-soap php7.0-mcrypt php7.0-ps php7.0-pspell \
        php7.0-recode php7.0-tidy php7.0-xmlrpc php7.0-xsl php7.0-mbstring php7.0-zip

# install node 6
RUN \
    wget -qO- https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get -qq -y install nodejs


