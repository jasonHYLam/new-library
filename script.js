// module
const libraryModule = (() => {
    let myLibrary = [];
    let bookCounter = 0;

    function getMyLibrary() {return myLibrary};
    function setMyLibrary(newArray) {return myLibrary = newArray};
    function getCounter() {return bookCounter};
    function incrementCounter() {return bookCounter++};
    return {getMyLibrary, setMyLibrary, getCounter, incrementCounter}
})();

function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = libraryModule.getCounter();
    // every time a new Book is created, increment the book counter.
    console.log(`current book counter: ${libraryModule.getCounter()}`)
    libraryModule.incrementCounter();
}

// set functions onto prototype
Book.prototype.info = function() {
    return ([this.title, this.author, this.pages, this.read]);
}

Book.prototype.toggleRead = function() {// look into this
    this.read = this.read == true ? this.read = false : this.read = true;
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
    function deleteBook(cardIndex) {
        const newArray = libraryModule.getMyLibrary().filter((book) => {return book.index != cardIndex})
        libraryModule.setMyLibrary(newArray);
    }

    // dummy books
    const book1 = new Book('hobbit', 'jk tolkien', 420, false)
    const book2 = new Book('sound of waves', 'mishima i think', 420, true)
    const book3 = new Book('asya', 'ivan turganev', 420, true)
    const book4 = new Book('murder of roget ackroyd', 'agatha christie', 420, true)

    addBooks(book1, book2, book3, book4);

    return {addBooks, addBookToLibrary, deleteBook}
})();

// display Controller 
const displayController = (() => {

    const getCardContainer = () => {return document.querySelector("#card-container")}
    const resetForm = () => {document.querySelector("#add-book-form").reset()}
    const getPopup = () => {return document.querySelector("#pop-up")}
    const showForm = () => {getPopup().classList.remove('hidden')}
    const hideForm = () => {getPopup().classList.add('hidden')}
    const getMatchingBook = (index) => {
        return libraryModule.getMyLibrary().find((book) => book.index == index)
    }

    const createCard = (book) => {
        // make card
        const card = document.createElement('div');
        // set class
        card.classList.add('card');

        // set card index, using library array length
        card.setAttribute('data-index', book.index)
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');

        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        read.classList.add("read");

        const toggleRead = document.createElement('button');
        toggleRead.classList.add("toggle-read");
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
        if (book.read == true) {
            read.textContent = 'Read!'
        } else {
            read.textContent = "Not read :("
        }
        // read.textContent = book.read //look into this

        toggleRead.textContent = 'read/unread';
        removeCard.textContent = 'remove card';

        getCardContainer().appendChild(card);
    
    }

    const displayAllBooks = () => {

        // empties the container
        while (getCardContainer().lastChild) {
            getCardContainer().removeChild(getCardContainer().lastChild)
        }
        // adds books to empty container
        for (const book of libraryModule.getMyLibrary()) {
            console.log(book);
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

        // remove card
        getCardContainer().addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-card')) {
                let index = Number(e.target.parentElement.dataset.index);
                libraryController.deleteBook(index);
                displayAllBooks();
            }
        });


        // toggle read status
        getCardContainer().addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-read')) {
                let index = Number(e.target.parentElement.dataset.index);
                console.log('asdfhskaj')
                // get the matching book, and set its toggle read status to opposite
                getMatchingBook(index).toggleRead()
                displayAllBooks();
            }
        });

        getPopup().addEventListener('click', (e) => {
            if (e.target.id == 'blocker') {
                hideForm();
                resetForm();
                }
        })

        })();

    //initialise books display
    displayAllBooks();


    console.log(libraryModule.getMyLibrary());
})();
