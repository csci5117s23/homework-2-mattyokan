import {ReactNode} from "react";
import Head from "next/head";
import {Inter} from "next/font/google";

interface PageContainerProps {
    children: ReactNode
}

const inter = Inter({subsets: ['latin']})


export default function PageContainer(props: PageContainerProps) {

    return (
        <>
            <Head>
                <title>Taskflow</title>
            </Head>
            <main className={`${inter.className}`}>
                {props.children}
            </main>
        </>
    )
}