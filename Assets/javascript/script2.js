// Javascript for A1AdoptInput
// Variable Declaration
var animal = "";
var size = "";
var sex = "";
var loc = "";
var age = "";

function getFormData() {
  animal = $("#animal").val().trim();
  console.log(animal);
  size = $("#size").val().trim();
  console.log(size);
  sex = $("#sex").val().trim();
  console.log(sex);
  loc = $("#location").val().trim();
  console.log(location);
  age = $("#age").val().trim();
  console.log(age);
}

function storeData() {
  localStorage.setItem("Animal", animal);
  localStorage.setItem("Size", size);
  localStorage.setItem("Sex", sex);
  localStorage.setItem("Location", loc);
  localStorage.setItem("Age", age);
}
// debugger;
// Capture Pet Request Button
$(".btn-Adopt1").on("click", function (event) {
  // Prevent the page from refreshing
  event.preventDefault();
  console.log(event);

  // clear local storage
  localStorage.clear();

  // Extract data from form
  getFormData();

  // Store form data in local storage
  storeData();

  window.location.assign("A2AdoptResults.1.html");
})