const myLibrary = []

function Book(title, author, pages) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages`
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
    renderLibrary()
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages)
    myLibrary.push(newBook)
    renderLibrary()
}

function renderLibrary() {
    const table = document.querySelector("#bookTable tbody")

    table.replaceChildren()

    myLibrary.forEach((book) => {
        const row = table.insertRow()
        
        const bookId = book.id
        row.dataset.bookId = bookId

        
        const titleCell = row.insertCell()
        titleCell.textContent = book.title

        const authorCell = row.insertCell()
        authorCell.textContent = book.author

        const pagesCell = row.insertCell()
        pagesCell.textContent = book.pages

        const readCell = row.insertCell()
        readCell.textContent = book.read ? "✅" : "❌"

        const toolsCell = row.insertCell()

        const btnRead = document.createElement("button")
        btnRead.textContent = "R"
        btnRead.className = "btn btn-secondary btn-sm read-button m-1"
        
        const btnDelete = document.createElement("button")
        btnDelete.textContent = "X"
        btnDelete.className = "btn btn-danger btn-sm delete-button m-1"
        
        toolsCell.className = "text-end"
        toolsCell.style.width = "50px"
        toolsCell.appendChild(btnRead)
        toolsCell.appendChild(btnDelete)


    })
}

const newBookModal = document.querySelector("#newBookModal")
const btnNewBook = document.querySelector("#btnNewBook")
const btnCancel = document.querySelector("#btnCancel")
const btnSubmit = document.querySelector("#btnSubmit")
const bookTable = document.querySelector("#bookTable tbody")


btnNewBook.addEventListener("click", () => {
    newBookModal.showModal()
})

btnCancel.addEventListener("click", () => {
    newBookModal.close()
})

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // const newBookForm = document.querySelector("#newBookForm")
    const formData = new FormData(newBookForm)

    const title = formData.get("title")
    const author = formData.get("author")
    const pages = formData.get("pages")

    addBookToLibrary(title, author, pages)
    newBookForm.reset()
    newBookModal.close()

})

bookTable.addEventListener("click", (e) => {
    if (e.target.matches(".delete-button")) {
        const row = e.target.closest("tr")
        
        if (!row) return

        const id = row.dataset.bookId
        const idX = myLibrary.findIndex(b => b.id === id)

        if (idX !== -1) {
            myLibrary.splice(idX, 1)
            renderLibrary()
        }
    } else if (e.target.matches(".read-button")) {
        const row = e.target.closest("tr")
        
        if (!row) return

        const id = row.dataset.bookId
        const idR = myLibrary.findIndex(b => b.id === id)

        if (idR !== -1) {
            myLibrary[idR].toggleRead()
            renderLibrary()
        } 
    }
})


function seedLibrary() {
const samples = [
    ["Cooking for Dragons", "Sir Reginald Scorchington III", 842],
    ["Quantum Knitting for Beginners", "Dr. Loop Yarnstein", 128],
    ["The Unauthorized Biography of a Sock", "Linty McSockface", 56],
    ["How to Train Your Goldfish for Olympic Diving", "Bubbles O’Malley", 203],
    ["Fifty Shades of Beige", "Plain J. Boring", 312],
    ["The Great Avocado Conspiracy", "Guac E. Mole", 415],
  ];

  samples.forEach(([title, author, pages]) => {
    myLibrary.push(new Book(title, author, pages));
  });

  renderLibrary();
}

seedLibrary()
