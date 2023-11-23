const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fetch = require("cross-fetch");
const db = require("../backend/db/connection");
const bcrypt = require("bcrypt");
const passport = require("./auth")
const session = require('express-session');

////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////

const app = express();
const PORT = 8000;

////////////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////////////

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Use express-session middleware
app.use(session({
  secret: "chocolatecoffee", // Change this to a secure random string
  resave: false,
  saveUninitialized: false,
}));

// Use Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ... Other middleware and routes ..
////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/signup", (req, res) => {
  res.send("BBB");
});


app.post("/signup", (req, res) => {
  const {
    firstname,
    lastname,
    password,
    username,
    email,
    cpass,
    usertype,
    language,
  } = req.body;

  db.query(
    `
    SELECT * FROM users
    WHERE email = $1;
    `,
    [email],
    (err, data) => {
      if (err) return res.json(err);
      if (data.rows[0]) return res.status(409).json("User already exists");

      db.query(
        `
        INSERT INTO users (firstname, lastname, password, username, email, cpass)
        VALUES ($1, $2, $3, $4, $5, $6 );
        `,
        [firstname, lastname, password, username, email, cpass],
        (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          // Set the cookie here if needed
          res.cookie("firstname", firstname);

          // Send the JSON response
          console.log(req.body);
          res.status(200).json({ message: "Registration successful" });
        }
      );
    }
  );
});

app.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    
    const result = await db.query(
      `
        SELECT * FROM users
        WHERE email = $1 OR username = $1;
      `,
      [emailOrUsername]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("User not found");
    }
    if (result.rows[0].cpass !== password){
      return res.status(404).json("Wrong Password");
    }
    const user = result.rows[0];
    res.status(200).json({ message: "You can go in"});
    
  } 
  catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure"
  })
})

app.get("/google/callback", 
passport.authenticate("google", {
  successRedirect: "http://localhost:3000/login",
  failureRedirect: "/login/failed",
}))

app.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile","email"]}))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
