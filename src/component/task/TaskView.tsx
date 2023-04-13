import {useEffect, useState} from "react";
import {useCodeHooks} from "@/hook/useCodeHooks";
import TaskCard from "@/component/task/TaskCard";
import Skeleton from "react-loading-skeleton";
import TaskForm from "@/component/task/TaskForm";

interface TasksProps {
    filter?: TaskFilter
    title: string
    category?: Category
}

export default function TaskView(props: TasksProps) {

    const {api, deps} = useCodeHooks();
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const params = new URLSearchParams(props.filter ? {filter: JSON.stringify(props.filter)} : {})
        console.log("Filter prop is ", props.filter)
        api.fetch("/tasks?" + params, async (res) => {
            const json = await res.json();
            if (!json.error) {
                console.log("Tasks are ", json)
                setTasks(json)
            }
        })
    }, [...deps, props])

    return (
        <>
            <h1>{props.title}</h1>
            <div>
                {tasks ? tasks.map(task => (
                    <TaskCard task={task} key={task.id}/>
                )) : <Skeleton count={5}/>}
            </div>
            {props.filter?.requiredStatus !== true && (<div>
                <TaskForm tasks={tasks} setTasks={setTasks} filter={props.filter}/>
            </div>)}
        </>
    )
}