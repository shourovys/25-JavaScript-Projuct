let display = document.getElementById('display')
let buttons = document.querySelectorAll('button')
for (item of buttons) {
    item.addEventListener('click', (e) => {

        buttonText = e.target.innerText
        if (buttonText === 'C') {

            display.value = ""

            display.classList.add("start")

        }
        else if (buttonText === '÷') {
            buttonText = '/'
            display.value += buttonText
            display.classList.add("start")
        }
        else if (buttonText === '×') {
            buttonText = '*'
            display.value += buttonText
            display.classList.add("start")
        }
        else if (buttonText === '=') {
            display.value = eval(display.value)
            display.classList.remove("start")
            display.classList.add("end")

        }
        else if (buttonText === 'cr') {
            display.value = display.value.slice(0, -1);
        }
        else {
            display.value += buttonText
            display.classList.add("start")
        }


    })
}