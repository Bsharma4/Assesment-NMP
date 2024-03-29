Story: Board Game Directory
=====

A few months ago, your best friend organized a weekly board game night. As the number of participants
has grown, so has the library of available games. Your friend has asked you to create a website to
track which games are available, as well as all the times they have been played. Your goal is to
create a good-looking prototype that you won't be embarrassed to show your friend, not a fully-finished
product.

Requirements
=====

* Ability to add and edit a board game record
* Ability to add multiple game session records associated with a game
* Main screen should include a listing of available games, including the date of the most recent game session for each

Technical detail
=====

You should be able to develop on Windows, Mac, or Linux. The project has already been started for you. Out of the many, many alternatives, these are the tools we've chosen for this challenge:

* <a href="https://nodejs.org/en/">node.js</a>
* <a href="https://expressjs.com/">express - web server</a>
* <a href="https://ejs.co/">EJS - templating</a>
* <a href="https://mariadb.org/">MariaDB - database backend</a>

Also, consider using a [Dockerfile](https://docs.docker.com/engine/reference/builder/) to build your development environement.


Please note:

* We have not defined the database schema for you. You should decide which fields would be useful to collect and what the table structure should be and put the statements necessary for that in schema.sql.
* Include sample data in your schema.sql file so that we can see what your app looks like fully populated from the start.
* If you see any "TODO" comments in code, those are for you!

Features that are not required
=====

* User account management
* Reactivity

Bonus
=====

For extra points, think of a useful feature to add to the system that your friend didn't mention. Also, you can implement the database using a docker container (notes below)

Getting the code and completing your challenge
=====

1) Since this is a [git template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), it isn't possible to fork it, so you will need to "[Use template](https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp)" and clone it to your local development environment. Then, create a private github repository of your own and change that to be the upstream of your local copy. Once you are ready for us to see your code, add these users as collaborators to your project:

* https://github.com/cwolfgang-eig
* https://github.com/tjamesNM
* https://github.com/horner

2) update the README in your repository with some screenshots and a link to a YouTube short/video demonstrating your solution 


Docker Notes if you'd like to implement a docker container for the database
============
To start the database as a docker service:
```
docker run --name=nmdb -d -p 3307:3306 -e MARIADB_USER=app -e MARIADB_PASSWORD=wonderful -e MARIADB_DATABASE=challenge -e MARIADB_ROOT_PASSWORD=wonderful mariadb:latest
```
NOTE!!!, do not leave the docker running when done testing.  Do a `docker kill nmdb` to kill it when done BUT the data in the database will BE GONE!  You can restart it by doing `docker restart nmdb` but you should consider doing a `docker rm nmdb` to cleanup.

You can connect to it from the host machine using:
`mysql --host=localhost -P 3307 --user=app --password=wonderful challenge`
or from docker by doing:
`docker exec -it nmdb mysql --host=localhost -P 3306 --user=app --password=wonderful challenge`

Bonus points if you can make a fully automated Dockerfile container for building and testing the app with a GitHub Action.


How we will test your code (change this if needed)
=====

Submission Notes
======
Docker Setup :- This project has been dockerized to simplify the setup process. Follow the steps below to run the application using Docker.

Prerequisites :- Docker installed on your system.

Accomplished :-
1. Database Schema and Sample Data: Created a database schema and added sample data to populate the database.
2. Implementation of CRUD Operations and completing To do sections: Completed the implementation of CRUD operations in all JavaScript and EJS files, including routes and configuration for various features.
3. Implemented Features: Implemented features as per the requirements, providing users with the ability to:
    * Add a game
    * Edit a game
    * Add a game session
    * Edit a game session
    * View the latest session of all available games on the left side of the frontend
    * View all game sessions in order of latest to oldest session dates on the right side of the frontend.
4. Dockerization of the Application: Dockerized the application along with all dependencies, including the database. Follow the steps below to run the application.
5. Fully Automated Dockerfile Container with GitHub Actions: Implemented a fully automated Dockerfile container for building and testing the application using GitHub Actions.
* Possible Future Feature: Identified a possible feature to be added: Ability to search and display game sessions by ID.

Screenshots of front end 
===
![Webpage-1](Webpage-1.png)

Quick Youtube tutorial  
===
[Watch the quick demo video on YouTube](https://youtu.be/qeyAp2_Lw-E?si=--qrRxBh2a-BM-q1)

Running the Application with Docker
===

1) Start MariaDB Docker Container:
```
docker run --name=nmdb -d -p 3307:3306 -e MARIADB_USER=app -e MARIADB_PASSWORD=wonderful -e MARIADB_DATABASE=challenge -e MARIADB_ROOT_PASSWORD=wonderful mariadb:latest
```
This command starts a MariaDB container named nmdb with the specified environment variables.

2) Build Docker Image for the Application:
```
docker build -t assessment-nmp .
```
This command builds a Docker image for the application using the Dockerfile provided.

3) Run the Application Container:
```
docker run -d -p 3000:3000 --name assessment-nmp --link nmdb:db assessment-nmp
```
This command starts a container named assessment-nmp, exposing port 3000 and linking it to the nmdb container.

4) Access the Application: Once the application container is running, you can access the application at http://localhost:3000.

5) Removing Docker Containers: If you no longer need the Docker containers, you can remove them using the following commands:

To stop and remove the application container:

```
docker stop assessment-nmp
docker rm assessment-nmp
```

To stop and remove the MariaDB container:

```
docker stop nmdb
docker rm nmdb
```

Remember to stop and remove the Docker containers when you're done testing or using the application to free up system resources.
