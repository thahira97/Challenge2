const db = require("./connection.js");
const bcrypt = require("bcrypt");


const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  db.query(`
    SELECT * FROM users
    WHERE email = $1 OR username = $2;
    `, [email, username], (err, data) => {
    if (err) return res.json(err);
    if (!data.rows[0]) return res.status(404).json("User not found");
    
    
    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json(other);
  });
};