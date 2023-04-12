import {crudlify} from 'codehooks-crudlify'
import { date, object, string, number} from 'yup';
import {app, Datastore} from 'codehooks-js'
import {randomUUID} from "crypto";

export async function getTasks(userId, query) {
    const db = await Datastore.open();

    const data = await db.get(userId);

    if(!data || !data.tasks) return []

    return Array.from(data.tasks.values())
        .filter((task) => {
            return matchCategory(query, task) && matchStatus(query, task) && matchSearchQuery(query, task)
        })
}

export async function updateTask(userId, taskId, updateClosure) {
    const db = await Datastore.open();

    const data = await db.get(userId)

    if(!data || !data.tasks) return { error: `User data for UID ${userId} not found.`}

    const task = data.tasks.get(taskId)

    if(!task) return { error: `Task ${taskId} not found in user ${userId} data.`}

    const updated = updateClosure(task)

    data.tasks.set(taskId, updated)

    await db.set(userId, task)
    // TODO: Proper get/set error handling

    return { success: "Task updated." }
}

export async function createTask(userId, name, description, category, status) {
    const db = await Datastore.open();
    const data = await db.get(userId);
    if(!data || !data.tasks) return { error: `User data for UID ${userId} not found.`}

    const id = randomUUID()

    const task = {
        id: id,
        name: name,
        description: description,
        category: category,
        status: status
    }

    data.tasks.set(id, task)

    await db.set(userId, data)
    // TODO: Error handling
    return { success: "Task created." }
}

export async function deleteTask(userId, taskId) {
    const db = await Datastore.open();
    const data = await db.get(userId);
    if(!data || !data.tasks) return { error: `User data for UID ${userId} not found.`}
    data.tasks.delete(taskId)
    await db.set(userId, data)
    return { success: "Task deleted." }
}

function matchCategory(query, task) {
    return !(query.requiredCategory && task.category !== query.requiredCategory);
}

function matchStatus(query, task) {
    return !(query.requiredStatus && task.status !== query.requiredStatus);
}

/**
 * TODO: Time-permitting, make this less janky as the index is created each search
 * (very slow) and the actual similarity metrics are not used. It should work,
 * but it's not at all optimized.
 */
function matchSearchQuery(query, task) {
    if(query.query) {
        const idx = lunr(function () {
            this.field("title")
            this.field("body")
            this.add({
                "title": task.name,
                "body": task.description
            })
        })
        const result = idx.search(query.query)
        return result.length() > 0
    }
}