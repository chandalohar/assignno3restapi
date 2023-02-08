let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json());     // this code enable json body part from request. 


let employee1 = {empid:100,empname:"Ravi",age:21,empdesignation:"developer",salary:500000}
let employee2 = {empid:101,empname:"Ramesh",age:20 ,empdesignation:"designer",salary:200000}
let employee3 = {empid:102,empname:"Rajesh",age:24,empdesignation:"project manager",salary:800000}
let employee4 = {empid:103,empname:"Lokesh",age:26,empdesignation:"Trainer",salary:1000000}
let employers =[];
employers.push(employee1);
employers.push(employee2);
employers.push(employee3);
employers.push(employee4);


// http://localhost:3000/  it will give in text format 

app.get("/",(request,response)=> {
    response.send("welcome to rest api with get method")
})

// http://localhost:3000/getEmployee

app.get("/getEmployee",(request,response)=> {
    response.json(employee4);
})

// http://localhost:3000/getEmployees 

app.get("/getEmployees",(request,response)=> {
    response.json(employers);
})

// search employees using query param 
// http://localhost:3000/searchEmployeeByQueryParam?empid=101
app.get("/searchEmployeeByQueryParam",(request,response)=> {
    let empid = request.query.empid;
      let result = employers.find(e=>e.empid==empid);
      if(result!=undefined){
          response.json(result);
      }else {
      response.json({"msg":"employyee details not present"})
      }
  })
  
 // search employees using query param 
// http://localhost:3000/searchEmployeeByPathParam/100
app.get("/searchEmployeeByPathParam/:empid",(request,response)=> {
    let empid = request.params.empid;
      let result = employers.find(e=>e.empid==empid);
      if(result!=undefined){
          response.json(result);
      }else {
        response.json({"msg":"employyee details not present"})
    }
  })
 

  // create or store employees details in array 
// http://localhost:3000/storeEmployers

app.post("/storeEmployers",(request,response)=> {
    let employer = request.body;
    //console.log(customer);
    let result = employers.find(e=>e.empid==employer.empid);
    //console.log(result)
    if(result == undefined){
        employers.push(employer);       // added in array 
            response.send("employeess details stored successfully");
    }else {
        response.send("Record didn't store, employer id must be unique")
    }
})

// update age 
// http://localhost:3000/updateEmployersBYage

app.patch("/updateEmployersBYage",(request,response)=> {
    let employyee = request.body;
    let index = employers.findIndex(e=>e.empid==employyee.empid);
    if(index<0){
            response.send("No employee present with id as "+employyee.empid);
    }else {
        employers[index].age=employyee.age;
            response.send(" Age updated ");
    }
});

// update age and name 
// http://localhost:3000/updateEmployers
app.put("/updateEmployers",(request,response)=> {
    let employ = request.body;
    let index = employers.findIndex(e=>e.empid==employ.empid);
    if(index<0){
            response.send("No empoyees present with id as "+employ.empid);
    }else {
        employers[index].empname=employ.empname;
        employers[index].age=employ.age;
            response.send(" empoyees details updated successfully");
    }
});


//delete
// http://localhost:3000/deleteEmployers/101

app.delete("/deleteEmployers/:empid",(request,response)=> {
    let empid = request.params.empid;
    let index = employers.findIndex(e=>e.empid==empid);
    if(index<0){
            response.send("No employee present with id as "+empid);
    }else {
        employers.splice(index,1);
            response.send(" employee details deleted successfully with empid === "+empid);
    }
});






app.listen(3000,()=>console.log("Server running on port number 30000"))
