import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { API } from './globals';

const initialState = {
    showNav: false,
    settings: null
};

// Async Thunk for Fetching settings
export const getSettings = createAsyncThunk(
    'services/getSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API + '/api/settings/get');
            
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch services: ${error}`);
        }
    }
);

// Create Slice
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setShowNav: (state) => {
            state.showNav = !state.showNav;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSettings.fulfilled, (state, action) => {
            state.settings = action.payload.data
        });
    },
});
export const { setShowNav } = settingsSlice.actions;

export default settingsSlice.reducer;
