//
//
let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json());     // this code enable json body part from request. 


let account1 = {acc_id:100,acc_name:"raj",acc_type:"saving account",acc_balance:900000,address:"rajasthan"}
let account2 = {acc_id:101,acc_name:"ravi",acc_type:"salary account",acc_balance:800000,address:"bangalore"}
let account3 = {acc_id:102,acc_name:"ramesh",acc_type:"saving account",acc_balance:700000,address:"hyderabad"}
let account4 = {acc_id:103,acc_name:"rajesh",acc_type:"salary account",acc_balance:600000,address:"pune"}

let allAccounts =[];
allAccounts.push(account1,account2,account3,account4);


// http://localhost:3000/  it will give in text format 

app.get("/",(request,response)=> {
    response.send("welcome to rest api with get method")
})

// http://localhost:3000/getAccount

app.get("/getAccount",(request,response)=> {
    response.json(account4);
})

// http://localhost:3000/getAccounts 

app.get("/getAccounts",(request,response)=> {
    response.json(allAccounts);
})
// search accountdetails using query param 
// http://localhost:3000/searchAccountByQueryParam?acc_id=101

app.get("/searchAccountByQueryParam",(request,response)=> {
    let acc_id = request.query.acc_id;
      let result = allAccounts.find(acc=>acc.acc_id==acc_id);
      if(result!=undefined){
          response.json(result);
      }else {
      response.json({"msg":"account  details not present"})
      }
  })
  
 // search accounts using query param 
// http://localhost:3000/searchAccountsByPathParam/100
app.get("/searchAccountsByPathParam/:acc_id",(request,response)=> {
    let acc_id = request.params.acc_id;
      let result = allAccounts.find(acc=>acc.acc_id==acc_id);
      if(result!=undefined){
          response.json(result);
      }else {
        response.json({"msg":"accounts details not present"})
    }
  })

  // create or store accounts details in array 
// http://localhost:3000/storeAccounts
//{"acc_id":106,"acc_name":"raj","acc_type":"saving account","acc_balance":900000,"address":"rajasthan"}
app.post("/storeAccounts",(request,response)=> {
    let accountholders = request.body;
    //console.log(accountholders);
    let result = allAccounts.find(acc=>acc.acc_id==accountholders.acc_id);
    //console.log(result)
    if(result == undefined){
        allAccounts.push(accountholders);       // added in array 
            response.send("accounts details stored successfully");
    }else {
        response.send("Record didn't store, accounts id must be unique")
    }
})

// update acc_type 
// http://localhost:3000/updateAccountsBYacc_type

app.patch("/updateAccountsBYacc_type",(request,response)=> {
    let accountbypatch = request.body;
    let index = allAccounts.findIndex(acc=>acc.acc_id==accountbypatch.acc_id);
    if(index<0){
            response.send("No accounts present with id as "+accountbypatch.acc_id);
    }else {
        allAccounts[index].acc_type=accountbypatch.acc_type;
            response.send(" acc_type updated ");
    }
});

// update acc_type and acc_balance 
// http://localhost:3000/updateAccounts
app.put("/updateAccounts",(request,response)=> {
    let accountbyput = request.body;
    let index = allAccounts.findIndex(acc=>acc.acc_id==accountbyput.acc_id);
    if(index<0){
            response.send("No accounts present with id as "+accountbyput.acc_id);
    }else {
        allAccounts[index].acc_type=accountbyput.acc_type;
        allAccounts[index].acc_balance=accountbyput.acc_balance;
            response.send(" accounts details updated successfully");
    }
});


//delete
// http://localhost:3000/deleteAccountID/101

app.delete("/deleteAccountID/:acc_id",(request,response)=> {
    let acc_id = request.params.acc_id;
    let index = allAccounts.findIndex(acc=>acc.acc_id==acc_id);
    if(index<0){
            response.send("No accounts present with id as "+acc_id);
    }else {
        allAccounts.splice(index,1);
            response.send(" accounts details deleted successfully with acc_id === "+acc_id);
    }
});









app.listen(3000,()=>console.log("Server running on port number 30000"))
