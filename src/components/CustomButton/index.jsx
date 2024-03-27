import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ buttonText = "Button", onClick, ...otherProps }) => {
	// Custom styles for the button
	const buttonStyles = {
		color: "inherit",
		border: "1px solid",
		borderColor: "inherit",
		textTransform: "capitalize",
	};

	return (
		// Material-UI Button component with custom styles
		<Button {...otherProps} variant="outlined" sx={buttonStyles} onClick={onClick}>
			{buttonText}
		</Button>
	);
};

export default CustomButton;
