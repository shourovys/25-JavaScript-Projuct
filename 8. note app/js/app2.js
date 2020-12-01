// call showNote for show note in dom
showNote()

// add EventListener in #add-btn 
let addBtn = document.getElementById('add-btn')
addBtn.addEventListener("click", setNote)

// showNote function take data, set data in localStorage, and show Note card
function setNote(event) {
    // take Note value form input
    let inputHeadingText = document.getElementById('inputHeadingText')
    let inputBodyText = document.getElementById('inputBodyText')
    if (inputBodyText.value.length > 4 && inputBodyText.value.length > 4) {
        // get data in localStorage
        let NoteFormLocalStorage = localStorage.getItem('NoteFormLocalStorage');
        let setNote = [];
        if (NoteFormLocalStorage == null) {
            setNote = []
        } else {
            setNote = JSON.parse(NoteFormLocalStorage)
        }
        let noteObj = {
            heading: inputHeadingText.value,
            body: inputBodyText.value
        }
        // add inputBodyText value in note
        setNote.push(noteObj)
        // set data in localStorage
        localStorage.setItem('NoteFormLocalStorage', JSON.stringify(setNote))

        // call showNote for show note in dom
        showNote()

        event.preventDefault()
    }
    inputHeadingText.value = ""
    inputBodyText.value = ""


}

// showNote function show in Note card
function showNote() {
    // get data in localStorage
    let NoteFormLocalStorage = localStorage.getItem('NoteFormLocalStorage');
    let setNote = [];
    if (NoteFormLocalStorage == null) {
        setNote = []
    } else {
        setNote = JSON.parse(NoteFormLocalStorage)
    }

    // gat card container form dOM
    let noteContainer = document.getElementById('note-container')
    let card = ''
    setNote.forEach((noteValue, index) => {
        card += `<div class="card cart text-center m-2 shadow-none bg-light rounded " style="width: 22rem;">
                    <div class="card-body">
                        <h6 class="card-title">Title: ${noteValue["heading"]}</h6>
                        <hr>
                        <p  class="card-text">${noteValue["body"]}</p>
                        <a  id="${index}" onclick="deleteNote(id)" class="btn btn-danger deleteBtn">Delete</a>
                    </div>
                </div> `
    });
    if (setNote.length != 0) {
        noteContainer.innerHTML = card
    }
    else {
        noteContainer.innerHTML = "&nbsp &nbsp Use add Note button for adding your note"
    }
}

// make delete btn work able
function deleteNote(id) {
    // get data in localStorage
    let NoteFormLocalStorage = localStorage.getItem('NoteFormLocalStorage');
    let setNote = [];
    if (NoteFormLocalStorage == null) {
        setNote = []
    } else {
        setNote = JSON.parse(NoteFormLocalStorage)
    }
    setNote.splice(id, 1)
    // set data in localStorage
    localStorage.setItem('NoteFormLocalStorage', JSON.stringify(setNote))
    // call showNote for show note in dom
    showNote()
}

//working with search
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function () {
    let searchTextValue = searchText.value
    let carts = document.getElementsByClassName('cart')


    Array.from(carts).forEach(cart => {
        let cardBodyText = cart.querySelector('p').innerText
        if (cardBodyText.includes(searchTextValue)) {
            cart.style.display = 'block';

        } else {
            cart.style.display = 'none'
        }
    });
})





