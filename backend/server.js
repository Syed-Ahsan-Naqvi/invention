const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
// console.warn("./node_modules")
const app = express()
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const con = mysql.createConnection(
    {
        user: "root", host: "localhost", password: "", database: "invention"
    }
)
const dotenv = require("dotenv")
dotenv.config()
// console.warn(process.env.API_PORT)

app.use(cors(corsOptions))
app.use(express.json())

app.post("/register", (req, res) => {

    const name = req.body.name
    const course = req.body.course
    const gender = req.body.gender
    const dob = req.body.dob
    const cell = req.body.cell
    const email = req.body.email

    try {
        con.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                res.send({ message: "error" })
            } else {
                if (result.length > 0) {
                    res.status(400).send({ message: "Already have an account" })
                } else {
                    con.query("INSERT INTO users (name, course, gender, dob, cell, email) VALUES(?, ?, ?, ?, ?, ?)", [name, course, gender, dob, cell, email], (err, result) => {
                        if (result) {
                            res.send({ message: "success" })
                        } else {
                            res.status(400).send({ message: err })
                        }
                    })
                }
            }
        })

    } catch (error) {
        console.log('ERROR >>>>>>>>', error)
    }
})

app.listen(process.env.API_PORT, () => {
    console.warn("Running Server on port 3001")
})