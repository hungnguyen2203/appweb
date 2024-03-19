const express = require("express");
const app = express();
const user = require("./mongo");
const session = require('express-session');
const port = 3000;

// load dotenv to read environment variables
require("dotenv").config();

// template view engine
app.set("view engine", "hbs");

// Serve Static Files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: 'my secret key', resave: false, saveUninitialized: true }));

//routes
const dashboardRouter = require("./routes/dashboard");
let naming;

app.get("/mqttConnDetails", (req, res) => {
  res.send(
    JSON.stringify({
      mqttServer: process.env.MQTT_BROKER,
      mqttTopic1_1: process.env.MQTT_TOPIC1_1,
      mqttTopic1_2: process.env.MQTT_TOPIC1_2,
      mqttTopic2_1: process.env.MQTT_TOPIC2_1,
      mqttTopic2_2: process.env.MQTT_TOPIC2_2,
      mqttTopic1a: process.env.MQTT_TOPIC1a,
      mqttTopic2a: process.env.MQTT_TOPIC2a,
    })
  );
});

app.get("/", dashboardRouter);
// app.get("/user", dashboardRouter);
// app.get("/dashboard1", dashboardRouter);
// app.get("/home", dashboardRouter);

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/dashboard1', async (req, res) => {
  const naming = req.session.naming
  const check = await user.findOne({ name: naming})
  if (check.admin) {
    res.status(201).render("dashboard1", {admin: true, name: naming})      
  }
  else res.status(201).render("dashboard1", {admin: false, name: naming})
})

app.get('/home', async (req, res) => {
  const naming = req.session.naming
  const check = await user.findOne({ name: naming})
  if (check.admin) {
    res.status(201).render("home", {admin: true, name: naming})      
  }
  else res.status(201).render("home", {admin: false, name: naming})
})

app.get('/user', async (req, res) => {
  const naming = req.session.naming
  const check = await user.findOne({ name: naming})
  const users = await user.find({topic: 'iot'})
  if (check.admin) {
    res.status(201).render("user", {admin: true, name: naming, users: users})      
  }
  else res.status(201).render("user", {admin: false, name: naming, users: users})
})

app.post('/signup', async (req, res) => {
    
  const data = new user({
      name: req.body.name,
      password: req.body.password,
      gmail: req.body.gmail
  })
  await data.save()

  // const data = {
  //     name: req.body.name,
  //     password: req.body.password
  // }

  const checking = await user.findOne({ name: req.body.name })

 try{
  if (checking.name === req.body.name && checking.password===req.body.password) {
    res.status(201).render("login", {
      naming: req.body.name
    })
  }
  else{
      await user.insertMany([data])
  }
 }
 catch{
  res.send("wrong inputs")
 }
})

app.post('/', async (req, res) => {
  try {
      const check = await user.findOne({ name: req.body.name })
      if (check.password === req.body.password) {
        req.session.naming = req.body.name;
        if (check.admin) res.status(201).render("home", {admin: true, name: req.body.name})
        else res.status(201).render("home", {admin: false, name: req.body.name})      
      }
      else {
        // res.send("incorrect password");
        res.status(201).render("login_fail", {
          naming: req.body.name
        })
      }
  } 
  catch (e) {
    res.status(201).render("login_fail", {
      naming: req.body.name
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
