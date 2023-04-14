import PageContainer from "@/component/PageContainer";
import TaskView from "@/component/task/TaskView";

export default function AllTodos() {
    return (
        <PageContainer>
            <TaskView title={`All Incomplete Tasks`} filter={{
                requiredStatus: false
            }}/>
        </PageContainer>
    )
}