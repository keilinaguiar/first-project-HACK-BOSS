'use strict';
// LA FECHA DEL HEADER
const dateHeader = document.querySelector('#dateHeader');

// EL BOTON DE ENTER PARA AGREGAR
const Enter = document.querySelector('#enter');

//EL PARRAFO QUE CONTIENE EL INPUT DE DATE
// const dateHomework = document.querySelector('.dateHomework');

// LA LISTA
const list = document.querySelector('#list');

// EL INPUT DE TEXTO PARA ESCRIBIR LAS TAREAS
const inputAdd = document.querySelector('#newHomework');

// EL INPUT DEL CALENDARIO
// const inputDate = document.querySelector('#date');

// LAS CLASES DE LOS BOTONES PARA MARCAR COMO REALIZADO O NO
const Check = 'fa-check-circle';
const Uncheck = 'fa-circle';
// LA CLASE DEL SUBRAYADO
const lineThrough = 'line-through';
// el id que hara que cambie
let id;
let LIST;

const date = new Date();
dateHeader.innerHTML = date.toLocaleDateString('en-madrid', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

//CREAMOS UNA FUNCION PARA AGREGAR LAS TAREAS
function addHomework(homework, id, check, uncheck) {
    if (uncheck) {
        return;
    }
    const CHECK = check ? Check : Uncheck;
    const LineThrough = check ? lineThrough : '';
    const element = `<li id="element> 
                           <i id="${id}" data="check" class="far ${CHECK} " ></i>
                           <p class="text ${LineThrough} ">${homework} </p>
                           <i data="remove" id="${id}" class="fa-solid fa-trash-can"></i> 
                        </li>`;
    list.insertAdjacentHTML('beforeend', element);
}

// FUNCIÓN DE TAREA REALIZADA
function checkHomework(element) {
    element.classList.toggle(Check);
    element.classList.toggle(Uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].check = LIST[element.id].check ? false : true;
}

Enter.addEventListener('click', () => {
    const homework = inputAdd.value;
    if (homework) {
        addHomework(homework, id, false, false);
        LIST.push({
            content: homework,
            id: id,
            check: false,
            uncheck: false,
        });
    }
    inputAdd.value = '';
    id++;
});
// FUNCIÓN PARA ELIMINAR TAREAS
function removeHomework(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].remove = true;
}

document.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        const homework = inputAdd.value;
        if (homework) {
            addHomework(homework, id, false, false);
            LIST.push({
                content: homework,
                id: id,
                check: false,
                uncheck: false,
            });
        }
        inputAdd.value = '';
        id++;
    }
});

list.addEventListener('click', function (e) {
    const element = e.target;
    const elementData = element.attributes.data.value;
    if (elementData === 'check') {
        checkHomework(element);
    } else if (elementData === 'remove') {
        removeHomework(element);
    }
});
// GUARDAR EN LOCAL STOREGE GET ITEM
