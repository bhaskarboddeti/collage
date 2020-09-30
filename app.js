

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
    document.querySelector('#date').value = d.getFullYear()+'-'+('0'+(d.getMonth()+1))+'-'+('0'+d.getDate())+"T"+d.getHours()+":"+d.getMinutes();
    const storedBooks=store.getBooks();
    const books=storedBooks;
    books.forEach((book)=>UI.addBookToList(book));
    
}
static addBookToList(book)
    {
       const list =document.querySelector('#book-list');
       const row =document.createElement('tr');
       row.innerHTML=   `
       <td>${book.date}</td>
       <td>${book.student}</td>
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td> <a href="#" class="btn btn-danger btn-sm delete">DELETE</a> </td>
     `;
       list.appendChild(row);
  
    }
    

    static deleteBook(target){

        if(target.classList.contains('delete'))
    {
        target.parentElement.parentElement.remove();
    }
        
       


    }

    static showAlert(message,className)
    {
        const div=document.createElement('div');
        div.className=`alert alert-${className}`; 
        div.appendChild(document.createTextNode(message));
        const container= document.querySelector('.container');
        const form=document.querySelector('#book-Form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static clearfields(){
        document.getElementById('date').value='';
        document.getElementById('student').value='';
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
        

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

document.getElementById('book-Form').addEventListener('submit', (e)=>{
   e.preventDefault();
   console.log(1);
   const date=document.querySelector('#date').value;
   const student=document.querySelector('#student').value;
   const title=document.querySelector('#title').value;
   const author=document.querySelector('#author').value;
   const isbn=document.querySelector('#isbn').value;

   if(title==='' || author==='' || isbn==='' || student==='')
   {
        UI.showAlert('PLEASE FILL ALL DETAILS','danger');
   }
   else
   {
    const book= new Book(date,student,title,author,isbn);
    UI.addBookToList(book);
    store.addBook(book);
    UI.clearfields();
   
    UI.showAlert('RECORD ADDED','success')
       
 
   }
});

  
document.getElementById('book-list').addEventListener('click',(e)=>
{
    UI.deleteBook(e.target);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    alert('ARE YOU SURE');
    UI.showAlert('BOOK DELETED', 'success');
}

);
