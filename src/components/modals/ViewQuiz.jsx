import { useDispatch, useSelector } from "react-redux";
import { hideViewQuizModal } from "../../slice/modal";
import { useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";

const ViewQuiz = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const quizData = useSelector((state) => state.quiz.quizDetails);
	const latestQuizIndex = quizData.length - 1;

	// Handling the quit action
	const handleViewQuiz = () => {
		dispatch(hideViewQuizModal());
		navigate(`/view-quiz?q=${latestQuizIndex}`);
	};

	const handleCloseModal = () => {
		dispatch(hideViewQuizModal());
		navigate("/my-quizzes");
	};

	return (
		<Confirmation
			open={true}
			onClose={handleCloseModal}
			onConfirm={handleViewQuiz}
			title="Quiz Created Successfully"
			cancelText="Close"
			confirmText="View Quiz"
		/>
	);
};

export default ViewQuiz;
