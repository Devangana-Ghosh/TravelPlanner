 

document.getElementById("first").addEventListener("click", function() {
    var destination = document.getElementById("search").value;
    if (destination.trim() === "") {
        alert("Please fill in the 'Where to?' field");
    } else {
       
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("search");
    input.focus();
    input.setSelectionRange(0, 0);
});

