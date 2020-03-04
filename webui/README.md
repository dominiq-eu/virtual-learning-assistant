# Assistant

To run the webui, you need following dependecies:

 * Node.js
 * docker-compose


With this installed you need to install the programs
dependencies, too:

<code>$ npm install</code>


To start the program:

<code>$ npm run start</code>


To run the container in production, you need to build it first:

<code>$ npm run build</code>

Then start the container with docker-compose:

<code>$ docker-compose up</code>

or if you want to run it in background:

<code>$ docker-compose up -d</code>

To stop the container in background mode:

<code>$ docker-compose down</code>

To view the logs in background mode:

<code>$ docker-compose logs -f</code>

