document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prestamoForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        realizarPrestamo();
    });
});

// Función para realizar un préstamo
function realizarPrestamo() {
    const nombre = document.getElementById('nombre').value;
    const codigo = document.getElementById('codigo').value;
    const rol = document.getElementById('rol').value;
    const correo = document.getElementById('correo').value;
    const articulo = document.getElementById('articulo').value;
    const codigoArticulo = document.getElementById('codigoArticulo').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // Verificar si el artículo es un libro o un equipo
    if (articulo === 'Libro') {
        // Cargar los datos de libros desde libros.json
        fetch('/json/libros.json')
            .then(response => response.json())
            .then(data => {
                const libro = data.find(item => item.Codigo === codigoArticulo || item['Nombre del Libro'] === codigoArticulo);
                if (libro) {
                    if (libro.Cantidad >= cantidad) {
                        // Realizar el préstamo del libro
                        alert(`¡Préstamo de libro "${libro['Nombre del Libro']}" realizado con éxito para ${nombre} (${rol})!`);
                        // Agregar una fila con los detalles del préstamo a la tabla
                        agregarFilaPrestamo(nombre, codigo, rol, correo, libro['Nombre del Libro'], cantidad);
                        // Vaciar los campos del formulario
                        limpiarCampos();
                    } else {
                        alert(`No hay suficientes ejemplares del libro "${libro['Nombre del Libro']}" disponibles.`);
                    }
                } else {
                    alert('El libro no existe en la biblioteca.');
                }
            })
            .catch(error => console.error('Error al cargar los datos de libros:', error));
    } else if (articulo === 'Equipo') {
        // Cargar los datos de equipos desde equipos.json
        fetch('/json/equipo.json')
            .then(response => response.json())
            .then(data => {
                const equipo = data.find(item => item.Codigo === codigoArticulo || item.Nombre === codigoArticulo);
                if (equipo) {
                    if (equipo.Cantidad >= cantidad) {
                        // Realizar el préstamo del equipo
                        alert(`¡Préstamo de equipo "${equipo.Nombre}" realizado con éxito para ${nombre} (${rol})!`);
                        // Agregar una fila con los detalles del préstamo a la tabla
                        agregarFilaPrestamo(nombre, codigo, rol, correo, equipo.Nombre, cantidad);
                        // Vaciar los campos del formulario
                        limpiarCampos();
                    } else {
                        alert(`No hay suficientes unidades del equipo "${equipo.Nombre}" disponibles.`);
                    }
                } else {
                    alert('El equipo no existe en la biblioteca.');
                }
            })
            .catch(error => console.error('Error al cargar los datos de equipos:', error));
    }
}


function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('articulo').value = '';
    document.getElementById('codigoArticulo').value = '';
    document.getElementById('cantidad').value = '';
}


// Función para agregar una fila a la tabla de préstamos realizados
function agregarFilaPrestamo(nombre, codigo, rol, correo, articulo, cantidad) {
    const tabla = document.getElementById('tablaPrestamos').getElementsByTagName('tbody')[0];
    const fila = tabla.insertRow();
    const datos = [nombre, codigo, rol, correo, articulo, cantidad];
    for (let dato of datos) {
        const celda = fila.insertCell();
        celda.textContent = dato;
    }
}