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
    taskList.innerHTML='';
    if(listSaved === null){
        relax();
    }else{
        listSaved.forEach(element => {
            toDo();
            taskList.innerHTML+=`
            <li>${element}</li>`
        });
    }
}

//  volver al inicio
function init() {
    taskInput.value = '';
    taskInput.focus();
}

// agregar tarea si no esta vacia o con espacios en blanco
function addTask() {
    if (taskInput.value === '' || taskInput.value.trim() === '') {
        doNot();
    } else {
        let newTask = document.createElement('li');
        newTask.textContent = taskInput.value;
        taskList.append(newTask);
        updateLocalStorage();
        init();
    };
};

// boton en escucha
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress',(evento) => {
    if(evento.key === 'Enter'){
        addTask();
    }
});

function updateLocalStorage(){
    if(listSaved === null){
        listSaved = [];
    };
    listSaved.push(taskInput.value);
    localStorage.setItem('list',JSON.stringify(listSaved));
}

// tachar las tareas realizadas
taskList.addEventListener('click', (itemLi)=>
    itemLi.target.classList.toggle('done'));

// eliminarlas de la lista
taskList.addEventListener('dblclick', function dltItem(itemLi){
    let index = listSaved.indexOf(itemLi.target.textContent); 
    itemLi.target.remove();
    listSaved.splice(index,1);
    localStorage.setItem('list',JSON.stringify(listSaved));
    if (listSaved.length === 0) {
        localStorage.removeItem('list');
      };
    init();  
});
   
function relax() {
    Swal.fire({
        title: 'Relajate!',
        text: 'No tenes tareas pendientes',
        imageUrl: 'https://i.gifer.com/20eJ.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Relax gif',
    }).then((result) => {
        if (result.isConfirmed) {
          init();
        }
      })
};

function toDo() {
    Swal.fire({
        title: 'Hay pendientes!',
        text: 'Practiquen! Practiquen! Practiquen!',
        imageUrl: 'https://media.tenor.com/y-Hwuw4HiRYAAAAC/homer-simpson-marge-simpson.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Working gif',
    }).then((result) => {
        if (result.isConfirmed) {
          init();
        }
      })
};

function doNot() {
    Swal.fire({
        title: 'Negativo!',
        text: 'No puedes incluir una tarea vacia!',
        imageUrl: 'https://la100.cienradios.com/resizer/VjobmBwl_SjV4H5MBmJHllwh6OU=/300x0/arc-photo-radiomitre/arc2-prod/public/5EF3CS7XNNBELBGCCRKGFTWAAY.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Dog with shame',
    }).then((result) => {
        if (result.isConfirmed) {
          init();
        }
      })
};



