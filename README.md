# TATTOO STUDIO searching engine

This is the FOURTH PROJECT of the Full Stack Development Bootcamp with <a href="https://github.com/GeeksHubsAcademy" target="_blank">Geekshubs Academy</a>.

![Tattoo studio](./img/modern-and-creative-tattoo-parlor-with-a-chair-brutal-interior-design-photo.jpg)

<div align="center">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js"/><img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" /><img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#project-description-es">Description (ES)</a></li>
    <li><a href="#challenge">Challenge</a></li>
    <li><a href="#database-diagram">Database diagram</a></li>
    <li><a href="#instalation-local">Instalation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#project-development">Project development</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#author">Author / Contact </a></li>
  </ol>
</details>


## Project description (ES)
##### Services management tool for a tattoo studio

<details>
  <summary>Read about it (only in spanish)</summary>
  <br/>
<b>Gestión de citas para un estudio de tatuajes:</b>
<br /><br />
El departamento de producto nos ha encomendado desarrollar el backend
correspondiente al sistema de gestión de citas para un estudio de tatuajes.

Los usuarios podrán registrarse en la aplicación, iniciar sesión y acceder a su área
personal. Dentro de su área, podrán visualizar una lista de las citas programadas
para servicios de tatuajes y piercing, así como crear nuevas citas para diversos
servicios que ofrece el estudio.

Además, se contará con una sección de usuario donde podrán acceder a sus datos
personales, visualizables únicamente por el propio usuario (perfil).
</details>


## Challenge
- Create Endpoints (registration, login, CRUD):
- Migrations & Seeders for all tables.
- All non-public endpoints with corresponding middlewares.


## Database diagram

![Reverse engineered diagram of the DB](./img/project4_DIAGRAM.png)

## Instalation (local)
1.  Clone this repository
2.  Run ` $ npm install ` in terminal
3.  Conect repository with database 
4.  Run migrations:  ` $ npm run run-migrations `
5.  *Run seeders:  ` $ npm run seeders `
6.  Start server:  ` $ npm run dev `

##### *Alternative to step 5:
- you can select and copy ALL TEXT from the `"data.sql"` file
- paste it into MySQL 
- execute it (⚡ button) to populate a smaller example of the database
    >file route: `./src/database/seeders/data.sql `


## Endpoints

<details>
<summary>AUTH routes</summary>

-   REGISTER new user
    
        POST https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/auth/register

    body:
    
    ``` js
        {
            "first_name": "Sergio",
            "last_name": "Sergio",
            "email": "sergio@sergio.com",
            "password": "111111"
        }
    ```

-   LOGIN user

        POST https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/auth/login
        
    body:

    ``` js
        {
            "email": "super@super.com",
            "password": "123456"
        }
    ```
</details>
<details>
<summary>USERS routes</summary>

-   GET ALL USERS  (including dinamic query search)

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users
        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users?email=example@domain.com

- GET USER BY ID

      GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id

-   UPDATE PROFILE (for the currently logged user)

        PUT https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/self

    body:

    ```js
        {
            "first_name": "name",
            "last_name": "surname",
            "email": "something@domain.com",
            "password": "111111"
        }
    ```
-   UPDATE USER BY ID

        PUT https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id

-   UPDATE USER'S ROLE

        PUT https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id/:role

-   DELETE USER BY ID

        DELETE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id
</details>
<details>
<summary>SERVICES routes</summary>

-   CREATE A NEW SERVICE

        POST https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services

-   GET ALL SERVICES

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services

-   UPDATE SERVICE BY ID

        UPDATE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services/:id

-   DELETE SERVICE BY ID

        DELETE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services/:id
</details>
<details>
<summary>APPOINTMENTS routes</summary>

-   CREATE A NEW APPOINTMENT

        POST https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments

-   GET ALL APPOINTMENTS

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments
-   GET OWN APPOINTMENTS

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/profile
        
-   GET APPOINTMENTS BY ID

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/:id

-   UPDATE APPOINTMENTS BY ID

        UPDATE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/:id

-   DELETE APPOINTMENTS BY ID

        DELETE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/:id

</details>

<br />
Find here the collection of all endpoints in Thunder Client:

1. You have to open Thunder Client
2. Go to collections
3. Import this file: `./HTTP/thunder-collection_STUDIO TATTOO.json`


## Project Development:

<details>
  <summary>1. SQL - Database design:</summary>
    
-   Analyze the task to find the purpose of the database and gather all requirements
-   Concept design: create an Entity-Relationship Diagram where we
define tables, their attributes, and the relationships with one another.
-   Normalization: eliminate redundancy, identify primary keys (PK) and foreign keys (FK)
-   Logical thinking: decide what can and cannot be 'NULL' (not required) and which are 'UNIQUE' fields
</details>

<details>
  <summary>2. DOCKER - Creating a container</summary>

-   Install docker
- Create a container
    > docker run -d -p 3306:3306 --name <container-name> -e MYSQL_ROOT_PASSWORD=<your_password> mysql
- Access it
    > mysql -h localhost -P 3306 -u root -p
you will need -h (host), -P (port), -u (username) and -p (password)
- Execute it
    > docker exec -it mysql-pruebas bash
</details>

<details>
  <summary>3. EXPRESS - Create a server connection</summary>

- We initiate NODE:  `$ npm init` 
    This creates 'package.json' where all the dependencies will be stored.

- We run the command: `$ npm install express --save`
    This creates 'package-lock.json' and the 'node_modules' folder

- We create the folder '.gitignore' and add '/node_modules' inside
    This blocks the heavy folder from being upload to github with the rest of the project.

- We install TYPESCRIPT (as developers) `$ npm install typescript -D`

- We create the 'tsconfig.json' file: `$ npx tsc --init`

- We install types /express & node: `$ npm install @types/express @types/node -D`

- We install dependencies to compile TS (nodemon): `$ npm install ts-node nodemon -D`

- We add a shortcut to the package.json's scripts:
    > "dev": "nodemon ./src/server.ts"

- We create the file '.env' with the PORT (of the server) and add '.env' to the '.gitignore'.

    Also add a copy '.env.sample' where we will storage a blueprint of data, without the sensitive information (in this case: 'PORT= ')

- We install 'dotenv': `$ npm i dotenv`
    This gets added to the dependencies and will grab data from the .env file
</details>

<details>
  <summary>4. DOTENV - Connect to the DB</summary>

- We create the folder 'src' with a 'server.ts' file inside.
    The main function connects to the server `startServer();`<br/>
- We link a new file called `app.ts` to separate responsabilities.<br/>
-   In this file we write the following code:

    ```js
    import express from "express";
    import dotenv from "dotenv";
    import { Request, Response } from "express";
    
    // links the .env folder
    dotenv.config(); 

    // runs server connection
    const app = express(); 

    // parses responses to .json)
    app.use(express.json()); 

    // sets up the connection port
    const PORT = process.env.PORT || 4002; 

    // server is up and listening to any upcomming request
    app.listen(3000, () => console.log('Servidor levantado en 3000')); 


    // testing request - 'Hello world' means we are ready to go!
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!')
    }); 
    ```

- We run the server using the previously created nodemon shortcut: `$ npm run dev`
</details>

<details>
  <summary>5. MySQL Workbench</summary>

- We open the workbench and run the following commands:

    ```sql
    CREATE DATABASE <project_name>;
    USE <project_name>;
    ```
</details>

<details>
  <summary>6. MIGRATIONS & MODELS</summary>

- Creating MIGRATIONS [Data Definition Language (DDL): with typeorm]: `./src/database/migrations`
- Adding them to `DataSource.migrations` in the `db.ts` file: `Role, User, Service, Appointment`
- Creating MODELS (entities) [Data Manipulation Language (DML)]
- Adding them to `DataSource.entities` in the `db.ts` file: `Roles, Users, Services, Appointments`
</details>

<details>
  <summary>7. CONTROLLERS</summary>

- We create controllers (in a folder on the same level with `package.json`): 
    > `auth, roles, users, services, appointments`
</details>

<details>
  <summary>8. ROUTES</summary>

- We create routes (in `app.ts`) for CRUD (create, read, update and delete) database records.
</details>

<details>
  <summary>9. MIDDLEWARE: auth()</summary>
  
  - Additionally we need to control access to our data. We will use 'middleware' functions.

  -  `Auth` (authorisation systembased on TOKENs) will block anything that is not to be seen by the general public. In our case, it only does not affect to `register`, `login` and `getServices` (as those are the endpoints reachable without logging in)
  -  The `auth()` function verifies an encrypted TOKEN created automatically while logging in. With an active token we have access to other data.
</details>

<details>
  <summary>10. MIDDLEWARE: isSuperAdmin()</summary>
  
- We also want to grant special administrative access. With another middleware, the `isSuperAdmin()` function, we control PERMISSIONS.
- The 'superadmin' role would be able to reach all data, while Users would have a more limited reach. More levels can be implemented
</details>

<details>
  <summary>11. TOKENDATA</summary>

- For the TOKEN to work, we create a new file `./types/index.d.ts` with the following lines:

    ```js
    export type tokenData = {
        userId: number;
        roleName: string;
    };

    declare global {
        namespace Express {
            export interface Request {
                tokenData: tokenData;
            }
        }
    }
    ```
</details>

<details>
  <summary>12. SEEDERS</summary>

- In order to check out this project, you'll need to ppopulate the database.

- Follow steps 5 and 6 of the <a href="#instalation-local">instalation</a>
</details>


## Deployment
The project is deployed here:
https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/

You can use this route for all the endpoints.


## Author
<div align="center">
<a href = "mailto:a.sergiotorres@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://github.com/SergioTorresGarcia" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a> 
</div>