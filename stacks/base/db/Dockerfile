FROM postgres:alpine

COPY ./postgresql.conf /var/lib/postgresql/postgresql.conf

CMD [ "postgres", "-c", "config_file=/var/lib/postgresql/postgresql.conf" ]