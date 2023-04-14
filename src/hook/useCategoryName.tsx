import {useEffect, useState} from "react";
import {useCodeHooks} from "@/hook/useCodeHooks";


export function useCategories(): [any, ((value: (((prevState: object) => object) | object)) => void)] {
    const {api, deps} = useCodeHooks()
    const [categories, setCategories] = useState<object>(null)

    useEffect(() => {
        api.fetch("/categories", async (res) => {
            const json = await res.json()
            if(!json.error && json.categories) {
                setCategories(json.categories)
            } else {
                console.log("Encountered error or missing categories during categories retrieval:", json)
            }
        })
            .then()
    }, [...deps])

    return [categories, setCategories]
}