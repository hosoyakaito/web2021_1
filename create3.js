const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let schema = `
create table Special(
  special_id integer primary key,
  SpecialWeaponName text
);
`

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});
