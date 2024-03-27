import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const QuizOptions = ({ onClickAddOption, onClickDelete }) => {
	// State to manage the anchor element for the menu
	const [anchorEl, setAnchorEl] = useState(null);

	// Boolean flag to determine if the menu is open
	const open = Boolean(anchorEl);

	return (
		<div>
			{/* IconButton triggering the menu */}
			<IconButton
				type="button"
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={(e) => setAnchorEl(e.currentTarget)}
				style={{ color: "inherit" }}
			>
				<MoreVertIcon />
			</IconButton>
			{/* Menu component */}
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}
			>
				{/* MenuItem for "Add option" */}
				<MenuItem
					onClick={() => {
						setAnchorEl(null);
						onClickAddOption();
					}}
				>
					{/* Button for better accessibility */}
					Add option
				</MenuItem>
				{/* MenuItem for "Delete" */}
				<MenuItem
					onClick={() => {
						setAnchorEl(null);
						onClickDelete();
					}}
				>
					{/* Button for better accessibility */}
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export default QuizOptions;
