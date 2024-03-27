import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Modal, Typography, TextField, Button, Box } from "@mui/material";

import { setPlayerName } from "../../slice/player";
import { hideNameModal } from "../../slice/modal";

import modalStyle, { buttonStyles, buttonsContainerStyles } from "./style";

const ParticipantName = ({ open }) => {
	const [name, setName] = useState("");
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

		dispatch(setPlayerName(name));
		dispatch(hideNameModal());

		// Display a toast message saying welcome
		toast.success("Welcome to the quiz.", { id: "welcome-toast" });
	};

	// Rendering the NameModal component
	return (
		<Modal open={open}>
			<Box sx={modalStyle} display="flex" flexDirection="column" gap=".5rem">
				<Typography variant="h6">Enter your name to start the quiz</Typography>
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
