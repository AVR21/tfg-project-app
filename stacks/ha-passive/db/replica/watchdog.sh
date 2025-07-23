#!/bin/bash

MASTER="passive-db-master-1"
PORT="5432"
RETRIES=3
FLAG="/tmp/promoted.flag"
LOG="/var/log/failover.log"
DATA="/var/lib/postgresql/data"

while [ ! -f "$FLAG" ]; do
    i=0
    while [ $i -lt "$RETRIES" ]; do
        if su - postgres -c "pg_isready -h $MASTER -p $PORT" > /dev/null 2>&1; then
            echo "[$(date +%F"|"%T)] Contenedor '$MASTER' activo." >> "$LOG" 
            break
        fi

        echo "[$(date +%F"|"%T)] Sin respuesta de contenedor '$MASTER' (intento: $((i+1)))." >> "$LOG"
        sleep 3
        i=$((i+1))
    done

    if [ $i -eq "$RETRIES" ]; then
        echo "[$(date +%F"|"%T)] Contenedor '$MASTER' caído. Ejecutando script de promoción de réplica..." >> "$LOG"
        su - postgres -c "pg_ctl promote -D "$DATA""
        touch "$FLAG"
        echo "[$(date +%F"|"%T)] Promoción completada." >> "$LOG"
        break
    fi
done

echo "[$(date +%F"|"%T)] Promoción realizada, fin de proceso de vigilancia."