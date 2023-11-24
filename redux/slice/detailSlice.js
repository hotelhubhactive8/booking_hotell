import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/http";

export const getDetails = createAsyncThunk(
  "detail/getDetails",
  async ({ id }) => {
    const response = await http.post(
      "properties/v2/detail",
      {
        currency: "IDR",
        locale: "id_ID",
        propertyId: id,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response.data?.data?.propertyInfo;
  }
);

export const getDescription = createAsyncThunk(
  "detail/getDescription",
  async ({ id }) => {
    const response = await http.post(
      "properties/v2/get-content",
      {
        currency: "IDR",
        locale: "id_ID",
        propertyId: id,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response.data?.data?.propertyInfo?.propertyContentSectionGroups
      ?.aboutThisProperty?.sections[0]?.bodySubSections[0]?.elements[0]
      ?.items[0]?.content.text;
  }
);

const initialState = {
  details: [],
  description: [],
  loading: false,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    resetDetails: (state) => {
      state.details = initialState.details;
      state.description = initialState.description;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDescription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDescription.fulfilled, (state, action) => {
        state.description = action.payload;
        state.loading = false;
      })
      .addCase(getDescription.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { resetDetails } = detailSlice.actions;
export default detailSlice.reducer;
