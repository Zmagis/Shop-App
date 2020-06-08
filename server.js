const express = require("express");
const cors = require("cors");
//secrect stripe api key
const stripe = require("stripe")("sk_test_hepYyhkn8dUdZasqrLWjlMfW00RgPIVInX");
const { v4: uuidV4 } = require('uuid');
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});


const app = express();
var bodyParser = require("body-parser");
//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));

// CORS niddleware, enable CORS on the server
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

// Create connection to database
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  // database: "sys", // If database not exist, for the first time running npm start, comment this line and uncomment later.
  // insecureAuth: true,
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
// query to check if database is exist, if not create one named 'sys'
db.query("CREATE DATABASE IF NOT EXISTS sys", function (err) {
  if (err) throw err;
  // query to check for tables and create them if not exist
  db.query("USE sys", function (err) {
    if (err) throw err;
    db.query(
      "CREATE TABLE IF NOT EXISTS users(" +
        "id INT NOT NULL AUTO_INCREMENT," +
        "PRIMARY KEY(id)," +
        "username VARCHAR(30)," +
        "userpass VARCHAR(500)" +
        ")",
      function (err) {
        if (err) throw err;
      }
    );
    db.query(
      "CREATE TABLE IF NOT EXISTS products(" +
        "idProducts INT NOT NULL AUTO_INCREMENT," +
        "PRIMARY KEY(idProducts)," +
        "Name VARCHAR(100)," +
        "Price DECIMAL(10,2)," +
        "Description TEXT(10000)," +
        "Keywords TEXT(500)," +
        "image VARCHAR(250)," +
        "user TEXT(500)," +
        "date TEXT(500)," +
        "views INT DEFAULT 0" +
        ")",
      function (err) {
        if (err) throw err;
      }
    );
  });
});
// });
// route for showing products in client index page
app.get("/api/product", (req, res) => {
  //const product  = [
  //{ id: 1, name: 'Tv', price: 10 },
  //{ id: 2, name: 'PC', price: 11 },
  // { id: 3, name: 'batas', price: 12 },
  // ];
  let sql = "SELECT * FROM products"; // Selecting products from already created table on mySQL workbench
  let query = db.query(sql, (err, product) => {
    if (err) throw err;
    console.log(product);
    res.json(product);
  });
  //res.json(product);
});

// get route from client submited data to register form
app.post("/create", (req, res) => {
  const userInput = {
    username: req.body.username,
    userpass: req.body.password,
  };
  console.log(userInput);
  db.query(
    "SELECT username FROM users WHERE username = ?",
    [userInput.username],
    async function (error, results) {
      if (error) {
        res.status(400).json({ result: "error" });
      } else {
        if (results.length > 0) {
          res.status(204).json({ result: "user name exits" });
        } else {
          bcrypt.hash(userInput.userpass, 10, function (err, hash) {
            if (err) console.log(err);
            userInput.userpass = hash;
            let sql = "INSERT INTO users SET ?";
            let query = db.query(sql, userInput, (err, result) => {
              if (err) throw err;
              console.log(result);
              res.status(200).json({ result: "user created" });
            });
          });
        }
      }
    }
  );
});

// get route from client submited data to login form
app.post("/login", (req, res) => {
  let username = req.body.username;
  let userpass = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async function (error, results) {
      if (error) {
        res.status(400).json({ result: "error" });
      } else {
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            userpass,
            results[0].userpass
          );
          console.log(comparision);
          if (comparision) {
            console.log("connected");
            res.status(200).json({ result: "logged in" });
          } else {
            console.log("wrong username and/or password");
            res
              .status(204)
              .json({ result: "username and password does not match" });
          }
        } else {
          console.log("username does not exits");
          res.status(206).json({ result: "username does not exits" });
        }
      }
    }
  );
});
//route for add product
app.post("/addproduct", upload.single("image"), (req, res, next) => {
  console.log("req.file: " + req.file);
  let productInput = {
    Name: req.body.title,
    Price: req.body.price,
    Description: req.body.description,
    Keywords: req.body.keywords,
    image: req.file.path,
    user: req.body.username,
    date: req.body.date,
  };
  console.log(productInput);
  db.query(
    "SELECT Name FROM products WHERE Name = ?",
    [productInput.Name],
    async function (error, results) {
      if (error) {
        res.status(400).json({ result: "error" });
      } else {
        if (results.length > 0) {
          res.status(204).json({ result: "Product already exits" });
        } else {
          if (results.length > 0) {
            res.status(204).json({ result: "Product already exits" });
          } else {
            console.log(productInput);
            let sql = "INSERT INTO products SET ?";
            let query = db.query(sql, productInput, (err, result) => {
              if (err) throw err;
              console.log(result);
              res.status(200).json({ result: "product added" });
            });
          }
        }
      }
    }
  );
});
// route for deleting product
app.delete("/deleteproduct/:id", (req, res) => {
  console.log(req.params.id);
  let id = {
    id: req.params.id
  };
  console.log(id);         
  let sql =`DELETE FROM products WHERE idProducts = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.status(200).json({ result: "product deleted" });
        });
});



//rout for update product 
app.post("/editproduct", upload.single("image"), (req, res, next) => {
  //console.log("req.file: " + req.file);
  if (req.body.image){
    var updateInput = {
      Name: req.body.title,
      Price: req.body.price,
      Description: req.body.description,
      Keywords: req.body.keywords,
      image: req.body.image,
      user: req.body.username,
      date: req.body.date,
      idProducts: req.body.id
    };
  } else {
    var updateInput = {
    Name: req.body.title,
    Price: req.body.price,
    Description: req.body.description,
    Keywords: req.body.keywords,
    image: req.file.path,
    user: req.body.username,
    date: req.body.date,
    idProducts: req.body.id
  };
};
  db.query(
    `SELECT idProducts FROM products WHERE idProducts = ${updateInput.idProducts}`,
    async function (error, results) {
      if (error) {
        res.status(400).json({ result: "error" });
      } else if (results.length == 0) {
          res.status(204).json({ result: "Product not exits" });
        } else {
            console.log(updateInput);
            let sql = `UPDATE products SET ? WHERE idProducts=${updateInput.idProducts}`;
            let query = db.query(sql, updateInput, (err, result) => {
              if (err) throw err;
              console.log(result);
              res.status(200).json({ result: "product updated" });
            });
          }
        }
  );
});


//count for views
app.post("/view", (req, res)=>{
  let data = req.body
  let sql = `UPDATE products SET views=views+1 WHERE idProducts=${data[0].idProducts}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    //res.status(200).json({ result: "+++" });
  });
})



//route for stripe payment
app.post("/payment", (req, res) =>{
  const {ids, token, total} = req.body;
  console.log("price", total);
  console.log("PRODUCT id's", ids);
  console.log("token", token.card);
  const idempontencyKey = uuidV4

  return stripe.customers.create({
    email:token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: total * 100,
      currency: 'eur',
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased products ids:${ids}`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country,
          line1: token.card.address_line1
        }
      }
    })
  })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err) )

})


//listen
const port = 9000;

app.listen(port, () => console.log(`server started on port ${port}`));
