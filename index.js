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



// app.get('/api/:date?', (req, res) => {
//   const dateString = req.params.date
//   const dateStringRegex = /^[0-9]+$/
//   const numbersOnly = dateStringRegex.test(dateString)
 
//   if (!numbersOnly) {
//     const unixTimestamp = Date.parse(dateString)
//     const utcDate = new Date(unixTimestamp).toUTCString()
 
//     unixTimestamp
//     ? res.json({ unix: unixTimestamp, utc: utcDate })
//     : res.json({ error: "Invalid Date" })
//   } 
//   else {
//     const unixTimestamp = parseInt(dateString)
//     const actualDate = new Date(unixTimestamp)
//     const utcDate = actualDate.toUTCString()
 
//     res.json({ unix: unixTimestamp, utc: utcDate })
//   }
 
//   app.get("/api", (req, res)=>{
//     let date = new Date();
//     let UTC = date.getTime();
//     UTC = new Date(UTC);
//     UTS = UTC.toUTCString();
//     let UNIX = date.getTime();
//     res.json({ unix: UNIX, utc: UTS });
//   })
//  })
 
app.get("/api/:date?", function (req, res) {

  if (req.params.date === '' || req.params.date === undefined) {
    const current = new Date();
    return res.json({
      unix: current.getTime(),
      utc: current.toUTCString(),
    });
  }
  
  const date = new Date(req.params.date);
  if (date.toString() === 'Invalid Date') {
    const date2 = new Date(parseInt(req.params.date, 10));
    if (date2.toString() === 'Invalid Date') {
      return res.json({ error : "Invalid Date" });
    }
    return res.json({
      unix: date2.getTime(),
      utc: date2.toUTCString(),
    }); 
  }
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 1000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
