var books;

const showcase = books => {
    for(let i = 0; i < books.length; i++) {
        let book = books[i];
        let shelf = '<article>';
        shelf += '<img class="cover" src="'+book.cover+'" alt="'+book.name+'. '+book.writer+', '+book.published+'">';
        shelf += '<p><strong class="title">'+book.name+'</strong><br><span class="author">'+book.writer+'</span><br>';
        shelf += '<img class="flag" src="./img/flags/'+book.country.toLowerCase()+'.png"> <span class="year">'+book.published+'</span></p>';
        shelf += '</article>';
    }
    document.getElementById('shelf').innerHTML = shelf;    
}

fetch('./assets/books.json')
  .then(response => response.json())
  .then(data => {
    books = JSON.parse(JSON.stringify(data));
    showcase(books);
  })