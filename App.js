const express  = require('express');
const {sequelize, User } = require('./Database');

sequelize.sync().then(()=>{console.log('database is ready');})


const app = express()
const PORT = 5001

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//GET REST API
 app.get('/swary', async (req,res)=>{
   try {

    const users = await User.findAll();

    if (users.length)
      res.status(200).json(users);
    res.status(200).send({'message': 'Users unavailable!!!'});

   } 
   catch (error)
   {
     res.send(error);
   }
 })

 //GET specific user REST API
 app.get('/swary/:id', async (req,res)=>{

  try {
    if (isNaN(req.params.id)) {
      res.status(400).send({"Message" : "Invalid ID"});
    }
    const user = await User.findOne({where:{id:req.params.id}});
    if (user) {
      res.status(200).json(user);
    }
    res.status(404).send({"Message" : `User of id ${req.params.id} is not avaible`});
  } catch (error) {
    res.send(error);
  }
})

//POST REST API (this uses promises just for fun it can use async await also)
app.post('/swary', (req,res)=> {
    if (req.body !== null) {
      User.create(req.body).then(()=>{
        res.status(201).send("User is created!!!!")
      }).catch (err => res.sendStatus(404).send("Sorry couldnt create new user"+ err))
    }
})

//UPDATE (PUT) REST API
app.put('/swary/:id', async (req, res)=>{
  //SOME KINDA UNHANDLED ERROR DONT FORGET TO ASK BRIAN
  try {
    if (req.body.Username.length === 0)
      res.status(400).send({"Message" : "Username is required"});
    if (isNaN(req.params.id))
      res.status(400).send({"Message" : "Invalid ID"});
    const user = await User.findOne({where:{id:req.params.id}});

    if (user){
      user.Username = req.body.Username;
      await user.save();
      res.status(200).send("Username Updated!!");
    }
    res.status(200).send(`User of id ${req.params.id} is not avaible`);
  } catch (error) {
    res.status(500).send(error);
  }
})

//DELETE A USER REST API
app.delete('/swary/:id', async (req, res)=>{
  try {
    if (isNaN(req.params.id)) {
      res.status(400).send({"Message" : "Invalid ID"});
    }
    if (req.params.id){
      await User.destroy({where:{id:req.params.id}});
      res.send("user deleted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
    
})

app.listen(PORT, ()=> console.log(`server listening on port ${PORT}`))










/*
var connection = mysql.createConnection({
  host     : 'sql4.freesqldatabase.com',
  user     : 'sql4411727',
  password : 'E2dn9BnnpM',
  database : 'sql4411727',
  port : 3306
});

connection.connect((err) =>{
  if (err) {
    console.log('error connecting: ' + err.message);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/
