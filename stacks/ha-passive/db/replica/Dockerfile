FROM postgres:alpine

COPY ./postgresql.conf /var/lib/postgresql/postgresql.conf
COPY ./standby-entrypoint.sh /docker-entrypoint-initdb.d/standby-entrypoint.sh
COPY ./watchdog.sh /usr/local/bin/watchdog.sh
RUN chmod +x /usr/local/bin/watchdog.sh

ENTRYPOINT [ "sh", "/docker-entrypoint-initdb.d/standby-entrypoint.sh" ]