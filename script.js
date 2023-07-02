// module
let myLibrary = [];

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
    myLibrary.map((book) => {
        console.log(book.info())
    })
}

const book1 = new Book('hobbit', 'jk tolkien', '420', 'no')
const book2 = new Book('sound of waves', 'mishima i think', '420', 'no')
const book3 = new Book('asya', 'ivan turganev', '420', 'no')
const book4 = new Book('murder of roget ackroyd', 'agatha christie', '420', 'no')

function addBooks(...books) {
    for (book of books) {
        console.log(book.info())
    }
}

addBooks(book1, book2, book3, book4);