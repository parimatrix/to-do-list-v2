/**
 * Created by anshu on 6/26/2017.
 */
console.log("hello")

let toDoList=[];
let displayedList;
window.onload=function () {
    let inputtext=document.getElementById('input-todo');
    let addbutton=document.getElementById('add-todo');
    let trashbutton=document.getElementById('remove-all-todo');
    displayedList=document.getElementById('todoList');
    showtodoList(toDoList,displayedList);
    addbutton.addEventListener('click',function () {
        // console.log("button pressed");
        if(inputtext.value !== "")
         addAndSave( inputtext.value);
        inputtext.value="";
    });
    inputtext.addEventListener('keyup',function (event) {
        event.preventDefault();
        if(event.keyCode==13){
            addbutton.click();
        }
    });
    trashbutton.addEventListener('click',deletedone);
    //trashbutton.addEventListener('click',de);
};

function deletedone() {
    toDoList=toDoList.filter(function(item,index,arr){
            return !item.done;
    });
    saveList();
    showtodoList();
}

function showtodoList() {
    retrieveList();
    displayedList.innerHTML = "";
    //console.log("set displayedList to blank and toDoList.length:"+toDoList.length);
    for (var ite in toDoList){
        // console.log("appending:" + toDoList[ite].todo);
        displayedList.appendChild(addItemToList(toDoList[ite],ite));
    }
}

function addAndSave( value ){
       let newtodo={
           todo: value,
           done: false
       };
    toDoList.push(newtodo);
    // console.log("pushed to toDoList:" + value);
    refreshList();
}

function refreshList(){
    saveList();
    showtodoList( toDoList );
}

function saveList( ){
    localStorage.setItem('savedtodo',JSON.stringify(toDoList));
}

function retrieveList(){
    // console.log("retreiving list from stored");
    let temp=localStorage.getItem('savedtodo');
    if(temp){
        toDoList = JSON.parse(temp);
       // console.log(toDoList[0]);
    }
}

function setdone(event) {
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));
    toDoList[target].done=!toDoList[target].done;
    saveList();
    showtodoList();
}

function moveitemup(event) {
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));

    let temp=toDoList[target].todo;
    toDoList[target].todo=toDoList[target-1].todo;
    toDoList[target-1].todo=temp;

    let temp1=toDoList[target].done;
    toDoList[target].done=toDoList[target-1].done;
    toDoList[target-1].done=temp1;

    saveList();
    showtodoList();
}

function moveitemdown(event){
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));

    toDoList.splice(target,0,toDoList.splice(target+1,1)[0]);

    saveList();
    showtodoList();
}

function delthisitem(event){
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));

    toDoList.splice(target,1);

    saveList();
    showtodoList();
}


function addItemToList( item , ite ){
    let t=document.createElement('li');
    t.className="list-group-item";
    t.setAttribute('data-id',ite);

    let checkbox=document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.className='col-1';
    checkbox.addEventListener('click',setdone);
    t.appendChild(checkbox);


    let span=document.createElement('span');
    span.className="col-8 lead";
    span.innerText=item.todo;
    t.appendChild(span);

    let i1=document.createElement('i');
    i1.className="col-1 fa fa-2x fa-chevron-up btn-up";
   i1.addEventListener('click',moveitemup);
    t.appendChild(i1);

    let i2=document.createElement('i');
    i2.className="col-1 fa fa-2x fa-chevron-down btn-down";
   i2.addEventListener('click',moveitemdown);
    t.appendChild(i2);

    let delitem=document.createElement('i');
    delitem.className="col-1 fa fa-2x fa-times btn-del";
    delitem.addEventListener('click',delthisitem);
    t.appendChild(delitem);

    if(item.done){
        span.style.textDecoration='line-through';
        checkbox.checked=true;
        t.style.backgroundColor='#ffa491';
    }

    // t.addEventListener('click',doneself);
    return t;
}

// function doneself(event){
//     let target=event.target.getAttribute('data-id');
//     toDoList[target].done=!toDoList[target].done;
//     // console.log("clciked on "+target);
//     // console.log("now done is:"+toDoList[target].done);
//     saveList();
//     showtodoList();
// }
