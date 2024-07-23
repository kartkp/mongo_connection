const express = require('express');
const cors = require('cors');
const { collection } = require('./mongo');
const dotenv = require('dotenv');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();


app.get("/", cors(), (req, res) => {
    res.send("API is running...");
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email });

        if (user && user.password === password) {
            res.json("exist");
        } else if (user) {
            res.json("incorrect_password");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("error");
    }
});


app.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.json("password_mismatch");
    }

    const data = {
        username: username,
        email: email,
        password: password
    };

    try {
        const user = await collection.findOne({ email: email });

        if (user) {
            res.json("exist");
        } else {
            await collection.insertOne(data);
            res.json("notexist");
        }
    } catch (e) {
        res.json("fail");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
