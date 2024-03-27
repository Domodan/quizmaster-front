import { Outlet } from "react-router-dom"; // Handle nested routes

// Global components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Header />

			<main className="main-container">
				<Outlet />
			</main>

			<Footer />
		</>
	);
}

export default App;
