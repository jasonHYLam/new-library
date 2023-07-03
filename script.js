// module
const libraryModule = (() => {
    let myLibrary = [];

    function getMyLibrary() {
        return myLibrary;
        }
        return {getMyLibrary}
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
    // return {this.title, this.author, this.pages, this.read}
}

// controller
const libraryController = (() => {
    function addBookToLibrary(book) {
        libraryModule.getMyLibrary().push(book);
    }

    function displayAllBooks() {
        console.log(libraryModule.getMyLibrary())
        libraryModule.getMyLibrary().map((book) => {
            console.log(book.info())
        })
    }

    function addBooks(...books) {
        for (let book of books) {
            addBookToLibrary(book)
        }
    }
    // delete a book from array


    // dummy books
    const book1 = new Book('hobbit', 'jk tolkien', 420, false)
    const book2 = new Book('sound of waves', 'mishima i think', 420, true)
    const book3 = new Book('asya', 'ivan turganev', 420, true)
    const book4 = new Book('murder of roget ackroyd', 'agatha christie', 420, true)


    addBooks(book1, book2, book3, book4);
    // displayAllBooks()
    console.log(libraryModule.getMyLibrary()[0].title);

    return {displayAllBooks, addBooks}
})();

// display Controller 
const displayController = (() => {

    const getCardContainer = () => {
        return document.querySelector("#card-container");
    }

    // probably requires a form
    // probably need to get form info
    // for testing purposes, make cards from manually created books in my library
    // therefore this requires a book argument
    const createCard = (book) => {
        // make card
        const card = document.createElement('div');
        // set class
        card.classList.add('card');
        // create text, using form info
        // for testing purposes, make text manually
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');

        const toggleRead = document.createElement('button');
        const removeCard = document.createElement('button');

        // append elements to card
        ((...elements) => {
            for (element of elements) {
                card.appendChild(element);
            }
        })(title, author, pages, read, toggleRead, removeCard);

        // title.textContent = libraryModule.getMyLibrary()[0].title
        // author.textContent = libraryModule.getMyLibrary()[0].author
        // pages.textContent = libraryModule.getMyLibrary()[0].pages
        // read.textContent = libraryModule.getMyLibrary()[0].read
        title.textContent = book.title
        author.textContent = book.author
        pages.textContent = book.pages
        read.textContent = book.read

        getCardContainer().appendChild(card);
    
    }

    const displayAllBooks = () => {
        for (const book of libraryModule.getMyLibrary()) {
            console.log(book)
            createCard(book);
        }
        console.log(getCardContainer());
    }

    // create cards
    // delete a card
    // click add book
    // click remove book in card
    displayAllBooks();


})();
