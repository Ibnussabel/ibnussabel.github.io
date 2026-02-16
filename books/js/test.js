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

  const writersByName = indexBy(writers, (w) => w.name);
  const languagesByCode = indexBy(languages, (l) => l.code);
  const countriesByCode = indexBy(countries, (c) => c.code);

  return books.map((book) => {
    const writer = writersByName.get(book.writer) || null;
    const language = languagesByCode.get(book.language) || null;
    const country = writer ? (countriesByCode.get(writer.country) || null) : null;

    return {
      ...book,
      originalLanguageName: language?.name ?? null,
      writerGender: writer?.gender ?? null,
      writerCountryCode: writer?.country ?? null,
      writerCountryName: country?.name ?? null,
    };
  });
}

function toCellValue(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function renderTable(container, rows, columns) {
  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  for (const col of columns) {
    const th = document.createElement("th");
    th.textContent = col;
    trh.appendChild(th);
  }
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const row of rows) {
    const tr = document.createElement("tr");
    for (const col of columns) {
      const td = document.createElement("td");
      td.textContent = toCellValue(row[col]);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  container.innerHTML = "";
  container.appendChild(table);
}

// ✅ S’executa automàticament quan la pàgina està carregada
window.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  try {
    const enrichedBooks = await buildEnrichedBooks();

    if (!enrichedBooks.length) {
      app.textContent = "No hi ha llibres per mostrar.";
      return;
    }

    // Columnes: com que has dit que tots els llibres tenen tots els camps,
    // agafem les claus del primer objecte.
    const columns = Object.keys(enrichedBooks[0]);

    renderTable(app, enrichedBooks, columns);
  } catch (err) {
    console.error(err);
    app.textContent = "Error carregant les dades. Mira la consola (F12).";
  }
});
