import {configureStore} from "@reduxjs/toolkit"
import dataReducer from './Slice'

const myStore=configureStore({
    reducer:{
        Items:dataReducer,
    }
})
export default myStore