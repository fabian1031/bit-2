'use strict';
fetch("notas.json")
    .then((res) => res.json()) 
    .then((info) => {
        console.log(info);
        const lista = document.getElementById("lista-estudiantes");

        for (let i = 0; i < info.length; i++) {
            console.log(info[i].student);

            const li = document.createElement("li");
            li.textContent = `Nombre: ${info[i].student}`;

            // Crear imagen de GitHub
            const img = document.createElement("img");
            img.src = `https://github.com/${info[i].usernameGithub}.png`;
            img.alt = `Avatar de ${info[i].student}`;
            img.style.width = "50px";  
            const link = document.createElement("a");
            link.href = `https://github.com/${info[i].usernameGithub}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "GitHub";

            
            li.appendChild(img);
            li.appendChild(link);
            lista.appendChild(li);
        }
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });