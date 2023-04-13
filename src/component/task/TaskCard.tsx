
interface TaskCardProps {
    task: Task
}


export default function TaskCard(props: TaskCardProps) {

    const task = props.task

    return (
        <div>
            <div>
                {task.status ? "Complete" : "Incomplete"}
            </div>
            <div>
                <div>{task.name}</div>
                <div>{task.description}</div>
            </div>
        </div>
    )
}