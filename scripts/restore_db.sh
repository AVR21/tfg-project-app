#!/bin/bash

set -e

DATABASE="postgres"
CONTAINER="${1:-passive-db-master-1}"
BACKUP_FILE="${2:-pgdata.backup}"


if [ ! -f "$BACKUP_FILE" ]; then
    echo "Archivo $BACKUP_FILE no encontrado."
    exit 1
fi

#Copia del archivo backup
docker cp "$BACKUP_FILE" "$CONTAINER:/tmp/$BACKUP_FILE"

echo "Restaurando base de datos $DATABASE en el contenedor $CONTAINER a partir de $BACKUP_FILE ..."
docker exec -i "$CONTAINER" pg_restore -c -U "$DATABASE" -d $DATABASE "/tmp/$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "Se ha restaurado correctamente la base de datos $DATABASE."
else
    echo "Error durante la restauración."
    exit 1
fi