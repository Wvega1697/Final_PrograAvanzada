# Proyecto de Gestión de Inventario

Este proyecto es una aplicación de gestión de inventario que permite administrar usuarios, productos, proveedores y realizar pedidos. A continuación, se detallan los pasos para configurar y utilizar la aplicación.

## Configuración de la Base de Datos

1. Cree una base de datos en su servidor MySQL utilizando el script proporcionado en el archivo `database.sql`.
2. Asegúrese de haber creado todas las tablas necesarias, incluyendo `usuarios`, `productos`, `inventario`, `proveedores`, etc.
3. Agregue información relevante a las tablas para probar el funcionamiento de la aplicación. Puede utilizar MySQL Workbench u otra herramienta similar para realizar esta tarea.

## Seguridad de Contraseñas

- Las contraseñas de los usuarios deben estar encriptadas antes de ser almacenadas en la base de datos. Asegúrese de implementar un método seguro de encriptación para proteger la información de los usuarios.

## Conexión a la Base de Datos

- Puede elegir el método de conexión a la base de datos que prefiera, ya sea utilizando SQL directamente o utilizando un ORM (Object-Relational Mapping).

## Validaciones de Datos

- Todos los campos de texto deben tener validaciones adecuadas para garantizar la integridad de los datos.
- Por ejemplo, las contraseñas deben cumplir con ciertas restricciones de seguridad, los campos de cantidad deben ser numéricos y los campos de productos deben corresponder a una lista de productos existentes en la base de datos.
- Además, se deben implementar validaciones para asegurar que no se puedan realizar pedidos si hay campos vacíos u otros errores en los datos proporcionados.

## Verificación de Pedidos Duplicados

- Antes de realizar un pedido de un producto, la aplicación debe verificar en la base de datos que no exista un pedido del mismo producto hacia el mismo proveedor.
- Si se encuentra un pedido duplicado, se debe mostrar un mensaje de error indicando esta situación.
- Sin embargo, si existe un pedido del mismo producto pero hacia un proveedor diferente, se permitirá realizar el pedido, pero se mostrará un mensaje informativo al usuario.

## Visualización de Existencias en la Lista de Productos

- La lista de productos debe mostrar la existencia en el inventario.
- Para los productos que tienen pedidos pendientes, se mostrará la cantidad existente más la cantidad solicitada en el pedido entre paréntesis, proporcionando una vista clara de la situación del inventario.

¡Gracias por utilizar nuestra aplicación de gestión de inventario! Si tiene alguna pregunta o sugerencia, no dude en contactarnos. ¡Esperamos que esta herramienta sea útil para su negocio!
