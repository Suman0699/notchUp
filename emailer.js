const { request } = require('express');
var nodemailer = require('nodemailer');

var emailer = {};

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'youremail@hotmail.com',  // To get the email please enter your email and password at the below line
    pass: '******'
  }
});

/** Send email */
emailer.sendMail = function (request) {
  console.log('request ',request);
  let emailBody = '<body> <h4>Dear '+request.parentName+',</h4> <p>'+request.childName+'\'s class at '+request.courseDate+' has been successfully booked.</p> </body>';
  var mailOptions = {
    from: 'youremail@hotmail.com',
    to: request.parentEmail,
    subject: 'NotchUp Trial Class Booked successfully',
    html: emailBody,
  };
  return new Promise(function (myResolve, myReject) {
    // "Producing Code" (May take some time)
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        myReject(false);  // when error
      } else {
        console.log('Email sent: ' + info.response);
        myResolve(info.response); // when successful
      }
    });
  });
}

module.exports = emailer;

