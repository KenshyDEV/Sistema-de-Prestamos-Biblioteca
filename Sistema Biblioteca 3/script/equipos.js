document.addEventListener('DOMContentLoaded', function() {
    cargarEquipos();
  });
  
  function cargarEquipos() {
    fetch('/json/equipo.json')
      .then(response => response.json())
      .then(data => mostrarEquipos(data))
      .catch(error => console.error('Error al cargar los equipos:', error));
  }
  
  function mostrarEquipos(equipos) {
    const tableBody = document.getElementById('equiposBody');
    tableBody.innerHTML = '';
    equipos.forEach(equipo => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${equipo.Codigo}</td>
        <td>${equipo.Nombre}</td>
        <td>${equipo.Categoria}</td>
        <td>${equipo.Cantidad}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function buscarEquipo() {
    const input = document.getElementById('searchInput');
    const searchTerm = input.value.toLowerCase();
    const rows = document.getElementById('equiposBody').getElementsByTagName('tr');
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
  
  
