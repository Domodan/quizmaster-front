import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
	Modal,
	Typography,
	TextField,
	Button,
	Box,
	Grid,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

import { setPlayerName, setQuizAdmin } from "../../slice/player";
import { hideNameModal } from "../../slice/modal";

import modalStyle, { buttonStyles, buttonsContainerStyles } from "./style";

const ParticipantName = ({ open }) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [canAddQuiz, setCanAddQuiz] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Handling the play quiz action
	const handlePlayQuiz = (e) => {
		e.preventDefault();

		// Checking if the entered name is valid
		const invalidName = !name || name.length < 5 || name.length > 30;
		if (invalidName) {
			toast.error("Name must be 5-50 charcters long.", { id: "invalid-name-toast" });
			return;
		}

		localStorage.setItem("username", name);
		localStorage.setItem("password", password);
		localStorage.setItem("quizAdmin", canAddQuiz);

		dispatch(setPlayerName(name));
		dispatch(setQuizAdmin(canAddQuiz));
		dispatch(hideNameModal());

		// Display a toast message saying welcome
		toast.success("Welcome to the quiz.", { id: "welcome-toast" });
	};

	// Rendering the NameModal component
	return (
		<Modal open={open}>
			<Box sx={modalStyle} display="flex" flexDirection="column" gap=".5rem">
				<Typography variant="h6">Create Account to Start the Quiz</Typography>
				<TextField
					fullWidth
					value={name}
					placeholder="Enter your name"
					onChange={(e) => setName(e.target.value)}
					required
					sx={{
						color: "black", // Change to your desired text color
						"&::placeholder": {
							color: "grey", // Change to your desired placeholder color
						},
						"& input": {
							padding: ".5rem .5rem",
						},
						backgroundColor: "white", // Change to your desired background color
						border: "1px solid black", // Change to your desired border color
						borderRadius: "4px", // Optional: add border radius
					}}
				/>
				<TextField
					fullWidth
					value={password}
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
					required
					sx={{
						color: "black", // Change to your desired text color
						"&::placeholder": {
							color: "grey", // Change to your desired placeholder color
						},
						"& input": {
							padding: ".5rem .5rem",
						},
						backgroundColor: "white", // Change to your desired background color
						border: "1px solid black", // Change to your desired border color
						borderRadius: "4px", // Optional: add border radius
					}}
				/>
				{/* Checkbox for Correct Answer */}
				<Grid item>
					<FormControlLabel
						control={
							<Checkbox
								checked={canAddQuiz}
								style={{ color: "inherit" }}
								onChange={(e) => setCanAddQuiz(e.target.checked)}
								inputProps={{ "aria-label": "controlled" }}
							/>
						}
						label={
							<Typography variant="body1" style={{ color: "inherit" }}>
								Can Add Quiz
							</Typography>
						}
					/>
				</Grid>
				<Box style={buttonsContainerStyles}>
					<Button sx={buttonStyles} type="button" onClick={() => navigate(-1)}>
						Cancel
					</Button>
					<Button sx={buttonStyles} onClick={handlePlayQuiz}>
						Start Quiz
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ParticipantName;
