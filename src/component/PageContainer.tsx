import {ReactNode, useState} from "react";
import Head from "next/head";
import {Inter} from "next/font/google";
import styles from '@/styles/PageContainer.module.scss';
import Link from "next/link";
import {router} from "next/client";
import {useRouter} from "next/router";
import {RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import CategorySidebar from "@/component/CategorySidebar";

interface PageContainerProps {
    children: ReactNode
}

const inter = Inter({subsets: ['latin']})


export default function PageContainer(props: PageContainerProps) {
    const [expanded, setExpanded] = useState(false);
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
            <SignedIn>
                <Head>
                    <title>Taskflow</title>
                </Head>
                <div className={`${styles.pageContainer} ${inter.className}`}>
                    <div className={styles.navbar}>
                        <div className={styles.brand}>
                            <button className={styles.hamburger} onClick={() => {
                                setExpanded(!expanded)
                            }}>
                                Toggle Sidebar
                            </button>
                            <Link href={`/`}>Taskflow</Link>
                        </div>
                        <div className={styles.navigation}>
                            {nav.map((entry) => {
                                return (<Link className={entry.path === router.pathname ? styles.active : ""}
                                              key={entry.path} href={entry.path}>{entry.name}</Link>)
                            })}
                        </div>
                        <div className={styles.search}>
                            Search
                        </div>
                        <div className={styles.user}>
                            <SignedIn>

                                {/* Mount the UserButton component */}

                                <UserButton/>

                            </SignedIn>

                            <SignedOut>

                                {/* Signed out users get sign in button */}

                                <SignInButton/>

                            </SignedOut>
                        </div>
                    </div>
                    <div className={styles.pageContent}>
                        <aside className={`${styles.sidebar} ${expanded ? styles.active : ""}`}>
                            <CategorySidebar />
                        </aside>
                        <main className={styles.main}>
                            {props.children}
                        </main>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}