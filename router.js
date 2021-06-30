
const express = require("express");
// Single routing
const router = express.Router();
const connection = require("./connection");


router.get('/', (req, res, next) => {
    res.redirect("/owner");
});



// owner routing begins
//owner table display
router.get('/owner', (req, res, next) => {
    connection.query("Select ownerid as OwnerId, owner_name as Name, ph_no as Phone, location as Location, pin as Pin from owner",(err,rows,fields) => {
        if(!err)
        {
            res.render('owner',{rows : rows, fields: fields});
        }
        else
        {
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql); 
            res.send(err);
        }
    });
});
// add new owner form
router.get('/owner/new', (req, res) => {
    res.render("new_owner");
});
// add new owner to the database
router.post('/owner', (req,res)=>{
    req.body = JSON.parse(JSON.stringify(req.body));

    let id = req.body.id;
    let name = req.body.name;
    let phno = req.body.phno;
    let location = req.body.location;
    let pin = req.body.pin;
    let sql = `INSERT INTO owner (ownerid, owner_name, ph_no, location, pin) VALUES ( '${id}', '${name}', '${phno}', '${location}', '${pin}')`;
    connection.query( sql ,(err,rows,fields) => {
        if(!err)
        {
            res.redirect('/owner');
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql); 
        }
        });
});

// edit owner route and form display
router.get("/owner/:id/edit", (req,res) => {
    let oid = req.params.id;
    // console.log(oid);
    connection.query ("select * from owner where ownerid ="+oid, (err,rows,fields) => {
        if(!err)
        {
            rows = JSON.parse(JSON.stringify(rows));
            // console.log(rows[0]);
            res.render('edit_owner',{rows : rows});
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql); 
        }
        });
});

// actual updation to database, update route
router.post("/owner/:uid", (req,res) => {
    let previd = req.params.uid;
    req.body = JSON.parse(JSON.stringify(req.body));
    // console.log(req.body);
    let id = req.body.id;
    let name = req.body.name;
    let phno = req.body.phno;
    let location = req.body.location;
    let pin = req.body.pin;

    let sql = `UPDATE owner SET ownerid = '${id}', owner_name = '${name}', ph_no = '${phno}', location = '${location}', pin = '${pin}' WHERE (ownerid = '${previd}')`;
    // console.log(sql);
    connection.query( sql ,(err,rows,fields) => {
        if(!err)
        {
            res.redirect('/owner');
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql); 
        }
        });
});

// Delete Owner route
router.post( '/owner/:id/delete', (req,res) => {
    let id = req.params.id;
    let sql = `Delete from owner where ownerid=${id}`;
    // console.log(sql);
    connection.query(sql, (err, rows, fields)=>{
        if(!err)
        {
            res.redirect('/owner');
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql); 
        }
    });
});





// different insurance policies
router.get('/policies', (req,res,next) => {
    connection.query("Select * from `insurance_policy`", (err,rows,fields) => {
        if(!err)
        {
            res.render('policies' ,{rows : rows});
        }
        else
        {
            console.log(err.sqlMessage);
            res.send(err);
        }
        });
});






// car entity routing
// show car details, car route
router.get('/cars', (req, res, next) => {
    connection.query("Select * from car",(err,rows,fields) => {
        if(!err)
        {
            res.render('cars', {rows: rows});
        }
        else
            console.log(err);
    })
});

// render add new car form, create route
router.get('/cars/new', (req, res) => {
    res.render("new_cars");
});

// add new car details to database
router.post('/cars', (req, res) => {
    
    req.body = JSON.parse(JSON.stringify(req.body));
    let cid = req.body.cid;
    let model = req.body.model;
    let year = req.body.year;
    let color = req.body.color;
    let price = req.body.price;
    let oid = req.body.oid;
    let pid = req.body.pid;

    let sql = `INSERT INTO car (carid, model, year, color, price, ownerid, policy_id) VALUES ( '${cid}', '${model}', '${year}', '${color}', '${price}', '${oid}', '${pid}')`;
    connection.query( sql ,(err,rows,fields) => {
        if(!err)
        {
            res.redirect('/cars');
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql);
        }
        });
});

// rendering edit car form
router.get('/cars/:id/edit', (req, res) => {
    let cid = req.params.id;
    connection.query ("select * from car where carid ="+cid, (err,rows,fields) => {
        if(!err)
        {
            rows = JSON.parse(JSON.stringify(rows));
            res.render('edit_car',{rows : rows});
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql);
        }
        });
});

// updating car details
router.post('/cars/:id', (req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    let carid = req.params.id;
    let cid = req.body.cid;
    let model = req.body.model;
    let year = req.body.year;
    let color = req.body.color;
    let price = req.body.price;
    let oid = req.body.oid;
    let pid = req.body.pid;
    let sql =  `UPDATE car SET carid = '${cid}' , model ='${model}' , year ='${year}' , color ='${color}' , price ='${price}' , ownerid ='${oid}' , policy_id ='${pid}'  WHERE (carid = '${carid}')`;

    // console.log(sql);
    connection.query(sql, (err,rows,fields) => {
        if(!err)
        {
            res.redirect('/cars');
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql);
        }
    });
});

// Delete post for car details
router.post( "/cars/:id/delete", (req,res) => {
    let sql = `Delete from car where carid = ${req.params.id}`;
    connection.query( sql, (err, rows, fields) => {
        if(!err)
        {
            res.redirect("/cars");
        }
        else
        {
            res.send(err);
            // res.send("ERROR MESSAGE IS " +err.sqlMessage + " . THE INCORRECT QUERY WAS: " + err.sql);
        }
    })
});



module.exports = router;