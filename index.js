const http = require("http")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { Router } = require("express")
const app = express()
const router = express.Router()

dotenv.config({ path: "env/.env.local" })

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3001)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))

app.post("/login", (req, res) => {
    // 로그인 처리
    const { id, passwd } = req.body
    console.log(id, passwd)

    res.redirect("/")
})

router.route("/path").post((req, res) => {
    console.log("/path 처리함")
})

app.use("/", router)

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
