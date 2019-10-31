require("dotenv").config();
const port = process.env.PORT || 3001;
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});

app.get("/", (req, res, next) => {
  const { q } = req.query;

  axios
    .get(
      `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=simpsons%20${q}`
    )
    .then(resp => {
      if (resp.data.data.length === 0) return res.send("");
      return res.send({
        response_type: "in_channel",
        text: resp.data.data.url
      });
    })
    .catch(() => res.status(404).send());
});

app.post("/post", function(request, response) {
  response.send(request.body);
});
