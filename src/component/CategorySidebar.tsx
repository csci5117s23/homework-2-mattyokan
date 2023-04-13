import {useCodeHooks} from "@/hook/useCodeHooks";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {inspect} from "util";
import styles from '@/styles/CategorySidebar.module.scss';
import CategoryEntry from "@/component/CategoryEntry";


export default function CategorySidebar() {

    const {api, deps} = useCodeHooks()
    const [categories, setCategories] = useState<object>()

    useEffect(() => {
        api.fetch("/categories", async (res) => {
            const json = await res.json()
            setCategories(json)
        })
            .then()
    }, [...deps])

    return (
        <div className={styles.sidebar}>
            <div>Categories</div>

            {(categories && !categories.error) ?
                (
                    <div className={styles.categories}>
                        {Object.values(categories).map((category) => (
                            <CategoryEntry key={category.id} category={category} remove={() => {
                                const newCategories = {
                                    ...categories
                                }
                                delete newCategories[category.id]
                                setCategories(newCategories)
                            }}/>
                        ))}
                    </div>
                )
                : (<Skeleton count={5}/>)
            }
        </div>
    )
}