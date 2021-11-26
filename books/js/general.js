const contry_names = {AR: "Argentina", AT: "Austria", DE: "Alemania", ES: "España", FI: "Finlandia", FR: "Francia", GB: "Reino Unido", IE: "Irlanda", IT: "Italia", JP: "Japón", RU: "Rusia", US: "Estados Unidos de América"};
var libros;

fetch('./assets/libros.json')
  .then(response => response.json())
  .then(data => {
    libros = JSON.parse(JSON.stringify(data));

    let libreria = "";
    for(let i = 0; i < libros.length; i++) {
      let libro = libros[i];
      libreria += '<article>';
      libreria += '<img class="cover" src="'+libro.portada+'" alt="'+libro.titulo+'. '+libro.autor+', '+libro.anyo+'">';
      libreria += '<p><strong class="title">'+libro.titulo+'</strong><br><span class="author">'+libro.autor+'</span><br>';
      libreria += '<img class="flag" src="./img/flags/'+libro.pais.toLowerCase()+'.png" alt="Bandera de '+contry_names[libro.pais]+'" title="'+contry_names[libro.pais]+'"> <span class="year">'+libro.anyo+'</span></p>';
      libreria += '</article>';
    }
    document.getElementById('shelf').innerHTML = libreria;    
})

const filterCountry = countryCode => {
    let arrayOut = [];
    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.pais === countryCode) {
            arrayOut.push(libro);
        }
    }
    return arrayOut;
}
const filterGender = gender => { 
    let arrayOut = [];
    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.gender === gender) {
            arrayOut.push(libro);
        }
    }
    return arrayOut;
}
const filterYear = anyo => { 
    let arrayOut = [];
    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.anyo === anyo) {
            arrayOut.push(libro);
        }
    }
    return arrayOut;
}
const filterDecade = anyo => { 
    let decadeStart = Math.floor(anyo/10)*10+1;
    let decadeEnd = decadeStart+9;
    let arrayOut = [];
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.anyo >= decadeStart && libro.anyo <= decadeEnd) {
            arrayOut.push(libro);
        }
    }
    return arrayOut;
}
const findCountries = () => {
    let arrayOut = [];
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (!arrayOut.includes(libro.pais)) {
            arrayOut.push(libro.pais);
        }
    }
    arrayOut.sort();
    return arrayOut;
}
const findGenders = () => {
    let arrayOut = [];
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (!arrayOut.includes(libro.gender)) {
            arrayOut.push(libro.gender);
        }
    }
    arrayOut.sort();
    return arrayOut;
}
const findYears = () => {
    let arrayOut = [];
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (!arrayOut.includes(libro.anyo)) {
            arrayOut.push(libro.anyo);
        }
    }
    arrayOut.sort();
    return arrayOut;
}
const findDecades = () => {
    let arrayOut = [];
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        let decadeStart = Math.floor(libro.anyo/10)*10+1;
        if (!arrayOut.includes(decadeStart)) {
            arrayOut.push(decadeStart);
        }
    }
    arrayOut.sort();
    return arrayOut;
}
const summaryCountries = () => {
    let arrayIn = findCountries();
    for (let i=0; i<arrayIn.length; i++) {
        filterCountry(arrayIn[i]);
    }
}
const summaryGenders = () => {
    let arrayIn = findGenders();
    for (let i=0; i<arrayIn.length; i++) {
        filterGender(arrayIn[i]);
    }
}
const summaryYears = () => {
    let arrayIn = findYears();
    for (let i=0; i<arrayIn.length; i++) {
        filterYear(arrayIn[i]);
    }
}
const summaryDecades = () => {
    let arrayIn = findDecades();
    for (let i=0; i<arrayIn.length; i++) {
        filterDecade(arrayIn[i]);
    }
}
const fullSummary = () => {
    summaryCountries();
    summaryGenders();
    summaryYears();
    summaryDecades();
}