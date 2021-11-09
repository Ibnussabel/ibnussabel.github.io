const libros = [
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1512236412l/36756418.jpg", titulo:"Crimen y castigo", anyo:1866, autor:"Fyodor Dostoevsky", gender:"male", pais:"RU"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1504302533l/3203575.jpg", titulo:"El hereje", anyo:1998, autor:"Miguel Delibes", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581579145l/51219756.jpg", titulo:"The Ballad of Songbirds and Snakes", anyo:2020, autor:"Suzanne Collins", gender:"female", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1469463042l/31217006.jpg", titulo:"El hombre en busca de sentido", anyo:1946, autor:"Viktor E. Frankl", gender:"male", pais:"AT"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1616174335l/57286545.jpg", titulo:"Bestiario de Tierra y Tinta", anyo:2021, autor:"Clara Dies Valls", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1611855460l/56869429.jpg", titulo:"La Montaña Mágica", anyo:1924, autor:"Thomas Mann", gender:"male", pais:"DE"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1448531478l/27976165.jpg", titulo:"Donde las calles no tienen nombre", anyo:2015, autor:"Mónica Rouanet", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1534795268l/15159488.jpg", titulo:"L'herència de Horst", anyo:2017, autor:"Teresa Roig", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522139806l/39651837.jpg", titulo:"La novia gitana", anyo:2018, autor:"Carmen Mola", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1551817480l/44284989.jpg", titulo:"La Red Púrpura ", anyo:2019, autor:"Carmen Mola", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1579946533l/50273222.jpg", titulo:"La nena", anyo:2020, autor:"Carmen Mola", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543232739l/41743264.jpg", titulo:"Reina roja", anyo:2018, autor:"Juan Gomez-Jurado", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1547655350l/40922689.jpg", titulo:"Normal People", anyo:2019, autor:"Sally Rooney", gender:"female", pais:"IE"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327204331l/6875163.jpg", titulo:"Traición", anyo:2005, autor:"Scott Westerfeld", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1335402659l/7902876.jpg", titulo:"Perfección", anyo:2005, autor:"Scott Westerfeld", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1282306112l/8958575.jpg", titulo:"Inés y la alegría", anyo:2010, autor:"Almudena Grandes", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1594220208l/26082916.jpg", titulo:"Ready Player Two", anyo:2020, autor:"Ernest Cline", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1572791309l/46202074.jpg", titulo:"Loba negra", anyo:2019, autor:"Juan Gomez-Jurado", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1330632094l/1432331.jpg", titulo:"Arsène Lupin, gentleman cambrioleur", anyo:1907, autor:"Maurice Leblanc", gender:"male", pais:"FR"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1453413382l/28669589.jpg", titulo:"La ragazza dagli occhi di carta", anyo:2015, autor:"Ilaria Tuti", gender:"female", pais:"IT"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347477576l/128534.jpg", titulo:"Off the Road", anyo:1994, autor:"Jack Hitt", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1331400133l/13519707.jpg", titulo:"El lector de Julio Verne", anyo:2012, autor:"Almudena Grandes", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562520707l/43246350.jpg", titulo:"Tierra de mujeres", anyo:2019, autor:"María Sánchez", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1419003669l/6483211.jpg", titulo:"El nombre del viento", anyo:2007, autor:"Patrick Rothfuss", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593528391l/54334693.jpg", titulo:"Rey blanco", anyo:2020, autor:"Juan Gomez-Jurado", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1318624420l/12877610.jpg", titulo:"El temor de un hombre sabio", anyo:2011, autor:"Patrick Rothfuss", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1558367342l/45892029.jpg", titulo:"El árbol del relámpago", anyo:2014, autor:"Patrick Rothfuss", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1269616318l/7919125.jpg", titulo:"Especiales", anyo:2006, autor:"Scott Westerfeld", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1405690765l/22740436.jpg", titulo:"La música del silencio", anyo:2014, autor:"Patrick Rothfuss", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546515382l/43450707.jpg", titulo:"El árbol de las historias vivas", anyo:2018, autor:"Katrin Pereda", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1438168630l/4655733.jpg", titulo:"Un grito de amor desde el centro del mundo", anyo:2001, autor:"Kyōichi Katayama", gender:"male", pais:"JP"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1338821410l/14762202.jpg", titulo:"El Juego de la Oca", anyo:2012, autor:"Fran J. Marber", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1346463354l/15953611.jpg", titulo:"El año de la liebre", anyo:1975, autor:"Arto Paasilinna ", gender:"male", pais:"FI"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1390513196l/20623749.jpg", titulo:"Las tres bodas de Manolita", anyo:2013, autor:"Almudena Grandes", gender:"female", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1432229875l/25576397.jpg", titulo:"Tres abuelas y un cocinero muerto", anyo:2013, autor:"Minna Lindgren", gender:"female", pais:"FI"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1603910684l/20426394.jpg", titulo:"El paciente", anyo:2014, autor:"Juan Gomez-Jurado", gender:"male", pais:"ES"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433804020l/25667918.jpg", titulo:"Binti", anyo:2015, autor:"Nnedi Okorafor", gender:"female", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1470413227l/30038654.jpg", titulo:"Home", anyo:2017, autor:"Nnedi Okorafor", gender:"female", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1495725402l/34386617.jpg", titulo:"The Night Masquerade", anyo:2018, autor:"Nnedi Okorafor", gender:"female", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1542215231l/32603079.jpg", titulo:"Wanderers", anyo:2019, autor:"Chuck Wendig", gender:"male", pais:"US"},
{portada:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1603910942l/27420709.jpg", titulo:"Cicatriz", anyo:2015, autor:"Juan Gomez-Jurado", gender:"male", pais:"ES"}
];
const columnas = 12;
const filterCountry = countryCode => { 
    let numBooks = 0;
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.pais === countryCode) {
            numBooks++;
        }
    }
    console.log('Country: '+countryCode+' | '+numBooks+' books');
}
const filterGender = gender => { 
    let numBooks = 0;
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.gender === gender) {
            numBooks++;
        }
    }
    console.log('Gender: '+gender+' | '+numBooks+' books');
}
const filterYear = anyo => { 
    let numBooks = 0;
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.anyo === anyo) {
            numBooks++;
        }
    }
    console.log('Year: '+anyo+' | '+numBooks+' books');
}
const filterDecade = anyo => { 
    let decadeStart = Math.floor(anyo/10)*10+1;
    let decadeEnd = decadeStart+9;
    let numBooks = 0;
    for(let i = 0; i < libros.length; i++) {
        let libro = libros[i];
        if (libro.anyo >= decadeStart && libro.anyo <= decadeEnd) {
            numBooks++;
        }
    }
    console.log('Decade: '+decadeStart+'-'+decadeEnd+' | '+numBooks+' books');
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
    const arrayIn = findCountries();
    for (let i=0; i<arrayIn.length; i++) {
        filterCountry(arrayIn[i]);
    }
}
const summaryGenders = () => {
    const arrayIn = findGenders();
    for (let i=0; i<arrayIn.length; i++) {
        filterGender(arrayIn[i]);
    }
}
const summaryYears = () => {
    const arrayIn = findYears();
    for (let i=0; i<arrayIn.length; i++) {
        filterYear(arrayIn[i]);
    }
}
const summaryDecades = () => {
    const arrayIn = findDecades();
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

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function libreria() {
    let libreria = "";
    for(var i = 0; i < libros.length; i++) {
        let libro = libros[i];
        libreria += '<article>';
        libreria += '<img src="'+libro.portada+'" alt="'+libro.titulo+'">';
        libreria += '<p><strong class="title">'+libro.titulo+'</strong><br><span class="author">'+libro.autor+'</span><br><span class="flag">'+getFlagEmoji(libro.pais)+'</span> <span class="year">'+libro.anyo+'</span></p>';
        libreria += '</article>';
    }

    document.getElementById('shelf').innerHTML = libreria;
}