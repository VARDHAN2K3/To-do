/*class Todo{
    todo;
    storageKey;

}
const todo = new Todo();*/
let todos = JSON.parse(localStorage.getItem('todos')) || [];

let inputName = document.querySelector('.js-todo-input');
let inputDate = document.querySelector('.js-date-input');

checkEmpty();

document.querySelector('.js-add-btn').addEventListener('click',() => {
    const todoName = inputName.value;
    const date = inputDate.value;
    if(todoName.length && date.length){
        todos.push({
            todoName,
            date
        });
        storeIntoLocalStorage();
        notEmpty();
        inputName.value = '';
        inputDate.value = '';
    }else{
        if(!todoName.length && !date.length){
            alert('Both Todo name and Date are not added!');
        }else if(!todoName.length){
            alert('Todo name is not added!');
        }else if(!date.length){
            alert('Date is not added!');
        }
    }
});

function renderList(){
    let renderHtml = '';
    todos.forEach((todo,i) => {
        renderHtml += `
        <div class="todo-list-div">
            <div class="todo-name">${todo.todoName}</div>
            <div class="todo-date">${todo.date}</div>
            <button class="delete-btn js-delete-btn" onclick="deleteTodo(${i});">Delete</button>
        </div>
    `;
    });
    document.querySelector('.js-list').innerHTML = renderHtml;
}

function deleteTodo(i){
    document.querySelector('.js-popup-div').classList.add('popup-div');
    document.querySelector('.js-popup-div').innerHTML = `
        <div class="popup">
            <div>Click "Confirm" to delete!</div>
            <div class="btns-div">
                <button class="cnfm-btn js-dec-btn">Confirm</button>
            </div>
            <div class="close-btn js-dec-btn">&#10006;</div>
        </div>
    `;
    document.querySelectorAll('.js-dec-btn').forEach(btn => {
        btn.addEventListener('click',() => {
            if(btn.innerText === 'Confirm'){
                todos.splice(i,1);
                storeIntoLocalStorage();
                removePopup();
                checkEmpty();
            }else if(btn.innerText === '✖'){
                removePopup();
            }
        });
    });
}

function checkEmpty(){
    if(!todos.length){
        empty();
    }else if(todos.length){
        notEmpty();
    }
}

function empty(){
    document.querySelector('.js-heading').innerHTML = '';
    document.querySelector('.js-list').innerHTML = 'Nothing to do.';
}

function notEmpty(){
    document.querySelector('.js-heading').innerHTML = 'You have to do';
    renderList();
}

function storeIntoLocalStorage(){
    localStorage.setItem('todos',JSON.stringify(todos));
}

function removePopup(){
    document.querySelector('.js-popup-div').classList.remove('popup-div');
    document.querySelector('.js-popup-div').innerHTML = ``;
}