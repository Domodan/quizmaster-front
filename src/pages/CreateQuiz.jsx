// Importing necessary dependencies and components
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addQuestion } from "../slice/quiz";
import { showViewQuizModal } from "../slice/modal";
import { validateQuizData } from "../utils/helper";

import formatDate from "../utils/format";
import ViewQuiz from "../components/modals/ViewQuiz";
import Quizz from "../components/Quizz";

const CreateQuiz = () => {
	const dispatch = useDispatch();
	const [quizTitle, setQuizTitle] = useState("");

	const [questions, setQuestions] = useState([
		{ question: "", options: ["", ""], correctAnswer: "" },
	]);

	const viewQuizModalState = useSelector((state) => state.viewQuizModal.value);

	const handleCreateQuiz = (e) => {
		e.preventDefault();

		const newQuiz = {
			quizTitle,
			status: 1,
			createdOn: formatDate(new Date()),
			questionOptions: questions,
		};

		const { success, error } = validateQuizData(newQuiz);

		if (success) {
			dispatch(addQuestion(newQuiz));
			toast.success("Quiz: " + quizTitle + " Created", { id: "create-quiz-toast" });
			dispatch(showViewQuizModal());
		} else {
			toast.error(error, { id: "create-quiz-toast" });
		}
	};

	return (
		<>
			{!viewQuizModalState ? (
				<Quizz
					quizTitle={quizTitle}
					setQuizTitle={setQuizTitle}
					questions={questions}
					setQuestions={setQuestions}
					handleFormSubmit={handleCreateQuiz}
					saveButtonActionName={"Create Quiz"}
				/>
			) : (
				<ViewQuiz />
			)}
		</>
	);
};

export default CreateQuiz;
