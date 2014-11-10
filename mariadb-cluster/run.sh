#!/bin/sh

CLUSTER_NAME=${CLUSTER_NAME:-"mariadb_cluster"}

if [ -n "${GALERA_NODES}" ]; then
  echo "GALERA_NODES variable is set."
  echo "GALERA_NODES='${GALERA_NODES}'" >> /etc/default/garb
  echo "GALERA_GROUP='${CLUSTER_NAME}'" >> /etc/default/garb
  echo "LOG_FILE='/var/log/garb.log'"   >> /etc/default/garb
  service garb start
  tail -f /var/log/garb.log

  exit 1
fi

if [ -z "${SSTUSER_PASSWORD}" ]; then
  echo "SSTUSER_PASSWORD variable must be setting."
  exit 1
fi

chown mysql:mysql /var/lib/mysql

# init cluster
if [ -z "${CLUSTER_ADDRESS}" ]; then
  /root/set_sstuser_password.sh
fi

/usr/bin/mysqld_safe \
  --wsrep_cluster_name="${CLUSTER_NAME}" \
  --wsrep_node_name="${NODE_NAME}" \
  --wsrep_node_address="${NODE_ADDRESS}" \
  --wsrep_cluster_address="gcomm://${CLUSTER_ADDRESS}" \
  --wsrep_sst_auth="sstuser:${SSTUSER_PASSWORD}"
