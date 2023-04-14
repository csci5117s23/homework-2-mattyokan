import {Datastore} from 'codehooks-js'
import {randomUUID} from "crypto";

export async function getTaskById(userId, taskId) {
    const db = await Datastore.open();
    const data = await getUserData(db, userId)
    if(data.tasks) {
        return data.tasks[taskId]
    } else {
        return null
    }
}

export async function queryTasks(userId, query) {
    const db = await Datastore.open();
    const data = await getUserData(db, userId)

    return Array.from(Object.values(data.tasks))
        .filter((task) => {
            return matchCategory(query, task) && matchStatus(query, task) && matchSearchQuery(query, task)
        })
}

export async function updateTask(userId, taskId, updateClosure) {
    const db = await Datastore.open();
    const data = await getUserData(db, userId);
    const task = data.tasks ? data.tasks[taskId] : null
    if(!task) {
        return {error: "No task found with that ID."}
    } else {
        data.tasks[taskId] = await updateClosure(task)
        return data.tasks[taskId]
    }
}

export async function createTask(userId, name, description, category, status) {
    const db = await Datastore.open();
    const id = randomUUID()
    const task = {
        id: id,
        name: name,
        description: description,
        category: category,
        status: status
    }

    await updateUserData(db, userId, (data) => {
        data.tasks[id] = task
        return data
    })
    return task
}

export async function deleteTask(userId, taskId) {
    const db = await Datastore.open();
    await updateUserData(db, userId, (data) => {
        data.tasks[taskId] = undefined
        return data
    })
    return { success: "Task deleted" }
}

export async function createCategory(userId, name) {
    const db = await Datastore.open();
    await updateUserData(db, userId, (data) => {
        const id = randomUUID()

        data.categories[id] = {
            id: id,
            name: name,
        }
        return data
    })
    return (await getUserData(db, userId)).categories
}

export async function deleteCategory(userId, categoryId) {
    const db = await Datastore.open();
    await updateUserData(db, userId, (data) => {
        data.categories[categoryId] = undefined
        return data
    })
    return { success: "Category deleted" }
}

function matchCategory(query, task) {
    return !(query.requiredCategory && task.category !== query.requiredCategory);
}

function matchStatus(query, task) {
    if(typeof query.requiredStatus === "undefined") {
        return true
    } else {
        return query.requiredStatus === task.status;
    }
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
    } else {
        return true
    }
}

async function getOrDefault(db, key, closure) {
    try {
        return await db.getOne('users', key)
    } catch (e) {
        return closure()
    }
}

export async function getUserData(db, userId) {
    return await getOrDefault(db, userId, () => ({
        id: userId,
        tasks: {},
        categories: {}
    }))
}

async function setUserData(db, userId, data) {
    try {
        await db.replaceOne('users', data.id, data);
    } catch(e) {
        const result = await db.insertOne('users', {
            ...data,
            _id: userId
        })
    }
}

async function updateUserData(db, userId, closure) {
    const data = await getUserData(db, userId)
    const newData = await closure(data)
    return await setUserData(db, userId, newData)
}