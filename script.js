const myLibrary = [];

function Book(title, author,pages,read) {
    this.id = crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const newBook= new Book(title,author,pages,read)
    myLibrary.push(newBook);
}

function displayBooks(){

    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML="";

    myLibrary.forEach(book=>{
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement("p");
        pages.textContent = "Pages: " + book.pages;

        const status = document.createElement("p");
        status.textContent = "Status: " + (book.read ? "Read" : "Not Read");

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";

        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        card.append(title, author, pages, status, toggleBtn, removeBtn);
        libraryContainer.appendChild(card);
    })
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);

  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  displayBooks();
}

const newBookBtn = document.getElementById("newBookBtn");
const dialog = document.getElementById("bookDialog");
const closeDialog = document.getElementById("closeDialog");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

const form = document.getElementById("bookForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  form.reset();
  dialog.close();
});

// Example usage
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);

displayBooks();