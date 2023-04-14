import {PropsWithChildren, useState} from "react";
import {useCodeHooks} from "@/hook/useCodeHooks";


interface EditableInputProps {
    type: string
    value: string
    onValueChange: (string) => Promise<void>
    placeholder?: string
}

const EditableInput = (props: EditableInputProps) => {
    const [editing, setEditing] = useState(false)
    const [entry, setEntry] = useState(props.value)

    const onWrite = (e) => {
        e.preventDefault()
        setEditing(false)
        props.onValueChange(entry)
            .then()
    }

    return (
        editing ?
            (<input type={props.type} value={entry} placeholder={props.placeholder} onChange={(e) => {
                e.preventDefault()
                setEntry(e.target.value)
            }} onKeyDown={(e) => {
                if(e.key === "Enter") {
                    onWrite(e)
                }
            }} onBlur={onWrite}/>)
            : (<span onClick={() => setEditing(true)}>{entry.length > 0 ? entry : props.placeholder}</span>)
    )
}

interface TaskDetailsProps {
    task: Task
}

export default function TaskDetails(props: TaskDetailsProps) {

    const { api } = useCodeHooks()
    const [task, setTask] = useState<Task>(props.task)

    const updateField = async (name, value) => {
        const body = {}
        body["id"] = task.id
        body[name] = value

        await api.fetch("/updateTask", async (res) => {
            const json = await res.json()
            if(!json.error) {
                setTask(json)
            }
        }, "POST", body)
    }

    return (
        <div>
            <div>
                <EditableInput type={`text`} value={task.name} onValueChange={(newValue) => updateField("name", newValue)} />
            </div>
            <div>
                <EditableInput type={`textarea`} value={task.description} onValueChange={(newValue) => updateField("description", newValue)} placeholder={"Description"} />
            </div>
        </div>
    )
}