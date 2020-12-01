// . calling showNote for see note When page reload
showNote()

// > add a Event Listener in #add-btn and gat 2 input text
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function () {
    // . taking two input text
    let addTextHeading = document.getElementById('add-text-heading').value;
    let addTextBody = document.getElementById('add-text-body').value;
    //. get value form localStorage
    let notes = localStorage.getItem('notes');
    let noteObj = []
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    //. add value in localStorage
    let myObj = {
        heading: addTextHeading,
        body: addTextBody
    }

    noteObj.push(myObj)
    localStorage.setItem("notes", JSON.stringify(noteObj))
    showNote()
    //. Make from blank
    addTextHeading = ""
    addTextBody = ""
})

// > function that going to show Notes carts by taking data form localStorage
function showNote() {
    //. get value form localStorage
    let notes = localStorage.getItem('notes');
    let noteObj = []
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    // . taking every Object form noteObj and show in cart
    html = ``
    noteObj.forEach((noteValue, index) => {

        html += `<div class="card m-2" style="width: 22.7rem;">
        <div class="card-body cart" id=${index}>
          <h5 class="card-title">${noteValue.heading}</h5>
          <hr>
          <p class="card-text">${noteValue.body}</p>
          <a id=${index} onClick="deleteCart(id)" class="btn btn-danger">Delete</a>
          <button lass="btn btn-outline-success" id=${index} onclick="important(id)">Imp</button>

          
        </div>
      </div>
    `});
    let noteContainer = document.getElementById("note-container")
    if (noteObj.length != 0) {
        noteContainer.innerHTML = html
    } else {
        noteContainer.innerHTML = `&nbsp &nbsp Please use AddNote button for adding some note`
    }

}

// > this Function delete Note cart
function deleteCart(id) {
    //. get value form localStorage
    let notes = localStorage.getItem('notes');
    let noteObj = []
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    //  . delete Note by id
    noteObj.splice(id, 1)
    // . update local Storage & showNote
    localStorage.setItem("notes", JSON.stringify(noteObj))
    showNote()
}

// > make screech active
let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function () {
    let inputText = searchText.value.toLowerCase()
    let carts = document.getElementsByClassName("cart")

    Array.from(carts).forEach(cart => {
        let cartText = cart.querySelectorAll("P")[0]
        cartText = cartText.innerText;
        // console.log(cartText);
        if (cartText.includes(inputText)) {
            cart.style.display = "block"
        }
        else {
            cart.parentNode.style.display = "none"
        }
    });
})

// make note important
function important(id) {
    let carts = document.getElementsByClassName('cart')
    Array.from(carts).forEach(cart => {
        let cartId = cart.getAttribute('id');
        if (cartId == id) {
            cart.style.backgroundColor = "aqua"
        }
    });

}

