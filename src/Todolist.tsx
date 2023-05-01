    import React, { ChangeEvent, KeyboardEvent, useState } from "react";
    import { FilterType } from "./App";
    export type TaskType = {
        id: string
        title: string
        isDone: boolean
    }
    export type PropsType = {
        tlId: string
        title: string
        tasks: Array<TaskType>
        removeTask: (id: string, tlId: string) => void
        removeTodolist: (tlId: string) => void
        filterTasks: (value: FilterType, tlId: string) => void
        filter: FilterType
        addTask: (title: string, tlId: string) => void
        changeTaskStatus: (id: string, isDone: boolean, tlId: string) => void
    }


    export function Todolist(props: PropsType) {

        let [taskTitle, setTaskTitle] = useState("")
        let [error, setError] = useState<null | string>(null)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setError(null)
            setTaskTitle(e.currentTarget.value)
        }
        const addTaskBtn = () => {
            if (taskTitle.trim() !== "") {
                props.addTask(taskTitle.trim(), props.tlId)
                setTaskTitle("")
            } else {
            setError("Fill out the form")
        }
    }
    const addTaskKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addTask(taskTitle.trim(), props.tlId)
                setTaskTitle("")
            }
        } else {
            setError("Fill out the form")
        }
    }



    const FilterAllBtn = () => props.filterTasks("all", props.tlId)
    const FilterActiveBtn = () => props.filterTasks("active", props.tlId)
    const FilterCompleteBtn = () => props.filterTasks("complete", props.tlId)
    const removeTlBtn =()=>props.removeTodolist(props.tlId)

    return (
        <div>
            <h3>{props.title}<button onClick={removeTlBtn}> x </button></h3>
            <div>
                <input value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={addTaskKey}
                    className={error ? "error" : ""} />
                <button onClick={addTaskBtn}> +</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskBtn = () => props.removeTask(t.id, props.tlId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.tlId)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type={"checkbox"}
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={removeTaskBtn}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={FilterAllBtn}
                    className={props.filter === "all" ? "active-filter" : ""}>
                    All
                </button>
                <button onClick={FilterActiveBtn}
                    className={props.filter === "active" ? "active-filter" : ""}>
                    Active
                </button>
                <button onClick={FilterCompleteBtn}
                    className={props.filter === "complete" ? "active-filter" : ""}>
                    Complete
                </button>
            </div>
        </div>
    )
}