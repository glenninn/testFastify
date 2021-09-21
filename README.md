# testFastify
Simple NodeJS program that shows in a kind-of side-by-side comparison the basic Web Server functions of Fastify and Express.

The premise is that moving between Fastify or Express is not syntactically difficult. 

You can be the judge.

## Getting Started
Clone this project using
```
git clone git@github.com:glenninn/tsetFastify.git
```

Then install the npm modules:
```
npm install
```

## Start the Simple Web Server
testFastify will instantiate a web server using *either* Fastify or Express as the engine.  

By default, testFastify will use Express. To launch testFastify simply type this command:
```
node index.js
testFastify => Simple Web Server that can run either Fastify or Express
usage:  node index.js  fastify | express (default)
Runs the server using the specified server package

Selected Server: Express
HTTP Port:       3000
Get Started at:  http://localhost:3000
*******************************************

EXPRESS: running on port: 3000
```

if you wish to have testFastify use Fastify, use this command line option:
```
node index.js fastify
```

**Now open your browser and go to** http://localhost:3000
