const quizData = [
    {
        qun: '1 what is name of me',
        a: 'shourov',
        b: 'sagor',
        c: 'asies',
        d: 'developer',
        ans: 'shourov'
    },
    {
        qun: '2 what is name of me',
        a: 'shourov',
        b: 'sagor',
        c: 'asies',
        d: 'developer',
        ans: 'shourov'
    },
    {
        qun: '3 what is name of me',
        a: 'shourov',
        b: 'sagor',
        c: 'asies',
        d: 'developer',
        ans: 'shourov'
    },
    {
        qun: '4 what is name of me',
        a: 'shourov',
        b: 'sagor',
        c: 'asies',
        d: 'developer',
        ans: 'shourov'
    },
    {
        qun: '5 what is name of me',
        a: 'shourov',
        b: 'sagor',
        c: 'asies',
        d: 'developer',
        ans: 'shourov'
    }
]



const allQuizCon = document.getElementById('quiz')
const qunCon = document.getElementById('qun-con')
const aQunCon = document.getElementById('a-text')
const bQunCon = document.getElementById('b-text')
const cQunCon = document.getElementById('c-text')
const dQunCon = document.getElementById('d-text')
const radiosBtn = document.getElementsByName('qun')
const submitBtn = document.getElementById('submit-btn')


submitBtn.addEventListener('click', checkValue)

const correctValues = []
let correctScore = 0

function checkValue() {
    radiosBtn.forEach(element => {
        if (element.checked) {

            const value = element.nextSibling.nextElementSibling.innerText
            const correctValue = correctValues.pop()
            if (value === correctValue) {
                correctScore++
            }
            changeQuiz()
        }
        else {
            submitBtn.setAttribute.disabled = true
            // alert('please select one option fast')
        }
        element.checked = false
    }
    )



}

let i = 0
function changeQuiz() {
    let length = quizData.length
    if (i !== length) {
        submitBtn.innerText = 'submit'
        // quizContainer.style.display = 'block'
        const currentQuiz = quizData[i];
        qunCon.innerHTML = currentQuiz.qun
        aQunCon.innerText = currentQuiz.a
        bQunCon.innerText = currentQuiz.b
        cQunCon.innerText = currentQuiz.c
        dQunCon.innerText = currentQuiz.d
        correctValues.push(currentQuiz.ans)
    }
    else {
        i = showScore(i)
    }

    i++
}


function showScore(i) {
    qunCon.innerText = `your score is ${correctScore}/${quizData.length}`
    submitBtn.innerText = 'Reload'
    allQuizCon.style.display = 'none'
    submitBtn.addEventListener('click', () => location.reload())
}
changeQuiz()



