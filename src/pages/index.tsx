import PageContainer from "@/component/PageContainer";
import {useCodeHooks} from "@/hook/useCodeHooks";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Home() {
    const { api, deps } = useCodeHooks()
    const [state, setState] = useState()

    useEffect(() => {
        api.fetch("/", async (res) => {
            const json = await res.json()
            setState(json)
        })
            .then()
    }, [...deps])
    return (
        <PageContainer>
            Welcome to the application

            <Link href={`/done/lol`}>Done (category lol)</Link>
            <Link href={`/todo/1`}>TODO View</Link>
            <Link href={`/todos/`}>TODOs view</Link>
            <Link href={`/todos/lol`}>TODOs category view</Link>
            <Link href={`/done`}>Done view</Link>
        </PageContainer>
    )
}
