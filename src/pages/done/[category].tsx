import PageContainer from "@/component/PageContainer";
import {useRouter} from "next/router";

export default function DoneByCategoryView() {
    const router = useRouter();
    const { category } = router.query
    return (
        <PageContainer>
            Done to-dos for category {category}
        </PageContainer>
    )
}