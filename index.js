const text = document.querySelector('.quote');
const author = document.querySelector('.author');
const nextBtn = document.getElementById("next-btn");
const quoteAddForm = document.getElementById("new-quote-container");
const addQuoteBtn = document.getElementById("new-quote-btn");
const createButton = document.getElementById("create-quote-btn");
let quoterName = document.getElementsByName('quoter-name');
let quoteText = document.getElementsByName('quote-text');
let form = document.querySelector(".add-quote-form");
let addQuote = false;
const getQuote = () => {
   fetch('http://localhost:3000/quotes')
   .then(function(response){
      return response.json();
      
   })
   .then(function(json){
   console.log(json)
   const quoteData = json;
   const num = Math.floor(Math.random()*quoteData.length);
   const filteredQuoteData = quoteData;
  
   

   const item = filteredQuoteData[num];
   //console.log(item);
   //all data
   const quote = item.text;
   const authorName = item.author;
   text.innerText = quote;
   author.innerText = authorName;
   })  
}
document.addEventListener("DOMContentLoaded", () => {
   getQuote();
   nextBtn.addEventListener('click', () => {
   getQuote();
})
})

addQuoteBtn.addEventListener("click", () => {
   addQuote = !addQuote;
   if (addQuote) {
      quoteAddForm.style.display = "block";
      form.addEventListener("submit", (event) => {
         event.preventDefault();
         if (event.target.quoteInput.value != "" && event.target.nameInput.value != "") {
         function postQuote(){
            fetch("http://localhost:3000/quotes", {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                   text: event.target.quoteInput.value,
                   author: event.target.nameInput.value
                })
             })
            .then(response => response.json())

            .then(data => {
               console.log('Success:', data);
             })
            .catch((error) => {
               console.error('Error:', error);
               });
            }
            postQuote();
            form.reset();
            quoteAddForm.style.display = "none";
         }   
      })
    } else {
      quoteAddForm.style.display = "none";
    }
})


