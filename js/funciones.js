const url = 'http://localhost:8190/api/hurtos' // link de la api

const listarDatos = async() => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {"Content-type":"application/json; charset=UTF-8"}
  })
  .then((resp) => resp.json())
  .then(function(data){
      let listahurtos = data.hurtos;
      return listahurtos.map(function(hurtos){
          // Obtener solo la fecha en formato local
          let fecha = new Date(hurtos.fecha).toLocaleDateString();
          respuesta += `<tr><td>${hurtos.direccion}</td>` +
              `<td>${hurtos.latitud}</td>` +
              `<td>${hurtos.longitud}</td>` +
              `<td>${hurtos.descripcion}</td>` +
              `<td>${fecha}</td>` +
              `<td><a class="waves-effect waves-light btn orange" href="editarHurtos.html"><i class="material-icons left">create</i>Editar</a>` +
              ` <button id="btnEliminar" class="btn red waves-effect waves-light" onclick='eliminar("${hurtos._id}")' type="button" name="action">Eliminar
              <i class="material-icons left">delete</i></button>                  
              </td></tr>`;
          body.innerHTML = respuesta;
      })
  });
}

const registrar = async() => {
    let direccion = document.getElementById('direccion').value;
    let latitud = document.getElementById('latitud').value;
    let longitud = document.getElementById('longitud').value;
    let descripcion = document.getElementById('descripcion').value;

    // Validación de campos requeridos
    if (!direccion || !latitud || !longitud || !descripcion) {
        Swal.fire('Error', 'Todos los campos son requeridos', 'error');
        return;
    }

    // Validación de rangos de latitud y longitud
    if (latitud < 6.13 || latitud > 6.217) {
        Swal.fire('Error', 'La latitud debe estar en el rango de 6.13 a 6.217', 'error');
        return;
    }

    if (longitud < -75.567 || longitud > -75.34) {
        Swal.fire('Error', 'La longitud debe estar en el rango de -75.567 a -75.34', 'error');
        return;
    }

    let hurto = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion,
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(hurto),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((resp) => resp.json())
    .then(json => {
        Swal.fire(
            json.msg,
            '',
            'success'
        );
    })
    .then(() => {
        setTimeout(() => {
            window.location.href = "listarDatos.html";
        }, 4000);
    })
    .catch(error => {
        Swal.fire(
            'Error al registrar el hurto',
            '',
            'error'
        );
    });
}

if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar').addEventListener('click', registrar);
}


// ACTUALIZAR DATOS
const actualizar = async () => {
    let _id = document.getElementById('btnActualizar').getAttribute('data-id');

  // Obtener los elementos del formulario
    let direccion = document.getElementById('direccion').value;
    let latitud = document.getElementById('latitud').value;
    let longitud = document.getElementById('longitud').value;
    let descripcion = document.getElementById('descripcion').value;

    // Validación de campos requeridos
    if (!direccion || !latitud || !longitud || !descripcion) {
        Swal.fire('Error', 'Todos los campos son requeridos', 'error');
        return;
    }

    // Validación de rangos de latitud y longitud
    if (latitud < 6.13 || latitud > 6.217) {
        Swal.fire('Error', 'La latitud debe estar en el rango de 6.13 a 6.217', 'error');
        return;
    }

    if (longitud < -75.567 || longitud > -75.34) {
        Swal.fire('Error', 'La longitud debe estar en el rango de -75.567 a -75.34', 'error');
        return;
    }

    let hurto = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion,
    }

  // Realizar la solicitud PUT para actualizar la cita
  fetch(`${url}/${_id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(hurto),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
  .then((resp) => resp.json())
  .then(json => {
      Swal.fire(
          json.msg,
          '',
          'success'
      );
  })
  .then(() => {
      setTimeout(() => {
          window.location.href = "listarDatos.html";
      }, 4000);
  })
  .catch(error => {
      Swal.fire(
          'Error al actualizar el hurto',
          '',
          'error'
      );
  });
}
if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}

const eliminar = (_id) => {
  Swal.fire({
    title: 'Esta seguro de realizar la eliminacion',
  
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'

  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url + "/?_id="+_id, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then((resp) => resp.json())
        .then(json => {
          console.log(json.msg)
          Swal.fire('Eliminacion exitosa del hurto', json.msg, 'success');
        })
        .then(()=>{
          setTimeout(()=>{
            window.location.href = "listarDatos.html";
          },3000);
         })
        .catch(error => {
          alert(error.message)
          Swal.fire('Error en la eliminacion del hurto', error.message, 'error');
        });
    }
  });
};

if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener('click', registrar);
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}
