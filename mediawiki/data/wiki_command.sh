#!/bin/bash

set -e

chown -R www-data:www-data /data/images
pear install mail || echo "pear mail installed"
pear install net_smtp || echo "pear net_smtp installed"
echo command:"$@"
exec $@
