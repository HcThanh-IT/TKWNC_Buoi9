
const express = require('express');
const cors = require("cors");
const app = express();
const db = require("./db.js");
let corsOptions = {
    origin:['http://127.0.0.1:5500','http://localhost:5500']
};
app.use(cors(corsOptions));
const port = 3000;

const dssv = require('./DSSV.json');

app.get('/',(req, res)=>{
    res.send('Welecome to EXPRESS backend!!');
});


//function
async function getStudents(page = 1, size = 10) {
    let start = (page - 1) * size;
    sql = `SELECT * FROM students ORDER BY MaSV LIMIT ${start},${size}`;
    let data = [];
    await db.query(sql).then(rows => {
      data = rows;
    });
    sql1 = `SELECT COUNT(*) as 'TotalRecord' FROM students`;
    let totRecord = 0;
    await db.query(sql1).then(rows => {
      totRecord = rows[0].TotalRecord;
    });
    return {
      data: data,
      TotalRecord: totRecord
    };
  }


//GET
app.get("/students",(req, res)=>{
    res.send(Object.values(dssv));
});
app.get("/students/:MaSV",(req, res)=>{
    console.log(req.params.mssv);
    let i=0;
    for(i; i<dssv.length;i++){
        if(dssv[i].MaSV==req.params.MaSV) break;
    }
    if(i<dssv.length) res.send(dssv[i]);
        else res.send("Not FOUND !!!");
}); 

  app.get("/students_mysql", async (req, res) => {
    page = req.query.page;
    size = req.query.size;
    if (page != undefined && size != undefined) {
      const ret = await getStudents(page, size);    
      res.send(ret);
    } else {
      res.send("Not FOUND !!!");
    }
  });

//POST
app.post("/students",(req, res)=>{
    res.send("POST student!");
});
app.put("/students",(req, res)=>{
    res.send("PUT student!");
});
app.delete("/students",(req, res)=>{
    res.send("DELETE student!");
});
 app.listen(port,()=> console.log(`App is running at port ${port}`));