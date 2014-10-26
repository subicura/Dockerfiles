#!/bin/sh

HOST_IP=${HOST_IP:-"$(hostname)"}
HOST_PORT=${HOST_PORT:-"80"}
ES_API_HOST=${HOST_IP}
ES_API_PORT=${HOST_PORT}
GRAPHITE_API_HOST=${HOST_IP}
GRAPHITE_API_PORT=${HOST_PORT}

sed -i -e "s/ES_API_HOST/${ES_API_HOST}/g" /opt/grafana/config.js
sed -i -e "s/ES_API_PORT/${ES_API_PORT}/g" /opt/grafana/config.js
sed -i -e "s/GRAPHITE_API_HOST/${GRAPHITE_API_HOST}/g" /opt/grafana/config.js
sed -i -e "s/GRAPHITE_API_PORT/${GRAPHITE_API_PORT}/g" /opt/grafana/config.js
