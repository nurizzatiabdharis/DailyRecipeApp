const router = require("express").Router();

/** test api */
router.route("/apiTest").get((req, res) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>`
    xml += `<user>
      <customer> 
          <firstName>Henry</firstName>
          <lastName>William</lastName>
      </customer></user>`
    res.header('Content-Type', 'application/xml')
    res.status(200).send(xml)
    //res.json({ message: "Hello from server!", data: "this is data" });
});

/** login */
router.route("/login").post((req, res) => {
    console.log('user try to login...');
    console.log('body is ', req.body);
    // console.log('login is ', req.body.values.login);
    // res.json({ status: "login success" });

    if (req.body.values.login !== '') {
        res.json({ status: "login success" });
    } else {
        res.json({ status: "login error" });
    }
});

module.exports = router;
