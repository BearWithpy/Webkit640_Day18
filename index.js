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
router.route("/board/:user/:job").post((req, res) => {
    console.log("POST - /board/:user/:job")
    const { user, job } = req.params
    console.log(user, job)

    res.send({ data: req.params })
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

// error 처리 - 라우터 미들웨어 아래에 위치해야 함
app.all("*", (req, res) => {
    // res.status(400).end("404 NOT FOUND")
    res.redirect("./404.html")
    // res.status(404).redirect("./404.html")
})

// express-error-handler 사용

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
