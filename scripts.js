const books = [
    { title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", category: "Software_Development", borrowed: false, borrower: null, returnDate: null },
    { title: "The Pragmatic Programmer: Your Journey to Mastery", author: "Andrew Hunt", category: "Software_Development", borrowed: false, borrower: null, returnDate: null },
    { title: "Refactoring: Improving the Design of Existing Code", author: "Martin Fowler", category: "Software_Development", borrowed: false, borrower: null, returnDate: null },
    { title: "Hacking: The Art of Exploitation", author: "Jon Erickson", category: "Cybersecurity", borrowed: false, borrower: null, returnDate: null },
    { title: "Metasploit: The Penetration Tester's Guide", author: "David Kennedy", category: "Cybersecurity", borrowed: false, borrower: null, returnDate: null },
    { title: "The Art of Data Science", author: "Roger D. Peng", category: "Data_Science", borrowed: false, borrower: null, returnDate: null },
    { title: "Deep Learning", author: "Ian Goodfellow", category: "Data_Science", borrowed: false, borrower: null, returnDate: null },

];

function searchBooks() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const results = books.filter(book =>
        book.title.toLowerCase().includes(input) ||
        book.author.toLowerCase().includes(input)
    );
    displayResults(results, 'searchResults');
}

function showCategory(category) {
    const results = books.filter(book => book.category === category);
    displayResults(results, 'categoryResults');
}

function displayResults(results, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = results.map(book => 
        `<div>
            <strong>${book.title}</strong> by ${book.author} - ${book.borrowed ? 'Borrowed by ' + book.borrower + ' (Return by: ' + book.returnDate + ')' : 'Available'}
        </div>`
    ).join('');
}

function showHistory() {
    const results = books.filter(book => book.borrowed);
    displayResults(results, 'historyResults');
}

document.getElementById('addBookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    books.push({ title, author, category, borrowed: false, borrower: null, returnDate: null });
    alert('Book added successfully!');
    document.getElementById('addBookForm').reset();
    searchBooks(); 
});

document.getElementById('borrowBookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('borrowTitle').value;
    const borrower = document.getElementById('borrower').value;
    const returnDate = document.getElementById('returnDate').value;

    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());
    if (book) {
        if (!book.borrowed) {
            book.borrowed = true;
            book.borrower = borrower;
            book.returnDate = returnDate;
            alert('Borrowing recorded successfully!');
        } else {
            alert('Book is already borrowed.');
        }
    } else {
        alert('Book not found.');
    }
    document.getElementById('borrowBookForm').reset();
    showHistory();
});

showHistory();
