import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideQuitModal } from "../../slice/modal";
import { setPlayerName } from "../../slice/player";
import Confirmation from "./Confirmation";

const QuitQuiz = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Handling the quit action
	const handleQuit = () => {
		dispatch(hideQuitModal());
		dispatch(setPlayerName(""));
		return navigate("/");
	};

	return (
		<Confirmation
			open={true} // Always open in this case
			onClose={() => dispatch(hideQuitModal())} // Handling modal close
			onConfirm={handleQuit} // Handling quit confirmation
			title="Are you sure you want to quit?" // Modal title
			description="You will lose all your scores" // Modal description
			cancelText="Cancel" // Text for the cancel button
			confirmText="Quit" // Text for the confirm button
		/>
	);
};

export default QuitQuiz;
