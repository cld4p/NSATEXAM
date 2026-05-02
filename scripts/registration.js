const name = document.querySelector("#name");
const nameInputs = Array.from(name.querySelectorAll('input'));

const nameNextBtn = document.querySelector("#name-next-btn");


const allFilledName = nameInputs.every(input => input.value.trim != "");

if(allFilledName) {
    nameNextBtn.classList.add("active")
} else {
    nameNextBtn.classList.remove("active")
}


