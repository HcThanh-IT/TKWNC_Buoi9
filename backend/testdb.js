const db = require("./db.js");
sql="SELECT * FROM students ORDER BY MaSV LIMIT 10,5";
db.query(sql).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})