<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Introduction

<hr>

<p>
During Henry bootcamp coursing I developed this single-page application, end-to-end from scratch, consuming information from an external API (<a href="https://pokeapi.co">pokeapi.co</a>).

The project contains landing page, cumulative filters and sort selectors, search bar by name, detail page and the implementation of a controlled form.

Part of the challenge of this project was that no external libraries could be used to style the application. Only pure CSS could be used, for this case CSS Modules were used.

On the other hand, for the filtering and ordering functionalities, external API endpoints that return the filtered or ordered results could not be used, but we had to do them ourselves. In my case I did them (filtered and ordered) on the Front End side.

the only EndPoint avaiable to used were:

- GET https://pokeapi.co/api/v2/pokemon
- GET https://pokeapi.co/api/v2/pokemon/{id}

- GET https://pokeapi.co/api/v2/type

</p>

## Project Objectives

<hr>
<ul>
<li>Build an App from scratch using React, Redux, Node, and Sequelize as main technologies.</li>
<li>Affirm and connect all the concept learned during the career.</li>
<li>Learn best work practices.</li>
<li>Learn an practice the Git workflow.</li>
</ul>

<br>

## Stack of Technologies

<hr>

<h3>Front End</h3>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
<li>React</li>
<li>Redux</li>
</ul>

<h3>Back End</h3>

<ul>
<li>Node.js</li>
<li>Express</li>
<li>Sequelize</li>
</ul>

<h3>DataBase</h3>

<ul>

<li>PostgreSQL</li>
</ul>

## Starting instructions

<hr>

**IMPORTANT:** Required versions of Node.js and NPM are:

- **Node**: 12.18.3 o higher
- **NPM**: 6.14.16 o higher

<h3>BoilerPlate</h3>

<hr>

The boilerPlate has two folders: api and client.

Inside api you must have to create a file called: .env that has the following form:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

You have to replace postgresuser and postgrespassword with your own credentials to connect to postgres database. This file will be ignored by github, as it contains sensitive information (the credentials).
<br>

<h2>Next</h2>

<hr>

<h3>Connect the data base</h3>

- Go to your postgres database manager and create a new database called pokemon, this is the name of the database to which we will connect.

<h3>Install the necesary package to run it</h3>

- Inside api folder, run the command line, npm install.
- Inside client folder, run the command line, npm install.

<h3>Run the project</h3>

- Inside api folder, run the command line, npm start.
- Inside client folder, run the command line, npm start.

<br>
<h2>Project Screens</h2>
<hr>

<ul>
<li>
Landing Page
</li>
</ul>
<img  src='./api/assetsback/landing.png'>
<ul>
<li>
Home Page, with search bar by name, filters by poke type, poke created by users and poke from poke Api (pokeApi). Selector by alphabetical orden (A-Z |Z-A) and pokemon strenght (Low-Hight | Hight-Low).
</li>
</ul>
<img  src='./api/assetsback/home.png'>
<ul>
<li>
Form - Controlled form to create your own pokemon.
</li>
</ul>
<img  src='./api/assetsback/from.png'>
