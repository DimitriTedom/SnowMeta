
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface FormData {
  videoUrl: string;
  color: string;
}

interface GeneratedContent {
  linkedinPost: string;
  imagePrompt: string;
}

interface GeneratorState {
  videoUrl: string;
  color: string;
  linkedinPost: string;
  imagePrompt: string;
  status: Status;
  error: string | null;
}

const initialState: GeneratorState = {
  videoUrl: '',
  color: '#3B82F6', // Bleu par défaut
  linkedinPost: '',
  imagePrompt: '',
  status: 'idle',
  error: null,
};

export const generateContent = createAsyncThunk(
  'generator/generateContent',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5678/webhook/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl: formData.videoUrl,
          color: formData.color,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data as GeneratedContent;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Une erreur inconnue est survenue');
    }
  }
);

const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoUrl = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    resetGenerator: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateContent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(generateContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.linkedinPost = action.payload.linkedinPost;
        state.imagePrompt = action.payload.imagePrompt;
        toast.success('Contenu généré avec succès!');
      })
      .addCase(generateContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        toast.error(state.error || 'Une erreur est survenue');
      });
  },
});

export const { setVideoUrl, setColor, resetGenerator } = generatorSlice.actions;

export default generatorSlice.reducer;
