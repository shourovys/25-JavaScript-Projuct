const dayContainer = document.getElementById('day');
const hourContainer = document.getElementById('hours');
const minContainer = document.getElementById('min');
const secContainer = document.getElementById('sec');

const futureDate = '2020-10-22'

const timeLeft = () => {
    const currentTime = new Date().getTime()
    const newYearTime = new Date(futureDate).getTime()

    const totalSecLeft = Math.floor((newYearTime - currentTime) / 1000)

    const dayLeft = Math.floor(totalSecLeft / (3600 * 24))
    const hourLeft = Math.floor((totalSecLeft / 3600) % 24)
    const minLeft = Math.floor((totalSecLeft / 60) % 24) % 60
    const secLeft = Math.floor(totalSecLeft) % 60


    dayContainer.innerText = dayLeft
    hourContainer.innerText = hourLeft
    minContainer.innerText = minLeft
    secContainer.innerText = secLeft
}
timeLeft()
setInterval(timeLeft, 1000)

