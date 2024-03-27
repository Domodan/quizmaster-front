import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { hideDeleteModal } from "../../slice/modal";
import { removeQuiz } from "../../slice/quiz";

import Confirmation from "./Confirmation";

const DeleteQuiz = ({ index, open }) => {
	const dispatch = useDispatch();
	const quizDetails = useSelector((state) => state.quiz.quizDetails);

	// Handling the removal of a quiz
	const handleRemoveQuiz = (quizIndex) => {
		dispatch(removeQuiz(quizIndex));
		dispatch(hideDeleteModal());

		// Displaying a toast notification for successful deletion
		toast.error(`Quiz ${quizDetails[quizIndex].quizTitle} deleted successfully`, {
			id: "quiz-delete-toast",
		});
	};

	// Rendering the ConfirmationModal component with appropriate props
	return (
		<Confirmation
			open={open}
			onClose={() => dispatch(hideDeleteModal())}
			onConfirm={() => handleRemoveQuiz(index)}
			title="Are you sure you wanna delete?"
			description="This will permanently delete this quiz, and there's no way to recover it."
			cancelText="Cancel"
			confirmText="Delete"
		/>
	);
};

export default DeleteQuiz;
