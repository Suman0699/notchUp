// Require packages and set the port
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const port = 3002;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

var emailer = require('./emailer');

app.post('/scheduleTrialClass',(request, response) => {
  // console.log(`body: ${JSON.stringify(request.body)}`);
  response.append('Content-Type', 'application/json');
  response.append('Accept', 'application/json');
  response.append('Access-Control-Allow-Origin', ['*']);
  response.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.append('Access-Control-Allow-Headers', 'Content-Type');
  response.append('Access-Control-Allow-Credentials', 'true');
  emailer.sendMail(request.body).then(res=>{
    response.send({code:200, info:'Trial class scheduled successfully!'});
  }, error=>{
    response.send({code:400, info:'Something went wrong, unable to schedule class!', error});
  });
});

// Start the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});