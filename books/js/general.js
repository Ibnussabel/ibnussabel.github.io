var books, writers, countries, genders, ratings;
genders = [
  {"code": "male", "name": "masculino"}, 
  {"code": "female", "name": "femenino"}, 
  {"code": null, "name": "otro"}
];

ratings = [
  {"code": "1", "name": "&starf;&star;&star;&star;&star;"}, 
  {"code": "2", "name": "&starf;&starf;&star;&star;&star;"}, 
  {"code": "3", "name": "&starf;&starf;&starf;&star;&star;"}, 
  {"code": "4", "name": "&starf;&starf;&starf;&starf;&star;"}, 
  {"code": "5", "name": "&starf;&starf;&starf;&starf;&starf;"}, 
  {"code": null, "name": "&star;&star;&star;&star;&star;"}
];

const showcase = (books) => {
    let shelf = '';

    for(let i = 0; i < books.length; i++) {
        let book = books[i];
        let author = writers.find(person => person.name == book.writer);
        let country = countries.find(place => place.code == author.country);
        let rating = ratings.find(points => points.code == book.rating);
 
        shelf += '<article>';
        shelf += '<img class="cover" src="'+book.cover+'" alt="'+book.name+'. '+book.writer+', '+book.published+'">';
        shelf += '<p><strong class="rating">'+rating.name+'</strong><br>';
        shelf += '<strong class="title">'+book.name+'</strong><br><span class="author">'+book.writer+'</span><br>';
        shelf += '<img class="flag" src="./img/flags/'+author.country.toLowerCase()+'.png" alt="'+country.name+' flag" title="'+country.name+'"> <span class="year">'+book.published+'</span></p>';
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
      
    fetch('./assets/languages.json')
      .then(response => response.json())
      .then(data => {
        languages = JSON.parse(JSON.stringify(data));

      fetch('./assets/books.json')
        .then(response => response.json())
        .then(data => {
          books = JSON.parse(JSON.stringify(data));

        showcase(books);
        document.getElementById('title').innerText = 'Mis lecturas ('+books.length+')';
      })
    })
  })
})

const filterBooks = (tag, operator, comparison) => {
  let books2, criteria, arg1;
  
  if (tag == 'name' || tag == 'published' || tag == 'writer' || tag == 'read' || tag == 'language' || tag == 'rating') {
    switch (operator) {
      case 'same':
        books2 = books.filter(book => book[tag] == comparison);
        arg1 = 'en '+comparison;
        arg2 = comparison+' estrellas';
        break;
      case 'more':
        books2 = books.filter(book => book[tag] > comparison);
        arg1 = 'después de '+comparison;
        arg2 = 'Más de '+comparison+' estrellas';
        break;
      case 'less':
        books2 = books.filter(book => book[tag] < comparison);
        arg1 = 'antes de '+comparison;
        arg2 = 'Menos de '+comparison+' estrellas';
        break;
      case 'has':
        books2 = books.filter(book => book[tag].includes(comparison));
        break;
      case 'sameormore':
        books2 = books.filter(book => book[tag] >= comparison);
        arg1 = 'en '+comparison+' o después';
        arg2 = comparison+' estrellas o más';
        break;
      case 'sameorless':
        books2 = books.filter(book => book[tag] <= comparison);
        arg1 = 'en '+comparison+' o antes';
        arg2 = comparison+' estrellas o menos';
        break;
    }
  }

  switch (tag) {
    case 'published':
      criteria = 'Publicado '+arg1;
      break;
    case 'read':
      criteria = 'Leído '+arg1;
      break;
    case 'name':
      if (operator == 'same') {
        criteria = 'Titulado "'+comparison+'"';
      } else {
        criteria = 'El título contiene "'+comparison+'"';
      }
      break;
    case 'writer':
      if (operator == 'same') {
        criteria = 'Escrito por "'+comparison+'"';
      } else {
        criteria = 'El nombre del escritor contiene "'+comparison+'"';
      }
      break;
    case 'rating':
      criteria = 'Valoración '+arg2;
      break;
    case 'language':
      let language = languages.find(lang => lang.code == comparison);
      criteria = 'Escrito en '+language.name;
      break;
  } 

  if (books2.length) {
    showcase(books2);
    document.getElementById('title').innerText = criteria+' ('+books2.length+')';
  } else {
    alert('El filtro introducido no ha producido ningún resultado.')
  }
}

const resetBooks = () => {
  showcase(books);
  document.getElementById('title').innerText = 'Mis lecturas ('+books.length+')';
}

const armaSelect = (collection, id) => {
  let select = '<select id='+id+' name='+id+'>';
  for(let i = 0; i < collection.length; i++) {
    let item = collection[i];
    select += '<option value='+item.code+'>'+item.name+'</option>';
  }
  select += '</select>';

  return select;
}

const checkComparison = () => {
  if (document.filtro.tag.value == 'language') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(languages, 'comparison');
  } else if (document.filtro.tag.value == 'country') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(countries, 'comparison');
  } else if (document.filtro.tag.value == 'rating') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(ratings, 'comparison');
  } else if (document.filtro.tag.value == 'gender') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(genders, 'comparison');
  } else {
    document.getElementById('fieldComparison').innerHTML = '<input type="text" id="comparison" name="comparison">';
  }
}