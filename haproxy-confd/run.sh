#!/bin/sh

ETCD_PEER=${ETCD_PEER:-$(/sbin/ip route|awk '/default/ { print $3 }'):4001}

# use default config
if [ ! -f /etc/confd/conf.d/haproxy.toml ] ; then
  mkdir -p /etc/confd/conf.d 
  mkdir -p /etc/confd/templates
  cp /root/haproxy.toml /etc/confd/conf.d/haproxy.toml
  cp /root/haproxy.cfg.tmpl /etc/confd/templates/haproxy.cfg.tmpl
fi 

# run haproxy
service haproxy start

# run confd
/app/confd -interval 10 -node $ETCD_PEER -quiet

