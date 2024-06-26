import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import styles from "./PlayQuiz.module.css";
import { getQuizData, getTotalActiveQuestionsLength } from "../../slice/quiz";
import { hideNameModal, showNameModal, showQuitModal } from "../../slice/modal";
import clickSoundFile from "../../assets/click.mp3";
import { calculateQuizScore } from "../../utils/helper";
import QuitQuiz from "../../components/modals/QuitQuiz";
import CustomButton from "../../components/CustomButton";
import QuizOptions from "./QuizOptions";
import Results from "../../components/modals/Results";
import ParticipantName from "../../components/modals/ParticipantName";

// Main component for playing the quiz
const PlayQuiz = () => {
	// React Router hook for navigation
	const navigate = useNavigate();

	// Redux hooks for dispatch and selector
	const dispatch = useDispatch();
	const quizData = useSelector(getQuizData);
	const outOf = useSelector(getTotalActiveQuestionsLength);

	// State to manage the quiz progress
	const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentQuestionCount, setCurrentQuestionCount] = useState(1);
	const [quizOver, setQuizOver] = useState(false);
	const [userAnswers, setUserAnswers] = useState(
		Array.from({ length: quizData.length }, () => ({}))
	);

	// State to manage the score and option selection status
	const [score, setScore] = useState(0);

	// Get player name from Redux state
	const playerName = useSelector((state) => state.player.name);
	const username = localStorage.getItem("username");

	// Modal State from Redux
	// const nameModalState = useSelector((state) => state.nameModal.value);
	const quitModalState = useSelector((state) => state.quitModal.value);

	// Effect to handle modal display and beforeunload event
	useEffect(() => {
		// Check if there is active quiz data
		if (quizData?.length && quizData.length !== 0) {
			// Show the name modal when the component mounts
			dispatch(showNameModal());

			// Handle beforeunload event to ask for confirmation before leaving the page
			const handleBeforeUnload = (e) => {
				e.preventDefault();
				e.returnValue = "";
			};
			window.addEventListener("beforeunload", handleBeforeUnload);

			// Cleanup function to hide the name modal and remove the event listener
			return () => {
				dispatch(hideNameModal());
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}
	}, [dispatch, quizData.length]);

	// Get current quiz and question
	const currentQuiz = quizData[currentQuizIndex];
	const currentQuestion = currentQuiz?.questionOptions[currentQuestionIndex];
	const isLastQuestionInQuiz = currentQuestionIndex === currentQuiz?.questionOptions?.length - 1;

	// Handle click on the Next button
	const handleNextClick = () => {
		// Get the user's selected option for the current question
		const currentSelectedOption = userAnswers[currentQuizIndex]?.[currentQuestionIndex];
		// Check if an option is selected
		if (
			!currentSelectedOption ||
			currentSelectedOption === "" ||
			currentSelectedOption === undefined
		) {
			// Display an error toast if no option is selected
			return toast.error("Please select at least one option", {
				id: "option-selection-alert",
			});
		}

		// Check if it's the last question of the last quiz to show the result
		if (isLastQuestionInQuiz && currentQuizIndex === quizData.length - 1) {
			// Calculate the quiz score and set the score state
			const calculatedScore = calculateQuizScore(quizData, userAnswers);
			setScore(calculatedScore);
			// Set quizOver to true to show the result modal
			setQuizOver(true);
		} else if (isLastQuestionInQuiz) {
			// Move to the next quiz if it's the last question
			setCurrentQuizIndex((prev) => prev + 1);
			setCurrentQuestionIndex(0);
		} else {
			// Move to the next question in the current quiz
			setCurrentQuestionIndex((prev) => prev + 1);
		}

		// Increment the current question count
		setCurrentQuestionCount((prev) => prev + 1);
	};

	// Handle click on the Previous button
	const handlePrevClick = () => {
		// Check if we are at the first question of the current quiz
		if (currentQuestionIndex === 0) {
			// If we are at the first question of the first quiz, do nothing
			if (currentQuizIndex === 0) return;

			// Move to the last question of the previous quiz
			setCurrentQuizIndex((prev) => prev - 1);
			const lastQuestionIndex = quizData[currentQuizIndex - 1].questionOptions.length - 1;
			setCurrentQuestionIndex(lastQuestionIndex);
		} else {
			// Move to the previous question in the current quiz
			setCurrentQuestionIndex((prev) => prev - 1);
		}

		// Decrement the current question count
		setCurrentQuestionCount((prev) => prev - 1);
	};

	const handleReplay = () => {
		// Reset states and navigate to the quiz page
		setCurrentQuizIndex(0);
		setCurrentQuestionIndex(0);
		setCurrentQuestionCount(1);
		setQuizOver(false);
		setUserAnswers(Array.from({ length: quizData.length }, () => ({})));
		setScore(0);
		navigate("/play-quiz");
	};

	const handleOptionClick = (selectedOption) => {
		// Play a click sound when an option is selected
		new Audio(clickSoundFile).play();

		// Update the user's answers with the selected option
		const updatedUserAnswers = [...userAnswers];
		updatedUserAnswers[currentQuizIndex] = {
			...updatedUserAnswers[currentQuizIndex],
			[currentQuestionIndex]: selectedOption,
		};
		setUserAnswers(updatedUserAnswers);
	};

	// Conditional rendering based on different states
	if (quizData?.length === 0)
		return (
			<section className={styles.play_quiz_section}>
				<p className={styles.not_found_text}>No active quizzes found</p>
			</section>
		);
	else if (username == null && !playerName) {
		return <ParticipantName open={true} />;
	} else if (quizOver) return <Results score={score} outOf={outOf} handleReplay={handleReplay} />;
	else
		return (
			<section className={styles.play_quiz_section}>
				<h1 className={styles.quiz_title}>{currentQuiz.quizTitle}</h1>
				<p className={styles.question}>
					{currentQuestionCount}. {currentQuestion.question}
				</p>
				<ul className={styles.options}>
					{currentQuestion.options.map((option, index) => (
						<QuizOptions
							key={`${option}${index}`}
							styles={styles}
							id={`${option}${index}`}
							optionText={option}
							onSelect={() => handleOptionClick(option)}
							isSelected={
								option === userAnswers[currentQuizIndex]?.[currentQuestionIndex]
							}
						/>
					))}
				</ul>
				<p className={styles.progress_count}>
					Question: {currentQuestionCount} / {outOf}
				</p>
				<Box
					className={styles.buttonsContainer}
					display="flex"
					justifyContent="space-between"
					gap={1}
				>
					<CustomButton
						style={{ flexBasis: "33.33%" }}
						buttonText="Quit"
						onClick={() => dispatch(showQuitModal())}
					/>
					<CustomButton
						style={{ flexBasis: "33.33%" }}
						buttonText="Previous"
						onClick={handlePrevClick}
						disabled={currentQuestionIndex === 0 && currentQuizIndex === 0}
					/>
					<CustomButton
						style={{ flexBasis: "33.33%" }}
						buttonText={
							isLastQuestionInQuiz && currentQuizIndex === quizData.length - 1
								? "Show Result"
								: "Next"
						}
						onClick={handleNextClick}
					/>
				</Box>
				{quitModalState && <QuitQuiz />}
			</section>
		);
};

export default PlayQuiz;
