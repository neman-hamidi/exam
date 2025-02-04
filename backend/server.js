const express = require("express");
const mysql = require("mysql2");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3010;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "arghavan",
});
app.use(cors());

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.listen(port, () => {
  console.log("server run at: ", { port });
});
//  Start Fetch Data
app.get("/questions", (req, res) => {
  connection.query("SELECT * FROM question", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get("/admin/questions", (req, res) => {
  connection.query("SELECT * FROM question", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/question/:id", (req, res) => {
  const productId = req.params.id;
  const query = "SELECT * FROM question WHERE id = ?";

  connection.query(query, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send("Product not found");
    }
    return res.json(result[0]);
  });
});

app.delete("/question/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM question WHERE id = ?";

  connection.query(sql, [productId], (err, result) => {
    if (err) {
      return res.status(500).send({ message: "noooo ok" });
    }
    return res.status(200).send({ message: "ok" });
  });
});
app.put("/question/:id", (req, res) => {
  const productId = req.params.id;
  const { question, qu1, qu2, qu3, qu4, correctAnswer } = req.body;
  const sql =
    "UPDATE question SET question = ?, qu1 = ?, qu2 = ?, qu3 = ?, qu4 = ?, correctAnswer = ? WHERE id = ?";
  connection.query(
    sql,
    [question, qu1, qu2, qu3, qu4, correctAnswer, productId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Product updated successfully", result });
    }
  );
});
// Register
app.post("/users", async (req, res) => {
  const { username, password, user, email } = req.body;

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (results.length > 0) {
        return res
          .send({ message: "Username already exists", status: 409 });
      } else {
        const sql =
          "INSERT INTO users (username, password, user, email) VALUES (?, ?, ?, ?)";
        connection.query(
          sql,
          [username, password, user, email],
          (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            const token = jwt.sign({ id: user.id }, "secretkey", {
              expiresIn: "1h",
            });
            res.json({ token });
            res.status(201);
          }
        );
      }
    }
  );
});
// ورود
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username,password],
    async (err, results) => {
      const user = results[0];
      if (results.length === 0) {
        return res.send({status: 401 });
      }
      const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
        return res
          .send({status: 200, token });
    }
  );
});


app.get("/questions/item", (req, res) => {
  res.json(questions);
});


//
app.get("/konkur", (req, res) => {
  connection.query(
    "SELECT * FROM question WHERE subTitle = 'konkur'",
    (err, qresults) => {
      if (err) throw err;
      res.json(qresults);
    }
  );
});
app.get("/zist", (req, res) => {
  connection.query(
    "SELECT * FROM question WHERE subTitle = 'zist'",
    (err, qresults) => {
      if (err) throw err;
      res.json(qresults);
    }
  );
});
app.get("/shimi", (req, res) => {
  connection.query(
    "SELECT * FROM question WHERE subTitle = 'shimi'",
    (err, qresults) => {
      if (err) throw err;
      res.json(qresults);
    }
  );
});

app.post("/result", async (req, res) => {
  const { Name, Course, Score } = req.body;

  const sql = "INSERT INTO result (Name, Course, Score) VALUES (?, ?, ?)";
  connection.query(sql, [Name, Course, Score], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result).status(201);
  });
});
// Send Comments
app.post("/comments", async (req, res) => {
  const { name, userClass, suggest, text } = req.body;
  const sql =
    "INSERT INTO comments (name, userClass, suggest, text) VALUES (?, ?, ?, ?)";
  connection.query(sql, [name, userClass, suggest, text], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result).status(201);
  });
});
// Get Comments for View
app.get("/comments/view", (req, res) => {
  connection.query(
    "SELECT * FROM comments WHERE approved = '1'",
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});
// Get Comments for Admin
app.get("/comments", (req, res) => {
  connection.query("SELECT * FROM comments", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// Delete Comments
app.delete("/delete/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM comments WHERE id = ?";
  connection.query(sql, [productId], (err, result) => {
    if (err) throw err;
    res.json(result).status(201);
  });
});
// Approved
// UPDATE `comments` SET `approved` = '1' WHERE `comments`.`id` = 22
app.put("/approved/:id", async (req, res) => {
  const productId = req.params.id;
  const sql =
    "UPDATE `comments` SET `approved` = '1' WHERE `comments`.`id` = ?";
  connection.query(sql, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result).status(201);
  });
});
app.put("/rejected/:id", async (req, res) => {
  const productId = req.params.id;
  const sql =
    "UPDATE `comments` SET `approved` = '0' WHERE `comments`.`id` = ?";
  connection.query(sql, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result).status(201);
  });
});
// Add Question In Admin 
app.post("/sd", async (req, res) => {
  const { subTitle, Title, SuggestTime, question, qu1, qu2, qu3,qu4,correctAnswer,Description } = req.body;
  const sql =
    "INSERT INTO question ( subTitle,Title,SuggestTime, question, qu1, qu2, qu3,qu4,correctAnswer,Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [subTitle, Title, SuggestTime, question, qu1, qu2, qu3, qu4, correctAnswer,Description], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result).status(201);
  });
});
