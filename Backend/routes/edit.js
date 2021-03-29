const express = require("express");
const router = express.Router();
const request = require("request");
require("dotenv").config();

router.post("/", function (req, res) {
  let url = process.env.URL;
  url = `${url}?route=edit`;
  //const data = { edit: req.body.pass };
  console.log(req.body);
  request(
    {
      method: "POST",
      url: url,
      body: req.body,
      json: true,
      followAllRedirects: true,
    },
    (err, respond, body) => {
      if (err) {
        console.error(err);
        return res.sendStatus(400);
      }
      return res.json(body);
    }
  );
});

module.exports = router;
