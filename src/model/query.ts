interface TaskFilter {
    /**
     * Require a certain category ID.
     *
     * If this is null, tasks with any category (incl. none) will be included.
     */
    requiredCategory?: string

    /**
     * Require task to be complete or not complete.
     *
     * If this is null, tasks with any completion status will be included.
     */
    requiredStatus?: boolean

    /**
     * Require a certain term in the task name/description.
     *
     * If this is null, any task contents will be accepted.
     */
    query?: string
}