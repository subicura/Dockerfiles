#!/bin/sh

PHP7_FPM_DEFAULT_SOCKET_TIMEOUT=${PHP7_FPM_DEFAULT_SOCKET_TIMEOUT:-"60"}
PHP7_FPM_VALIDATE_TIMESTAMPS=${PHP7_FPM_VALIDATE_TIMESTAMPS:-"0"}

sed -i -e "s/__PHP7_FPM_DEFAULT_SOCKET_TIMEOUT__/${PHP7_FPM_DEFAULT_SOCKET_TIMEOUT}/g" /etc/php/7.0/fpm/php.ini
sed -i -e "s/__PHP7_FPM_VALIDATE_TIMESTAMPS__/${PHP7_FPM_VALIDATE_TIMESTAMPS}/g" /etc/php/7.0/fpm/php.ini

if [ ! -z "$ENABLE_PHP7_FPM_V8" ]; then
	cd /etc/php/7.0/fpm/conf.d
	ln -s /etc/php/7.0/mods-available/v8js.ini 20-v8js.ini
fi

if [ ! -z "$PHP7_FPM_XDEBUG_REMOTE_HOST" ]; then
	cd /etc/php/7.0/fpm/conf.d
	ln -s /etc/php/7.0/mods-available/xdebug.ini 20-xdebug.ini
	sed -i -e "s/__PHP7_FPM_XDEBUG_REMOTE_HOST__/${PHP7_FPM_XDEBUG_REMOTE_HOST}/g" /etc/php/7.0/fpm/conf.d/20-xdebug.ini
fi

exec "$@"
