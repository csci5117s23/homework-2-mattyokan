import PageContainer from "@/component/PageContainer";
import {useCodeHooks} from "@/hook/useCodeHooks";
import {useEffect, useState} from "react";

export default function Home() {
    const [api] = useCodeHooks()
    const [state, setState] = useState()

    useEffect(() => {
        api.fetch("/", async (res) => {
            const json = await res.json()
            setState(json)
        })
            .then()
    }, [])
    return (
        <PageContainer>
            {state?.foo ?? "loading..."}
        </PageContainer>
    )
}
