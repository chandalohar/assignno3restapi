let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json());     // this code enable json body part from request. 


let hospital1 = {hsp_id:10001,hsp_name:"krishna hospital",hsp_city:"bhilwara",hsp_type:"Private hospital"}
let hospital2 = {hsp_id:10002,hsp_name:"Jaipuriya hospital",hsp_city:"jaipur",hsp_type:"Govt hospital"}
let hospital3 = {hsp_id:10003,hsp_name:"SMS hospital",hsp_city:"jaipur",hsp_type:"Govt hospital"}
let hospital4 = {hsp_id:10004,hsp_name:"Apoolo hospital ",hsp_city:"bangalore",hsp_type:"Private hospital"}
let allHospitals =[];
allHospitals.push(hospital1,hospital2,hospital3,hospital4);



// http://localhost:3000/  it will give in text format 

app.get("/",(request,response)=> {
    response.send("welcome to rest api with get method")
})

// http://localhost:3000/getHospital

app.get("/getHospital",(request,response)=> {
    response.json(hospital4);
})

// http://localhost:3000/getAllHospitals

app.get("/getAllHospitals",(request,response)=> {
    response.json(allHospitals);
})

// search hospitals using query param 
// http://localhost:3000/searchHospitalsByQueryParam?hsp_id=10001
app.get("/searchHospitalsByQueryParam",(request,response)=> {
    let hsp_id = request.query.hsp_id;
      let result = allHospitals.find(hsp=>hsp.hsp_id==hsp_id);
      if(result!=undefined){
          response.json(result);
      }else {
      response.json({"msg":"Hospitals details not present"})
      }
  })

// search hospitals using path param 
// http://localhost:3000/searchHospitalsByPathParam/10001
app.get("/searchHospitalsByPathParam/:hsp_id",(request,response)=> {
    let hsp_id = request.params.hsp_id;
      let result = allHospitals.find(hsp=>hsp.hsp_id==hsp_id);
      if(result!=undefined){
          response.json(result);
      }else {
      response.json({"msg":"Hospitals details not present"})
      }
  })


  // create or store hospital details in array 
// http://localhost:3000/storeHospitalDetails
//{"hsp_id":10005,"hsp_name":"raj Hospital","hsp_city":"bhilwara","hsp_type":"Private hospital"}
app.post("/storeHospitalDetails",(request,response)=> {
    let new_hospitals = request.body;
    //console.log(accountholders);
    let result = allHospitals.find(hsp=>hsp.hsp_id==new_hospitals.hsp_id);
    //console.log(result)
    if(result == undefined){
        allHospitals.push(new_hospitals);       // added in array 
            response.send("hospitals details stored successfully");
    }else {
        response.send("Record didn't store, hospitals id must be unique")
    }
})

// update acc_type 
// http://localhost:3000/updateHospitalsBYhsp_type

app.patch("/updateHospitalsBYhsp_type",(request,response)=> {
    let new_hospitals = request.body;
    let index = allHospitals.findIndex(hsp=>hsp.hsp_id==new_hospitals.hsp_id);
    if(index<0){
            response.send("No hospitals present with id as "+new_hospitals.hsp_id);
    }else {
        allHospitals[index].hsp_type=new_hospitals.hsp_type;
            response.send(" hospital updated ");
    }
});

// update acc_type and acc_balance 
// http://localhost:3000/updateHospitals

app.put("/updateHospitals",(request,response)=> {
    let new_hospitals = request.body;
    let index = allHospitals.findIndex(hsp=>hsp.hsp_id==new_hospitals.hsp_id);
    if(index<0){
            response.send("No hospitals present with id as "+new_hospitals.hsp_id);
    }else {
        allHospitals[index].hsp_type=new_hospitals.hsp_type;
        allHospitals[index].hsp_name=new_hospitals.hsp_name;

            response.send(" hospital updated ");
    }
});




//delete
// http://localhost:3000/deleteHospitalsByID/10005
app.delete("/deleteHospitalsByID/:hsp_id",(request,response)=> {
    let hsp_id = request.params.hsp_id;
    let index = allHospitals.findIndex(hsp=>hsp.hsp_id==hsp_id);
    if(index<0){
            response.send("No hospitals present with id as "+hsp_id);
    }else {
        allHospitals.splice(index,1);
            response.send(" hospitals details deleted successfully with hsp_id === "+hsp_id);
    }
});






  app.listen(3000,()=>console.log("Server running on port number 30000"))
