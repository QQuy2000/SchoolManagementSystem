import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentService } from "service/Student/StudentService";

const studentSlice = createSlice({
    name: "student",
    initialState:{
        isLoading: false,
        studentList: [],
        editFormData: {
            id: "",
            fullName: "",
            dob: "",
            signupDate: "",
            phoneNum: "",
            familyContact: "",
            parentEmail: "",
            status: "",
            avatar: null,
        },
        addFormData: {
            fullName: "",
            dob: "",
            signupDate: "",
            phoneNum: "",
            familyContact: "",
            parentEmail: "",
            status: "",
            avatar: null,
        },
        errors: {},
        idDelete: "",


    },
    reducers: {
        studentListChange:(state, action) => {
            state.studentList = action.payload;
        },
        editFormDataChange:(state, action) => {
            state.editFormData = action.payload;
        },
        addFormDataChange:(state, action) => {
            state.addFormData = action.payload;
        },
        errorsChange: (state, action) => {
            state.errors = action.payload
        },
        idDeleteChange: (state, action) => {
            state.idDelete = action.payload
        }
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

            .addCase(UpdateStudent.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.studentList.findIndex(
                    (student) => student.id === action.payload.id
                )
                state.studentList[index] = action.payload
            })
            .addCase(UpdateStudent.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(UpdateStudent.rejected, (state, action) => {
            })

            .addCase(createStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.studentList.push(action.payload)
            })
            .addCase(createStudent.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createStudent.rejected, (state, action) => {
            })

            .addCase(deleteStudentList.fulfilled, (state, action) => {
                state.isLoading = false
                const newList = state.studentList.filter(
                    (item) => !action.payload.includes(item.id))
                state.studentList = newList
            })
            .addCase(deleteStudentList.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteStudentList.rejected, (state, action) => {
            })

            .addCase(deleteOneStudent.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.studentList.findIndex(
                    (student) => student.id === action.payload
                )
                state.studentList.splice(index, 1)
            })
            .addCase(deleteOneStudent.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteOneStudent.rejected, (state, action) => {
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

export const UpdateStudent = createAsyncThunk(
    'student/fetchUpdateStudent', async (params, thunkAPI) => {
        const res = await studentService.updateStudentInfo(params.data);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "success",
            "nc-icon nc-check-2"
        )
        console.log(res.data)
        return res.data.data
    }
)

export const createStudent = createAsyncThunk(
    'student/createStudent', async (params, thunkAPI) => {
        const res = await studentService.createNewStudent(params.data);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "success",
            "nc-icon nc-check-2"
        )
        // console.log(res.data)
        return res.data
    }
)

export const deleteStudentList = createAsyncThunk(
    'student/deleteStudentList', async (params, thunkAPI) => {
        const res = await studentService.deleteStudent(params.data);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "success",
            "nc-icon nc-check-2"
        )
        return res.data
    }
)

export const deleteOneStudent = createAsyncThunk(
    'student/deleteOneStudent', async (params, thunkAPI) => {
        const res = await studentService.deleteOneStudent(params.data);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "success",
            "nc-icon nc-check-2"
        )
        // console.log(res.data)
        return res.data
    }
)


export const {  studentListChange, 
                editFormDataChange, 
                addFormDataChange,
                errorsChange,
                idDeleteChange} = studentSlice.actions;
export default studentSlice.reducer;