/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import jwtDecode from 'jwt-decode';

// source: https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo/blob/8e85dd14f06ae24ae0db2ee44237bf0de111d5fe/backend/index.js#L23
// This can largely be copy-pasted, it just grabs the authorization token and parses it, stashing it on the request.
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
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

app.post('/create/', async (req, res) => {
  // create new todo
})

app.get('/view/:type', (req, res) => {
  // View all/done/incomplete
  // Optional category filter
})

app.post('/complete', (req, res) => {
  // mark todo as complete
})

app.post('/category/create', (req, res) => {
  // create new category
})

app.post('/category/delete', (req, res) => {
  // delete a category
})

// Use Crudlify to create a REST API for any collection
crudlify(app)

// bind to serverless runtime
export default app.init();
