const taskSection = document.getElementById("tasks");

const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const newTaskDetail = data.get("task").trim();
    if(!newTaskDetail){
        alert("Cant add an empty task");
        return;
    }

    const newTaskDetailDiv = document.createElement("div");
    newTaskDetailDiv.classList.add("task_details");
    newTaskDetailDiv.textContent = newTaskDetail;

    const doneTaskBtn = document.createElement("button");
    doneTaskBtn.classList.add("action_btn");
    doneTaskBtn.classList.add("done_task_btn");
    doneTaskBtn.textContent = "Done";
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("action_btn");
    deleteBtn.classList.add("delete_task_btn");
    deleteBtn.textContent = "Delete";

    const actionBtns = document.createElement("div");
    actionBtns.classList.add("action_btns");
    actionBtns.append(doneTaskBtn);
    actionBtns.append(deleteBtn);

    const newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("task");
    newTaskDiv.append(newTaskDetailDiv);
    newTaskDiv.append(actionBtns);

    taskSection.append(newTaskDiv);

    form.reset();
})

taskSection.addEventListener("click",(e)=>{
    const taskRow = e.target.closest(".task");
    if(e.target.classList.contains("delete_task_btn")){
        taskRow.remove();
    }
    else if(e.target.classList.contains("done_task_btn")){
        const textElement = taskRow.querySelector(".task_details");
        textElement.classList.toggle("completed_task_detail");

        //change the "done button" to "undo button"
        const doneBtn = e.target;
        doneBtn.classList.toggle("undo_task_btn");
        if(doneBtn.classList.contains("undo_task_btn")){
            doneBtn.textContent = "Undo";
        }
        else{
            doneBtn.textContent = "Done";
        }
    }
})