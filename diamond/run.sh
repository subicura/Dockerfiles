#!/bin/sh

HOSTNAME=${HOSTNAME:-"$(hostname)"}
INFLUXDB_PORT=${INFLUXDB_PORT:-"8086"}
INFLUXDB_USERNAME=${INFLUXDB_USERNAME:-"root"}
INFLUXDB_PASSWORD=${INFLUXDB_PASSWORD:-"root"}
INFLUXDB_DB=${INFLUXDB_DB:-"diamond"}

sed -i "s/__HOSTNAME__/${HOSTNAME}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_HOSTNAME__/${INFLUXDB_HOSTNAME}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_PORT__/${INFLUXDB_PORT}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_USERNAME__/${INFLUXDB_USERNAME}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_PASSWORD__/${INFLUXDB_PASSWORD}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_DB__/${INFLUXDB_DB}/g" /chroot/opt/diamond.conf

sed -i "s/influxdb.client/influxdb.influxdb08/g" /chroot/usr/share/pyshared/diamond/handler/influxdbHandler.py

#chroot /chroot /usr/bin/diamond -f -c /opt/diamond.conf --skip-pidfile --skip-change-user -l
chroot /chroot /usr/bin/diamond -f -c /opt/diamond.conf --skip-pidfile --skip-change-user 

