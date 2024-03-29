import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
	name: "player", // Slice name, used to generate action types
	initialState: {
		name: "", // Initial state of the player, with an empty name
		admin: false,
	},
	reducers: {
		setPlayerName: (state, action) => {
			state.name = action.payload;
		},
		setQuizAdmin: (state, action) => {
			state.admin = action.payload;
			console.log("Slicer State:", state, "Action:", action);
		},
	},
});

export const { setPlayerName, setQuizAdmin } = playerSlice.actions;

const quizAdminSlice = createSlice({
	name: "admin",
	initialState: {
		value: false,
	},
	reducers: {
		quizAdminTrue: (state) => {
			state.value = true;
		},
		quizAdminFalse: (state) => {
			state.value = false;
		},
	},
});

export const { quizAdminTrue, quizAdminFalse } = playerSlice.actions;

const playerReducers = {
	player: playerSlice.reducer,
	admin: quizAdminSlice.reducer,
};

export default playerReducers;
