import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/globals.css"; // Custom styles

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Routing
import { Provider } from "react-redux"; // Redux state management
import { Toaster } from "react-hot-toast"; // Notification
import { store } from "./store"; // Redux store

import App from "./App"; // Root component
import Home from "./pages/Home";
import Error from "./pages/Error";
import PlayQuiz from "./pages/PlayQuiz";
import MyQuiz from "./pages/MyQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz, { loader as editQuizLoader } from "./pages/EditQuiz";
import ViewQuiz, { loader as viewQuizLoader } from "./pages/ViewQuiz";

// Creating a router with routes and elements
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error message="404 | Page not found" />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/play-quiz",
				element: <PlayQuiz />,
			},
			{
				path: "/create-quiz",
				element: <CreateQuiz />,
			},
			{
				path: "/my-quizzes",
				element: <MyQuiz />,
			},
			{
				path: "/view-quiz",
				element: <ViewQuiz />,
				errorElement: <Error message="Quiz not found" />,
				loader: viewQuizLoader,
			},
			{
				path: "/edit-quiz",
				element: <EditQuiz />,
				errorElement: <Error message="Quiz not found" />,
				loader: editQuizLoader,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster
				toastOptions={{
					duration: 3000,
					style: { borderRadius: "10px", background: "#2c3030", color: "#fff" },
				}}
				position="center"
			/>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
