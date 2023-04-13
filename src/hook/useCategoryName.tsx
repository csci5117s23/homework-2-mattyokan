import {useEffect, useState} from "react";
import {useCodeHooks} from "@/hook/useCodeHooks";


export function useCategories(): [object, ((value: (((prevState: object) => object) | object)) => void)] {
    const {api, deps} = useCodeHooks()
    const [categories, setCategories] = useState<object>(null)

    useEffect(() => {
        api.fetch("/categories", async (res) => {
            const json = await res.json()
            setCategories(json)
        })
            .then()
    }, [...deps])

    return [categories, setCategories]
}