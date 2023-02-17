const http = require("http")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { Router } = require("express")
const app = express()

const router = Router()

dotenv.config({ path: "env/.env.local" })

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3001)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))

// 라우터 객체에 넣어줌
router.route("/login").post((req, res) => {
    // 로그인 처리
    const { id, passwd } = req.body
    console.log(id, passwd)

    res.redirect("/")
})

// router로 REST 방식의 요청 처리 테스트
// get(), put(), post(), delete()
router.route("/board").get((req, res) => {
    // 로그인 처리

    console.log("GET")

    res.redirect("/")
})
router.route("/board").post((req, res) => {
    console.log("POST")

    res.redirect("/")
})
router.route("/board").put((req, res) => {
    console.log("PUT")

    res.send({ data: req.body })
})
router.route("/board").delete((req, res) => {
    console.log("DELETE")

    res.send({ data: req.body })
})

app.use("/", router)

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
