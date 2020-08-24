const myform= document.querySelector('#my-form');
const nameInput= document.querySelector('#name');
const emailInput= document.querySelector('#email');
const msg= document.querySelector('.msg');

myform.addEventListener('submit' , onsubmit);
function onSubmit(e){
    if(nameInput==='' || emailInput===''){
        msg.classList.add('error');
    }
    else
        console.log("sucess");
    
   
}
