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
function addBookToLibrary() {

}

const book1 = new Book('hobbit', 'jk tolkien', '420', 'no')
// book1.info();
console.log(book1.info());
