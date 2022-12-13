const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport'); 
const session = require('express-session');
const path = require ("path") ;
const cors = require("cors");

const app = express();


//set static folder

app.use(express.static(path.join(__dirname , "Notes-master")));
app.use(cors());
//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Server connected to mongodb!"))
.catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runing on port ${port}`))