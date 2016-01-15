

Tasks = new Mongo.Collection("taxquestion");



if (Meteor.isClient) {

  // This code only runs on the client




  Template.body.events({

    "submit .questions": function (event) {

      // Prevent default browser form submit

      event.preventDefault();

      console.log("handle event");

      // Get value from form element
      var question = document.getElementById("question").value;
      var you = document.getElementById("you").value;
      var email = document.getElementById("email").value;

      console.log(question + " " + you + " "+ email);

      Tasks.insert({

        question: question,
        you: you,
        email: email,

        createdAt: new Date() // current time

      });

      document.getElementById("question").value = "";
      document.getElementById("you").value = "";
      document.getElementById("email").value = "";

      Meteor.call('sendEmail',
          'pwu1024@gmail.com',
          'snapmula@gmail.com',
          'Hello from Meteor!',
          'New data added');
    }
  });

}

if(Meteor.isServer) {

  Meteor.startup( function() {
    process.env.MAIL_URL = "smtp://postmaster%40sandbox1b58096c2756404bb4c2615318949d29.mailgun.org:2bf08951a287cb75f7efce7574eb5d7b@smtp.mailgun.org:587";
  });

  Meteor.methods({
    sendEmail: function (to, from, subject, text) {
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
  });

}


