//
let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json());     // this code enable json body part from request. 


let product1 = {pid:100,pname:"washing machine",pprice:40000,pqty:5,pcolor:"silver",pwarrenty:"1 year"}
let product2 = {pid:101,pname:"laptop",pprice:80000,pqty:5,pcolor:"silver",pwarrenty:"3 year"}
let product3 = {pid:102,pname:"TV",pprice:40000,pqty:5,pcolor:"silver",pwarrenty:"2 year"}
let product4 = {pid:103,pname:"watch",pprice:5000,pqty:5,pcolor:"black",pwarrenty:"4 year"}
let producters =[];
producters.push(product1,product2,product3,product4);


// http://localhost:3000/  it will give in text format 

app.get("/",(request,response)=> {
    response.send("welcome to rest api with get method")
})

// http://localhost:3000/getProduct

app.get("/getProduct",(request,response)=> {
    response.json(product4);
})

// http://localhost:3000/getProducts 

app.get("/getProducts",(request,response)=> {
    response.json(producters);
})

// search products using query  param
// http://localhost:3000/searchProductByQueryParam?pid=101
app.get("/searchProductByQueryParam",(request,response)=> {
    let pid = request.query.pid;
      let result = producters.find(p=>p.pid==pid);
      if(result!=undefined){
          response.json(result);
      }else {
      response.json({"msg":"product details not present"})
      }
  })
  
 // search employees using path param 
// http://localhost:3000/searchProductByPathParam/100
app.get("/searchProductByPathParam/:pid",(request,response)=> {
    let pid = request.params.pid;
    let result = producters.find(p=>p.pid==pid);
    if(result!=undefined){
        response.json(result);
    }else {
    response.json({"msg":"product details not present"})
    }

})
 
  // create or store products details in array 
// http://localhost:3000/storeProducts

app.post("/storeProducts",(request,response)=> {
    let storeproduct = request.body;
    //console.log(customer);
    let result = producters.find(p=>p.pid==storeproduct.pid);
    //console.log(result)
    if(result == undefined){
        producters.push(storeproduct);       // added in array 
            response.send("producters details stored successfully");
    }else {
        response.send("Record didn't store, producters id must be unique")
    }
})

// update color 
// http://localhost:3000/updateProductsBYcolor

app.patch("/updateProductsBYcolor",(request,response)=> {
    let patchproduct = request.body;
    let index = producters.findIndex(p=>p.pid==patchproduct.pid);
    if(index<0){
            response.send("No producters present with id as "+patchproduct.pid);
    }else {
        producters[index].pcolor=patchproduct.pcolor;
            response.send(" color updated ");
    }
});

//update color and qty
// http://localhost:3000/updateProducts

app.put("/updateProducts",(request,response)=> {
    let updateproduct = request.body;
    let index = producters.findIndex(p=>p.pid==updateproduct.pid);
    if(index<0){
            response.send("No products present with id as "+updateproduct.pid);
    }else {
        producters[index].pqty=updateproduct.pqty;
        producters[index].pcolor=updateproduct.pcolor;
            response.send(" products details updated successfully");
    }
});

//delete
// http://localhost:3000/deleteProduct/101

app.delete("/deleteProduct/:pid",(request,response)=> {
    let pid = request.params.pid;
    let index = producters.findIndex(p=>p.pid==pid);
    if(index<0){
            response.send("No product present with id as "+pid);
    }else {
        producters.splice(index,1);
            response.send(" product details deleted successfully with empid === "+pid);
    }
});













app.listen(3000,()=>console.log("Server running on port number 30000"))
