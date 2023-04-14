import {useState} from "react";
import {useCodeHooks} from "@/hook/useCodeHooks";

interface TaskFormProps {
    filter?: TaskFilter
    tasks: Task[]
    setTasks: ((value: (((prevState: Task[]) => Task[]) | Task[])) => void)
}

export default function TaskForm(props: TaskFormProps) {
    const { api } = useCodeHooks()
    const [taskName, setTaskName] = useState<string>("")
    const addNewTask = (e) => {
        e.preventDefault()
        const newTaskName = taskName
        setTaskName("")

        let taskBody = {
            name: newTaskName
        }

        const filter = props.filter
        if(filter) {
            if(filter.requiredStatus) {
                taskBody["status"] = filter.requiredStatus
            }
            if(filter.requiredCategory) {
                taskBody["category"] = filter.requiredCategory
            }
        }

        api.fetch("/create", async (res) => {
            const json = await res.json()
            if(!json.error && json.task) {
                const tasks = [...props.tasks, json.task]
                props.setTasks(tasks)
            } else {
                console.log("Encountered error while creating task: ", json)
            }
        }, "POST", taskBody)
    }

    return (
        <div>
            <input onChange={(e) => setTaskName(e.target.value)} value={taskName} onKeyDown={(e) => {
                if(e.key === "Enter") {
                    addNewTask(e)
                }
            }}/>
            <button onClick={addNewTask}>Create Task</button>
        </div>
    )
}