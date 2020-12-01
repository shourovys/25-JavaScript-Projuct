
// Library class make book object
class Library {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
// in Display class -- default all method for showing data
class Display {
    // addDataInLocalStr function add data in localStorage and also get data form localStorage
    static addDataInLocal(bookObj) {
        let bookFormLocal = localStorage.getItem('bookFormLocal')
        let book
        if (bookFormLocal == null) {
            book = []
        } else {
            book = JSON.parse(bookFormLocal)
        }
        book.push(bookObj)
        localStorage.setItem('bookFormLocal', JSON.stringify(book))
    }
    // validData--> make sour you are passing valid data in input
    static validData(bookName, bookAuthor) {
        if (bookName.length > 3 && bookAuthor.length > 3) {
            return true
        }
    }
    // clearInput--> clear the form input data
    static clearInput() {
        document.getElementById('formInput').reset()
    }
    // take data form localStorage and creat table
    static creatTable() {
        // getData fom localStorage
        let bookFormLocal = localStorage.getItem('bookFormLocal')
        console.log(bookFormLocal);
        let book
        if (bookFormLocal == null) {
            book = []
        } else {
            book = JSON.parse(bookFormLocal)
        }
        console.log(book);
        book.forEach(element => {
            let tBody = `   <tr>
                                <td>${element.name}</td>
                                <td>${element.author}</td>
                                <td>${element.type}</td>
                            </tr>`
            let tBodyContainer = document.getElementById('tableBody')
            tBodyContainer.innerHTML += tBody
        });

    }
    // showStatusMassage show the alert - when user added book
    static showStatusMassage(type, massage) {
        let bg
        if (type == "success") {
            bg = 'success'
        } else (
            bg = 'danger'
        )
        let status = `
                        <div class="alert alert-${bg}" role="alert">
                        <h1 class="badge badge-secondary badge-${bg}">${type}</h1>   ${massage}: 
                        </div>`
        let showStatusMassageCon = document.getElementById('showStatusMassageCon')
        showStatusMassageCon.innerHTML = status
        setTimeout(() => {
            showStatusMassageCon.innerHTML = ""
        }, 5000);
    }

}
// call creatTable() for show table data when reload the page
Display.creatTable()

// take data form form when user click in #addBookBtn and call some class method
// addEventListener in #addBookBtn
let addBookBtn = document.getElementById('addBookBtn')
addBookBtn.addEventListener('click', showInDisplay)
// showInDisplay function will show book in table
function showInDisplay(e) {
    // take all input form form 
    let bookName = document.getElementById('name').value
    let bookAuthor = document.getElementById('author').value
    let bookType
    let fiction = document.getElementById('fiction')
    let programing = document.getElementById('programing')
    let story = document.getElementById('story')
    if (fiction.checked) {
        bookType = fiction.value
    } else if (programing.checked) {
        bookType = programing.value
    } else {
        bookType = story.value
    }
    // make a object by Library class
    if (Display.validData(bookName, bookAuthor) == true) {
        let bookObj = new Library(bookName, bookAuthor, bookType)
        Display.addDataInLocal(bookObj)
        Display.clearInput()
        Display.creatTable()
        Display.showStatusMassage('success', 'Your book success fully added')
    }
    else {
        Display.showStatusMassage('Error', 'Your book not added')
    }
    e.preventDefault()
}
