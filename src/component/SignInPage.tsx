import {SignIn} from "@clerk/nextjs";
import styles from '@/styles/SignInPage.module.scss';
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']})


export default function SignInPage() {

    return (
        <>
            <div className={`${styles.signInContainer} ${inter.className}`}>
                <div className={styles.header}>
                    <h1>
                        Welcome to Taskflow
                    </h1>
                    <p>Sign in or create an account to start planning!</p>
                </div>
                <SignIn />
            </div>

        </>
    )
}