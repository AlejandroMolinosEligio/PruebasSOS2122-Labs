module.exports = (app,db) =>{
    const express = require("express");
    const BASE_API_URL = "/api/v1";
    const URL_PORTAL = "https://documenter.getpostman.com/view/20091922/UVsPP4n9";

    var contats = [
        {
            name: "peter",
            phone: 12345
        },
        {
            name: "paul",
            phone: 6789
        }
    ]

    app.use("/", express.static('public'));

    app.get(BASE_API_URL+"/contacts",(req, res)=>{
        res.send(JSON.stringify(contats,null,2));
    })

    app.get("/api",(req, res)=>{
        res.send({result : true});
    })

    app.get("/caritas",(req,res)=>{
        console.log("Requested / route");
        res.send("<html><body>"+cool()+"</body></html>");
    });

    app.get(BASE_API_URL+"/docs",(req,res)=>
    {
        res.redirect(URL_PORTAL)
    })

    app.get(BASE_API_URL+"/contacts/:name",(req, res)=>{

        var nombre =req.params.name
        var filteredContatcs = contats.filter((contat)=>
        {
            return (contat.name == nombre);
        });
        if (filteredContatcs==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredContatcs,null,2));
        }
    })

    app.get("/api/contacts", (req,res)=>{
        
        db.find({}, function (err, contacts) {
          res.send(JSON.stringify(contacts.map((c)=>{
              return { contact : c.contact };
          }),null,2));
        });

    });

    app.post(BASE_API_URL+"/contacts",(req, res)=>{
        contats.push(req.body);
        res.sendStatus(201,"CREATED");
    })

    app.delete(BASE_API_URL+"/contacts/:name",(req, res)=>{
        var nombre = req.params.name;
        contats = contats.filter((contact)=>{
            return (contact.name != nombre);
        })
        res.sendStatus(200,"DELETED");
    })
}