let values = "ABCDEF0123456789"
function getRandomIndex(){
    return Math.floor(Math.random() * 16);
}
function generateRandomColor(){
    let color = "#";
    for(let i = 0; i<6; i++){
        color += values[getRandomIndex()];
    }
    return color;
}

const button = document.getElementById("btn");
const body = document.querySelector("body");
button.addEventListener("click", ()=>{
    body.style.backgroundColor = generateRandomColor();
})