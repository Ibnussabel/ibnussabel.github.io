var books;
var writers;
var countries;

const showcase = (books) => {
    let book, author, country, gender;
    let shelf = '';

    for(let i = 0; i < books.length; i++) {
        book = books[i];
        author = writers.find(person => person.name == book.writer);        
        gender = author.gender;
        country = author.country;

        shelf += '<article>';
        shelf += '<img class="cover" src="'+book.cover+'" alt="'+book.name+'. '+book.writer+', '+book.published+'">';
        shelf += '<p><strong class="title">'+book.name+'</strong><br><span class="author '+gender+'">'+book.writer+'</span><br>';
        shelf += '<img class="flag" src="./img/flags/'+country.toLowerCase()+'.png"> <span class="year">'+book.published+'</span></p>';
        shelf += '</article>';
    }
    document.getElementById('shelf').innerHTML = shelf;    
}

fetch('./assets/writers.json')
  .then(response => response.json())
  .then(data => {
    writers = JSON.parse(JSON.stringify(data));

  fetch('./assets/countries.json')
    .then(response => response.json())
    .then(data => {
      countries = JSON.parse(JSON.stringify(data));

  fetch('./assets/books.json')
    .then(response => response.json())
    .then(data => {
      books = JSON.parse(JSON.stringify(data));

      showcase(books);
    })
  })
})