#!/bin/bash

set -e

REPLICA="prod-db-replica-1"
MASTER="prod-db-master-1"
NETWORK="prod_bridge"
DATA="/var/lib/postgresql/data"

docker exec -u postgres "$REPLICA" pg_ctl promote -D "$DATA"

if docker network inspect "$NETWORK" | grep "$MASTER"; then
    docker network disconnect "$NETWORK" "$MASTER"
fi

docker network disconnect "$NETWORK" "$REPLICA"

docker network connect --alias db-master "$NETWORK" "$REPLICA"