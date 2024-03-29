import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "./slice/quiz";
import modalsReducers from "./slice/modal";
import playerReducers from "./slice/player";

export const store = configureStore({
	reducer: {
		quiz: quizReducer,
		player: playerReducers.player,
		quizAdmin: playerReducers.admin,
		nameModal: modalsReducers.nameModal,
		deleteModal: modalsReducers.deleteModal,
		quitModal: modalsReducers.quitModal,
		viewQuizModal: modalsReducers.viewQuizModal,
	},
});
