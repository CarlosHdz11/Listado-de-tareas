const cardContainer = document.getElementById("cardContainer");
const containerTerminadas = document.getElementById("containerTerminadas");
const btnmostrar = document.getElementById("vertareasterminadas");
const btnregresar = document.getElementById("regresar");
const btnVaciar = document.getElementById("btnVaciar");
const agregarTarea = document.getElementById("agregarTarea");
const nuevaTareaForm = document.getElementById("nuevaTareaForm");
const guardarTarea = document.getElementById("guardarTarea");
const selectDeveloper = document.getElementById('selectDeveloper');
const areaDeDesarrollo = document.getElementById('areaDeDesarrollo');
const modalNuevaTarea = document.getElementById("modalNuevaTarea");
const closeBtn = document.getElementById("closeBtn");
let database = window.localStorage;
let todoList = [];
let id = 1;

consultarAlmacenamiento();


agregarTarea.addEventListener("click", function () {
    nuevaTareaForm.reset();
    selectDeveloper.innerHTML = "";
    selectDeveloper.innerHTML = "<option value='default'>Selecciona una opción</option>";
});
btnmostrar.addEventListener("click", function () {
    containerTerminadas.classList.remove("d-none");
    cardContainer.classList.add("d-none");
});
btnregresar.addEventListener("click", function () {
    containerTerminadas.classList.add("d-none");
    cardContainer.classList.remove("d-none");
});
guardarTarea.addEventListener("click", function () {
    let tituloTarea = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let selectedCategory = document.getElementById('areaDeDesarrollo').value;
    let selectedDeveloper = selectDeveloper.value;
    let estado = document.getElementById('homeworkState').value;
    let validado = validar(tituloTarea, description, selectedCategory, selectedDeveloper, estado);
    if (validado) {
        let todoElement = createTodo(id, tituloTarea, description, selectedCategory, selectedDeveloper, estado);
        todoList.push(todoElement);
        renderCard();
        if (estado == "Terminada") {
            btnmostrar.click();
        }
        else {
            btnregresar.click();
        }
        id++;
        almacenarDatos(todoList);
        selectDeveloper.setAttribute("disabled", true);
    }
});
btnVaciar.addEventListener("click", function () {
    database.clear();
    location.reload();
});

function lanzarAlerta(titulo, mensaje, icono) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: 'Ok'
    });
}

function validar(tituloTarea, description, selectedCategory, selectedDeveloper, estado) {
    let flag = true;
    let mensaje = "";
    if (tituloTarea == "") {
        mensaje = "El Titulo no puede estar vacío";
        flag = false;
    }
    if (description.length < 125) {
        mensaje = "La Descripción debe tener 125 caracteres como mínimo";
        flag = false;
    }
    if (selectedCategory == "default") {
        mensaje = "Seleccione una Categoría";
        flag = false;
    }
    if (selectedDeveloper == "default") {
        mensaje = "Seleccione un Desarrollador";
        flag = false;
    }
    if (estado == "default") {
        mensaje = "Asigne a la tarea un Estado";
        flag = false;
    }

    if (flag) {
        mensaje = "Se ha registrado la Tarea"
        lanzarAlerta("Guardado", mensaje, "success");
        closeBtn.click();
    } else {
        lanzarAlerta("Error", mensaje, "error");
    }
    return flag;
}

function createTodo(id, tituloTarea, description, category, developer, state) {
    let todoElement = {
        id: "tarea" + id,
        tituloTarea: tituloTarea,
        description: description.substring(0, 50) + `...<br><span class="badge bg-secondary pe-none">Ver más</span>`,
        details: description + `...<br><span class="badge bg-secondary pe-none">Ver menos</span>`,
        category: category,
        developer: developer,
        state: state
    };
    return todoElement;
}
//renderizar cartas.
function renderCard() {
    cardContainer.innerHTML = "";
    containerTerminadas.innerHTML = "";
    todoList.forEach(todoElement => {
        let imagen = "pendiente.png";
        let color;
        if (todoElement.state == "Iniciada") {
            color = "#00FFFF";
        } else if (todoElement.state == "En proceso") {
            color = "orange";
        } else if (todoElement.state == "Se Reintentara") {
            color = "#0431B4";
        }
        else {
            color = "#CC0000";
            imagen = "terminada.png";
        };
        let plantilla = `
        <div class="card border-0 col-lg-3 m-4 p-0 pe-none">
            <table class="table table-dark table-striped m-0">
                <thead>
                    <tr>
                        <th colspan="2" class="text-center"><img src="img/${imagen}" alt="" width="30" height="24" class="me-2">${todoElement.tituloTarea}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">                           
                            <a href="#" class="text-decoration-none pe-auto">                            
                            <div id="${todoElement.id}" onclick="mostrarDetalles(event)" class="bg-white p-2 text-dark" resumen="compacto">
                                ${todoElement.description}
                            </div>                    
                            </a>                            
                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Categoría</th>
                        <td>${todoElement.category}</td>
                    </tr>
                    <tr>
                        <th scope="col">Desarrollador</th>
                        <td>${todoElement.developer}</td>
                    </tr>
                    <tr>
                        <th scope="col">Estado</th>
                        <td style="background-color:${color}">${todoElement.state}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
        if (todoElement.state != "Terminada") {
            cardContainer.innerHTML += plantilla;
        }
        else {
            containerTerminadas.innerHTML += plantilla;
        }
    });
}
//Parte de Carlos Tercero AWS
areaDeDesarrollo.onchange = function () {
    selectDeveloper.removeAttribute("disabled");
    switch (areaDeDesarrollo.value) {
        case "Desarrollo Web":
            agregarInformacion(["Jorge", "Emerson", "Juan"]);
            break;
        case "Desarrollo Móvil":
            agregarInformacion(["Daniel", "Carlos", "Victor"])
            break;
        case "Videojuegos":
            agregarInformacion(["Marcos", "Elias", "Juan"])
            break;
        case "Realidad Virtual":
            agregarInformacion(["Eliza", "Maria"])
            break;
        case "Machine Learning":
            agregarInformacion(["Luis", "Mauricio", "Ever", "Daniel", "Olga", "Marta"])
            break;
        case "Seguridad Informática":
            agregarInformacion(["Hector", "Mario", "Roberto", "Carlos"])
            break;
        default:
            selectDeveloper.innerHTML = "";
            selectDeveloper.innerHTML = "<option value='default'>Selecciona una opción</option>";
            selectDeveloper.setAttribute("disabled", true);
            break;
    }
};

function agregarInformacion(array) {
    selectDeveloper.innerHTML = "";
    selectDeveloper.innerHTML = "<option value='default'>Selecciona una opción</option>";
    array.forEach(nombre => {
        let option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        selectDeveloper.appendChild(option);
    });
}

function mostrarDetalles(event) {
    let elemento = event.target;
    if (elemento.getAttribute("resumen") == "compacto") {
        let descripcionCompleta = todoList.find(tarea => tarea.id == elemento.getAttribute("id")).details;
        elemento.innerHTML = descripcionCompleta;
        elemento.setAttribute("resumen", "completo");
    } else {
        let descripcionCompacta = todoList.find(tarea => tarea.id == elemento.getAttribute("id")).description;
        elemento.innerHTML = descripcionCompacta;
        elemento.setAttribute("resumen", "compacto");
    }
}

function almacenarDatos(todoList) {
    database.setItem("registros", JSON.stringify(todoList));
    database.setItem("idActual", JSON.stringify(id));
}

function consultarAlmacenamiento() {
    if (database.getItem("registros") != null) {
        todoList.push(...Object.values(JSON.parse(database.getItem("registros"))));
        id = parseInt(JSON.parse(database.getItem("idActual")));
        console.log(id);
        renderCard();
    }
}
