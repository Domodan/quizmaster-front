import Header from "../components/Header";
import Footer from "../components/Footer";

function Error({ message = "Some error occurred" }) {
	return (
		<>
			<Header />

			<main className="main-container">
				<h2 style={{ fontSize: "2rem" }}>{message}</h2>
			</main>

			<Footer />
		</>
	);
}

export default Error;
