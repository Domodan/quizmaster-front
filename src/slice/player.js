import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
	name: "player", // Slice name, used to generate action types
	initialState: {
		name: "", // Initial state of the player, with an empty name
	},
	reducers: {
		setPlayerName: (state, action) => {
			state.name = action.payload;
		},
	},
});

export const { setPlayerName } = playerSlice.actions;

export default playerSlice.reducer;
