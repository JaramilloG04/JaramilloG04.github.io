function guardarLista(idLista, clave) {
  const lista = document.getElementById(idLista);
  const datos = [];

  lista.querySelectorAll("li").forEach(function(elemento) {
    const texto = elemento.querySelector(".texto-item");

    if (texto) {
      datos.push(texto.textContent);
    }
  });

  localStorage.setItem(clave, JSON.stringify(datos));
}


function cargarLista(idLista, clave) {
  const lista = document.getElementById(idLista);
  const datosGuardados = localStorage.getItem(clave);

  if (datosGuardados) {
    const datos = JSON.parse(datosGuardados);

    lista.innerHTML = "";

    datos.forEach(function(texto) {
      crearElemento(lista, texto, idLista, clave);
    });
  } else {
    lista.querySelectorAll("li").forEach(function(elemento) {
      convertirEnEditable(elemento, idLista, clave);
    });
  }
}


function crearElemento(lista, texto, idLista, clave) {
  const elemento = document.createElement("li");

  const textoElemento = document.createElement("span");
  textoElemento.className = "texto-item";
  textoElemento.textContent = texto;

  const botonEditar = document.createElement("button");
  botonEditar.type = "button";
  botonEditar.textContent = "Editar";
  botonEditar.className = "btn btn-sm btn-outline-primary ms-2";

  botonEditar.onclick = function() {
    editarElemento(textoElemento, idLista, clave);
  };

  elemento.appendChild(textoElemento);
  elemento.appendChild(botonEditar);

  lista.appendChild(elemento);
}


function convertirEnEditable(elemento, idLista, clave) {
  const texto = elemento.textContent.trim();

  elemento.innerHTML = "";

  const textoElemento = document.createElement("span");
  textoElemento.className = "texto-item";
  textoElemento.textContent = texto;

  const botonEditar = document.createElement("button");
  botonEditar.type = "button";
  botonEditar.textContent = "Editar";
  botonEditar.className = "btn btn-sm btn-outline-primary ms-2";

  botonEditar.onclick = function() {
    editarElemento(textoElemento, idLista, clave);
  };

  elemento.appendChild(textoElemento);
  elemento.appendChild(botonEditar);
}


function editarElemento(elemento, idLista, clave) {
  const nuevoTexto = prompt(
    "Edita el elemento:",
    elemento.textContent
  );

  if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
    elemento.textContent = nuevoTexto.trim();

    guardarLista(idLista, clave);
  }
}


function agregarAcademico() {
  const nombre = prompt(
    "Escribe el nuevo elemento académico:"
  );

  if (nombre && nombre.trim() !== "") {
    const lista = document.getElementById("listaAcademica");

    crearElemento(
      lista,
      nombre.trim(),
      "listaAcademica",
      "historialAcademico"
    );

    guardarLista(
      "listaAcademica",
      "historialAcademico"
    );
  }
}


function agregarLaboral() {
  const nombre = prompt(
    "Escribe el nuevo elemento laboral:"
  );

  if (nombre && nombre.trim() !== "") {
    const lista = document.getElementById("listaLaboral");

    crearElemento(
      lista,
      nombre.trim(),
      "listaLaboral",
      "historialLaboral"
    );

    guardarLista(
      "listaLaboral",
      "historialLaboral"
    );
  }
}


document.addEventListener("DOMContentLoaded", function() {

  if (document.getElementById("listaAcademica")) {
    cargarLista(
      "listaAcademica",
      "historialAcademico"
    );
  }

  if (document.getElementById("listaLaboral")) {
    cargarLista(
      "listaLaboral",
      "historialLaboral"
    );
  }

});