// Javascript for A1AdoptInput
// Variable Declaration
var animal = "";
var size = "";
var sex = "";
var loc = "";
var age = "";

// Get data from from
function getFormData() {
  animal = $("#animal").val().trim();
  size = $("#size").val().trim();
  sex = $("#sex").val().trim();
  loc = $("#location").val().trim();
  age = $("#age").val().trim();
}

// Store the data in local storage to pass to next window
function storeData() {
  localStorage.setItem("Animal", animal);
  localStorage.setItem("Size", size);
  localStorage.setItem("Sex", sex);
  localStorage.setItem("Location", loc);
  localStorage.setItem("Age", age);
}

// Capture Pet Request Button
$(".btn-Adopt1").on("click", function (event) {
  // Prevent the page from refreshing
  event.preventDefault();

  // clear local storage
  localStorage.clear();

  // Extract data from form
  getFormData();

  // Store form data in local storage
  storeData();

  // Change to results window
  window.location.assign("A2AdoptResults.1.html");
})