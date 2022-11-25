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
  let kuikku = "";
  let supurassyu = "";
  let kyubann = "";
  let tannsann = "";
  let topido = "";
  let torappu = "";
  let bikonn = "";
  let robotto = "";
  let sirudo = "";
  let karingu = "";
  let poizun = "";
  let sensa = "";
  let supurinkura = "";
  let maka = "";
  
  let syotto = "";
  let enazi = "";
  let kani = "";
  let kyiinki = "";
  let baria = "";
  let same = "";
  let syoku = "";
  let torunedo = "";
  let sona = "";
  let ame = "";
  let reza = "";
  let hanko = "";
  let zyetto = "";
  let naisu = "";
  let misairu = "";
  
  let sixteen = "";
  let seventeen = "";
  let eighteen = "";
  let nineteen = "";
  let twenty = "";
  let twentyone = "";
  let twentytwo = "";
  
  if(req.query.kuikku)kuikku = "クイックボム";
  if(req.query.supurassyu)supurassyu = "スプラッシュボム";
  if(req.query.kyubann)kyubann = "キューバンボム";
  if(req.query.tannsann)tannsann = "タンサンボム";
  if(req.query.topido)topido = "トーピード";
  if(req.query.torappu)torappu = "トラップ";
  if(req.query.bikonn)bikonn = "ジャンプビーコン";
  if(req.query.robotto)robotto = "ロボットボム";
  if(req.query.sirudo)sirudo = "スプラッシュシールド";
  if(req.query.karingu)karingu = "カーリングボム";
  if(req.query.poizun)poizun = "ポイズンミスト";
  if(req.query.sensa)sensa = "ポイントセンサー";
  if(req.query.supurinkura)supurinkura = "スプリンクラー";
  if(req.query.maka)maka = "ラインマーカー";

  if(req.query.syotto)syotto = "ウルトラショット";
  if(req.query.enazi)enazi = "エナジースタンド";
  if(req.query.kani)kani = "カニタンク";
  if(req.query.kyiinki)kyiinki = "キューインキ";
  if(req.query.baria)baria = "グレートバリア";
  if(req.query.same)same = "サメライド";
  if(req.query.syoku)syoku = "ショクワンダー";
  if(req.query.torunedo)torunedo = "トリプルトルネード";
  if(req.query.sona)sona = "ホップソナー";
  if(req.query.ame)ame = "アメフラシ";
  if(req.query.reza)reza = "メガホンレーザー";
  if(req.query.hanko)hanko = "ウルトラハンコ";
  if(req.query.zyetto)zyetto = "ジェットパック";
  if(req.query.naisu)naisu = "ナイスダマ";
  if(req.query.misairu)misairu = "マルチミサイル";
  
  if(req.query.sixteen)sixteen = "160";
  if(req.query.seventeen)seventeen = "170";
  if(req.query.eighteen)eighteen = "180";
  if(req.query.nineteen)nineteen = "190";
  if(req.query.twenty)twenty = "200";
  if(req.query.twentyone)twentyone = "210";
  if(req.query.twentytwo)twentytwo = "220";
  
  let sql ="select id, MainWeaponName, Sub.SubWeaponName, sub.inkConsumption, Special.SpecialWeaponName,Point from Main INNER join Sub on Main.sub_id = Sub.sub_id INNER join Special on Main.special_id = Special.special_id WHERE MainWeaponName = "++" or SubWeaponName = "++" or SpecialWeaponName = "++" or Point = "++";
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


app.get("/benri", (req, res) => {
  let sql ="select id, MainWeaponName, Sub.SubWeaponName, sub.inkConsumption, Special.SpecialWeaponName,Point from Main INNER join Sub on Main.sub_id = Sub.sub_id INNER join Special on Main.special_id = Special.special_id WHERE MainWeaponName = "++" or SubWeaponName = "++" or SpecialWeaponName = "++" or Point = "++";
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
