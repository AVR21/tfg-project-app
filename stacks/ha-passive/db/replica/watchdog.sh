MASTER="passive-db-master-1"
PORT="5432"
RETRIES=3
FLAG="/tmp/promoted.flag"
LOG="/var/log/failover.log"
DATA="/var/lib/postgresql/data"

if [ -f "$FLAG" ]; then
    echo "[$(date +%F"|"%T)] Réplica ya promovida, nada que hacer." >> "$LOG"
    exit 0
fi

i=0
while [ $i -lt "$RETRIES" ]; do
    if su - postgres -c "pg_isready -h $MASTER -p $PORT" > /dev/null 2>&1; then
        echo "[$(date +%F"|"%T)] Contenedor '$MASTER' activo."
        exit 0
    fi

    echo "[$(date +%F"|"%T)] Sin respuesta de contenedor '$MASTER' (intento: $((i+1)))." >> "$LOG"
    sleep 5
    i=$((i+1))
done

echo "[$(date +%F"|"%T)] Contenedor '$MASTER' caído. Ejecutando script de promoción de réplica..." >> "$LOG"
su - postgres -c "pg_ctl promote -D "$DATA""
touch "$FLAG"
echo "[$(date +%F"|"%T)] Promoción completada." >> "$LOG"