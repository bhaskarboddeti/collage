

class Book{
    constructor(date,student, title,author,isbn)
    {
        this.date =date;
        this.student =student;
     this.title =title;
     this.author =author;
     this.isbn =isbn;
    

    }

}
class UI
{
static displaybooks() 
{
    let d = new Date();

    const storedBooks=store.getBooks();
    const books=storedBooks;
    books.forEach((book)=>UI.addBookToList(book));
    
}
static addBookToList(book)
    {
       const list1 =document.querySelector('#book-list2');
       const row1 =document.createElement('tr');
       row1.innerHTML=   `
       <td>${book.date}</td>
       <td>${book.student}</td>
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td> <a href="#" class="btn btn-danger btn-sm delete">DELETE</a> </td>
     `;
       list1.appendChild(row1);
  
    }

}
class store
{
    static getBooks()
    {
     let books;
     if(localStorage.getItem('books')=== null)
     {
        books=[];
     }
     else
     {
     books=JSON.parse(localStorage.getItem('books'));

     }
     return books;
    }
    static addBook(book)
        {
          const books=store.getBooks();  
          books.push(book);
          localStorage.setItem('books', JSON.stringify(books));

     }
     static removeBook(isbn)
     {
         const books= store.getBooks();
         console.log(JSON.stringify(books));
         books.forEach((book,index)=> 
         {
             if(book.isbn === isbn)
             {
                 books.splice(index,1);
             }
         }
         
         );
         console.log(books);
         localStorage.setItem( 'books', JSON.stringify(books));

     }

}     
document.addEventListener('DOMContentLoaded', UI.displaybooks);


