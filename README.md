<h3 align="center">Prueba Backend Onesta</h3>

## Descripción
Este proyecto es una prueba técnica para demostrar habilidades en el desarrollo de backend. La aplicación permite gestionar datos de agricultores, frutas, cosechas y clientes, además de la capacidad de cargar datos desde un archivo CSV. La API está documentada y accesible mediante Swagger.

Este projecto unso como framework principal [Nest](https://docs.nestjs.com/) en conjunto con [Prisma](https://www.prisma.io/orm) como ORM

## Instalación
Para configurar y correr la aplicación localmente, sigue estos pasos:
```bash
$ pnpm install
```

## Migraciones
Para manejar las migraciones de la base de datos, usa los siguientes comandos:
```bash
# Ejecutar migraciones
$ pnpm run prisma:migrate

# Resetear la base de datos y aplicar migraciones
$ pnpm run prisma:reset
```

## Ejecución de la aplicación
Puedes correr la aplicación en modo desarrollo utilizando los comandos:
```bash
# Modo desarrollo
$ pnpm run start

# Modo watch (reinicio automático)
$ pnpm run start:dev
```
La documentación y los endpoints de prueba están disponibles en Swagger en la siguiente URL:
```
# ruta de documentacion y test en swagger
$ http://localhost:8080/api

```

## Pruebas

```bash
# Ejecutar pruebas unitarias
$ pnpm run test

# Ver la cobertura de pruebas
$ pnpm run test:cov
```

## Revisión funcionalidades

Para cargar un archivo CSV, sigue estos pasos:

1. Accede a Swagger en http://localhost:8080/api.
2. Selecciona el endpoint POST /upload.
3. Sube el archivo cosecha.csv que se encuentra en la raíz de este repositorio.

Además, la API proporciona 12 endpoints para operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre las estructuras de farmer, fruit, client y harvest. Cada endpoint incluye ejemplos de uso.
### Documentación Visual
![documentacion](<doc/Captura de pantalla 2024-06-19 a la(s) 18.08.04.png>)
![doc2](<doc/Captura de pantalla 2024-06-19 a la(s) 18.13.13.png>)
![alt text](<doc/Captura de pantalla 2024-06-19 a la(s) 18.15.43.png>)


## Alcances

- Los ID's son autoincrementales para simplificar el ejercicio.
- Se valida que cada campo en el CSV tenga al menos un carácter.
- Al usar los endpoints de creación, se verifica si la entidad ya existe para evitar duplicados y siempre retornar la estructura existente.
- No se completó la cobertura total de pruebas debido a limitaciones de tiempo y la naturaleza práctica del ejercicio.

## Author

- Paul Beltrán - [Github](https://github.com/pbeltranes) - [Lindked](https://www.linkedin.com/in/paul-beltran-espinosa/)
