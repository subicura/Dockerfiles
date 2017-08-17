# php7.0-fpm-dev
#
# build:
#   docker build --force-rm=true -f Dockerfile.dev -t subicura/php7.0-fpm-dev:latest .
#

FROM subicura/php7.0-fpm

MAINTAINER subicura@subicura.com

# Install dependency
RUN apt-get -y -qq install curl

# Set directory
WORKDIR /tmp
RUN curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar && \
    cp /tmp/phpcs.phar /usr/local/bin/phpcs && \
    chmod +x /usr/local/bin/phpcs

RUN /usr/local/bin/phpcs --config-set show_progress 1 && \
    /usr/local/bin/phpcs --config-set colors 1 && \
    /usr/local/bin/phpcs --config-set report_width 140 && \
    /usr/local/bin/phpcs --config-set encoding utf-8

CMD ["/usr/local/bin/phpcs"]
