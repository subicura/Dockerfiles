#
# Docker image for running https://github.com/phacility/phabricator
# forked from https://github.com/yesnault/docker-phabricator
#

FROM    debian:jessie
MAINTAINER  Chungsub Kim <subicura@subicura.com>

ENV DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true

RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

RUN \
    apt-get install -qq -y \
        git \
        apache2 \
        curl \
        libapache2-mod-php5 \
        libmysqlclient18 \
        mercurial \
        mysql-client \
        php-apc \
        php5 \
        php5-apcu \
        php5-cli \
        php5-curl \
        php5-gd \
        php5-json \
        php5-ldap \
        php5-mysql \
        python-pygments \
        sendmail \
        subversion \
        tar \
        sudo \
        build-essential \
        vim \
        && apt-get clean && rm -rf /var/lib/apt/lists/*

# For some reason phabricator doesn't have tagged releases. To support
# repeatable builds use the latest SHA
ADD     download.sh /opt/download.sh
WORKDIR /opt

# 20160329
RUN     bash download.sh phabricator 981f3a9
RUN     bash download.sh arcanist    3d7ac86
RUN     bash download.sh libphutil   b4f38af

# Setup apache
RUN     a2enmod rewrite
ADD     phabricator.conf /etc/apache2/sites-available/phabricator.conf
RUN     ln -s /etc/apache2/sites-available/phabricator.conf \
            /etc/apache2/sites-enabled/phabricator.conf && \
        rm -f /etc/apache2/sites-enabled/000-default.conf

# Install forego
RUN \
  curl -s -L -o /usr/local/bin/forego https://github.com/subicura/forego/releases/download/dev/forego && \
  chmod +x /usr/local/bin/forego

# Install node
RUN \
  curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
  apt-get -qq -y install nodejs

# Setup phabricator
RUN     mkdir -p /opt/phabricator/conf/local /var/repo
ADD     local.json /opt/phabricator/conf/local/local.json
RUN     sed -e 's/post_max_size = 8M/post_max_size = 128M/' \
          -e 's/upload_max_filesize = 2M/upload_max_filesize = 128M/' \
          -e 's/memory_limit = 128M/memory_limit = 256M/' \
          -e 's/;opcache.validate_timestamps=1/opcache.validate_timestamps=0/' \
          -i /etc/php5/apache2/php.ini
RUN     ln -s /usr/lib/git-core/git-http-backend /opt/phabricator/support/bin
RUN     /opt/phabricator/bin/config set phd.user "root"
RUN     echo "www-data ALL=(ALL) SETENV: NOPASSWD: /opt/phabricator/support/bin/git-http-backend" >> /etc/sudoers

# Custom
RUN     echo "date.timezone=Asia/Seoul" >> /etc/php5/apache2/php.ini
RUN     echo "max_input_vars = 2048" >> /etc/php5/apache2/php.ini
RUN     mkdir /upload && chown www-data:www-data /upload

# For notification
RUN     chsh -s /bin/bash www-data
RUN     touch /var/log/aphlict.log && chown www-data:www-data /var/log/aphlict.log
RUN     cd /opt/phabricator/support/aphlict/server && npm install ws

VOLUME ["/upload"]
EXPOSE  80
ADD     Procfile /opt/Procfile
ADD     entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD     ["start-server"]
