const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const db = require('./query');

// Middleware-----BEGINNING

// Set headers for our routes...
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Set body parser to transform incoming request to JSON format....
// try {
//     app.use(bodyparser.json());

// } catch (error) { // For Invalid JSON
//     app.use((req, res, next) =>{
//         res.status(400).json(
//             {
//                 message:"Invalid JSON payload passed.",
//                 status:"error",
//                 data:null
//             }
//         )
//         next();
//     });
// }

// No.1...
app.use(bodyparser.json());

// No.2....
app.use(bodyparser.urlencoded({
    extended:true,
}));


// The use() method is for GET Requests.....
app.get('/', (req, res, next) => {
    const message = {
        message:"My Rule-Validation API",
        status:"success",
        data:{
            name:"Ifeanyi Otekeiwebia",
            github:"@Dominic-Chuma",
            email:"chumadominic@gmail.com",
            mobile:"07031203995",
            twitter:null
        }
    };

    res.status(201).json(message);
    // res.status(400).json({message:""});
    next();
});

// Endpoints for the Vue.js assignment.
// app.get('/users', db.getUsers);
// ========== OR ==========

app.post('/users',(req, res, next) => {
    res.status(200).json({
        users:[
            {
                id:1,
                name:'Jerry',
                email:'jerry@example.com',
                password:'blablabla'
            },
            {
                id:2,
                name:'Sherley',
                email:'sherlock@holmes.com',
                password:'blebleble'
            }
        ]
    });

    next();
});


// Post Route.....BEGINNING
app.post('/validate-rule',(req, res, next) =>{
    
    if (req.body){ // If JSON data is available.....
        if (toString.call(req.body) === '[object Object]'){ // Validata JSON data
            if("rule" in req.body){ // If JSON data has 'rule' property
                // Check if 'rule' property is a valid object...
                if(typeof req.body.rule === "object" && !Array.isArray(req.body.rule) && req.body.rule !== null){
                    // Check for the presence of the 'data' property....
                    if ('data' in req.body){
                        // Confirm if 'data' property is a valid object..
                        if(typeof req.body.data === "object" && !Array.isArray(req.body.data) && req.body.data !== null){
                            //Check for missing fields in the 'data' property......
                            if(('name' in req.body.data) === false){ // If 'name' is missing,
                                res.status(400).json({
                                    message:"field name is missing from data.",
                                    status:"error",
                                    data:null
                                });
                            }
                            if(('crew' in req.body.data) === false){ // If 'crew' is missing,
                                res.status(400).json({
                                    message:"field crew is missing from data.",
                                    status:"error",
                                    data:null
                                });
                            }
                            if(('age' in req.body.data) === false){ // If 'age' is missing,
                                res.status(400).json({
                                    message:"field age is missing from data.",
                                    status:"error",
                                    data:null
                                });
                            }
                            if(('position' in req.body.data) === false){ // If 'position' is missing,
                                res.status(400).json({
                                    message:"field position is missing from data.",
                                    status:"error",
                                    data:null
                                });
                            }
                            if(('missions' in req.body.data) === false){ // If 'missions' is missing,
                                res.status(400).json({
                                    message:"field missions is missing from data.",
                                    status:"error",
                                    data:null
                                });
                            }
                            // Check is all required fields are present....
                            if(('name' in req.body.data) && ('crew' in req.body.data) && ('age' in req.body.data) && ('position' in req.body.data) && ('missions' in req.body.data) ){
                                // Begin Validation....
                                // 1. (Greater than or Equal to) validation
                                if((req.body.data.missions >= req.body.rule.condition_value) && ((req.body.rule.condition == 'gte') || (req.body.rule.condition == 'gt') || (req.body.rule.condition == 'eq') || (req.body.rule.condition == 'neq') )){
                                    res.status(200).json({
                                        message:"field " + req.body.rule.field + " successfully validated.",
                                        status:"success",
                                        data:{
                                            validation: {
                                              error: false,
                                              field: req.body.rule.field,
                                              field_value: req.body.data.missions,
                                              condition: req.body.rule.condition,
                                              condition_value: req.body.rule.condition_value
                                            }
                                        }
                                    });
                                }else{ // If it does not Validate..........
                                    res.status(400).json({
                                        message:"field " + req.body.rule.field + " failed validation.",
                                        status:"error",
                                        data:{
                                            validation: {
                                              error: true,
                                              field: req.body.rule.field,
                                              field_value: req.body.data.missions,
                                              condition: req.body.rule.condition,
                                              condition_value: req.body.rule.condition_value
                                            }
                                        }
                                    });
                                }

                                // 2. (less than or Equal to) validation
                                if((req.body.data.missions <= req.body.rule.condition_value) && ((req.body.rule.condition == 'lte') || (req.body.rule.condition == 'lt') || (req.body.rule.condition == 'eq') || (req.body.rule.condition == 'neq') )){
                                    res.status(200).json({
                                        message:"field " + req.body.rule.field + " successfully validated.",
                                        status:"success",
                                        data:{
                                            validation: {
                                              error: false,
                                              field: req.body.rule.field,
                                              field_value: req.body.data.missions,
                                              condition: req.body.rule.condition,
                                              condition_value: req.body.rule.condition_value
                                            }
                                        }
                                    });
                                }else{ // If it does not Validate..........
                                    res.status(400).json({
                                        message:"field " + req.body.rule.field + " failed validation.",
                                        status:"error",
                                        data:{
                                            validation: {
                                              error: true,
                                              field: req.body.rule.field,
                                              field_value: req.body.data.missions,
                                              condition: req.body.rule.condition,
                                              condition_value: req.body.rule.condition_value
                                            }
                                        }
                                    });
                                }

                            }
                        }

                        if(Array.isArray(req.body.data)){ // If the 'data' property is an Array

                            // Validation begins...

                            // If the condition_value field is in the data array
                            if ((req.body.rule.condition == 'contains') && (req.body.data.includes(req.body.rule.condition_value))){
                                res.status(200).json({
                                    message:"field " + req.body.rule.field + " successfully validated.",
                                    status:"success",
                                    data:{
                                        validation: {
                                          error: false,
                                          field: req.body.rule.field,
                                          field_value: req.body.data.length,// provide the array's length
                                          condition: req.body.rule.condition,
                                          condition_value: req.body.rule.condition_value
                                        }
                                    }
                                });
                            }else{// If the condition_value field is not in the data array
                                if ((req.body.rule.condition == 'contains') && (req.body.data.includes(req.body.rule.condition_value)) === false){
                                    res.status(400).json({
                                        message: "field " + req.body.rule.field + " is missing from data.",
                                        status: "error",
                                        data: null
                                      })
                                }
                            }
                        }

                        // If 'data' property is a string........
                        if((typeof req.body.data) === 'string'){
                            res.status(400).json({
                                message:"field " + req.body.rule.field + " failed validation.",
                                status:"error",
                                data:{
                                    validation: {
                                      error: true,
                                      field: req.body.rule.field,
                                      field_value: "d",
                                      condition: req.body.rule.condition,
                                      condition_value: req.body.rule.condition_value
                                    }
                                }
                            });
                        }
                        
                    }else{// if 'data' property is absent...
                        res.status(400).json({
                            message:"data is required.",
                            status:"error",
                            data:null
                        });
                    }
            
                }else{ // If the 'rule property is not a valid object'
                    res.status(400).json({
                        message:"rule should be an object.",
                        status:"error",
                        data:null
                    });
                }
            }else{ // If it doesn't have 'rule' property

                res.status(400).json({
                    message:"rule is required.",
                    status:"error",
                    data:null
                });
            }
            
        }else{ // If JSON Data is invalid...
            res.status(400).json({
                message:"Invalid JSON payload passed.",
                status:"error",
                data:null
            });
        }
        
    }
});


module.exports = app;