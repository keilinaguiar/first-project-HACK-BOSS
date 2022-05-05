'use strict';

const date = document.querySelector('#date')
const list = document.querySelector('#list')
const elemento = document.querySelector('#elemento')
const newHomework = document.querySelector('#newHomework')
const enter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST
let id


const FECHA = new Date ()
date.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})


function addHomework( task,id,completed,deleted) {
    if(deleted) {return}

    const COMPLETED = completed ? check : uncheck 

    const LINE = completed ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${COMPLETED}" data="completed" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i> 
                        </li>
                    `
    list.insertAdjacentHTML("beforeend",elemento)

}

function taskDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].completed = LIST[element.id].completed ?false :true 

}

function deletedTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].deleted = true
    console.log(LIST)
}



enter.addEventListener('click', ()=> {
    const task = newHomework.value
    if(task){
        addHomework(task,id,false,false)
        LIST.push({
            nombre : task,
            id : id,
            completed : false,
            deleted : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        newHomework.value = ''
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const task = newHomework.value
        if(task) {
            addHomework(task,id,false,false)
        LIST.push({
            nombre : task,
            id : id,
            completed : false,
            deleted : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        newHomework.value = ''
        id++
        console.log(LIST)
        }
    }
    
})


list.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'completed') {
        taskDone(element)
    }
    else if(elementData == 'deleted') {
        deletedTask(element)
        console.log("deleted")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

let date = localStorage.getItem('TODO')
if(date){
    LIST = JSON.parse(date)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        addHomework(item.nombre,item.id,item.completed,item.deleted)
    })
}