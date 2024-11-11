document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const loadBookButton = document.getElementById('loadBooks');
    const bookForm = document.querySelector('form');
    const bookList = document.querySelector('tbody');
    const titleInput = bookForm.querySelector('input[name="title"]');
    const authorInput = bookForm.querySelector('input[name="author"]');
    const submitButton = bookForm.querySelector('button');

    // Add event listeners for loading books and form submission
    loadBookButton.addEventListener('click', loadBooks);
    bookForm.addEventListener('submit', handleFormSubmit);

    // Load all books function
    async function loadBooks() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load books.');

            const data = await response.json();
            bookList.innerHTML = '';  // Clear previous entries in table
            
            Object.entries(data).forEach(([id, book]) => {
                const row = document.createElement('tr');

                const titleCell = document.createElement('td');
                titleCell.textContent = book.title;
                row.appendChild(titleCell);

                const authorCell = document.createElement('td');
                authorCell.textContent = book.author;
                row.appendChild(authorCell);

                const actionCell = document.createElement('td');

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.setAttribute('data-id', id);
                editButton.addEventListener('click', handleEdit);
                actionCell.appendChild(editButton);

                const delButton = document.createElement('button');
                delButton.textContent = 'Delete';
                delButton.setAttribute('data-id', id);
                delButton.addEventListener('click', handleDelete);
                actionCell.appendChild(delButton);

                row.appendChild(actionCell);
                bookList.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    // Form submit handler for creating or updating a book
    async function handleFormSubmit(e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const bookId = bookForm.getAttribute('data-id');

        if (!title || !author) {
            alert('Please fill in both title and author fields.');
            return;
        }

        const bookData = { title, author };

        try {
            let response;
            if (bookId) {
                // Update existing book
                response = await fetch(`${url}/${bookId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData),
                });
                bookForm.removeAttribute('data-id');
                submitButton.textContent = 'Submit';
            } else {
                // Create new book
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData),
                });
            }

            if (!response.ok) throw new Error('Failed to save book.');

            // Clear form fields and reload books
            titleInput.value = '';
            authorInput.value = '';
            loadBooks();
        } catch (error) {
            console.error('Error saving book:', error);
        }
    }

    // Edit button handler for loading book data into form for editing
    function handleEdit(e) {
        const bookId = e.target.getAttribute('data-id');
        const row = e.target.parentElement.parentElement;
        const title = row.children[0].textContent;
        const author = row.children[1].textContent;

        // Populate form with book data for editing
        titleInput.value = title;
        authorInput.value = author;
        bookForm.setAttribute('data-id', bookId);
        submitButton.textContent = 'Update Book';
    }

    // Delete button handler for removing a book
    async function handleDelete(e) {
        const bookId = e.target.getAttribute('data-id');

        try {
            const response = await fetch(`${url}/${bookId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete book.');

            loadBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
});
