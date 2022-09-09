const express = require('express')
const app = express()
const port = 3000

// To read req.body in other routes, this must be first set
app.use(express.json())

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);


app.get('/', (req, res) => {
    res.send('Hello World from server Express!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// app.post("/login", (req, res) => {
//     // const { username } = req.body.username
//     // console.log("User connect :", username)
//     console.log('user try to login...');
//     console.log('body is ', req.body);
//     res.json({ status: "login success" });
// });