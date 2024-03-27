import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
	return (
		<section className={styles.centered_boxes}>
			<Link to={"/play-quiz"} className={styles.box}>
				<p className={styles.box_title}>Play Quiz</p>
			</Link>

			<Link to={"/create-quiz"} className={styles.box}>
				<p className={styles.box_title}>Create new quiz</p>
			</Link>

			<Link to={"/my-quizzes"} className={styles.box}>
				<p className={styles.box_title}>My Quizzes</p>
			</Link>
		</section>
	);
};

export default Home;
