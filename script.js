// module
const libraryModule = (() => {
let myLibrary = [];

function getMyLibrary() {
    return myLibrary;
    }
})();

function Book(title, author, pages, read) {
    // constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// set functions onto prototype
Book.prototype.info = function() {
    return ([this.title, this.author, this.pages, this.read]);
}

// controller
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayAllBooks() {
    console.log(myLibrary)
    myLibrary.map((book) => {
        console.log(book.info())
    })
}

const book1 = new Book('hobbit', 'jk tolkien', 420, false)
const book2 = new Book('sound of waves', 'mishima i think', 420, true)
const book3 = new Book('asya', 'ivan turganev', 420, true)
const book4 = new Book('murder of roget ackroyd', 'agatha christie', 420, true)

function addBooks(...books) {
    for (let book of books) {
        addBookToLibrary(book)
    }
}

addBooks(book1, book2, book3, book4);
displayAllBooks()

// display Controller 
