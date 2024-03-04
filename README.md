# Butzu-api

Repository for creating a REST API client for a scholarly app named Butzu, Butzu is an app designed to manage the creations of menus and catalogs in general for all type of users, from Restaurant owners and tech stores to independent entrepreneurs

## Objetivos

- Creación de un negocio con menu por parte de un usuario.
  /user/

  - Manejo de sesiones y autenticaciones para el usuario.
  - Petición POST para registro de un usuario nuevo.
  - Petición POST para autenticación de usuario.

  /user/negocio

  - Petición GET para consultar los negocios existentes y su información en general.
  - Petición POST para la creación de un nuevo negocio.
  - Petición PUT para la modificación de datos del negocio.
  - Petición GET para la consulta de negocios ligados al usuario.
  - Petición DELETE para la eliminación de un negocio ligado al usuario.

- Creación de un menu dinámico ligado a un negocio por parte del usuario.
  /items/

  - Petición GET para la consulta de items ligados a un negocio.
  - Petición POST para la creación de nuevos items ligados a un negocio.
  - Petición PUT para la modificación de items ligados al negocio.
  - Petición DELETE para eliminación de items ligados al negocio.

  /user/negocio/

  - Petición PUT para la personalización de colores, imágenes y fuentes del negocio.

- Consulta de un negocio por parte del usuario.
  /negocio/search/

  - Petición GET para la búsqueda de un negocio en especifico.
  - Petición GET para la consulta de un negocio en especifico.
  - Petición GET con filtros de localización.

- Búsqueda de productos por parte de un usuario.
  /items/search/
  - Petición GET para la búsqueda de items por nombre.
  - Petición GET del negocio a partir de su vinculo con el item.
  - Petición GET para el filtrado de items por categorías a definir

## Librerías

Librería para testing: [mocha](https://mochajs.org) y [chai](https://www.npmjs.com/package/chai).

Librería para autenticaciones: [passport-jwt](https://www.passportjs.org/packages/passport-jwt/) y token con [JSONwebToken](https://www.npmjs.com/package/jsonwebtoken)

> [!IMPORTANT]  
> Nota importante: Las distribución del proyecto esta organizada por funcionalidad.
