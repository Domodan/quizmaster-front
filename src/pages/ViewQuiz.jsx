import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import Quizz from "../components/Quizz";

export async function loader({ request }) {
	// Extract quizIndex from params and return it
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	return parseInt(q);
}

// ViewQuiz component
const ViewQuiz = () => {
	const quizIndex = useLoaderData();
	const quizData = useSelector((state) => state.quiz.quizDetails[quizIndex]);

	if (!quizData) return <div>Quiz Not Found</div>;

	const quizTitle = quizData.quizTitle;
	const questions = quizData.questionOptions;

	return (
		<>
			<Quizz quizTitle={quizTitle} questions={questions} readOnly={true} />
		</>
	);
};

export default ViewQuiz;
