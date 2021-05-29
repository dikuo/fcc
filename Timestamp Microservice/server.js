// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?', (req, res) => {

  let date = req.params.date
  
  if (!date) {
    return res.json({unix: Date.now(), utc: new Date().getTime()})
  }
  else {

    if (/\d{5,}/.test(date)) {
      date = parseInt(date)
    }

    let convertDate = new Date(date)

    if (convertDate == 'Invalid Date') {
      return res.json({ error : "Invalid Date" })
    }
    else {
      let unix = convertDate.valueOf()
      let utc = convertDate.toUTCString()

      return res.json({ unix, utc })
    }
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
