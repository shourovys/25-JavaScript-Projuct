const hourCon = document.getElementById('hour-con')
const minCon = document.getElementById('min-con')
const secCon = document.getElementById('sec-con')

setInterval(() => {
    const date = new Date();

    const hour = date.getHours() % 12 || 12;
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const milSec = date.getMilliseconds();

    const hourRotation = 30 * hour + min / 2 + 0.00833333333 * sec;
    const minRotation = 6 * min + 0.1 * sec;
    const secRotation = 6 * sec + 0.006 * milSec;

    hourCon.style.transform = `rotate(${hourRotation}deg)`
    minCon.style.transform = `rotate(${minRotation}deg)`
    secCon.style.transform = `rotate(${secRotation}deg)`

}, 10);









