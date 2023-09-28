// captura de elementos
let taskInput = document.querySelector('#taskInput');
let addButton = document.querySelector('#addButton');
let taskList = document.querySelector('#taskList');
let listSaved = JSON.parse(localStorage.getItem('list'));

// recuperar datos de localStorage al recargar la pagina
setTimeout(() => {
    loadTask();
}, 300);

function loadTask(){
    taskList.innerHTML='';//limpia la lista
    if(listSaved === null){//si la lista guardada es nula
        relax();
        init();//al inicio
    }else{//sino
        listSaved.forEach(element => {
            toDo();
            taskList.innerHTML+=`
            <li>${element}</li>`//toma la lista, itera los elementos y los agrega
        });
        init();//al inicio
    }
}

//  volver al inicio
function init() {
    taskInput.value = '';//limpia el input
    taskInput.focus();//enfoca en el input
}

// agregar tarea si no esta vacia o con espacios en blanco
function addTask() {
    if (taskInput.value === '' || taskInput.value.trim() === '') {// verifica si solo tiene espacios o esta vacio
        alert('No puedes incluir una tarea vacia!!');//alerta que no puede continuar
        init();    //al inicio
    } else {//sino
        let newTask = document.createElement('li');//crea un nuevo <li>
        newTask.textContent = taskInput.value;//establece contenido de <li> = valor de la tarea
        taskList.append(newTask);//agrega <li> a la lista <ul>
        updateLocalStorage();//actualiza localStorage
        init();    //al inicio
    };
};

// boton en escucha
addButton.addEventListener('click', addTask);//pone en escucha al boton 'agregar'
taskInput.addEventListener('keydown', function(evento){//pone en escucha al boton 'enter'
    if(evento.key === 'Enter'){
        addTask();//agregar tarea
    }
});

function updateLocalStorage(){
    if(listSaved === null){//si no hay array de tareas
        listSaved = [];//crea un array
    };
    listSaved.push(taskInput.value);//agrega la tarea al array
    localStorage.setItem('list',JSON.stringify(listSaved));//convierte el array en string y lo guarda en 'list'
}

// tachar las tareas realizadas
taskList.addEventListener('click', (itemLi)=>
    itemLi.target.classList.toggle('done'));

// eliminarlas de la lista
taskList.addEventListener('dblclick', function dltItem(itemLi){
    let index = listSaved.indexOf(itemLi.target.textContent);//busca el indice del contenido del elemento en el array 
    itemLi.target.remove();//borra el elemento de la lista (DOM)
    listSaved.splice(index,1);//elimina el elemento en el array
    localStorage.setItem('list',JSON.stringify(listSaved));//convierte el array en string y lo guarda en 'list'
    if (listSaved.length === 0) {//verifica si la cantidad de elementos del array es 0
        localStorage.removeItem('list');//borra la lista de localStorage
      }
});
   
function relax() {
    Swal.fire({
        title: 'Relajate!',
        text: 'No tenes tareas pendientes',
        imageUrl: 'https://i.gifer.com/20eJ.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Relax gif',
    })
}

function toDo() {
    Swal.fire({
        title: 'Hay pendientes!',
        text: 'Practiquen! Practiquen! Practiquen!',
        imageUrl: 'https://media.tenor.com/y-Hwuw4HiRYAAAAC/homer-simpson-marge-simpson.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Working gif',
    })
}
