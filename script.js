'use strict';
'use strict';
fetch("notas.json")
    .then((res) => res.json()) 
    .then((info) => {
        console.log(info); 
        const data = info;
        const lista = document.getElementById("lista-estudiantes");

        for(let i = 0; i < info.length; i++) {
            console.log(info[i].student);

           
            const li = document.createElement("li");
            li.textContent = `Nombre: ${info[i].student}`;
            lista.appendChild(li);
        }
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });