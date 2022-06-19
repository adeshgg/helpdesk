# Helpdesk MERN APP

Created a new mongoDB project, added cluster, create a users collection in the database and connected the database to the MongoDB Compass using the connection URL.

Now we'll add a new middleware

```shell
    npm i express-async-handler
```

While using mongoose it returns a promise, so to handle error we need to either use the `.catch()` or the
try catch block if we are using async-await, But if we use this express-async-handler middleware it will pass the errors to our error handler

To use it just import / require it & the wrap your contoller around it
