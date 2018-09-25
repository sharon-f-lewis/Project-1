// Javascript for Transportation1.html

// Firebase Configuration
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCmbRr9q2V-eUyJ7WiM-RJLsW0QmIEpOOM",
  authDomain: "classwork-29b93.firebaseapp.com",
  databaseURL: "https://classwork-29b93.firebaseio.com",
  projectId: "classwork-29b93",
  storageBucket: "classwork-29b93.appspot.com",
  messagingSenderId: "667186043094"
};
firebase.initializeApp(config);

// Create a variable to reference the database;
var database = firebase.database();

// Form Variables
var zipcode = "";
var driverName = "";
var driverPhone = "";

// Extract form info
function getDriverInfo() {
  zipcode = $("#enterzipcode").val().trim();
  driverName = $("#enterdriversname").val().trim();
  driverPhone = $("#enterdriversphone").val().trim();

  console.log(zipcode);
  console.log(driverName);
  console.log(driverPhone);
}

// Store form data in firebase
function storeDriverInfo() {
  database.ref("/driverData").push({
    zipcode: zipcode,
    name: driverName,
    phone: driverPhone
  });

}

function resetDataEntry() {
  $("#enterzipcode").val("Enter your Zipcode");
  $("#enterdriversname").val("Enter your Name");
  $("#enterdriversphone").val("Enter your Phone");
}

// Capture Driver Submit Button
$("#add-driver-btn").on("click", function (event) {
  // Prevent the page from refreshing
  event.preventDefault();

  console.log(event);

  getDriverInfo();
  storeDriverInfo();
  resetDataEntry();
})