#!/bin/bash

stack_path="$1"
action="${2:-up}"

if [ -z "$stack_path" ]; then
    echo "Uso del comando: compose <carpeta> [up|stop|down]"
    exit 1
fi

cd "stacks/$stack_path" || { echo "carpeta no encontrada: $stack_path"; exit 1; }

case "$action" in
    up) docker-compose --env-file .env up -d ;;
    stop) docker-compose stop ;;
    down) docker-compose --env-file .env down ;;
    *) echo "Acción no reconocida: $action" ;;
esac