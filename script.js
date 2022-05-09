'use strict';
// LA FECHA DEL HEADER
const dateHeader = document.querySelector('#dateHeader');

//PRIORIDAD
const priorityElement = document.querySelector('#levelPriority');

// LA LISTA
const list = document.querySelector('#list');

// EL INPUT DE TEXTO PARA ESCRIBIR LAS TAREAS
const inputAdd = document.querySelector('#newHomework');

// LAS CLASES DE LOS BOTONES PARA MARCAR COMO REALIZADO O NO
const Check = 'fa-check-circle';
const Uncheck = 'fa-circle';

// LA CLASE DEL SUBRAYADO
const lineThrough = 'line-through';

//ARRAY LISTA
let LIST = [];

//FUNCION QUE GUARDA EN EL LOCAL STORAGE
const addLocal = () => localStorage.setItem('todoList', JSON.stringify(LIST));

const date = new Date();
//Agregar al html la fecha del dia
dateHeader.innerHTML = date.toLocaleDateString('en-madrid', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

//CREAMOS UNA FUNCION PRINCIPAL DONDE CREAREMOS LA INTERACCION DE TODAS LAS TAREAS QUE SE AGREGUEN
function addHomework(homework, id, check, uncheck, date, priority) {
    if (uncheck) {
        return;
    }

    const dateString = date.toLocaleDateString();

    const CHECK = check ? Check : Uncheck;
    const LineThrough = check ? lineThrough : '';
    const element = `<li id="${id}" class="todo-item ${priority}"> 
                           <i data-id="${id}" data="check" class="far ${CHECK} " ></i>
                           <p class="text ${LineThrough} ">${homework} </p>
                           <time datetime="${dateString}" class="todo-date">${dateString}</time>
                           <i data="remove" data-id="${id}" class="fa-solid fa-trash-can"></i> 
                        </li>`;
    list.insertAdjacentHTML('beforeend', element);
}

// FUNCIÓN DE TAREA REALIZADA
function checkHomework(element) {
    element.classList.toggle(Check);
    element.classList.toggle(Uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    const index = element.getAttribute('data-id');

    //BUCLE QUE SE ENCARGA DE BUSCAR EL ELEMENTO QUE TIENE EL ID INDICADO PARA CAMBIAR SU PROPIEDAD CHECK
    LIST.forEach((item) => {
        if (index == item.id) {
            item.check = item.check ? false : true;
        }
    });

    addLocal();
}

// FUNCIÓN PARA ELIMINAR TAREAS
function removeHomework(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    const id = element.getAttribute('data-id');

    //SACAMOS EL INDICE EN EL QUE SE ENCUENTRA EL ELEMENTO CON EL ID QUE BUSCAMOS
    const index = LIST.findIndex((todo) => {
        return todo.id === id;
    });

    LIST.splice(index, 1);

    addLocal();
}

//FUNCION QUE CARGA EL LOCAL STORAGE
function loadLocal() {
    const todoList = JSON.parse(localStorage.getItem('todoList'));

    if (todoList) {
        LIST = todoList;

        todoList.forEach((item) => {
            const date = new Date(item.date);

            //AÑADIMOS ELEMENTO
            addHomework(
                item.content,
                item.id,
                item.check,
                item.uncheck,
                date,
                item.priority
            );
        });
    }
}

loadLocal();

//EVENTOS
list.addEventListener('click', function (e) {
    const element = e.target;
    const elementData = element.attributes.data.value;
    if (elementData === 'check') {
        checkHomework(element);
    } else if (elementData === 'remove') {
        removeHomework(element);
    }
});

document.getElementById('homework-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const homework = inputAdd.value;
    if (homework) {
        const priority = priorityElement.value;
        const id = new Date().getTime().toString(36);

        const fecha = new Date();
        addHomework(homework, id, false, false, fecha, priority);
        LIST.push({
            content: homework,
            id: id,
            check: false,
            uncheck: false,
            date: fecha,
            priority: priority,
        });
    }
    inputAdd.value = '';

    addLocal();
});
