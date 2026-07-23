const mysql=require("mysql2");
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Homa@123",
    database:"Pocketwise"

});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL!");
});

module.exports=connection;