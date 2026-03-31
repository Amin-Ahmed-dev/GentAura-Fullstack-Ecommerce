const express = require("express")
const mysql = require("mysql2/promise")
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express()
app.use(cors());
app.use(express.json())

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const conn = mysql.createPool({
    host,
    user,
    password,
    database
})


app.get("/", (req, res) => {
    res.send("Home page")
})


// Products API

// Get All Products

app.get("/api/products", async (req, res) => {
    try {
        const sql = "SELECT * FROM products"

        const [results] = await conn.query(sql)

        res.status(200).json(results)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


// Get single product

app.get("/api/products/:id", async (req, res) => {
    try {
        const id = req.params.id
        const sql = "SELECT * FROM products WHERE id = ?"

        const [results] = await conn.query(sql, [id])

        if (results.length === 0) return res.status(404).json({message: `Product with id ${id} is not found!`})

        res.status(200).json(results[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


// Authentication API

// Register

app.post("/api/auth/register", async (req, res) => {
    const {name, email, password} = req.body

    try {
        const checkSql = "SELECT * FROM users WHERE email = ?"
        
        const [existingUser] = await conn.query(checkSql, [email])

        if (existingUser.length > 0) return res.status(400).json({message: "Email already in use"})
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
        
        await conn.query(insertSql, [name, email, hashedPassword])
        res.status(201).json({message: "User registered successfully!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


// Login

app.post("/api/auth/login", async (req, res) => {
    const {email, password} = req.body

    try {
        const sql = "SELECT * FROM users WHERE email = ?"
        const [results] = await conn.query(sql, [email])
        
        if (results.length === 0) return res.status(404).json({message: "User not found!"})

        const user = results[0]
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(400).json({message: "Invalid email or password"})

        const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


// Orders API

app.post("/api/orders", async (req, res) => {
    const {user_id, customer_name, customer_email, total_amount, cart_items} = req.body

    try {
        const cartItemJson = JSON.stringify(cart_items)
        const sql = "INSERT INTO orders (user_id, customer_name, customer_email, total_amount, cart_items) VALUES (?, ?, ?, ?, ?)"
        
        const [results] = await conn.query(sql, [
            user_id,
            customer_name,
            customer_email,
            total_amount,
            cartItemJson
        ])

        res.status(201).json({message: "Order placed successfully!", orderId: results.insertId})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Gentaura server is running on http://localhost:${port}`)
})