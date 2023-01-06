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
            res.render('addsub', {data:data});
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
            res.render('addspecial', {data:data});
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
        db.all("select * from Sub left outer join special on Sub.sub_id = special.special_id;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
          res.render('addmain', {data:data});
        })
    })
})

app.get("/sub", (req, res) => {
    db.serialize( () => {
        db.all("select * from Sub;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
          res.render('addsub', {data:data});
        })
    })
})

app.get("/special", (req, res) => {
    db.serialize( () => {
        db.all("select * from Special;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
          res.render('addspecial', {data:data});
        })
    })
})



app.get("/kensaku", (req, res) => {

  let sub = "";
  let special = "";
  let point = "";


  if(req.query.kuikku)sub += ",'クイックボム'";
  if(req.query.supurassyu)sub += ",'スプラッシュボム'";
  if(req.query.kyubann)sub += ",'キューバンボム'";
  if(req.query.tannsann)sub += ",'タンサンボム'";
  if(req.query.topido)sub += ",'トーピード'";
  if(req.query.torappu)sub += ",'トラップ'";
  if(req.query.bikonn)sub += ",'ジャンプビーコン'";
  if(req.query.robotto)sub += ",'ロボットボム'";
  if(req.query.sirudo)sub += ",'スプラッシュシールド'";
  if(req.query.karingu)sub += ",'カーリングボム'";
  if(req.query.poizun)sub += ",'ポイズンミスト'";
  if(req.query.sensa)sub += ",'ポイントセンサー'";
  if(req.query.supurinkura)sub += ",'スプリンクラー'";
  if(req.query.maka)sub += ",'ラインマーカー'";

  if(req.query.syotto)special += ",'ウルトラショット'";
  if(req.query.enazi)special += ",'エナジースタンド'";
  if(req.query.kani)special += ",'カニタンク'";
  if(req.query.kyuinki)special += ",'キューインキ'";
  if(req.query.baria)special += ",'グレートバリア'";
  if(req.query.same)special += ",'サメライド'";
  if(req.query.syoku)special += ",'ショクワンダー'";
  if(req.query.torunedo)special += ",'トリプルトルネード'";
  if(req.query.sona)special += ",'ホップソナー'";
  if(req.query.ame)special += ",'アメフラシ'";
  if(req.query.reza)special += ",'メガホンレーザー'";
  if(req.query.hanko)special += ",'ウルトラハンコ'";
  if(req.query.zyetto)special += ",'ジェットパック'";
  if(req.query.naisu)special += ",'ナイスダマ'";
  if(req.query.misairu)special += ",'マルチミサイル'";
  
  if(req.query.sixteen)point += ",'160'";
  if(req.query.seventeen)point += ",'170'";
  if(req.query.eighteen)point += ",'180'";
  if(req.query.nineteen)point += ",'190'";
  if(req.query.twenty)point += ",'200'";
  if(req.query.twentyone)point += ",'210'";
  if(req.query.twentytwo)point += ",'220'";
  
  let sql = "select id, MainWeaponName, Sub.SubWeaponName, sub.inkConsumption, Special.SpecialWeaponName,Point from Main INNER join Sub on Main.sub_id = Sub.sub_id INNER join Special on Main.special_id = Special.special_id WHERE MainWeaponName = '"+req.query.bukiname+"' or sub.SubWeaponName in (''"+sub+") or Special.SpecialWeaponName in (''"+special+") or Point in (''"+point+");";
  console.log(sql); 
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('All', {data:data});
        })
    })
})


app.get("/benri", (req, res) => {


  let splatoon1sub = "";
  let splatoon2sub = "";
  let splatoon3sub = "";
  let splatoon1special = "";
  let splatoon2special = "";
  let splatoon3special = "";

  if(req.query.splatoon1sub)splatoon1sub = ",'カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク'";
  if(req.query.splatoon2sub)splatoon2sub = ",'カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク'";
  if(req.query.splatoon3sub)splatoon3sub = ",'ラインマーカー'";
  if(req.query.splatoon1special)splatoon1special = ",'カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク'";
  if(req.query.splatoon2special)splatoon2special = ",'カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク'";
  if(req.query.splatoon3special)splatoon3special = ",'カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク','カニタンク'";


  
  let sql ="select id, MainWeaponName, Sub.SubWeaponName, sub.inkConsumption, Special.SpecialWeaponName,Point from Main INNER join Sub on Main.sub_id = Sub.sub_id INNER join Special on Main.special_id = Special.special_id WHERE sub.SubWeaponName in (''"+splatoon1sub+""+splatoon2sub+""+splatoon3sub+") or Special.SpecialWeaponName in (''"+splatoon1special+""+splatoon2special+""+splatoon3special+");";
  console.log(sql);
   db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('All', {data:data});
        })
    })
})


app.get("/deletespecial", (req, res) => {
  let id = "0";
  if(req.query.specialid)id = req.query.specialid;
  let sql ="delete from Special where special_id = "+id+";";
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
          if(error) {
            console.log('Error: ', error );
            return;
          }
          res.redirect('/special2');
        })
    })
})

app.get("/deletesub", (req, res) => {
  let id = "0";
  if(req.query.subid)id = req.query.subid;
  let sql ="delete from Sub where sub_id = "+id+";";
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
          if(error) {
            console.log('Error: ', error );
            return;
          }
          res.redirect('/sub2');
        })
    })
})

app.get("/deletemain", (req, res) => {
  let id = "0";
  if(req.query.mainid)id = req.query.mainid;
  let sql ="delete from Main where id = "+id+";";
  console.log(sql);
   db.serialize( () => {
        db.run(sql, (error, data) => {
          if(error) {
            console.log('Error: ', error );
            return;
          }
          res.redirect('/all');
        })
    })
})


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
