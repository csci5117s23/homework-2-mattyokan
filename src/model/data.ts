/**
 * Represents the data model for a specific user.
 * This data model is adhered to within the backend,
 * but since the backend does not use TS, the model is
 * only included within the NextJS project.
 */
interface UserData {

    /**
     * The user's auth ID.
     */
    id: string
    /**
     * The tasks belonging to this user.
     */
    tasks: Map<string, Task>

    /**
     * The categories this user has created.
     */
    categories: Map<string, Category>

}

interface Task {
    /**
     * UUID representing this task.
     */
    id: string,
    /**
     * User-friendly name for this task.
     */
    name: string,

    /**
     * Plaintext description of this task.
     */
    description: string,

    /**
     * The category this task belongs to.
     */
    category?: string,

    /**
     * Whether this task is complete or not.
     */
    status: boolean,
}

interface Category {
    /**
     * UUID representing this category.
     */
    id: string,

    /**
     * User-friendly name for this category.
     */
    name: string
}