'use strict';

fetch("file.json")
  .then(res => res.json())
  .then(estudiantes => {
    const contenedorPrincipal = document.getElementById("lista-estudiantes");
    const inputBusqueda = document.getElementById("input-busqueda");
    const formBusqueda = document.getElementById("form-busqueda");

    // === Crea una tarjeta con la información del estudiante ===
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
            <img src="https://github.com/${estudiante.usernameGithub}.png" class="img-fluid rounded-start" alt="Avatar de ${estudiante.student}" onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png';">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p><strong>Código:</strong> ${estudiante.code}</p>
              <h5 class="card-title">${estudiante.student}</h5>
              <p><strong>Intensidad:</strong> ${estudiante.intensity.replace("hours", "horas")}</p>
              ${proyectosHTML}
              <p><strong>GitHub:</strong> ${estudiante.usernameGithub}</p>
              <a href="https://github.com/${estudiante.usernameGithub}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Perfil GitHub</a>
            </div>
          </div>
        </div>
      `;
      return tarjeta;
    }

    // === Muestra los estudiantes agrupados por intensidad con colapsables ===
    function mostrarEstudiantes(lista) {
      contenedorPrincipal.innerHTML = "";

      const intensidades = ["100 hours", "300 hours", "400 hours"];

      // Contenedor para los botones de intensidad
      const filaBotones = document.createElement("div");
      filaBotones.className = "d-flex justify-content-center flex-wrap gap-2 mb-4";

      const contenedoresColapsables = [];

      intensidades.forEach((intensidad, index) => {
        // Botón de colapso
        const boton = document.createElement("button");
        boton.className = "btn btn-collapse d-flex align-items-center gap-2";
        boton.type = "button";
        boton.setAttribute("data-bs-toggle", "collapse");
        boton.setAttribute("data-bs-target", `#collapse${index}`);
        boton.setAttribute("aria-expanded", "false");
        boton.setAttribute("aria-controls", `collapse${index}`);
        boton.innerHTML = `
          Intensidad: ${intensidad.replace("hours", "horas")}
          <i class="bi bi-chevron-down"></i>
        `;

        // Contenedor colapsable
        const colapsable = document.createElement("div");
        colapsable.className = "collapse";
        colapsable.id = `collapse${index}`;

        const fila = document.createElement("div");
        fila.className = "d-flex flex-wrap justify-content-center";

        // Agregar tarjetas correspondientes
        lista.filter(est => est.intensity === intensidad).forEach(est => {
          const tarjeta = crearTarjeta(est);
          fila.appendChild(tarjeta);
        });

        colapsable.appendChild(fila);

        const contenedorColapsable = document.createElement("div");
        contenedorColapsable.className = "mb-4";
        contenedorColapsable.appendChild(colapsable);

        filaBotones.appendChild(boton);
        contenedoresColapsables.push(contenedorColapsable);
      });

      // Insertar fila de botones y luego los colapsables
      contenedorPrincipal.appendChild(filaBotones);
      contenedoresColapsables.forEach(div => contenedorPrincipal.appendChild(div));
    }

    // Mostrar todos los estudiantes al cargar
    mostrarEstudiantes(estudiantes);

    // === Filtrado por texto ===
    inputBusqueda.addEventListener("input", filtrarYMostrar);
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
