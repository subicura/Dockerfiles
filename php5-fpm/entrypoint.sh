#!/bin/sh

PHP5_FPM_DEFAULT_SOCKET_TIMEOUT=${PHP5_FPM_DEFAULT_SOCKET_TIMEOUT:-"60"}
PHP5_FPM_VALIDATE_TIMESTAMPS=${PHP5_FPM_VALIDATE_TIMESTAMPS:-"0"}

sed -i -e "s/__PHP5_FPM_DEFAULT_SOCKET_TIMEOUT__/${PHP5_FPM_DEFAULT_SOCKET_TIMEOUT}/g" /etc/php5/fpm/php.ini
sed -i -e "s/__PHP5_FPM_VALIDATE_TIMESTAMPS__/${PHP5_FPM_VALIDATE_TIMESTAMPS}/g" /etc/php5/fpm/php.ini

if [ ! -z "$ENABLE_PHP5_FPM_V8" ]; then
	if [ ! -f /etc/php5/fpm/conf.d/20-v8js.ini ]; then
		cd /etc/php5/fpm/conf.d
		ln -s /etc/php5/mods-available/v8js.ini 20-v8js.ini
	fi
fi

if [ ! -z "$PHP5_FPM_XDEBUG_REMOTE_HOST" ]; then
	if [ ! -f /etc/php5/fpm/conf.d/20-xdebug.ini ]; then
		cd /etc/php5/fpm/conf.d
		ln -s /etc/php5/mods-available/xdebug.ini 20-xdebug.ini
		sed -i -e "s/__PHP5_FPM_XDEBUG_REMOTE_HOST__/${PHP5_FPM_XDEBUG_REMOTE_HOST}/g" /etc/php5/fpm/conf.d/20-xdebug.ini
	fi
fi

exec "$@"
