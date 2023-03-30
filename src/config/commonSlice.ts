import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CommonData {
  loading: boolean
}

export const initialCommonData: CommonData = {
  loading: false,
}

export const commonSlice = createSlice({
  name: "Common Global Data",
  initialState: initialCommonData,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = commonSlice.actions

export default commonSlice.reducer
