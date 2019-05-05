const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const app = express();

const users = require("./routes/api/users.js");
const profiles = require("./routes/api/profiles.js");

//DB config
const db = require('./config/keys.js').mongoURI;

//使用中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

//passport初始化
app.use(passport.initialize());
require('./config/passport.js')(passport)

//Connect to mongodb
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(res=>{
        console.log(res);
        console.log('success!')
    })
    .catch(err=>console.log(err))

app.use("/api/users",users);
app.use("/api/profiles", profiles);

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})