# Helpdesk MERN APP

Created a new mongoDB project, added cluster, create a users collection in the database and connected the database to the MongoDB Compass using the connection URL.

Now we'll add a new middleware

```shell
    npm i express-async-handler
```

While using mongoose it returns a promise, so to handle error we need to either use the `.catch()` or the
try catch block if we are using async-await, But if we use this express-async-handler middleware it will pass the errors to our error handler

Actually the express-async-handler, will send the error to the handle once it is thrown, therefore we still need to use the try catch block. Its just that, the error will be handled by our own custom error handler instead of the default express html webpage error

To use it just import / require it & the wrap your controller around it

### JWT

For authorization we will pass a token each time the users registers or login, (we'll use it later in the frontend)

The jwt `sign()` take the id which has to be a part of the token a secret and a options object

Since the token contains the user id, we will use it to protect and authorize routes in the frontend

### Redux toolkit

For the current app, we have create a store in the `store.js` file and the contents of the store will made be accessible to the entire app, using after we wrap the `App` component in `main.js` file with the provider for store.

```js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

```

```jsx
<Provider store={store}>
      <App />
</Provider>
```

We can create a state using a slice, creating a slice requires a string name to identify the slice, an  initial state value, and one or more reducer functions to define how the state can be updated

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      // Implement reducer logic like : 
      increment: (state) => {
      // In redux, there is not need to copy the state and return a new state, that is done under the hood using Immer library
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
      
  },
  extraReducers: builder => {},
})

export default authSlice.reducer
```

Finally export the reducer, and list it in the store

Now we can use the React-Redux hooks to let React components interact  with the Redux store. We can read data from the store with `useSelector`, and dispatch actions using `useDispatch`
