import styles from '@/styles/404.module.scss';
import Link from "next/link";
import {Inter} from "next/font/google";


const inter = Inter({subsets: ['latin']})


export default function NotFound() {
    return (
        <div className={`${styles.container} ${inter.className}`}>
            <div className={styles.text}>
                <h1>404 Not Found</h1>
                <Link href={`/todos`}>Back to your tasks</Link>
            </div>
        </div>
    )
}