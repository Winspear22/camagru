FROM postgres:14.2

ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/var/lib/postgresql/data/postgresql.conf"]