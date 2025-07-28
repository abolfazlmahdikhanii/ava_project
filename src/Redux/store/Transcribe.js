import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const uploadMedia = createAsyncThunk(
  "transcribe/uploadMedia",
  async ({ file, type, isRecord }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const extension =
        type === "audio" ? (file.type.includes("wav") ? "wav" : "mp3") : "mp4";

      formData.append(
        "media",
        file,
        `${isRecord ? "REC" : "MEDIA"}-${new Date().getTime()}.${extension}`
      );

      const response = await fetch(
        "https://harf.roshan-ai.ir/api/transcribe_files/",
        {
          method: "POST",
          headers: {
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
            "Access-Control-Allow-Origin":"Origin"
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);
export const uploadFromUrl = createAsyncThunk(
  "transcribe/uploadFromUrl",
  async (url, { rejectWithValue }) => {
    try {
      const newMedia = {
        media_urls: [url],
      };

      const response = await fetch(
        "https://harf.roshan-ai.ir/api/transcribe_files/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
          },
          body: JSON.stringify(newMedia),
        }
      );

      if (!response.ok) {
        // Use server error message if available
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Ensure we always have a meaningful error message
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);
export const getArchiveData = createAsyncThunk(
  "transcribe/getArchiveData",
  async (page, { rejectWithValue }) => {
    const defaultUrl = `https://harf.roshan-ai.ir/api/requests/`;
    try {
      const response = await fetch(
        page && page !== 1 ? `${defaultUrl}?page=${page}` : defaultUrl,
        {
          method: "GET",
          headers: {
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
          },
        }
      );
      if (!response.ok) throw new Error("مشکل در دریافت اطلاعات");
      const res = await response.json();
      return {
        data: res,
        page,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeArchive = createAsyncThunk(
  "transcribe/removeArchive",
  async (id, { rejectWithValue }) => {
    return fetch(`https://harf.roshan-ai.ir/api/requests/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error;
        return id;
      })

      .catch((error) => {
        return rejectWithValue(error.response?.data || error.message);
      });
  }
);

const transcribeSlice = createSlice({
  name: "transcribe",
  initialState: {
    currentUpload: null,
    archives: [],
    selectedArchive: null,
    error: null,
    isLoading: false,
    playerColor: "",
    activeContent: null,
    activeTime: null,
    removeItem: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      nextUrl: null,
      prevUrl: null,
      count: 0,
    },
  },
  reducers: {
    resetUploading: (state) => {
      state.currentUpload = null;
      state.isLoading = false;
    },
    setSelectItem: (state, action) => {
      state.selectedArchive = action.payload;
    },
    setRemoveContent: (state, action) => {
      state.removeItem = action.payload;
    },

    setPlayerColor: (state, action) => {
      state.playerColor = action.payload;
    },
    setActiveContent: (state, action) => {
      state.activeContent = action.payload;
    },
    setActiveAudioTime: (state, action) => {
      state.activeTime = action.payload;
    },
    pageChange: (state, action) => {
      state.pagination.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    // upload Media
    builder.addCase(uploadMedia.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadMedia.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.detail;
    });
    builder.addCase(uploadMedia.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUpload = action.payload[0];
    });
    // upload from url

    builder.addCase(uploadFromUrl.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadFromUrl.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.detail;
    });
    builder.addCase(uploadFromUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUpload = action.payload[0];
    
    });
    // get Archive

    builder.addCase(getArchiveData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArchiveData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.detail;
    });
    builder.addCase(getArchiveData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.archives = action.payload.data.results;
      state.pagination.nextUrl = action.payload.data.next;
      state.pagination.prevUrl = action.payload.data.previous;
      state.pagination.count = action.payload.data.count;
      state.pagination.currentPage = action.payload.page;
      state.pagination.totalPages = Math.ceil(action.payload.data.count / 10);
    });

    builder.addCase(removeArchive.rejected, (state, action) => {
      state.error = action.payload.detail;
    
    });
    builder.addCase(removeArchive.fulfilled, (state, action) => {
      state.isLoading = false;
  
    
    });
  },
});
export const {
  resetUploading,
  pageChange,
  setRemoveContent,
  setPlayerColor,
  setSelectItem,
  setActiveAudioTime,
  setActiveContent,
} = transcribeSlice.actions;
export default transcribeSlice.reducer;
