import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccessful: false,
  isLoading: false,
  message: '',
}

// action function
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      // to grab the user token (since we need to send it, as this is a protected route)
      // Use the getState() on the thunkAPI object
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {},
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
