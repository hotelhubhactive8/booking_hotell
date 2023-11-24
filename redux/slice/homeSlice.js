import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/http';

const initialState = {
  home: [],
  city: [],
  favorites: [],
  loading: false,
};

export const getHome = createAsyncThunk('home/getHome', async () => {
  const response = await http.post(
    'properties/v2/list',
    {
      currency: 'IDR',
      eapid: 46,
      locale: 'en_US',
      siteId: 321200046,
      destination: {
        regionId: '6049351',
      },
      checkInDate: {
        day: 10,
        month: 10,
        year: 2022,
      },
      checkOutDate: {
        day: 15,
        month: 10,
        year: 2022,
      },
      rooms: [
        {
          adults: 2,
          children: [
            {
              age: 5,
            },
            {
              age: 7,
            },
          ],
        },
      ],
      resultsStartingIndex: 0,
      resultsSize: 15,
      sort: 'RECOMMENDED',
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  // console.log(response.data.data.propertySearch.properties);
  return response.data.data.propertySearch.properties;
});

export const getCity = createAsyncThunk('city/getCity', async () => {
  const response = await http.get('locations/v3/search', {
    params: {
      q: 'indonesia',
      locale: 'en_ID',
      langid: '1057',
      siteid: '321200046',
    },
  });
  return response.data?.sr?.filter((item) => item.type === 'CITY');
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
    resetFavorites: (state, action) => {
      state.favorites = initialState.favorites;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHome.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.home = action.payload;
        state.loading = false;
      })
      .addCase(getHome.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.city = action.payload;
        state.loading = false;
      })
      .addCase(getCity.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addToFavorites, removeFromFavorites, resetFavorites } = homeSlice.actions;
export default homeSlice.reducer;
