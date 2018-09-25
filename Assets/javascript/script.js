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


// Javascript for A1AdoptInput
// Api Key for petfinder website
var apiKey = "61ff53cfec91aa376da0e0263a0c8c83";
// URL to call Petfinder
var queryURL = "http://api.petfinder.com/pet.find?format=json&key=" + apiKey + "&location=08043&callback=?";
console.log(queryURL);

// Function to build table with data returned
function buildResponse(pets) {
  console.log(pets);
  console.log(pets.length);
  // Empty pet display class
  $(".AdoptResults1").empty();

  // Create pet display headers
  // Create table
  var h = $("<tr>");
  h.addClass("petsTable");
  h.text(  "<th scope='col'>Face</th>"
          ,"<th scope='col'>Animal</th>"
          ,"<th scope='col'>Breed</th>"
          ,"<th scope='col'>Size</th>"
          ,"<th scope='col'>Sex</th>"
          ,"<th scope='col'>Age</th>"
          ,"<th scope='col'>Location</th>"
        );
  $(".AdoptResults1").append(h);

  // Loop through pet list and create table
  for (var i = 0; i < pets.length; i++) {
    var d = $("<tr>");
    d.addClass("petsTable");
    d.attr("data-name", pets[i].name);
    // face maybe
    d.text(  "<td></td>"
            // Animal
            ,"<td>" + pets[i].animal + "</td>"
            // Breed
            ,"<td>" + pets[i].breeds.breed + "</td>"
            // Size
            ,"<td>" + pets[i].size + "</td>"
            // Sex
            ,"<td>" + pets[i].sex + "</td>"
            // Age
            ,"<td>" + pets[i].age + "</td>"
            // Location
            ,"<td>" + pets[i].shelterId + "</td>"
          );
    $(".AdoptResults1").append(d);
  }
}

// Function to call Petfinder and get list of pets
function callPetfinder() {
  $.getJSON({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    console.log(response);
    console.log(response.petfinder.pets);
    var petArray = response.petfinder.pets.pet;
    buildResponse(petArray);
  });
}

// Capture Pet Request Button
$(".btn-Adopt1").on("click", function (event) {
  // Prevent the page from refreshing
  // event.preventDefault();
  console.log(event);

  callPetfinder();
})