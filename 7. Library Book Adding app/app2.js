
// AddBock class make book Object & also make some method to display data
class AddBock {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

// ShowInDisplay class show all thing in webPage
class ShowInDisplay {
    // . that make a table body and show in page
    static showBook(bookData) {
        let tBody
        let tableBody = document.getElementById('tableBody')
        bookData.forEach(book => {
            tBody += `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`
        });
        tableBody.innerHTML = tBody;
    }
    //. this clear function reset the form value
    static clear() {
        // . make input resat
        let formInput = document.getElementById('formInput')
        formInput.reset()
    }
    // . showStatusMassage display book adding status, is it success or error
    static showStatusMassage(status, displayMessage) {
        let alert
        if (status === 'success') {
            alert = "success"
        }
        else {
            alert = "danger"
        }
        let showStatusMassageCon = document.getElementById('showStatusMassageCon')
        showStatusMassageCon.innerHTML = `<div class="alert alert-${alert} alert-dismissible fade show" role="alert">
        <strong>${status}:</strong> ${displayMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`;
        setTimeout(function () {
            showStatusMassageCon.innerHTML = ''
        }, 5000);
    }
}

// add eventListener in add button & display data
let addBookBtn = document.getElementById('addBookBtn')
addBookBtn.addEventListener('click', display)

// . display function take data form UserForm
function display(e) {
    // . take all input value
    let name = document.getElementById('name').value
    let author = document.getElementById('author').value
    let type
    let fiction = document.getElementById('fiction')
    let programing = document.getElementById('programing')
    let story = document.getElementById('story')
    if (fiction.checked) {
        type = fiction.value
    } else if (programing.checked) {
        type = programing.value
    } else if (story.checked) {
        type = story.value
    }
    // . make a Object of taking data by class AddBook
    book = new AddBock(name, author, type)

    //.  add value in localStorage
    let books = localStorage.getItem('books')
    let bookObj = []
    if (books == null) {
        bookObj = []
    } else {
        bookObj = JSON.parse(books)
    }

    // . make Source valid data added in localStorage
    if (book.name.length > 3 && book.author.length > 3) {
        bookObj.push(book)
        localStorage.setItem("books", JSON.stringify(bookObj))
        // . call some class showInDisplay function's to show data in page 
        ShowInDisplay.showBook(bookObj)
        ShowInDisplay.clear()
        ShowInDisplay.showStatusMassage("success", "Your book successfully added in list")
    } else {
        ShowInDisplay.showStatusMassage("error", "Your book is not added in list. Please try again")
    }

    e.preventDefault()
}
// taking data form localStorage and call showBook for show table when page load
//.  add value in localStorage
let books = localStorage.getItem('books')
let bookObj = []
if (books == null) {
    bookObj = []
} else {
    bookObj = JSON.parse(books)
    // . call showBook function to show data in page
    ShowInDisplay.showBook(bookObj)
}

