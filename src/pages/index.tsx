import PageContainer from "@/component/PageContainer";
import {useCodeHooks} from "@/hook/useCodeHooks";
import {useEffect, useState} from "react";
import Link from "next/link";
import {SignedIn, SignedOut, SignIn} from "@clerk/nextjs";
import SignInPage from "@/component/SignInPage";
import {useRouter} from "next/router";

const RedirectToTasks = () => {
    const { push } = useRouter();

    useEffect(() => {
        push("/todos")
            .then()
    }, [])
    return (<></>)
}

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
        <>
            <SignedIn>
                <RedirectToTasks />
            </SignedIn>
            <SignedOut>
                <SignInPage />
            </SignedOut>
        </>
    )
}
