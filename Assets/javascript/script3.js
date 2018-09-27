// Javascript for A2AdoptResults

// Api Key for petfinder website
var apiKey1 = "61ff53cfec91aa376da0e0263a0c8c83";

// Api Key for mapbox website
mapboxgl.accessToken = 'pk.eyJ1Ijoic2ZsZXdpczgyNyIsImEiOiJjam1rbXI5dWYwczlkM3FvZThwZ24xbGV5In0.qPist1fS63LzFlIXIsKb8w';

// Data String for API
var dataString = "";
// var mapString = "sflewis827";
var mapString = "";

// URL to call Petfinder
var queryURL1 = "http://api.petfinder.com/pet.find?format=json&key=" + apiKey1 + "&callback=?";

// URL to call Mapbox
// var queryURL2 = "https://api.mapbox.com/v5/" + mapString + ".json?access_token=" + mapboxgl.accessToken;
var urlLoc = "";
var queryURL2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/urlLoc.json?access_token=" + mapboxgl.accessToken;
console.log(queryURL2);

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

// Function to build map
function buildMap() {
  var coord_long;
  var coord_lat;
  var coords = [];

  queryURL2 = queryURL2.replace("urlLoc", urlLoc);

  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function (response) {
    coord_long = response.features[0].center[0];
    coord_lat = response.features[0].center[1];
    coords = response.features[0].center;

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: coords,
      zoom: 9
    });
  })
}

// Function to call Petfinder and get list of pets
function callPetfinder() {

  $.getJSON({
    url: queryURL1,
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
  urlLoc = loc;

  if (loc) {
    dataString = dataString + "&location=" + loc;
  }

  var age = localStorage.getItem("Age");
  if (age) {
    dataString = dataString + "&age=" + age;
  }

  queryURL1 = queryURL1 + dataString;
}

// Process on page load
$(document).ready(function () {
  buildQueryURL();
  callPetfinder();
  buildMap();
})