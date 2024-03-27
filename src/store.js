import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "./slice/quiz";
import modalsReducers from "./slice/modal";
import playerReducer from "./slice/player";

export const store = configureStore({
	reducer: {
		quiz: quizReducer,
		player: playerReducer,
		nameModal: modalsReducers.nameModal,
		deleteModal: modalsReducers.deleteModal,
		quitModal: modalsReducers.quitModal,
		viewQuizModal: modalsReducers.viewQuizModal,
	},
});
