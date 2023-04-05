import PageContainer from "@/component/PageContainer";
import {useRouter} from "next/router";

export default function CategoryView() {
    const router = useRouter();
    const { category } = router.query
    return (
        <PageContainer>
            Category {category}
        </PageContainer>
    )
}