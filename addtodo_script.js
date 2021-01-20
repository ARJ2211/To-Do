const { app } = require('electron');
const electron = require('electron');
const { unlink } = require('fs');
const { ipcRenderer } = electron;





document.getElementById('sub_btn').addEventListener('click', (event) => {
    event.preventDefault();
    const a = document.getElementById('task').value;
    if (a == '') {
        document.getElementById('disp_task').innerHTML = "please enter a task";
    } else {
        const text = "Your added task is : " + a;
        document.getElementById('disp_task').innerHTML = text;
        const value = document.querySelector('input').value;
        ipcRenderer.send('todo:add_task', value);
        document.getElementById('task').value = '';
    }

});