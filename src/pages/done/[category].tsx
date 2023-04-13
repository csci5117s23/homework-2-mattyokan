import PageContainer from "@/component/PageContainer";
import {useRouter} from "next/router";
import {useCategories} from "@/hook/useCategoryName";
import TaskView from "@/component/task/TaskView";
import Skeleton from "react-loading-skeleton";

export default function DoneByCategoryView() {
    const router = useRouter();
    const { category } = router.query
    const [categories] = useCategories()
    const currentCategory: Category | null = categories ? categories[category] : null
    const name = currentCategory?.name ?? "Loading"
    return (
        <PageContainer>
            {currentCategory ? (<TaskView title={`Completed Tasks in ${name}`} filter={{
                requiredStatus: true,
                requiredCategory: currentCategory?.id
            }}/>) : (<Skeleton count={10} />)}
        </PageContainer>
    )
}