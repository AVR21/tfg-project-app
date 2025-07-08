#!/bin/bash

set -e

DATABASE="postgres"
CONTAINER="${1:-base-db-1}"
OUT_FILE="${2:-pgdata.backup}"

echo "Extracción de la base de datos $DATABASE desde el contenedor $CONTAINER ..."

docker exec "$CONTAINER" pg_dump -U "$DATABASE" -F c -d "$DATABASE" > "$OUT_FILE"

if [ $? -eq 0 ]; then
    echo "Contenido de la base de datos $DATABASE extraído y guardado correctamente en $OUT_FILE."
else 
    echo "Error de extracción de la base de datos."
    exit 1
fi