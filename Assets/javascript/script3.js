// Javascript for A2AdoptResults

// Api Key for petfinder website
var apiKey = "61ff53cfec91aa376da0e0263a0c8c83";

// Data String for API
var dataString = "";

// URL to call Petfinder
var queryURL = "http://api.petfinder.com/pet.find?format=json&key=" + apiKey + "&callback=?";

// Array to contain petfinder results
var petArray = [];

// Function to build table
function buildTable() {
  // Create table
  var tab = $("<table>");
  tab.addClass("petsTable");
  $(".AdoptResults1").prepend(tab);
}

// Function to build table header
function buildTableHeader() {
  // Create pet display headers
  // Create table
  var head1 = $("<tr>");
  head1.addClass("petsHeader");
  $(".petsTable").append(head1);

  // Create Column Headings
  var head2 = "<th scope='col'>Face</th>"
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Animal</th>";
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Breed</th>";
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Name</th>";
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Size</th>";
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Sex</th>";
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Age</th>";
  $(".petsHeader").append(head2);

  head2 = "<th scope='col'>Location</th>";
  $(".petsHeader").append(head2);
}

function buildTableRow(e) {
  var rowId = "petData" + e;

  // Create row
  var detail1 = $("<tr>");
  detail1.addClass(rowId);
  $(".petsTable").append(detail1);

  // Create Columns
  // Face
  var detail2 = "<td><img src=" + petArray[e].media.photos.photo[0].$t + "></td>";
  $("." + rowId).append(detail2);

  // Animal
  detail2 = "<td>" + petArray[e].animal.$t + "</td>";
  $("." + rowId).append(detail2);

  // Breed
  // If more than one breed, display mixed, otherwise display breed
  if (Array.isArray(petArray[e].breeds.breed)) {
    detail2 = "<td>Mixed</td>";
  }
  else {
    detail2 = "<td>" + petArray[e].breeds.breed.$t + "</td>";
  }

  $("." + rowId).append(detail2);

  // Name
  detail2 = "<td>" + petArray[e].name.$t + "</td>";
  $("." + rowId).append(detail2);

  // Size
  detail2 = "<td>" + petArray[e].size.$t + "</td>";
  $("." + rowId).append(detail2);

  // Sex
  detail2 = "<td>" + petArray[e].sex.$t + "</td>";
  $("." + rowId).append(detail2);

  // Age
  detail2 = "<td>" + petArray[e].age.$t + "</td>";
  $("." + rowId).append(detail2);

  // Location - Shelter
  detail2 = "<td>" + petArray[e].shelterId.$t + "</td>";
  $("." + rowId).append(detail2);
}

// Function to build table with data returned
function buildResponse() {
  buildTable();
  buildTableHeader();

  // Loop through pet list and create table
  for (var i = 0; i < petArray.length; i++) {
    buildTableRow(i);
  }
}

// Function to call Petfinder and get list of pets
function callPetfinder() {

  $.getJSON({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    petArray = response.petfinder.pets.pet;
    buildResponse();
  });
}

// Build Query URL
function buildQueryURL() {
  // Clear string
  dataString = ""

  // Breed
  var animal = localStorage.getItem("Animal");
  if (animal) {
    dataString = dataString + "&animal=" + animal;
  }

  // Size
  var size = localStorage.getItem("Size");
  if (size) {
    dataString = dataString + "&size=" + size;
  }

  // Sex
  var sex = localStorage.getItem("Sex");
  if (sex) {
    dataString = dataString + "&sex=" + sex;
  }

  // Location
  var loc = localStorage.getItem("Location");
  if (loc) {
    dataString = dataString + "&location=" + loc;
  }

  var age = localStorage.getItem("Age");
  if (age) {
    dataString = dataString + "&age=" + age;
  }

  queryURL = queryURL + dataString;
}

// Process on page load
$(document).ready(function () {
  buildQueryURL();
  callPetfinder();
})