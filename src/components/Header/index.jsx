import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./style.css";

import { MenuOpenRounded, HighlightOffRounded } from "@mui/icons-material";

import ToggleTheme from "./Theming";

import { useSelector } from "react-redux";
import { getQuizData } from "../../slice/quiz";

// Navigation details for the header links
const navDetails = [
	{
		path: "/",
		name: "Home",
	},
	{
		path: "/my-quizzes",
		name: "My Quizzes",
	},
	{
		path: "/play-quiz",
		name: "Play Quiz",
	},
];

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const [darkMode, setDarkMode] = useState(() => {
		const storedDarkMode = localStorage.getItem("darkMode");
		return storedDarkMode ? JSON.parse(storedDarkMode) : true;
	});

	const location = useLocation();

	useEffect(() => {
		document.body.classList.toggle("dark-mode", darkMode);
	}, [darkMode]);

	// Redux selectors
	const playerName = useSelector((state) => state.player.name);
	const quizData = useSelector(getQuizData) || [];

	// Flags to check if the current page is the play quiz page and if quiz data is empty
	const isPlayQuizPage = location.pathname === "/play-quiz";
	const isQuizDataEmpty = quizData.length === 0;

	// Function to toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode((prev) => {
			const newDarkMode = !prev;
			localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
			return newDarkMode;
		});
	};

	// Function to handle menu toggle
	function handleMenuToggle() {
		setMenuOpen((prev) => !prev);

		// Add or remove the "menu-open" class from the body
		if (!menuOpen) {
			document.body.classList.add("menu-open");
		} else {
			document.body.classList.remove("menu-open");
		}
	}

	// Function to close the menu when a link is opened
	function closeMenuWhenLinkOpened() {
		setMenuOpen(false);
		document.body.classList.remove("menu-open");
	}

	// Render the header
	return (
		<header className="header">
			<Link
				to={isPlayQuizPage && !isQuizDataEmpty ? "#" : "/"}
				className="logo"
				onClick={closeMenuWhenLinkOpened}
			>
				QuizMaster
			</Link>

			{/* Render player info if on play quiz page and there is quiz data */}
			{isPlayQuizPage && !isQuizDataEmpty ? (
				playerName && (
					<div className="player-info">
						<p className="player-name">Player: {playerName}</p>
					</div>
				)
			) : (
				// Render navigation links and theme toggle switch
				<nav className="nav">
					<div className="buttons" style={{ display: "flex" }}>
						{/* Theme toggle switch */}
						<ToggleTheme darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

						{/* Menu toggle button */}
						<button
							className={`menu-btn ${menuOpen ? "active" : ""}`}
							onClick={handleMenuToggle}
						>
							{menuOpen ? (
								<HighlightOffRounded className="menu-icon" />
							) : (
								<MenuOpenRounded className="menu-icon" />
							)}
						</button>
					</div>

					{/* Navigation links */}
					<ul className={`nav-links ${menuOpen ? "active" : ""}`}>
						{navDetails.map(({ name, path }) => (
							<li key={name}>
								<NavLink
									onClick={closeMenuWhenLinkOpened}
									className={`nav-link`}
									to={path}
								>
									{name}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
};

export default Header;
