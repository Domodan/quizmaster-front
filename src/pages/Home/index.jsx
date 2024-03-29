import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";

const Home = () => {
	const canAddQuiz = useSelector((state) => state.player.admin);
	return (
		<section className={styles.centered_boxes}>
			<Link to={"/play-quiz"} className={styles.box}>
				<p className={styles.box_title}>Play Quiz</p>
			</Link>

			{canAddQuiz && (
				<Link to={"/create-quiz"} className={styles.box}>
					<p className={styles.box_title}>Create new quiz</p>
				</Link>
			)}

			{canAddQuiz && (
				<Link to={"/my-quizzes"} className={styles.box}>
					<p className={styles.box_title}>My Quizzes</p>
				</Link>
			)}
		</section>
	);
};

export default Home;
