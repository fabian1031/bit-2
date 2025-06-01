// 'use strict';

// // --- Función principal para cargar y mostrar estudiantes ---
// fetch("file.json")
//     .then(respuesta => respuesta.json())
//     .then(datos => {
//         // Referencia al contenedor principal donde se mostrarán las listas
//         const contenedorPrincipal = document.getElementById("lista-estudiantes");

//         // --- Crear contenedores por intensidad con estilos Bootstrap ---
//         const contenedor100h = document.createElement("section");
//         contenedor100h.className = "mb-5";
//         contenedor100h.innerHTML = `<h3 class="mb-3 text-success">Intensidad: 100 hours</h3>`;

//         const contenedor300h = document.createElement("section");
//         contenedor300h.className = "mb-5";
//         contenedor300h.innerHTML = `<h3 class="mb-3 text-warning">Intensidad: 300 hours</h3>`;

//         const contenedor400h = document.createElement("section");
//         contenedor400h.className = "mb-5";
//         contenedor400h.innerHTML = `<h3 class="mb-3 text-danger">Intensidad: 400 hours</h3>`;

//         // Crear listas internas para alojar las tarjetas con layout flex y gap
//         const lista100h = document.createElement("div");
//         lista100h.className = "d-flex flex-column gap-3";
//         const lista300h = document.createElement("div");
//         lista300h.className = "d-flex flex-column gap-3";
//         const lista400h = document.createElement("div");
//         lista400h.className = "d-flex flex-column gap-3";

//         // Anexar listas a sus respectivos contenedores
//         contenedor100h.appendChild(lista100h);
//         contenedor300h.appendChild(lista300h);
//         contenedor400h.appendChild(lista400h);

//         // --- Procesar cada estudiante ---
//         datos.forEach(estudiante => {
//             // Crear tarjeta para cada estudiante con Bootstrap Card
//             const tarjeta = document.createElement("div");
//             tarjeta.className = "card mb-3 shadow-sm";
//             tarjeta.style.maxWidth = "540px";

//             // --- Construir HTML para proyectos con las reglas solicitadas ---
//             let htmlProyectos = '';

//             estudiante.projects.forEach((proyecto, indice) => {
//                 if (indice === 0) {
//                     // Primer proyecto: mostrar array de calificaciones tal cual
//                     htmlProyectos += `
//                         <div class="mb-2">
//                             <strong>Proyecto:</strong> ${proyecto.name}<br>
//                             <strong>Primera calificación:</strong> <span class="text-primary">[${proyecto.score.join(', ')}]</span>
//                         </div>
//                     `;
//                 } else {
//                     // Segundo proyecto: sumar y dividir entre 2, mostrar resultado con 1 decimal
//                     const sumaCalificaciones = proyecto.score.reduce((acum, val) => acum + val, 0);
//                     const calificacionFinal = (sumaCalificaciones / 2).toFixed(1);
//                     htmlProyectos += `
//                         <div class="mb-2">
//                             <strong>Proyecto:</strong> ${proyecto.name}<br>
//                             <strong>Segunda calificación:</strong> <span class="text-primary">${calificacionFinal}</span>
//                         </div>
//                     `;
//                 }
//             });

//             // --- Contenido de la tarjeta ---
//             tarjeta.innerHTML = `
//                 <div class="row g-0 align-items-center">
//                     <div class="col-md-4 text-center p-2">
//                         <img src="https://github.com/${estudiante.usernameGithub}.png" class="img-fluid rounded-circle border border-secondary" alt="Avatar de ${estudiante.student}" style="max-width: 120px;">
//                     </div>
//                     <div class="col-md-8">
//                         <div class="card-body">
//                             <p class="mb-1"><strong>Código:</strong> <span class="text-muted">${estudiante.code}</span></p>
//                             <h5 class="card-title">${estudiante.student}</h5>
//                             <p class="mb-2"><strong>Intensidad:</strong> ${estudiante.intensity}</p>
//                             ${htmlProyectos}
//                             <p class="mb-2"><strong>GitHub:</strong> <a href="https://github.com/${estudiante.usernameGithub}" target="_blank" rel="noopener noreferrer">${estudiante.usernameGithub}</a></p>
//                             <a href="https://github.com/${estudiante.usernameGithub}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm">Perfil GitHub</a>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             // --- Agregar la tarjeta al contenedor correspondiente según la intensidad ---
//             if (estudiante.intensity.includes("100")) {
//                 lista100h.appendChild(tarjeta);
//             } else if (estudiante.intensity.includes("300")) {
//                 lista300h.appendChild(tarjeta);
//             } else if (estudiante.intensity.includes("400")) {
//                 lista400h.appendChild(tarjeta);
//             }
//         });

//         // --- Insertar los contenedores completos al contenedor principal ---
//         contenedorPrincipal.appendChild(contenedor100h);
//         contenedorPrincipal.appendChild(contenedor300h);
//         contenedorPrincipal.appendChild(contenedor400h);

//     })
//     .catch(error => {
//         console.error("Error al obtener los datos:", error);
//     });

'use strict';

fetch("file.json")
  .then(res => res.json())
  .then(estudiantes => {
    const contenedorPrincipal = document.getElementById("lista-estudiantes");

    // Crear contenedores para cada intensidad
    const contenedor100 = document.createElement("section");
    const contenedor300 = document.createElement("section");
    const contenedor400 = document.createElement("section");

    contenedor100.innerHTML = `<h3 class="text-success mb-3">Intensidad: 100 hours</h3>`;
    contenedor300.innerHTML = `<h3 class="text-warning mb-3">Intensidad: 300 hours</h3>`;
    contenedor400.innerHTML = `<h3 class="text-danger mb-3">Intensidad: 400 hours</h3>`;

    // Función para crear fila con tarjetas (3 por fila)
    function crearFilasTarjetas(listaEstudiantes) {
      const fragmento = document.createDocumentFragment();
      for (let i = 0; i < listaEstudiantes.length; i += 3) {
        const fila = document.createElement("div");
        fila.className = "row g-4 mb-4";

        // Insertar hasta 3 tarjetas en la fila
        for (let j = i; j < i + 3 && j < listaEstudiantes.length; j++) {
          const estudiante = listaEstudiantes[j];
          const columna = document.createElement("div");
          columna.className = "col-md-4";

          // Crear la tarjeta con la info del estudiante
          let proyectosHTML = '';
          estudiante.projects.forEach((proyecto, index) => {
            if (index === 0) {
              proyectosHTML += `
                <div class="mb-2">
                  <strong>Proyecto:</strong> ${proyecto.name}<br>
                  <strong>Primera calificación:</strong> [${proyecto.score.join(', ')}]
                </div>`;
            } else {
              const suma = proyecto.score.reduce((acc, val) => acc + val, 0);
              const calificacion = (suma / 2).toFixed(1);
              proyectosHTML += `
                <div class="mb-2">
                  <strong>Proyecto:</strong> ${proyecto.name}<br>
                  <strong>Segunda calificación:</strong> ${calificacion}
                </div>`;
            }
          });

          columna.innerHTML = `
            <div class="card h-100">
              <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center justify-content-center p-2">
                  <img src="https://github.com/${estudiante.usernameGithub}.png" alt="Avatar de ${estudiante.student}" class="img-fluid rounded-circle" style="max-width: 100px;">
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
            </div>
          `;

          fila.appendChild(columna);
        }

        fragmento.appendChild(fila);
      }
      return fragmento;
    }

    // Filtrar estudiantes por intensidad
    const estudiantes100 = estudiantes.filter(e => e.intensity.includes("100"));
    const estudiantes300 = estudiantes.filter(e => e.intensity.includes("300"));
    const estudiantes400 = estudiantes.filter(e => e.intensity.includes("400"));

    // Añadir filas con tarjetas a cada contenedor
    contenedor100.appendChild(crearFilasTarjetas(estudiantes100));
    contenedor300.appendChild(crearFilasTarjetas(estudiantes300));
    contenedor400.appendChild(crearFilasTarjetas(estudiantes400));

    // Añadir los contenedores al DOM principal
    contenedorPrincipal.appendChild(contenedor100);
    contenedorPrincipal.appendChild(contenedor300);
    contenedorPrincipal.appendChild(contenedor400);
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });

