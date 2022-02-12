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
        let ratingClass = '';
 
        if (book.rating === null) {
          ratingClass = 'dim';
        }
        shelf += '<article>';
        shelf += '<a href="'+book.url+'" title="'+book.name+'. '+book.writer+', '+book.published+'"><img class="cover" src="'+book.cover+'" alt="'+book.name+'. '+book.writer+', '+book.published+'"></a>';
        shelf += '<p><strong class="rating '+ratingClass+'">'+rating.name+'</strong><br>';
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
  let books2, criteria, arg1, writers2;
  
  if (tag == 'name' || tag == 'writer' || tag == 'read' || tag == 'language' || tag == 'rating') {
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
      let startYear = Math.floor(comparison/10)*10+1;
      let endYear = startYear+10;
      let decade = Math.floor(comparison/10)*10+'s';
      switch (operator) {
        case 'same':
          books2 = books.filter(book => (book[tag] >= startYear && book[tag] <= endYear));
          arg1 = 'en los '+decade;
          break;
        case 'more':
          books2 = books.filter(book => book[tag] > endYear);
          arg1 = 'después de los '+decade;
          break;
        case 'less':
          books2 = books.filter(book => book[tag] < startYear);
          arg1 = 'antes de los '+decade;
          break;
        case 'sameormore':
          books2 = books.filter(book => book[tag] >= startYear);
          arg1 = 'en los '+decade+' o después';
          break;
        case 'sameorless':
          books2 = books.filter(book => book[tag] <= endYear);
          arg1 = 'en los '+decade+' o antes';
          break;
      }
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
    case 'country':
      writers2 = writers.filter(writer => writer.country == comparison);
      books2 = books.filter(book => writers2.find(writer => writer.name == book.writer))
      let country = countries.find(country => country.code == comparison);
      criteria = 'Escritor(es) de '+country.name;
      break;
    case 'gender':
      writers2 = writers.filter(writer => writer.gender == comparison);
      books2 = books.filter(book => writers2.find(writer => writer.name == book.writer))
      if (comparison === 'male') {
        criteria = 'Escritores';
      } else if (comparison === 'female') {
        criteria = 'Escritoras';
      } else {
        criteria = "Escritores sin género";
      }
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
  document.filtro.tag.selectedIndex = 0;
  document.filtro.operator.selectedIndex = 0;
  checkComparison();
  document.filtro.comparison.value = '';
  document.getElementById('title').innerText = 'Mis lecturas ('+books.length+')';
}

const armaSelect = (collection, tag, id) => {
  let count;
  let select = '<select id='+id+' name='+id+'>';
  for(let i = 0; i < collection.length; i++) {
    let item = collection[i];
    if (item.code) {
      count = countBooks(tag, item.code);
      if (count > 0) {
        select += '<option value='+item.code+'>'+item.name+' ('+count+')</option>';
      }
    }
  }
  select += '</select>';

  return select;
}

const checkComparison = () => {
  if (document.filtro.tag.value == 'language') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(languages, 'language', 'comparison');
  } else if (document.filtro.tag.value == 'country') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(countries, 'country', 'comparison');
  } else if (document.filtro.tag.value == 'rating') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(ratings, 'rating', 'comparison');
  } else if (document.filtro.tag.value == 'gender') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(genders, 'gender', 'comparison');
  } else {
    document.getElementById('fieldComparison').innerHTML = '<input type="text" id="comparison" name="comparison">';
  }
}

const countBooks = (tag, comparison) => {
  let books2, writers2;
  
  if (tag == 'name' || tag == 'published' || tag == 'writer' || tag == 'read' || tag == 'language' || tag == 'rating') {
        books2 = books.filter(book => book[tag] == comparison);
  } else if (tag == 'country') {
      writers2 = writers.filter(writer => writer.country == comparison);
      books2 = books.filter(book => writers2.find(writer => writer.name == book.writer))
  } else if (tag == 'gender') {
      writers2 = writers.filter(writer => writer.gender == comparison);
      books2 = books.filter(book => writers2.find(writer => writer.name == book.writer))
  } 

  return books2.length;
}