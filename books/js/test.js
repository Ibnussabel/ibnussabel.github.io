// Funciona al navegador o a Node.js 18+ (on ja hi ha fetch).
// Si fas servir Node <18, instal·la node-fetch i importa'l.

const URLS = {
  books: "./assets/books.json",
  writers: "./assets/writers.json",
  languages: "./assets/languages.json",
  countries: "./assets/countries.json",
};

async function loadJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error carregant ${url}: ${res.status} ${res.statusText}`);
  return res.json();
}

function indexBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) map.set(keyFn(item), item);
  return map;
}

async function buildEnrichedBooks() {
  const [books, writers, languages, countries] = await Promise.all([
    loadJSON(URLS.books),
    loadJSON(URLS.writers),
    loadJSON(URLS.languages),
    loadJSON(URLS.countries),
  ]);

  // Índexs per fer "joins" ràpids
  const writersByName = indexBy(writers, (w) => w.name);
  const languagesByCode = indexBy(languages, (l) => l.code); // inclou code null
  const countriesByCode = indexBy(countries, (c) => c.code);

  const enriched = books.map((book) => {
    const writer = writersByName.get(book.writer) || null;
    const language = languagesByCode.get(book.language) || null;
    const country = writer ? (countriesByCode.get(writer.country) || null) : null;

    return {
      ...book,

      // Idioma original
      originalLanguageName: language?.name ?? null,

      // Autor
      writerGender: writer?.gender ?? null,
      writerCountryCode: writer?.country ?? null,
      writerCountryName: country?.name ?? null,
    };
  });

  return enriched;
}

// Exemple d'ús:
buildEnrichedBooks()
  .then((enrichedBooks) => {
    // Aquí tens el JSON final (array de llibres enriquits)
    console.log(enrichedBooks);

    // Si vols el JSON com a string:
    // console.log(JSON.stringify(enrichedBooks, null, 2));
  })
  .catch(console.error);