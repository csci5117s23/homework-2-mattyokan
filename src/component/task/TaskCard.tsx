import styles from '@/styles/TaskCard.module.scss';
import {RiTaskFill, RiTaskLine} from "react-icons/ri";
import Link from "next/link";

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
                <div className={styles.name}>
                    <Link href={`/todo/${task.id}`}>{task.name}</Link>
                </div>
                <div className={styles.description}>{task.description}</div>
            </div>
        </div>
    )
}