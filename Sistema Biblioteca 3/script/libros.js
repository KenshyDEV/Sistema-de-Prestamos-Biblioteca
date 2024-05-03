// JavaScript
document.addEventListener('DOMContentLoaded', function() {
  cargarLibros();
});

function cargarLibros() {
  fetch('/json/libros.json')
    .then(response => response.json())
    .then(data => mostrarLibros(data))
    .catch(error => console.error('Error al cargar los libros:', error));
}

function mostrarLibros(libros) {
  const tableBody = document.getElementById('librosBody');
  tableBody.innerHTML = '';
  libros.forEach(libro => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${libro.Codigo}</td>
      <td>${libro["Nombre del Libro"]}</td>
      <td>${libro.Autor}</td>
      <td>${libro.Categoria}</td>
      <td>${libro.Cantidad}</td>
    `;
    tableBody.appendChild(row);
  });
}

function buscarLibro() {
  const input = document.getElementById('searchInput');
  const searchTerm = input.value.toLowerCase();
  const rows = document.getElementById('librosBody').getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let found = false;
    for (let j = 0; j < cells.length && !found; j++) {
      const cellContent = cells[j].textContent.toLowerCase();
      if (cellContent.includes(searchTerm)) {
        found = true;
        rows[i].style.display = '';
      }
    }
    if (!found) {
      rows[i].style.display = 'none';
    }
  }
}

