#!/bin/sh

# run haproxy
service haproxy start

# run confd
/app/confd -interval 10 -node "$(/sbin/ip route|awk '/default/ { print $3 }'):4001" -quiet