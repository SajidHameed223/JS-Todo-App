let time = document.getElementById('time');

window.onload = () => setInterval("time.innerHTML = dayjs().format('dddd YYYY-MM-DD HH:mm:ss A'),  1000")

let userName = prompt("Please Enter your name") ;
let firstName = userName.charAt(0).toUpperCase();
let lastName = userName.slice(1).toLowerCase();
userName = firstName + lastName;
document.getElementById("hiUser").innerHTML = userName ;

const titleValue = document.getElementById("titleField")
const addressValue = document.getElementById("addressField")
const desValue = document.getElementById("descriptionField")

const emptyFieldValues  = () => {
    document.getElementById("titleField").value = " "
    document.getElementById("addressField").value = " "
    document.getElementById("descriptionField").value = " "
     }

const showNoti = (msg , type) =>{
let bgColor;
switch(type){
    case "success":
        bgColor = "linear-gradient(to right, #1D976C, #93F9B9)"
        break;
case "error":
    bgColor = "linear-gradient (to right, #eb3349, #f45c43)"
break;
default:
    bgColor = "#000"
}
Toastify({
    text: msg,
    duration: 2000,
    newWindow : true,
    close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
           background: bgColor,
         },
    }).showToast();
}

const getRandomId = () =>{
   return Math.random().toString(36).slice(2)
}
const clearOutput = () =>{
    document.getElementById("output").innerHTML = ' '
}
const showOutput = (id) =>{
    document.getElementById("output").innerHTML = id
}
const getFieldValue =(fieldId) =>{
    return document.getElementById(fieldId).value ;
}

function setFieldValue(fieldId, value) {
    document.getElementById(fieldId).value = value;
}








const handleSubmit = () => {
    event.preventDefault()
let title = titleValue.value , address = addressValue.value , decscription = desValue.value ;
title = title.trim();
address = address.trim();
decscription = decscription .trim();

if(title.length < 3){
    showNoti("Please Enter Your Correct Title", "error");
    return
}
if(address.length < 3){
    showNoti("Please Enter Your Correct Address", "error");
    return
}
if(decscription.length < 3){
    showNoti("Please Enter Your Correct Decscription", "error");
    return
}

let todo = {title, address, decscription}

todo.id = getRandomId();
todo.dateCreated = new Date().getTime();
todo.status = "active";

const todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.push(todo);
localStorage.setItem("todos", JSON.stringify(todos));
showNoti("A New Todo Has Been Successfully Added." , "success")


showTodos()
 emptyFieldValues()

}
function showTodos(){
clearOutput();
const  todos = JSON.parse(localStorage.getItem("todos")) || [ ] ;
if(!todos.length){
showNoti("There Is No Single Todo Available" , "error")
 showOutput('<h3>HURRAY! Notask available. Add a task button to add your task.</h3>')
return
}
let tableStartingCode =  '<div class = "table-responsive"><table class="table"> '
let tableEndingCode = '</table></div>'
let tableHead =  '<thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Address</th><th scope="col">Description</th><th scope="col">Action</th></tr></thead>'
let tableBody = ''
for (let i =0 ; i < todos.length; i++){
let todo = todos[i]

tableBody += `<tr><th>${i+1}</th> <td>${todo.title}</td> <td>${todo.address}</td> <td>${todo.decscription}</td> <td><button class="btn btn-sm btn-info mb-2 mb-md-0 me-0 me-md-1" data-value= "${todo.id}" onclick="editTodo(event)"><i data-value="${todo.id}" class="fas fa-pen"></i></button> <button class="btn btn-danger" data-value="${todo.id}" onclick="deleteTodo(event)"><i  data-value="${todo.id}" class="fas fa-trash"></i></button></td></tr>`

let table = tableStartingCode + tableHead + tableBody + tableEndingCode ;

showOutput(table)

}}
const editTodo = (event) =>{
let todoId = event.target.getAttribute('data-value')
// console.log(todoId)
const todos = JSON .parse(localStorage.getItem("todos"));
let todo = todos.find((todo)=>{
return todo.id ===todoId
// console.log(todo)
})
const {title,address,decscription} = todo


setFieldValue("title",title)
setFieldValue("address",address)
setFieldValue("description",decscription)
localStorage.setItem("todoForEdit",JSON.stringify(todo))
document.getElementById("addTaskButton").style.display = "none"
document.getElementById("updateTaskButton").style.display = "block"
}









