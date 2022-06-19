# Helpdesk MERN APP

Created a new mongoDB project, added cluster, create a users collection in the database and connected the database to the MongoDB Compass using the connection URL.

Now we'll add a new middleware

```shell
    npm i express-async-handler
```

While using mongoose it returns a promise, so to handle error we need to either use the `.catch()` or the
try catch block if we are using async-await, But if we use this express-async-handler middleware it will pass the errors to our error handler

To use it just import / require it & the wrap your contoller around it

### JWT

For autherization we will pass a token each time the users registers or login, (we'll use it later in the frontend)

The jwt `sign()` take the id which has to be a part of the token a secret and a options object

Since the token contains the user id, we will use it to protect and autherize routes in the frontend
