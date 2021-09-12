const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  playingPodcastId: null,
  playing: false,
  currentPlaytime: 0,
  currentTotalTime: null,
};

const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState,
  reducers: {
    setPlayingPodcastId(state, action) {
      const { podcastId } = action.payload;
      state.playingPodcastId = podcastId;
    },
    setCurrentPlaytime(state, action) {
      const { playtime } = action.payload;
      state.currentPlaytime = playtime;
    },
    setPlaying(state, action) {
      const { playing } = action.payload;
      state.playing = playing;
    },
    setCurrentTotalTime(state, action) {
      const { totalTime } = action.payload;
      state.currentTotalTime = totalTime;
    },
  },
});

const podcastActions = podcastSlice.actions;
const podcastReducer = podcastSlice.reducer;

export { podcastActions, podcastReducer };
