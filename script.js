console.clear()

const listContainer = get('.list-container')
const inputTextEl = get('input')
const btnAdd = get('.js-btn-add')
const btnClear = get('.js-btn-clear')
const btnSave = get('.js-btn-save')

let todosArray = loadFromLocalStorage() || []

/*
let todosArray = [
  {text:'essen',done:true},
  {text:'trinken',done:true},
  {text:'schlafen',done:false},
  {text:'einkaufen',done:false},
  {text:'nachdenken',done:false},
  {text:'arbeiten',done:true}
]
*/

loadFromLocalStorage()

renderTodoList()

btnAdd.addEventListener('click', event => {
    writeInputToArray()
    renderTodoList()
})

inputTextEl.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        writeInputToArray()
        renderTodoList()
    }
})

function writeInputToArray() {
    todosArray = [...todosArray, { text: inputTextEl.value, done: false }]
    inputTextEl.value = null
    inputTextEl.focus()
}

btnClear.addEventListener('click', event => {
    todosArray = []
    renderTodoList()
})

btnSave.addEventListener('click', event => {
    saveToLocalStorage()
})

function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todo-list'))
}

function saveToLocalStorage() {
    console.log('saved to localStorage')
    localStorage.setItem('todo-list', JSON.stringify(todosArray))
}

function renderTodoList() {
    listContainer.innerHTML = null
    todosArray.forEach((todoObject, index) => {
        const listItem = createListItem(todoObject, index)
        listContainer.insertAdjacentElement('afterbegin', listItem)
    })
}

function createListItem(todoObject, index) {
    const newListItem = document.createElement('div')
    newListItem.classList.add('list-item')

    const checkBox = createNewCheckbox(todoObject)
    const textSpan = createNewTextSpan(todoObject)
    const deleteButton = createNewDeleteButton(todoObject, index)

    newListItem.insertAdjacentElement('afterbegin', checkBox)
    newListItem.insertAdjacentElement('beforeend', textSpan)
    newListItem.insertAdjacentElement('beforeend', deleteButton)

    newListItem.addEventListener('click', event => {
        toggleDone(todoObject)
        renderTodoList()
    })

    return newListItem
}

function toggleDone(todoObject) {
    todoObject.done = !todoObject.done
}

function createNewDeleteButton(todoObject, index) {
    const newDeleteButton = document.createElement('button')
    newDeleteButton.classList.add('delete-button')
    newDeleteButton.innerHTML = '&times'

    newDeleteButton.addEventListener('click', event => {
        deleteTodoObject(index)
        renderTodoList()
    })

    return newDeleteButton
}

function deleteTodoObject(index) {
    const newArrayStart = todosArray.slice(0, index)
    const newArrayEnd = todosArray.slice(index + 1)
    todosArray = [...newArrayStart, ...newArrayEnd]
}

function createNewTextSpan(todoObject) {
    const newTextSpan = document.createElement('span')
    newTextSpan.innerText = todoObject.text

    if (todoObject.done) {
        newTextSpan.classList.add('done')
    }
    return newTextSpan
}

function createNewCheckbox(todoObject) {
    const newCheckbox = document.createElement('input')
    newCheckbox.setAttribute('type', 'checkbox')

    if (todoObject.done) {
        newCheckbox.setAttribute('checked', true)
    }

    return newCheckbox
}

function get(selector) {
    return document.querySelector(selector)
}