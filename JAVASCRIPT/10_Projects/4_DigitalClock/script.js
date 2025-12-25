const clock = document.getElementById("clock");
function myClock(){
    const now = new Date();
    // const hours = String(now.getHours()).padStart(2, '0');
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    // const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = now.toLocaleTimeString();
}

const intervalID = setInterval(myClock, 1000);