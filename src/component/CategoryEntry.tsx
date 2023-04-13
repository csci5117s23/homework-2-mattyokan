import styles from '@/styles/CategoryEntry.module.scss';
import {useCodeHooks} from "@/hook/useCodeHooks";

interface CategoryEntryProps {
    category: Category
    remove: () => void
}

export default function CategoryEntry(props: CategoryEntryProps) {

    const {api} = useCodeHooks()

    return (
        <div className={styles.category}>
            <div className={styles.name}>
                {props.category.name}
            </div>
            <button className={styles.delete} onClick={async () => {
                await api.fetch("/category/delete", async (res) => {

                }, "POST", {
                    id: props.category.id
                })
                props.remove()
            }}>
                Remove
            </button>

        </div>
    )
}