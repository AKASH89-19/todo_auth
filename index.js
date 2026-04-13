const express=require("express")
const jwt = require("jsonwebtoken");
const { middlewareaut } = require("./middlewareaut");
const app = express()
const notes=[];
const user=[];
app.use(express.json());
app.get('/', function(req, res) {
     res.sendFile("/Users/akash/Documents/notesapp/index.html")
})
app.post("/signup",function(req,res){
const username = req.body.username;
const password = req.body.password;
const userexist=user.find(user => user.username === username);
if(userexist)
{
    return res.status(403).json(
    { 
        message:"user alread exists"
    })
}
  user.push({
        username: username, 
        password: password
    })
res.status(200).json({
    message:"signed up"
})
})
app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const userexist=user.find(user => user.username === username &&  user.password === password);
    if(!userexist)
    {
     res.status(403).json(
     {
        message:"incorrect credentials"
     })
     return;
    }
    //jwt tokens
    const token = jwt.sign({
    username: username
},"akash123");
res.json({
    token: token
})
})
app.post("/notes", middlewareaut,function(req,res)
{
   const note=req.body.note;
    if (!note || note.trim() === "") {
        return res.status(400).json({
            message: "Note cannot be empty"
        })
    }
   notes.push({
    note: note,
    username: req.username 
   })
   res.json({
    message :"Done!"
   })
})
app.get("/notes", middlewareaut,function(req,res)
{
     const username = req.username;
    const usernotes = notes.filter(note => note.username === username);
    res.json({
        notes:usernotes
    })
})
app.get('/signup', function(req, res) {
     res.sendFile("/Users/akash/Documents/notesapp/signup.html")
})
app.get('/signin', function(req, res) {
     res.sendFile("/Users/akash/Documents/notesapp/signin.html")
})
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
