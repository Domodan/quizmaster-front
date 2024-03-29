import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"; // Handle nested routes

// Global components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	useEffect(() => {
		const handleUnload = () => {
			localStorage.removeItem("username");
			localStorage.removeItem("quizAdmin");
		};

		window.addEventListener("unload", handleUnload);

		return () => window.removeEventListener("unload", handleUnload);
	}, []);

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
