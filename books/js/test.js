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

  function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCSV(rows, columns) {
  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns.map((col) => csvEscape(row[col])).join(",")
  );
  return [header, ...lines].join("\n");
}

async function downloadEnrichedBooksCSV() {
  const enrichedBooks = await buildEnrichedBooks();

  const columns = [
    "title",
    "writer",
    "year",
    "language",
    "originalLanguageName",
    "writerGender",
    "writerCountryCode",
    "writerCountryName",
  ];

  const csv = toCSV(enrichedBooks, columns);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "books.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}