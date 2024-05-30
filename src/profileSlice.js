import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 프로필 데이터 가져오기 비동기 액션
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (memberId, { rejectWithValue }) => {
    try {
      const authorization = localStorage.getItem("Authorization");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/${memberId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 프로필 이미지 가져오기 비동기 액션
export const fetchProfileImage = createAsyncThunk(
  "profile/fetchProfileImage",
  async (memberId, { rejectWithValue }) => {
    try {
      const authorization = localStorage.getItem("Authorization");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/profile/image/${memberId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: null,
    profileImage: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    clearProfileData: (state) => {
      state.profileData = null;
      state.profileImage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileImage = action.payload;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setProfileData, setProfileImage, clearProfileData } =
  profileSlice.actions;

export default profileSlice.reducer;
