# socialWires-BACK-END

Social Wires es una red social que busca facilitar en un espacio publicaciones de personas con el fin de expresar lo que gusten en la red

### Installation

1. Clone el repositorio

   ```sh
   git clone https://github.com/granadalook/socialWires-BACK-END.git
   ```

2. Instale dependencias usando NPM

   ```sh
   npm install
   ```

3. Cree un archivo `.env` en la base del proyecto y agregue las variables de entorno

   ```js
   POSTGRES_DB = socialwire;
   POSTGRES_USER = socialwire;
   POSTGRES_PASSWORD = socialwire123;
   POSTGRES_PORT = 5434;
   POSTGRES_HOST = localhost;
   DATABASE_NAME = socialwire;
   DATABASE_PORT = 5432;
   ```

4. Correr el siguiente comando usando docker para levantar la base de datos

   ```sh
   docker-compose up -d
   ```

5. Correr el siguiente comando para levantar el proyecto en un servidor local

   ```sh
   npm run start:dev
   ```

6. abra el siguiente link para ver la documentacion de la API Usando `Swgger` (http://localhost:3000/doc/swagger)

   ```sh
   http://localhost:3000/doc/swagger
   ```

## Contact

Jhon Stiven Granada Acevedo - (https://github.com/granadalook) - tiven17.jsga@gmail.com

Project Link: [https://github.com/granadalook/socialWires-BACK-END.git](https://github.com/granadalook/socialWires-BACK-END.git)
