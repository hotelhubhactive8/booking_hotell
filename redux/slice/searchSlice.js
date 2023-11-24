import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import http from "../../services/http";

const initialState = {
    search: [],
    loading: false,
}

export const fetchSearch = createAsyncThunk('search/fetchSearch', async (search) => {
    const response = await http.get('/locations/v3/search', {
        params: {
            q: search,
        }
    })
    console.log(response.data);
    return response.data;
})

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetSearch: (state, action) => {
            state.search = initialState.search;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase("search/fetchSearch/pending", (state, action) => {
                state.loading = true;
            })
            .addCase("search/fetchSearch/fulfilled", (state, action) => {
                state.search = action.payload;
                state.loading = false;
            })
            .addCase("search/fetchSearch/rejected", (state, action) => {
                state.loading = false;
            })
    }
})

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;