import { configureStore } from "@reduxjs/toolkit"
import dataReducer from './Slice'
import settingReducer from './Slice2'
import questionReducer from './Slice3'
import SoundSlice from './Slice4'



const myStore = configureStore({
    reducer: {
        Items: dataReducer,
        setting: settingReducer,
        question: questionReducer,
        sound: SoundSlice,
       
    }
})
export default myStore