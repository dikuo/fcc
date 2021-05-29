require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
// Basic Configuration
const port = process.env.PORT || 3000;
const urlList = []
const shorturlList = []
let shorturlId = 1

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', (req, res) => {

  const url = req.body.url

  const urlRE = /^(ftp|http|https):\/\/[^ "]+$/

  if (!urlRE.test(url)) {
    return res.json({ error: 'invalid url' })
  }
  else {
    urlList.push(url)
    shorturlList.push(shorturlId)

    return res.json({original_url: url, short_url: shorturlId++})
  }
})

app.get('/api/shorturl/:shorturl', (req, res) => {

  let shorturl = req.params.shorturl
//   shorturl = parseInt(shorturl)
  const url = urlList[shorturl - 1]

  return res.redirect(url)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
