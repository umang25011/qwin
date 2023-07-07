import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeamState {
  teams: {
    [teamId: string]: {
      teamName: string;
      participants: string[];
    };
  };
}

const initialState: TeamState = {
  teams: {},
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addParticipant(state, action: PayloadAction<{ teamId: string; participants: string[] }>) {
      const { teamId, participants } = action.payload;
      state.teams[teamId] = { teamName: '', participants };
    },
  },
});

export const { addParticipant } = teamSlice.actions;

export default teamSlice.reducer;
