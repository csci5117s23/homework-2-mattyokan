import styles from '@/styles/CategoryEntry.module.scss';
import {useCodeHooks} from "@/hook/useCodeHooks";
import {TbTrash} from "react-icons/tb";
import Link from "next/link";

interface CategoryEntryProps {
    category: Category
    remove: () => void

    basePath: string
}

export default function CategoryEntry(props: CategoryEntryProps) {

    const {api} = useCodeHooks()

    return (
        <div className={styles.category}>
            <div className={styles.name}>
                <Link href={`/${props.basePath}/${props.category.id}`}>
                    {props.category.name}
                </Link>
            </div>
            <button className={styles.delete} onClick={async () => {
                await api.fetch("/category/delete", async (res) => {

                }, "POST", {
                    id: props.category.id
                })
                props.remove()
            }}>
                <TbTrash />
            </button>

        </div>
    )
}