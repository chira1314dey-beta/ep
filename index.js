const express = require('express')
const app = express()
const port = 7000
const con = require('./connection')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine','hbs')
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/a.html')
})
app.post('/', (req, res) => {
   var name = req.body.name;
   var email = req.body.email;
   var mno = req.body.message;

   con.connect(function(error){
     if (error) throw error;

    var sql = "INSERT INTO students ( `name`, `email`, `mno`) VALUES ( '"+name+"', '"+email+"', '"+mno+"')";
    con.query(sql,function(error,result){
    if (error) throw error;
        res.send("Data inserted")
        console.log(result)
    })
   })
  })
  // app.get('/students', (req, res) => {
  //   con.connect(function(error){
  //     if (error ) console.log(error)

  //     var sql ="select * from students";

  //     con.query(sql,function(error, result){
  //       if (error ) console.log(error)

  //       res.render( __dirname+'/student',{students:result})

  //     })
  //   })
  // })
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})