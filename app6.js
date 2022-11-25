const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/all", (req, res) => {
    let sql = "select id, MainWeaponName, Sub.SubWeaponName, sub.inkConsumption, Special.SpecialWeaponName,Point from Main INNER join Sub on Main.sub_id = Sub.sub_id INNER join Special on Main.special_id = Special.special_id;";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('All', {data:data});
        })
    })
})

app.get("/sub2", (req, res) => {
    let sql = "select * from Sub;";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('sub', {data:data});
        })
    })
})

app.get("/special2", (req, res) => {
    let sql = "select * from Special;";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('special', {data:data});
        })
    })
})

app.get("/addmain", (req, res) => {
  let sql ='insert into Main ("MainWeaponName","sub_id","special_id","point") values ("'+req.query.bukiname+'","'+req.query.subID+'","'+req.query.specialID+'","'+req.query.point+'");';
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.redirect('/all');
        })
    })
})

app.get("/addsub", (req, res) => {
  let sql ='insert into Sub ("SubWeaponName","inkConsumption") values ("'+req.query.subname+'","'+req.query.inkConsumption+'");';
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.redirect('/sub2');
        })
    })
})

app.get("/addspecial", (req, res) => {
  let sql ='insert into Special ("SpecialWeaponName") values ("'+req.query.specialname+'");';
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.redirect('/special2');
        })
    })
})

app.get("/main", (req, res) => {
    db.serialize( () => {
        db.all("select * from Sub;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
          res.render('addmain2', {data:data});
        })
    })
})

app.get("/sub", (req, res) => {
    db.serialize( () => {
        db.all("select * from Sub;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
          res.render('addsub2', {data:data});
        })
    })
})

app.get("/special", (req, res) => {
    db.serialize( () => {
        db.all("select * from Special;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
          res.render('addspecial2', {data:data});
        })
    })
})



app.get("/kensaku", (req, res) => {
  let sql ="select id, MainWeaponName, Sub.SubWeaponName, sub.inkConsumption, Special.SpecialWeaponName,Point from Main INNER join Sub on Main.sub_id = Sub.sub_id INNER join Special on Main.special_id = Special.special_id WHERE "++" ";
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.redirect('/All');
        })
    })
})










app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
