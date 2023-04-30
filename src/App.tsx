import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';
export type FilterType = "all" | "active" | "complete"
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {


    function removeTask(id: string, tlId: string) {
        let remainingTasks = tasks[tlId].filter((t)=>t.id !== id)
        tasks[tlId] = remainingTasks;
        setTasks({...tasks})
    }
    function removeTodolist(tlId: string){
        let remainingTodolists = todolists.filter((t)=>t.id!==tlId)
        setTodolists(remainingTodolists)
        delete tasks[tlId]
        setTasks({...tasks})
    }
    function filterTasks(value: FilterType, tlId: string) {
        let todolist = todolists.find((tl)=>tl.id === tlId)
        if(todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function addTask(title: string, tlId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[tlId] = [newTask, ...tasks[tlId]]
        setTasks({...tasks})
    }
    function changeTaskStatus(id: string, isDone: boolean, tlId: string) {
        let task = tasks[tlId].find((t)=>t.id === id)
        if(task){
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const TodolistId1 = v1()
    const TodolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: TodolistId1, title: "To-Do List 1", filter: "all" },
        { id: TodolistId2, title: "To-Do List 2", filter: "all" }
    ])

    let [tasks, setTasks] = useState({
        [TodolistId1] : [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JavaScript", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false }
        ],
        [TodolistId2] : [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JavaScript", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false }
        ]
    })

    return (
        <div>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "complete") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        filterTasks={filterTasks}
                        filter={tl.filter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus} />
                })
            }
        </div>
    );
}

export default App;