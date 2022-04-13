let elForm = findElement('.js-form');
let elInput = findElement('.js-input', elForm);
let todoTemplate = findElement('.todo-template').content;
let elWrapperList = findElement('.list');
let checkedTask = findElements('.js-label')
let wrapperFragment = document.createDocumentFragment()

// 
function findElement(selector, node = document) {
    return node.querySelector(selector)
}
function findElements(selector, node = document){
    return node.querySelectorAll(selector)
}
// localga sax
let storage = JSON.parse(localStorage.getItem('todo'))
let todos = storage ? storage : []


if(todos?.length){
    renderTodos(todos);
}
// todoDelete
function todoDelete(id){
 let deletedTodos = todos.filter((todo) => todo.id !== id);
// massivni ochirilayotgan bilan teglashtirish kerek 
 todos = deletedTodos;

 renderTodos(deletedTodos);

 localStorage.setItem('todo' , JSON.stringify(todos));
}

//
function handleEventDelegation(event) {
let id = event.currentTarget.dataset.id - 0;
if(event.target.matches('.js-delete')){
    console.log('deleted')
    todoDelete(id)
}
if(event.target.matches('.js-edit')){
    console.log('edited');
    let editedTask = prompt('Edit task: ');
    let todoText = event.target.parentNode.querySelector('label');
   if(editedTask.trim().length){
    todoText.textContent = editedTask;
}
else{
    alert("Please enter valid value")
}
}
if(event.target.matches('.js-checkbox')){
    console.log('checked')
    const checkedTask = event.target.parentNode.querySelector('label');
    checkedTask.classList.toggle('js-checked')

}
}
// yangi todo yaratish
function createTodo(todo){
    //todoTemplate dan clone olish
    let todoTemplateClone = todoTemplate.cloneNode(true)
    let todoItem = todoTemplateClone.querySelector('.todo-item');
    let todoText = todoTemplateClone.querySelector('label');
    let todoCheckbox = todoTemplateClone.querySelector('.js-checkbox');

    todoItem.dataset.id = todo.id;
    todoCheckbox.id = todo.id;
    todoText.textContent = todo.text;
    todoText.htmlFor = todo.id;

    todoItem.addEventListener('click', handleEventDelegation)
    wrapperFragment.append(todoTemplateClone);
}


// 2 
function renderTodos(arr) {
    elWrapperList.innerHTML = null;
    arr.forEach((item) => {
        createTodo(item)
    });
    elWrapperList.append(wrapperFragment)
} 
// To do qo`shilvoti 1
function addTodo(event) {
    event.preventDefault();
// id qoshish
    let i = todos.at(-1) ? todos.at(-1).id : 0
    const newToDo = {
        id: ++i,
        text: elInput.value,
        isComplated: false
    };
    todos.push(newToDo);
    localStorage.setItem('todo', JSON.stringify([...todos]))
    // 
    elInput.value = null;
    renderTodos(todos)

}
elForm.addEventListener('submit', addTodo)