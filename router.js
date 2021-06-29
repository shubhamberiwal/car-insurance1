
const express = require("express");
// Single routing
const router = express.Router();
const connection = require("./connection");


router.get('/', (req, res, next) => {
    // console.log("Router Working");
    res.redirect("/owner");
    // res.send("Landing Page Here.");
    res.end();
});


//owner
router.get('/owner', (req, res, next) => {
    connection.query("Select ownerid as OwnerId, owner_name as Name, ph_no as Phone, location as Location, pin as Pin from owner",(err,rows,fields) => {
        if(!err)
        {
            res.render('owner',{rows : rows, fields: fields});
        }
        else
            console.log(err);
    });
});

router.get('/owner/new', (req, res) => {
    res.render("new_owner");
});

router.post('/owner', (req,res)=>{
    // const obj = JSON.parse(JSON.stringify(req.body));
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
            console.log("finally");
            res.redirect('/owner');
            // res.render('owner',{rows : rows, fields: fields});
        }
        else
        {
            res.send(err);
            // console.log(err.sqlMessage);
        }
        });
});

// Select policy_id as `Policy Id`, policy_type as `Type of Policy` from insurance_policy
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

router.get('/cars/new', (req, res) => {
    res.render("new_cars");
});


// router.get('/', (req,res) => {
//     connection.query("Select * from insurance_policy", (err,rows,fields) => {
//         if(!err)
//         {
//             // console.log("finally");
//             res.render('policies',{rows : rows, fields: fields});
//         }
//         else
//         {
//             res.send(err);
//             console.log(err.sqlMessage);
//         }
//         });
// });















// router.get('/owner1', (req, res, next) => {
//     connection.query("Select * from owner",(err,rows,fields) => {
//         if(!err)
//         {
//             res.render('owner1',{rows : rows, fields: fields});
//             // res.send("j");
//         }
//         else
//             console.log(err);
//     })
// });





module.exports = router;