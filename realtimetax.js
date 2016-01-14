

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

    }
  });

}





