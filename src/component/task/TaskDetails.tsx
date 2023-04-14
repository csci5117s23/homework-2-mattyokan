import {PropsWithChildren, useState} from "react";
import {useCodeHooks} from "@/hook/useCodeHooks";
import {useCategories} from "@/hook/useCategoryName";
import styles from '@/styles/TaskDetails.module.scss';
import {FaLightbulb} from "react-icons/fa";


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
            (props.type === "textarea" ? (<textarea rows={10} value={entry} placeholder={props.placeholder} onChange={(e) => {
                e.preventDefault()
                setEntry(e.target.value)
            }} onKeyDown={(e) => {
                if(e.key === "Enter") {
                    onWrite(e)
                }
            }} onBlur={onWrite}/>) : (<input type={props.type} value={entry} placeholder={props.placeholder} onChange={(e) => {
                e.preventDefault()
                setEntry(e.target.value)
            }} onKeyDown={(e) => {
                if(e.key === "Enter") {
                    onWrite(e)
                }
            }} onBlur={onWrite}/>))
            : (<span onClick={() => setEditing(true)}>{entry.length > 0 ? entry : props.placeholder}</span>)
    )
}

interface TaskDetailsProps {
    task: Task
}

export default function TaskDetails(props: TaskDetailsProps) {

    const { api } = useCodeHooks()
    const [task, setTask] = useState<Task>(props.task)
    const [categories, setCategories] = useCategories()

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
        <div className={styles.task}>
            <div className={styles.tutorial}>
                <div className={styles.icon}>
                    <FaLightbulb />
                </div>
                <div>
                    Tip: Click the name or description to edit it! All changes are auto-saved.
                </div>
            </div>
            <div className={styles.name}>
                <EditableInput type={`text`} value={task.name} onValueChange={(newValue) => updateField("name", newValue)} />
            </div>
            <div className={styles.description}>
                <div className={styles.header}>
                    Description
                </div>
                <EditableInput type={`textarea`} value={task.description} onValueChange={(newValue) => updateField("description", newValue)} placeholder={"Description"} />
            </div>
            <div className={styles.category}>
                <div className={styles.header}>
                    Category
                </div>
                {categories && <>
                    <select onChange={(e) => {
                        e.preventDefault()
                        const category = e.target.value
                        updateField("category", category === "" ? null : category)
                            .then()
                    }} value={task.category ?? ""}>
                        <option value={""}>None</option>
                        {Object.values(categories).map((category: Category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </>}
            </div>
        </div>
    )
}