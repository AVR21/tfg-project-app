FROM postgres:alpine

COPY ./postgresql.conf /var/lib/postgresql/postgresql.conf
COPY ./pg_hba.conf /var/lib/postgresql/pg_hba.conf
COPY ./init-replication.sh /docker-entrypoint-initdb.d/init-replication.sh

CMD [ "postgres", "-c", "config_file=/var/lib/postgresql/postgresql.conf" ]