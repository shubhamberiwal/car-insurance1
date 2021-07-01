


// FOR REFERENCE, COMPLETE CRUD ROUTING FOR A SINGLE ENTITY
// HERE EXAMPLE IS TAKEN FOR CAR ROUTING



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
