const http = require("http");
const express = require("express");
const fastify = require("fastify");
const ourPort = 3000;

const useExpress = (process.argv[2] !== "fastify")
const app = useExpress ? express() : fastify();


console.log(`testFastify => Simple Web Server that can run either Fastify or Express
usage:  node index.js  fastify | express (default)
Runs the server using the specified server package

Selected Server: ${useExpress ? "Express" : "Fastify"}
HTTP Port:       ${ourPort}
Get Started at:  http://localhost:${ourPort}
*******************************************\n`)


  const homePage = ()=> { return `<html>
  <head>
  <title>Glenn's Home Page</title>
  </head>
  <body>
  <h2>Home - Test Fastify</h2>
  <div>Goto <a href="/html">Dashboard Page</a></div>
  <div>See <a href="/glenn">"backend" API</a></div>
  </body>
  </html>`
}

  const htmlResponse = (giblet)=>{ return `<html>
  <head>
  <title>Glenn's test</title>
  </head>
  <body>
  <h2>The Dashboard</h2>
  <table border="1">
    <tr>
      <td>Important Data</td><td>${giblet}</td>
    </tr>
    <tr>
      <td colspan="2">Reload <a href="/html">this page</a></td>
    </tr>
    <tr>
      <td colspan="2">Call <a href="/glenn">"Backend" API</a></td>
    </tr>
    <tr>
      <td colspan="2">Goto <a href="/">Home Page</a></td>
    </tr>
  </table>
  </body>
  </html>`
    }

  const htmlError = (emsg)=> { return `<html>
    <head>
    <title>Glenn's test</title>
    </head>
    <body>
    <h3>There was an API error> ${e}</h3>
    </body>
    </html>`
  }

  app.get("/", (req,res)=> {

    if(useExpress){
        res.status(200).send( homePage() );
    } else {
        res.code(200)
        .header("content-type","text/html")
        .send( homePage() );
    }

  })


    // This is a data "API" 
    app.get('/glenn', async (req, res) => {
        console.log(`/glenn`)
        const ourResponse = { hello: Date.now() };

        if(useExpress){
            res.status(200).json( ourResponse )
        } else {
            res.code(200)
            .header("content-type", "application/json")
            .send(ourResponse)
        }
    });




app.get("/html", (req,res)=>{

    console.log("/html - will make API call to glenn")

    // Now we need to make a "backend" API call to get some data
    const apiReq = http.get("http://localhost:3000/glenn", (resp)=>{

        let jsData = "";
        resp.on("data", chunk=>{
            jsData += chunk;
        });

        resp.on("end", ()=>{
            console.log(`.../html - Returned from glenn API call`)
            const data = JSON.parse(jsData);

            const ourResponse = htmlResponse(data.hello);

            if(useExpress) {
                res.status(200)
                .send( ourResponse )

            } else {
                res.code(200)
                .header("content-type", "text/html")
                .send( ourResponse )
            }
        });


    })
    apiReq.on("error", e=>{
        const ourError = htmlError(e);

        if(useExpress){
            res.status(200)
            .send( ourResponse )

        } else {
            res.code(200)
            .header("content-type", "text/html")
            .send( ourResponse )
        }
    })
})


if(useExpress) {

    app.listen(ourPort, ()=>{
        console.log(`EXPRESS: running on port: ${ourPort}`)
    })

} else {
  
    app.listen(ourPort)
    .then( (x)=>{
        console.log(`Fastify running on port: ${ourPort}, ${x}`)
    })
    .catch( e=> {
        console.log(`We had an exception: ${e}`)
    });

}
