import styles from '@/styles/TaskCard.module.scss';
import {RiTaskFill, RiTaskLine} from "react-icons/ri";

interface TaskCardProps {
    task: Task
    toggleComplete: any
}


export default function TaskCard(props: TaskCardProps) {

    const task = props.task

    return (
        <div className={`${styles.card} ${task.status ? styles.complete : ""}`}>
            <div className={styles.status} onClick={props.toggleComplete}>
                {task.status ? <RiTaskFill /> : <RiTaskLine />}
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{task.name}</div>
                <div className={styles.description}>{task.description}</div>
            </div>
        </div>
    )
}