import PageContainer from "@/component/PageContainer";
import {useRouter} from "next/router";

export default function TodoView() {
    const router = useRouter();
    const { id } = router.query
    return (
        <PageContainer>
            To-do Entry {id}
        </PageContainer>
    )
}