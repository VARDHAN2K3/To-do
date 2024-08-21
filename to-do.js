import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

/*class Todo{
    todo;
    storageKey;

}
const todo = new Todo();*/

let todos = JSON.parse(localStorage.getItem('todos')) || [];

checkEmpty();

document.querySelector('.js-add-btn').addEventListener('click',() => {
    
    const inputName = document.querySelector('.js-todo-input');
    const inputDays = document.querySelector('.js-days-input');

    const todoName = inputName.value;
    const days = inputDays.value;

    if(todoName.length && days.length){
        todos.push({
            todoName,
            days
        });
        storeIntoLocalStorage();
        notEmpty();
        inputName.value = '';
        inputDays.value = '';
        todelete();
    }else{
        if(!todoName.length && !days.length){
            alert('Both Todo name and No.of Days are not added!');
        }else if(!todoName.length){
            alert('Todo name is not added!');
        }else if(!days.length){
            alert('No.of Days is not added!');
        }
    }
});

todelete();


function todelete(){
    document.querySelectorAll('.js-delete-btn').forEach( (btn, i) => {
        btn.addEventListener('click', () => {
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
                        checkEmpty();
                        todelete();
                    }
                    removePopup();
                });
            });
        });
    });
}

function renderList(){
    let renderHtml = '';
    const today = dayjs();
    todos.forEach((todo,i) => {
        const target = today.add(todo.days,'day')
        const targetDate = target.format('dddd, D MMM YYYY');
        renderHtml += `
        <div class="todo-list-div">
            <div class="todo-name">${todo.todoName}</div>
            <div class="todo-days js-todo-days">${targetDate}</div>
            <button class="delete-btn js-delete-btn">Delete</button>
        </div>
    `;
    });
    document.querySelector('.js-list').innerHTML = renderHtml;
}

function checkEmpty(){
    if(!todos.length){
        document.querySelector('.js-heading').innerHTML = 'Nothing to do.';
        renderList();
    }else if(todos.length){
        notEmpty();
    }
    
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
