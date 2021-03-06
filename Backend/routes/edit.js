const express = require("express");
const router = express.Router();
const request = require("request");
require("dotenv").config();

//confirm user email
router.use(require("../middleware/auth"));

router.post("/", function (req, res) {
  let url = process.env.URL;
  url = `${url}?route=edit`;
  const tempEdit = req.body.edits;
  const api = process.env.API_KEY;
  const data = { edits: tempEdit, email: req.user.email, API: api };
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
