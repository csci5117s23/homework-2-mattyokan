/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import jwtDecode from 'jwt-decode';
import {
    createCategory,
    createTask,
    deleteCategory,
    getTaskById,
    getUserData,
    queryTasks,
    updateTask
} from "./controller/data";

// source: https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo/blob/8e85dd14f06ae24ae0db2ee44237bf0de111d5fe/backend/index.js#L23
// This can largely be copy-pasted, it just grabs the authorization token and parses it, stashing it on the request.
const userAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (authorization) {
            const token = authorization.replace('Bearer ', '');
            // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
            req.user_token = jwtDecode(token);
        }
        next();
    } catch (error) {
        next(error);
    }
}
app.use(userAuth)

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
    res.send({
        foo: "bar"
    })
})

app.get('/categories', async (req, res) => {
    const userId = req?.user_token?.sub
    if (!userId) res.json({error: "You must be authenticated to use this endpoint."})
    else {
        const db = await Datastore.open();
        res.json({ categories: (await getUserData(db, userId)).categories })
    }
})

app.post('/create', async (req, res) => {
    const error = (reason) => ({error: reason})

    const userId = req?.user_token?.sub
    if (!userId) res.json(error("You must be authenticated to use this endpoint."))

    const name = req?.body?.name
    if (!name) res.json(error("Missing task name"))

    const description = req?.body?.description ?? ""
    const category = req?.body?.category ?? null
    const status = req?.body?.status ?? false

    try {
        const result = await createTask(userId, name, description, category, status)
        res.json({ task: result })
    } catch (e) {
        console.log("Exception ", e)
    }
})

app.get("/task", async (req, res) => {
    const userId = req?.user_token?.sub
    if (!userId) {
        const err = {error: "Must be authenticated"}
        res.json(err)
    } else {
        const id = req.query.id
        if (!id) {
            res.json({error: "Missing task ID"})
        } else {
            const results = await getTaskById(userId, id)
            res.json({ task: results })
        }
    }
})

app.get('/tasks', async (req, res) => {
    const filter = (req.query.filter) ? JSON.parse(req.query.filter) : {}
    const userId = req?.user_token?.sub
    if (!userId) {
        const err = {error: "Must be authenticated"}
        res.json(err)
    } else {
        const results = await queryTasks(userId, filter)
        console.log("Have results ", results, " from tasks query")
        res.json({ tasks: results })
    }
})

app.post('/updateTask', async (req, res) => {
    const userId = req?.user_token?.sub
    if (!userId) {
        res.json({error: "Must be authenticated"})
    } else {
        const body = req.body
        const taskId = body.id
        if (!taskId) res.json({error: "Missing taskId in body"})
        else res.json({ task: await updateTask(userId, taskId, async (task) => {
            if (typeof body.name !== "undefined") {
                task.name = body.name
            }
            if (typeof body.description !== "undefined") {
                task.description = body.description
            }
            if (typeof body.category !== "undefined") {
                task.category = body.category
            }
            if (typeof body.status !== "undefined") {
                task.status = body.status
            }
            return task
        }) })
    }
})

app.post('/category/create', async (req, res) => {
    const userId = req?.user_token?.sub
    if (!userId) {
        res.json({error: "Must be authenticated"})
    } else {
        const name = req.body.name
        if (!name) res.json({error: "Missing category name"})
        else res.json({ category: await createCategory(userId, name)})
    }
})

app.post('/category/delete', async (req, res) => {
    const userId = req?.user_token?.sub
    if (!userId) {
        res.json({error: "Must be authenticated"})
    } else {
        const id = req.body.id
        if (!id) res.json({error: "Missing category id"})
        else res.json({ category: await deleteCategory(userId, id) })
    }
})

// Use Crudlify to create a REST API for any collection
crudlify(app)

// bind to serverless runtime
export default app.init();
