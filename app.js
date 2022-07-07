let mysql = require("mysql");
let express = require("express");
let cors = require("cors");
let bodyparser = require("body-parser");
let app = express();
// app.use(cors());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.listen(4001, (err) => {
  // if (err) console.log("Error in server setup");
  console.log("Server listening to 4001");
});

app.get("/", (req, res) => {
  res.end("hi there");
});

let connectMysql = mysql.createConnection({
  user: "db2",
  password: "2222",
  host: "localhost",
  database: "mynewdb",
});

connectMysql.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

app.get("/install", (req, res) => {
  let message = "you created tables succesfully";
  let createproducts = `CREATE TABLE if  not exists products(
        product_id int auto_increment,
      product_url varchar(255) not null,
      product_name varchar(255) not null,
      PRIMARY KEY (product_id)
    )`;
  let createProductDescription = `CREATE TABLE if not exists productDescription(
      description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
)`;
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  let createUser = `CREATE TABLE if not exists user(
    user_id int auto_increment,  
    user_name varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
  )`;

  let createOrders = `CREATE TABLE if not exists order(
    order_id int auto_increment,  
     product_id int(11) not null,
      user_id int(11) not null,
    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
  )`;
  connectMysql.query(createproducts, (err, results, fields) => {
    if (err) console.log(err);
  });

  connectMysql.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(err);
  });
  connectMysql.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });
  connectMysql.query(createUser, (err, results, fields) => {
    if (err) console.log(err);
  });

  connectMysql.query(createOrders, (err, results, fields) => {
    if (err) console.log(err);
  });

  res.end(message);
  console.log("tables craeted");
});

app.post("/add-products", (req, res) => {
  console.log(req.body);
  let ID = req.body.product_id;
  let url = req.body.product_url;
  let phone = req.body.product_name;

  let addedProductId = 0;

  let addToProducts = `INSERT INTO Products (  product_url, product_name) VALUES ( '${url}', '${phone}' )`;
  connectMysql.query(addToProducts, function (err, result) {
    if (err) throw err;
    console.log(" record inserted to product");
  });
  res.end("product added")
});
