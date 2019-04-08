var config = {
    apiKey: "AIzaSyA1D30HvJ1V_z-u4zDxgKlSguMhY2upswQ",
    authDomain: "train-project-84824.firebaseapp.com",
    databaseURL: "https://train-project-84824.firebaseio.com",
    projectId: "train-project-84824",
    storageBucket: "train-project-84824.appspot.com",
    messagingSenderId: "801008822592"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var time = "";
var frequency = "";




$("#add-train").on("click", function (event) {
    event.preventDefault();

   
    let trainName = $("#name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let time = $("#first-time-input").val().trim();
    let frequency = $("#frequency-input").val().trim();

  
    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        time: time,
        frequency: frequency

    });

    $("#name-input").val("")
    $("#destination-input").val("")
    $("#first-time-input").val("")
    $("#frequency-input").val("")


});
database.ref().on("child_added", function (childSnapshot) {
    var trainNm = childSnapshot.val().trainName;
    var trainDes = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    var currentTime = moment();
    console.log("current time" + moment(currentTime).format("hh:mm"));

    // This is a way for us to convert the time to make sure that its 1 year behind so the time formatted isn't wonky
    var trainSchedule = moment(trainTime, "HH:mm").subtract(1, "years");
   
// Calculates the time difference between trainSchedule in minutes 
    var timeDiff = moment().diff(moment(trainSchedule), "minutes");
    
// Gives us the time remaining between the timeDifference and the frequency
    var timeRemaining = timeDiff % trainFreq;
   
// This gives us how many minutes we have until the train gets here. This is what we use to calculate how many min. away
    var trainArrival = trainFreq - timeRemaining;
    console.log("Train Arrival time" + moment(currentTime).format("hh:mm"));
// Gives us the date time stamp for when the train arrives
    var arrivalTime = moment().add(trainArrival, "minutes");
   

    var newRow = $("<tr>").append(
        $("<td>").text(trainNm),
        $("<td>").text(trainDes),
        $("<td>").text(trainFreq),
        $("<td>").text(arrivalTime),
        $("<td>").text(trainArrival),

    );
    $("#trainSchedule" ).append(newRow);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

