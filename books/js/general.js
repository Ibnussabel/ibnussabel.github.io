var books, writers, countries, genders, ratings, series, selectedBooks;
var datos_genero = [];
var datos_idioma = [];
var datos_pais = [];
var datos_decada = [];
var datos_autor = [];
var datos_serie = [];
var datos_puntuacion = [];

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
  selectedBooks = books;

  for(let i = 0; i < books.length; i++) {
      let book = books[i];
      let author = writers.find(person => person.name == book.writer);
      console.log("author.country: "+author.country);
      let country = countries.find(place => place.code == author.country);
      console.log("country: "+country);
      let rating = ratings.find(points => points.code == book.rating);
      let ratingClass = '';

      if (book.rating === null) {
        ratingClass = 'dim';
      }
      shelf += '<article>';
      shelf += '<a href="https://www.goodreads.com/book/show/'+book.id+'" title="'+book.name+'. '+book.writer+', '+book.published+'"><img class="cover" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/'+book.cover+'/'+book.id+'.jpg" alt="'+book.name+'. '+book.writer+', '+book.published+'"></a>';
      shelf += '<p><strong class="rating '+ratingClass+'">'+rating.name+'</strong><br>';
      shelf += '<strong class="title">'+book.name+'</strong><br><span class="author">'+book.writer+'</span><br>';
      shelf += '<img class="flag" src="./img/flags/'+author.country.toLowerCase()+'.png" alt="'+country.name+' flag" title="'+country.name+'"> <span class="year">'+book.published+'</span></p>';
      shelf += '</article>';
  }
  document.getElementById('shelf').innerHTML = shelf;    
}

const stats = () => {
    let graphs = '';

    fullSummary();

    document.getElementById('stats').innerHTML = graphs;    
}

const filterBooks = (tag, operator, comparison) => {
  let books2, criteria, arg1, writers2;
  
  if (tag == 'name' || tag == 'writer' || tag == 'read' || tag == 'language' || tag == 'rating' || tag == 'series') {
    switch (operator) {
      case 'same':
        books2 = selectedBooks.filter(book => book[tag] == comparison);
        arg1 = 'en '+comparison;
        arg2 = comparison+' estrellas';
        break;
      case 'more':
        books2 = selectedBooks.filter(book => book[tag] > comparison);
        arg1 = 'después de '+comparison;
        arg2 = 'Más de '+comparison+' estrellas';
        break;
      case 'less':
        books2 = selectedBooks.filter(book => book[tag] < comparison);
        arg1 = 'antes de '+comparison;
        arg2 = 'Menos de '+comparison+' estrellas';
        break;
      case 'has':
        books2 = selectedBooks.filter(book => book[tag].includes(comparison));
        break;
      case 'sameormore':
        books2 = selectedBooks.filter(book => book[tag] >= comparison);
        arg1 = 'en '+comparison+' o después';
        arg2 = comparison+' estrellas o más';
        break;
      case 'sameorless':
        books2 = selectedBooks.filter(book => book[tag] <= comparison);
        arg1 = 'en '+comparison+' o antes';
        arg2 = comparison+' estrellas o menos';
        break;
    }
  }

  switch (tag) {
    case 'published':
      let startYear = Math.floor(comparison/10)*10+1;
      let endYear = startYear+9;
      let decade = Math.floor(comparison/10)*10+'s';
      switch (operator) {
        case 'same':
          books2 = selectedBooks.filter(book => (book[tag] >= startYear && book[tag] <= endYear));
          arg1 = 'en los '+decade;
          break;
        case 'more':
          books2 = selectedBooks.filter(book => book[tag] > endYear);
          arg1 = 'después de los '+decade;
          break;
        case 'less':
          books2 = selectedBooks.filter(book => book[tag] < startYear);
          arg1 = 'antes de los '+decade;
          break;
        case 'sameormore':
          books2 = selectedBooks.filter(book => book[tag] >= startYear);
          arg1 = 'en los '+decade+' o después';
          break;
        case 'sameorless':
          books2 = selectedBooks.filter(book => book[tag] <= endYear);
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
      books2 = selectedBooks.filter(book => writers2.find(writer => writer.name == book.writer))
      let country = countries.find(country => country.code == comparison);
      criteria = 'Escritor(es) de '+country.name;
      break;
    case 'gender':
      writers2 = writers.filter(writer => writer.gender == comparison);
      books2 = selectedBooks.filter(book => writers2.find(writer => writer.name == book.writer))
      if (comparison === 'male') {
        criteria = 'Escritores';
      } else if (comparison === 'female') {
        criteria = 'Escritoras';
      } else {
        criteria = "Escritores sin género";
      }
      break;
    case 'series':
      let series2 = series.find(item => item.code == comparison);
      criteria = series2.name;
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

const armaSelectDecades = (id) => {
  let count, decade;
  let select = '<select id='+id+' name='+id+'>';
  for(let i = 1800; i <= 2100; i += 10) {
    count = countBooks('published', i);
    decade = Math.floor(i/10)*10+'s';
    if (count > 0) {
      select += '<option value='+i+'>'+decade+' ('+count+')</option>';
    }
  }
  select += '</select>';

  return select;
}

const checkComparison = () => {
  if (document.filtro.tag.value == 'language') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(languages, 'language', 'comparison');
    availableOptions([0]);
  } else if (document.filtro.tag.value == 'country') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(countries, 'country', 'comparison');
    availableOptions([0]);
  } else if (document.filtro.tag.value == 'rating') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(ratings, 'rating', 'comparison');
    availableOptions([0,2,3,4,5]);
  } else if (document.filtro.tag.value == 'gender') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(genders, 'gender', 'comparison');
    availableOptions([0]);
  } else if (document.filtro.tag.value == 'series') {
    document.getElementById('fieldComparison').innerHTML = armaSelect(series, 'series', 'comparison');
    availableOptions([0]);
  } else if (document.filtro.tag.value == 'published') {
    document.getElementById('fieldComparison').innerHTML = armaSelectDecades('comparison');
    availableOptions([0,2,3,4,5]);
  } else {
    if (document.filtro.tag.value == 'name' || document.filtro.tag.value == 'writer') {
      availableOptions([0,1]);
    } else {
      availableOptions([0,2,3,4,5]);
    }
    document.getElementById('fieldComparison').innerHTML = '<input type="text" id="comparison" name="comparison">';
  }
}

const countBooks = (tag, comparison) => {
  let books2, writers2;
  
  if (tag == 'name' || tag == 'writer' || tag == 'read' || tag == 'language' || tag == 'rating' || tag == 'series') {
        books2 = selectedBooks.filter(book => book[tag] == comparison);
  } else if (tag == 'country') {
      writers2 = writers.filter(writer => writer.country == comparison);
      books2 = selectedBooks.filter(book => writers2.find(writer => writer.name == book.writer))
  } else if (tag == 'gender') {
    writers2 = writers.filter(writer => writer.gender == comparison);
    books2 = selectedBooks.filter(book => writers2.find(writer => writer.name == book.writer))
  } else if (tag == 'published') {
      let startYear = Math.floor(comparison/10)*10+1;
      let endYear = startYear+9;
      books2 = selectedBooks.filter(book => (book[tag] >= startYear && book[tag] <= endYear));
  } 

  return books2.length;
}

const availableOptions = options => {
  for (let i = 0; i<document.getElementById('operator').options.length; i++) {
    if (options.includes(i)) {
      document.getElementById('operator').options[i].disabled = false;
    } else {
      document.getElementById('operator').options[i].disabled = true;
    }
  }
}

const fullSummary = () => {
  let i, linea1, linea2;

  for (i=0; i<genders.length; i++) {
    linea1 = genders[i].name;
    linea2 = countBooks('gender', genders[i].code);
    datos_genero.push([linea1, linea2]);
  }

  for (i=0; i<languages.length; i++) {
    linea1 = languages[i].name;
    linea2 = countBooks('language', languages[i].code);
    datos_idioma.push([linea1, linea2]);
  }
  
  for (i=0; i<countries.length; i++) {
    linea1 = countries[i].name;
    linea2 = countBooks('country', countries[i].code);
    datos_pais.push([linea1, linea2]);
  }
  
  for(i = 1800; i <= 2100; i += 10) {
    linea1 = Math.floor(i/10)*10+'s';
    linea2 = countBooks('published', i);
    datos_decada.push([linea1, linea2]);
  }
  
  for (i=0; i<writers.length; i++) {
    linea1 = writers[i].name;
    linea2 = countBooks('writer', writers[i].name);
    datos_autor.push([linea1, linea2]);
  }
  
  for (i=0; i<series.length; i++) {
    linea1 = series[i].name+' ('+series[i].writer+')';
    linea2 = countBooks('series', series[i].code);
    datos_serie.push([linea1, linea2]);
  }
  
  for (i=0; i<ratings.length; i++) {
    linea1 = ratings[i].code+' estrellas';
    linea2 = countBooks('rating', ratings[i].code);
    datos_puntuacion.push([linea1, linea2]);
  }
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

      fetch('./assets/series.json')
        .then(response => response.json())
        .then(data => {
          series = JSON.parse(JSON.stringify(data));

        fetch('./assets/books.json')
          .then(response => response.json())
          .then(data => {
            books = JSON.parse(JSON.stringify(data));

          if (document.getElementById('shelf')) {
            showcase(books);
            resetBooks();
          }

          if (document.getElementById('stats')) {
            stats();
          }
        })
      })
    })
  })
})