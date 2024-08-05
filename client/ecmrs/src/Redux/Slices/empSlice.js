import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helperw/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    empData: []
}

export const getAllEmployee = createAsyncThunk('emp/getAllEmployees',async()=>{
   try {
    
       const res =  axiosInstance.get('/emp/getAll')
       toast.promise(res,
           {
               loading:"loading all employess",
               success:(data)=>{
                   return data?.data?.message
               },
               error:'Failed to fetch employees' 
           }
       
            
       )
       return (await res).data.emp;
   } catch (error) {
    toast.error(error?.response?.data?.message)
   }
})

export const createEmployee = createAsyncThunk('emp/createEmployee',async(data)=>{
    try {
        let formData = new FormData()
        formData.append("description",data?.description)
        formData.append('fullName',data?.fullName)
        formData.append('email',data?.email)
        formData.append('phone',data?.phone)
        formData.append('jobTitle',data?.jobTitle)
        formData.append('department',data?.department)
        formData.append('salary',data?.salary)
        formData.append('image',data?.image)
            // email:"",
            // phone:"",
            // jobTitle:"",
            // department:"",
            // salary:"",
        const res = await axiosInstance.post('/emp/',formData)
        toast.promise(res,{
            loading:'Wait ! Employee being creaated',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to create account'
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getEmployee = createAsyncThunk('emp/getEmployee', async (id) => {
    try {
      const res = await axiosInstance.get(`/emp/${id}`);
      console.log("response is", res);
      console.log("response data is", res.data);
    //   toast.promise(res, {
    //     loading: 'loadin employee data',
    //     success: () => {
    //       return res.data // Return the entire response data
    //     },
    //     error: 'Failed to fetch account',
    //   });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });
  export const updateEmployee = createAsyncThunk('emp/updateEmployee', async (id, data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
  
      const res = axiosInstance.put(`/emp/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast.promise(res, {
        loading: 'Wait ! Employee being updated',
        success: (data) => {
          return data?.data?.message
        },
        error: 'Failed to update employee'
      });
  
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });
export const deleteEmployee = createAsyncThunk('emp/deleteEmployee',async(id)=>{
    try {
        const res = axiosInstance.delete(`/emp/${id}`)
        toast.promise(res,{
            loading:'deletomg employee from record ...',
            success:(data)=>{
                return data?.data?.message
            },
            error:'failed to delete the record'
        })
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }   
})

const empSlice = createSlice({
    name: 'emp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllEmployee.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload) {
              state.empData =  action.payload;
            //   state.empData =  action.payload;
            }
        })
     .addCase(createEmployee.fulfilled, (state, action) => {
        
        console.log(action);
        if (action.payload) {
          state.empData = [...state.empData, action.payload];
        }
      })
     .addCase(getEmployee.fulfilled, (state, action) => {
        console.log("payload is",action)
        if (action.payload) {
          state.empData = action.payload;
        }
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(state.empData)) {
          const index = state.empData.findIndex((emp) => emp.id === action.payload.id);
          if (index !== -1) {
            state.empData[index] = action.payload;
          }
        }
      })
     .addCase(deleteEmployee.fulfilled, (state, action) => {
        if (action.payload) {
          state.empData = state.empData.filter((emp) => emp.id!== action.payload.id);
        }
      });
    },
  });

export default empSlice.reducer