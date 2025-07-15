#!/bin/bash

set -e

until pg_isready -h "$PRIMARY_HOST" -p "$PRIMARY_PORT"; do
    echo "Esperando a disponibilidad de nodo principal ($PRIMARY_HOST:$PRIMARY_PORT)"
    sleep 2
done

echo "Nodo principal disponible"

if [ -z "$(ls -A /var/lib/postgresql/data)" ]; then
    export PGPASSWORD="$REPLICATION_PASSWORD"
    echo "Directorio de datos vacío, iniciando basebackup"
    pg_basebackup -h "$PRIMARY_HOST" -p "$PRIMARY_PORT" -D /var/lib/postgresql/data -U "$REPLICATION_USER" -Fp -Xs -P -R
else
    echo "Directorio de datos ya inicializado, saltando basebackup"
fi

echo "Ejecución de vigilancia (watchdog) de contenedor Master"
/usr/local/bin/watchdog.sh &

exec docker-entrypoint.sh postgres