# Proyecto de Trabajo de Fin de Grado - 2024/25

#### Autor: Alejandro Viera Ruiz

## Estructura (Junio 2024)

```
app
|- backend
|- frontend
|- stacks
    |- base
    |- ha-passive
|- docker-compose.dev.yml
```

Para probar el proyecto en entorno de desarrollo, ejecutar:
```bash
$ docker compose -f docker-compose.dev.yml up
```

Para despliegue local de backend (Strapi CMS) y base de datos (PostgreSQL)

Para el frontend ejecutar desde la carpeta ``/frontend``:
```bash
$ npm start
```

### Pilas (Stacks):

Cada carpeta aloja la configuración de una variante del proyecto, todas tienen un docker-compose.yml que contiene los servicios a desplegar en cada caso. Es necesario establecer las variables de entorno (preferiblemente en fichero .env) dentro de la carpeta de cada stack.

Para ejecutar más rapidamente los stacks, he creado un script de bash que permite ejecutarlos desde la raíz del proyecto (``compose.sh``)

Uso:
```bash
$ ./compose.sh <carpeta> [up|stop|down]
```

#### base:

Stack de servicios preparado para producción compuesto por 3 contenedores: NGINX, Strapi CMS(NodeJS) y PostgreSQL. 

#### ha-passive:

Stack con clúster en alta disponibilidad (activo-pasivo) mediante implementación de WAL Streaming, compuesto por dos nodos (master, replica), para desplegar esta pila es necesario generar certificado público (puede ser autofirmado) y guardarlo en ``stacks/ha-passive/master/certs/``, se utiliza para conexión entre réplica y maestro.

Configuración para la capacidad de réplica alojada en ``postgresql.conf``, reglas de acceso dentro de la red virtual de tipo *bridge* gestionada por docker y declarada en el ``docker-compose.yml`` alojadas en el fichero ``pg_hba.conf``.