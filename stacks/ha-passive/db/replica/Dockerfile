FROM postgres:alpine

COPY ./postgresql.conf /var/lib/postgresql/postgresql.conf
COPY ./watchdog.sh /usr/local/bin/watchdog.sh
COPY ./standby-entrypoint.sh /docker-entrypoint-initdb.d/standby-entrypoint.sh

ENTRYPOINT [ "sh", "/docker-entrypoint-initdb.d/standby-entrypoint.sh" ]