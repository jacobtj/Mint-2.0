//const fs = require("fs");
//const { parse } = require("csv-parse");
const Database = require('better-sqlite3');

const db = new Database('./finance.db', { verbose: console.log });

//Create database table
db.prepare(`
	CREATE TABLE IF NOT EXISTS transactions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		description TEXT NOT NULL, 
		category TEXT NOT NULL, 
		amount REAL NOT NULL,
		date TEXT NOT NULL
	)
  `).run();

module.exports = db;







//Delete from the database
//const query1 = "DELETE FROM transactions where source = 'Discover' or source = 'Chase'"
//db.exec(query1);

//Insert into the database
//const insertData = db.prepare("INSERT INTO transactions (date, description, category, amount, source) VALUES (?, ?, ?, ?, ?)");
//fs.createReadStream("./Discover-Statement.csv")
// .pipe(parse({ delimiter: ",", from_line: 2 }))
// .on("data", (row) => {
//   insertData.run(row[0], row[2], row[4], row[3], "Discover");
// }); 






