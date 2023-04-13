import {useCodeHooks} from "@/hook/useCodeHooks";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {inspect} from "util";
import styles from '@/styles/CategorySidebar.module.scss';
import CategoryEntry from "@/component/CategoryEntry";
import {useRouter} from "next/router";


export default function CategorySidebar() {

    const {api, deps} = useCodeHooks()
    const [categories, setCategories] = useState<object>()
    const [newCategory, setNewCategory] = useState<string>("")
    const {asPath} = useRouter();
    const basePath = asPath.split("/")[1]

    useEffect(() => {
        api.fetch("/categories", async (res) => {
            const json = await res.json()
            setCategories(json)
        })
            .then()
    }, [...deps])

    const addNewCategory = (e) => {
        e.preventDefault()
        const category = newCategory
        setNewCategory("")
        api.fetch("/category/create", async (res) => {
            const json = await res.json()
            if(!json.error) {
                setCategories(json)
            }
        }, "POST", {
            name: category
        })
    }

    return (
        <div className={styles.sidebar}>
            <div>Categories</div>

            {(categories && !categories.error) ?
                (<>
                        <div className={styles.categories}>
                            {Object.values(categories).map((category) => (
                                <CategoryEntry key={category.id} category={category} basePath={basePath} remove={() => {
                                    const newCategories = {
                                        ...categories
                                    }
                                    delete newCategories[category.id]
                                    setCategories(newCategories)
                                }}/>
                            ))}
                        </div>
                        <div className={styles.newCategory}>
                            <input onChange={(e) => setNewCategory(e.target.value)} value={newCategory} onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    addNewCategory(e)
                                }
                            }}/>
                            <button onClick={addNewCategory}>Add</button>
                        </div>
                    </>
                )
                : (<Skeleton count={5}/>)
            }
        </div>
    )
}