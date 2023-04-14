import PageContainer from "@/component/PageContainer";
import {useRouter} from "next/router";
import {useCodeHooks} from "@/hook/useCodeHooks";
import {useEffect, useState} from "react";
import TaskDetails from "@/component/task/TaskDetails";
import Skeleton from "react-loading-skeleton";

export default function TodoView() {
    const router = useRouter();
    const { id } = router.query
    const { api, deps } = useCodeHooks()
    const [task, setTask] = useState<Task | null>(null)

    useEffect(() => {
        if(id) {
            api.fetch("/task?" + new URLSearchParams({
                id: id as string
            }), async (res) => {
                const json = await res.json()
                if(!json.error) {
                    setTask(json)
                } else {
                    console.log("Error while loading task: ", json.error)
                }
            })
        }
    }, [id, ...deps])
    return (
        <PageContainer>
            {task ? <TaskDetails task={task} /> : <Skeleton count={1} />}
        </PageContainer>
    )
}