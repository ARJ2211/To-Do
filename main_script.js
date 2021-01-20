const electron = require('electron');
const { ipcRenderer } = electron;
const DataStore = require('./store');

const todosData = new DataStore({ name: 'Todos Main' });


n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
date = d + "/" + m + "/" + y;
document.getElementById('heading').innerHTML = "Things ToDo on " + date;


const quotes = [
    'All our dreams can come true, if we have the courage to pursue them.',
    "The secret of getting ahead is getting started.",
    "I\'ve missed more than 9,000 shots in my career. I\'ve lost almost 300 games. 26 times I\'ve been trusted to take the game winning shot and missed. I\'ve failed over and over and over again in my life and that is why I succeed.",
    "Don\'t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Only the paranoid survive.",
    "It\'s hard to beat a person who never gives up.",
    "If people are doubting how far you can go, go so far that you can\'t hear them anymore.",
    "We need to accept that we won\'t always make the right decisions, that we\'ll screw up royally sometimes understanding that failure is not the opposite of success, it\'s part of success.",
    "Write it. Shoot it. Publish it. Crochet it, saute it, whatever. MAKE."
]


const rand = Math.floor(Math.random() * quotes.length);
document.getElementById('quotes').innerHTML = quotes[rand];





ipcRenderer.on('todo:add_task_main', (event, todo) => {
    const updatedTodos = todosData.addTodo(todo).todos;
    const li = document.createElement('li');
    const text = document.createTextNode(todo);

    li.appendChild(text);
    document.querySelector('ul').appendChild(li);

    var myNodelist = document.getElementsByTagName("LI");
    // document.getElementById('todo-status').innerHTML = myNodelist.length;
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.tagName = 'close';
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

});





ipcRenderer.on('todo:delete_all', (event) => {
    const list = document.getElementById('todo-label');
    list.innerHTML = "";
});



const list = document.querySelector('ul');
list.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        // event.target.style.visibility = 'hidden';
    }

}, false);