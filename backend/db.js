const mysql = require("mysql");
const config = {
    host:"localhost",
    user:"root",
    password:"Th@nhho@ng1705",
    database:"tkwnc",
    port:3306
};
const conn = mysql.createConnection(config);
conn.connect();
function query(sql){
    return new Promise(function(resolve, reject){
        conn.query(sql, function(err, rows, fields){
            if(err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports={
    query,
}