#!/bin/sh

HOSTNAME=${HOSTNAME:-"$(hostname)"}
HOSTNAME=${INFLUXDB_PORT:-"8086"}
HOSTNAME=${INFLUXDB_USERNAME:-"root"}
HOSTNAME=${INFLUXDB_PASSWORD:-"root"}
HOSTNAME=${INFLUXDB_DB:-"diamond"}

sed -i "s/__HOSTNAME__/${HOSTNAME}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_HOSTNAME__/${INFLUXDB_HOSTNAME}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_PORT__/${INFLUXDB_PORT}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_USERNAME__/${INFLUXDB_USERNAME}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_PASSWORD__/${INFLUXDB_PASSWORD}/g" /chroot/opt/diamond.conf
sed -i "s/__INFLUXDB_DB__/${INFLUXDB_DB}/g" /chroot/opt/diamond.conf

sed -i "s/influxdb.client/influxdb.influxdb08/g" /chroot/usr/share/pyshared/diamond/handler/influxdbHandler.py

#chroot /chroot /usr/bin/diamond -f -c /opt/diamond.conf --skip-pidfile --skip-change-user -l
chroot /chroot /usr/bin/diamond -f -c /opt/diamond.conf --skip-pidfile --skip-change-user 

