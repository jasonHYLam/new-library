// module
const libraryModule = (() => {
    let myLibrary = [];
    let bookCounter = 0;

    function getMyLibrary() {return myLibrary};
    function getCounter() {return bookCounter};
    function incrementCounter() {return bookCounter++};
    return {getMyLibrary, getCounter, incrementCounter}
})();

function Book(title, author, pages, read) {

    // every time a new Book is created, increment the book counter.
    libraryModule.incrementCounter();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = libraryModule.getCounter();
}

// set functions onto prototype
Book.prototype.info = function() {
    return ([this.title, this.author, this.pages, this.read]);
}

// controller
const libraryController = (() => {
    function addBookToLibrary(book) {
        libraryModule.getMyLibrary().push(book);
    }

    function addBooks(...books) {
        for (let book of books) {
            addBookToLibrary(book)
        }
    }
    // delete a book from array, using information to match; match title? or data attribute?
    function deleteBook() {

    }

    // dummy books
    const book1 = new Book('hobbit', 'jk tolkien', 420, false)
    const book2 = new Book('sound of waves', 'mishima i think', 420, true)
    const book3 = new Book('asya', 'ivan turganev', 420, true)
    const book4 = new Book('murder of roget ackroyd', 'agatha christie', 420, true)

    addBooks(book1, book2, book3, book4);

    return {addBooks, addBookToLibrary}
})();

// display Controller 
const displayController = (() => {

    const getCardContainer = () => {return document.querySelector("#card-container")}
    const resetForm = () => {document.querySelector("#add-book-form").reset()}
    const getForm = () => {return document.querySelector("#add-book-form")}
    const showForm = () => {getForm().classList.remove('hidden')}
    const hideForm = () => {getForm().classList.add('hidden')}

    const createCard = (book) => {
        // make card
        const card = document.createElement('div');
        // set class
        card.classList.add('card');

        // set card index, using library array length
        card.setAttribute('data-index', libraryModule.getMyLibrary().length)
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');

        const toggleRead = document.createElement('button');
        const removeCard = document.createElement('button');
        removeCard.classList.add("remove-card");

        // append elements to card
        ((...elements) => {
            for (let element of elements) {
                card.appendChild(element);
            }
        })(title, author, pages, read, toggleRead, removeCard);

        title.textContent = book.title
        author.textContent = book.author
        pages.textContent = book.pages
        read.textContent = book.read

        toggleRead.textContent = 'read/unread';
        removeCard.textContent = 'remove card';

        getCardContainer().appendChild(card);
    
    }

    const displayAllBooks = () => {

        // empties the container
        while (getCardContainer().lastChild) {
            console.log(getCardContainer().lastChild)
            getCardContainer().removeChild(getCardContainer().lastChild)
        }
        // adds books to empty container
        for (const book of libraryModule.getMyLibrary()) {
            createCard(book);
        }
    }


    const submitBook = () => {
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const haveRead = document.querySelector("#have-read-checkbox").checked;

        const newBook = new Book(title, author, pages, haveRead)
        libraryController.addBookToLibrary(newBook)
    }
    
    const clickHandler = (() => {
        // show form
        const addBookButton = document.querySelector("#add-button");
        addBookButton.addEventListener('click', (e) => {
            showForm();
        })
        
        //submit form
        const submitFormButton = document.querySelector("#submit-add-book-button");
        submitFormButton.addEventListener('click', (e) => {
            e.preventDefault();
            submitBook();
            displayAllBooks();
            resetForm();
            hideForm();
        })

        // close form
        const closeFormButton = document.querySelector("#close-add-book-form");
        closeFormButton.addEventListener('click', (e) => {
            e.preventDefault();
            hideForm();
        });

        // remove cards
        getCardContainer().addEventListener('click', (e) => {
            // console.log(e.target.classList)
            if (e.target.classList.contains('remove-card')) {
                console.log(e.target);
            }
        });
        })();

    //initialise books display
    displayAllBooks();


    console.log(libraryModule.getMyLibrary());
})();
