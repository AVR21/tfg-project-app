#!/bin/bash

set -e

echo "[INFO] Creando base de datos 'benchmark'..."
psql -U postgres -c "CREATE DATABASE benchmark;" || echo "[WARN] La base de datos ya existe"

echo "[INFO] Creando usuario 'monitor'..."
psql -U postgres -c "CREATE USER monitor WITH LOGIN PASSWORD 'monitor';" || echo "[WARN] El usuario ya existe"

echo "[INFO] Otorgando privilegios al usuario 'monitor'..."
psql -U postgres -c "GRANT CONNECT ON DATABASE benchmark TO monitor;"
psql -U postgres -c "GRANT USAGE ON SCHEMA pg_catalog TO monitor;"
psql -U postgres -c "GRANT SELECT ON pg_stat_database, pg_stat_replication, pg_stat_activity TO monitor;"
psql -U postgres -c "ALTER USER monitor WITH SUPERUSER;"

echo "[OK] Configuración completada correctamente."