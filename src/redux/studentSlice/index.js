import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentService } from "service/Student/StudentService";

const studentSlice = createSlice({
    name: "student",
    initialState:{
        isLoading: false,
        studentList: [],

    },
    reducers: {
        studentListChange:(state, action) => {
            state.studentList = action.payload;
        },
    },
    extraReducers:(builder) =>{
        builder
            .addCase(fetchStudentList.fulfilled, (state, action) => {
                state.studentList = action.payload
                state.isLoading = false
            })
            .addCase(fetchStudentList.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchStudentList.rejected, (state, action) => {
            })
    }
})

export const fetchStudentList = createAsyncThunk(
    'student/fetchStudentList', async (params, thunkAPI) => {
        const res = await studentService.getStudentList();
        if(res?.success === false && res.success != null){
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const {studentListChange} = studentSlice.actions;
export default studentSlice.reducer;