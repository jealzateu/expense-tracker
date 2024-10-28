# Proyecto de Seguimiento de Gastos Personales

Este proyecto permite gestionar gastos personales, incluyendo categorías, montos y fechas, además de visualizar un resumen gráfico del gasto total por categoría.

## Requisitos Previos

Asegúrate de tener instalados [Node.js](https://nodejs.org/) y [json-server](https://www.npmjs.com/package/json-server) globalmente en tu entorno.

## Instrucciones para Correr el Proyecto Localmente

1. **Instalar las dependencias**

   En la raíz del proyecto, ejecuta el siguiente comando para descargar e instalar todas las dependencias y paquetes necesarios que están listados en el archivo package.json:

   ```bash
   npm install

2. **Iniciar el servidor de desarrollo**

   Una vez instaladas las dependencias, inicia el servidor de desarrollo ejecutando para iniciar el proyecto React en modo de desarrollo y estará disponible:

   ```bash
   npm start

3. **Iniciar el servidor JSON**

   En otra terminal, ejecuta el siguiente comando para iniciar el servidor JSON que simula una API REST, esto utilizará el archivo db.json como base de datos simulada y servirá los datos en http://localhost:5000/expenses. La aplicación se conecta a esta URL para cargar, añadir, actualizar y eliminar los datos de los gastos:

   ```bash
   json-server --watch db.json --port 5000

**Notas Adicionales**

  Si no tienes json-server instalado globalmente, puedes instalarlo con el siguiente comando, esto permite correr el servidor JSON para manejar los datos en db.json:

   ```bash
   npm install -g json-server

