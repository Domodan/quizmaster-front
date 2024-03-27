import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { validateQuizData } from "../utils/helper";
import { updateQuizData } from "../slice/quiz";
import toast from "react-hot-toast";
import Quizz from "../components/Quizz";

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	return parseInt(q);
}

const EditQuiz = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const quizIndex = useLoaderData();
	const quizData = useSelector((state) => state.quiz.quizDetails[quizIndex]);
	const [quizTitle, setQuizTitle] = useState(quizData?.quizTitle);
	const [questions, setQuestions] = useState(quizData?.questionOptions);

	// If quizData is not available, display "Quiz Not Found"
	if (!quizData) return <div>Quiz Not Found</div>;

	const handleUpdateQuiz = (e) => {
		e.preventDefault();

		const updatedQuiz = {
			...quizData,
			quizTitle,
			questionOptions: questions,
		};

		// Validate the updated quiz data
		const { success, error } = validateQuizData(updatedQuiz);

		if (success) {
			dispatch(updateQuizData({ index: quizIndex, updatedQuiz }));
			toast.success(`Quiz: ${quizTitle} has been updated`, { id: "update-quiz-toast" });
			return navigate("/my-quizzes");
		}

		// If validation fails, show an error toast
		return toast.error(error, { id: "update-quiz-toast" });
	};

	return (
		<Quizz
			quizTitle={quizTitle}
			setQuizTitle={setQuizTitle}
			questions={questions}
			setQuestions={setQuestions}
			handleFormSubmit={handleUpdateQuiz}
			saveButtonActionName={"Update Quiz"}
		/>
	);
};

export default EditQuiz;
