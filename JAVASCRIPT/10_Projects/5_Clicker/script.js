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

const body = document.querySelector("body");
body.addEventListener("click",(e)=>{
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${e.clientX}px`
    bubble.style.top = `${e.clientY}px`
    bubble.style.backgroundColor = generateRandomColor();
    body.append(bubble);

    setTimeout(()=>{
        bubble.remove();
    }, 1000)
})