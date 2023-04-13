import PageContainer from "@/component/PageContainer";
import TaskView from "@/component/task/TaskView";

export default function Done() {
    return (
        <PageContainer>
            <TaskView title={`Complete Tasks`} filter={{
                requiredStatus: true
            }}/>
        </PageContainer>
    )
}