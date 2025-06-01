'use strict';

fetch("file.json")
  .then(res => res.json())
  .then(estudiantes => {
    const contenedorPrincipal = document.getElementById("lista-estudiantes");
    const inputBusqueda = document.getElementById("input-busqueda");
    const formBusqueda = document.getElementById("form-busqueda");

    // Crear tarjeta para un estudiante
    function crearTarjeta(estudiante) {
      let proyectosHTML = '';
      estudiante.projects.forEach((proyecto, index) => {
        if (index === 0) {
          proyectosHTML += `
            <div class="mb-2">
              <strong>Proyecto:</strong> ${proyecto.name}<br>
              <strong>Primera calificación:</strong> [${proyecto.score.join(', ')}]
            </div>
          `;
        } else {
          const suma = proyecto.score.reduce((acc, val) => acc + val, 0);
          const calificacion = (suma / 2).toFixed(1);
          proyectosHTML += `
            <div class="mb-2">
              <strong>Proyecto:</strong> ${proyecto.name}<br>
              <strong>Segunda calificación:</strong> ${calificacion}
            </div>
          `;
        }
      });

      const tarjeta = document.createElement("div");
      tarjeta.className = "card mb-3 mx-2";
      tarjeta.style.maxWidth = "24rem";
      tarjeta.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://github.com/${estudiante.usernameGithub}.png" class="img-fluid rounded-start" alt="Avatar de ${estudiante.student}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p><strong>Código:</strong> ${estudiante.code}</p>
              <h5 class="card-title">${estudiante.student}</h5>
              <p><strong>Intensidad:</strong> ${estudiante.intensity}</p>
              ${proyectosHTML}
              <p><strong>GitHub:</strong> ${estudiante.usernameGithub}</p>
              <a href="https://github.com/${estudiante.usernameGithub}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Perfil GitHub</a>
            </div>
          </div>
        </div>
      `;
      return tarjeta;
    }

    // Mostrar estudiantes agrupados por intensidad
    function mostrarEstudiantes(lista) {
      contenedorPrincipal.innerHTML = "";

      const intensidades = ["100 hours", "300 hours", "400 hours"];
      intensidades.forEach(intensidad => {
        const contenedor = document.createElement("div");
        contenedor.className = "mb-5";

        const titulo = document.createElement("h3");
        titulo.textContent = `Intensidad: ${intensidad}`;
        titulo.className = "mb-3 text-primary";
        contenedor.appendChild(titulo);

        const fila = document.createElement("div");
        fila.className = "d-flex flex-wrap justify-content-center";

        lista.filter(est => est.intensity === intensidad).forEach(est => {
          const tarjeta = crearTarjeta(est);
          fila.appendChild(tarjeta);
        });

        contenedor.appendChild(fila);
        contenedorPrincipal.appendChild(contenedor);
      });
    }

    // Mostrar todos inicialmente
    mostrarEstudiantes(estudiantes);

    // Filtrar mientras se escribe o busca
    inputBusqueda.addEventListener("input", () => {
      filtrarYMostrar();
    });

    // Evitar submit y filtrar al enviar formulario
    formBusqueda.addEventListener("submit", e => {
      e.preventDefault();
      filtrarYMostrar();
    });

    function filtrarYMostrar() {
      const texto = inputBusqueda.value.trim().toLowerCase();

      const filtrados = estudiantes.filter(est => {
        return (
          est.student.toLowerCase().includes(texto) ||
          est.intensity.toLowerCase().includes(texto) ||
          est.usernameGithub.toLowerCase().includes(texto)
        );
      });

      mostrarEstudiantes(filtrados);
    }
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });
