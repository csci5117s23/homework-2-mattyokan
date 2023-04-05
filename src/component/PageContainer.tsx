import {ReactNode} from "react";
import Head from "next/head";
import {Inter} from "next/font/google";
import styles from '@/styles/PageContainer.module.scss';
import Link from "next/link";
import {router} from "next/client";
import {useRouter} from "next/router";

interface PageContainerProps {
    children: ReactNode
}

const inter = Inter({subsets: ['latin']})


export default function PageContainer(props: PageContainerProps) {
    const router = useRouter();
    const nav = [
        {
            name: "Todos",
            path: "/todos"
        },
        {
            name: "Done",
            path: "/done"
        }
    ]
    return (
        <>
            <Head>
                <title>Taskflow</title>
            </Head>
            <div className={`${styles.pageContainer} ${inter.className}`}>
                <div className={styles.navbar}>
                    <div className={styles.brand}>
                        <Link href={`/`}>Taskflow</Link>
                    </div>
                    <div className={styles.navigation}>
                        {nav.map((entry) => {
                            return (<Link className={entry.path === router.pathname ? styles.active : ""} key={entry.path} href={entry.path}>{entry.name}</Link>)
                        })}
                    </div>
                    <div className={styles.search}>
                        Search
                    </div>
                </div>
                <div className={styles.pageContent}>
                    <aside className={styles.sidebar}>
                        Sidebar
                    </aside>
                    <main className={styles.main}>
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}