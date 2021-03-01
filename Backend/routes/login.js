const express = require("express");
const router = express.Router();
const request = require("request");
require("dotenv").config();

router.post("/", function (req, res) {
  let url = process.env.URL;
  url = `${url}?route=login`;
  const data = { watch: req.body.pass };
  request(
    {
      method: "POST",
      url: url,
      body: data,
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
