const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select id, MainWeaponName, Sub.SubWeaponName as a, sub.inkConsumption as b, Special.SpecialWeaponName as c, Special.Point as d from Main 
join Sub on Main.sub_id = Sub.sub_id
join Special on Main.special_id = Special.special_id;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.MainWeaponName + ':' + data.a + ':' + data.b +`:`+ data.c + ':'  + data.d );
		}
	});
});