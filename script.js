'use strict';
// LA FECHA DEL HEADER
const dateHeader = document.querySelector('#dateHeader');
// EL BOTON DE ENTER PARA AGREGAR
const Enter = document.querySelector('#enter');
//EL PARRAFO QUE CONTIENE EL INPUT DE DATE
const dateHomework = document.querySelector('.dateHomework');
// LA LISTA
const list = document.querySelector('#list');
// EL INPUT DE TEXTO PARA ESCRIBIR LAS TAREAS
const inputAdd = document.querySelector('#newHomework');
// EL INPUT DEL CALENDARIO
const inputDate = document.querySelector('#date');
// LAS CLASES DE LOS BOTONES PARA MARCAR COMO REALIZADO O NO
const check = 'fa-check-circle';
const uncheck = 'a-circle';
// LA CLASE DEL SUBRAYADO
const lineThrough = 'line-through';
// el id que hara que cammbie
let id = 0;

//CREAMOS UNA FUNCION PARA AGREGAR LAS TAREAS
function addHomework(homework, id, check, uncheck) {
    const element = `<li id="element> 
                           <i id="0" data="check" class="far fa-circle co" ></i>
                           <p class="text">${homework} </p>
                           <i data="remove" id="0" class="fa-solid fa-trash-can"></i> 
                        </li>`;
    list.insertAdjacentHTML('beforeend', element);
}

Enter.addEventListener('click', () => {
    const homework = inputAdd.value;
    if (homework) {
        addHomework(homework, id, false, false);
    }
    inputAdd.value = '';
    id++;
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        const homework = inputAdd.value;
        if (homework) {
            addHomework(homework);
        }
        inputAdd.value = '';
        id++;
    }
});
