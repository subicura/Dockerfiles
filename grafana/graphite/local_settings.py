import os
from datetime import datetime

LOG_DIR = '/var/log/graphite'
if os.getenv("CARBONLINK_HOSTS"):
    CARBONLINK_HOSTS = os.getenv("CARBONLINK_HOSTS").split(',')

if os.getenv("CLUSTER_SERVERS"):
    CLUSTER_SERVERS = os.getenv("CLUSTER_SERVERS").split(',')

if os.getenv("MEMCACHE_HOSTS"):
    CLUSTER_SERVERS = os.getenv("MEMCACHE_HOSTS").split(',')

SECRET_KEY = str(datetime.now())