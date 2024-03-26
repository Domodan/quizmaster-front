import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/globals.css"; // Custom styles

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Routing
import { Provider } from "react-redux"; // Redux state management
import { Toaster } from "react-hot-toast"; // Notification
//import { store } from './store'; // Redux store

import App from "./App"; // Root component
import Home from "./pages/Home";

// Creating a router with routes and elements
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage message='404 | Page not found' />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/play-quiz",
      //   element: <PlayQuiz />
      // },
      // {
      //   path: "/create-quiz",
      //   element: <CreateQuiz />
      // },
      // {
      //   path: "/my-quizzes",
      //   element: <MyQuizzes />
      // },
      // {
      //   path: "/view-quiz",
      //   element: <ViewQuiz />,
      //   errorElement: <ErrorPage message='Quiz not found' />,
      //   loader: viewQuizLoader
      // },
      // {
      //   path: "/edit-quiz",
      //   element: <EditQuiz />,
      //   errorElement: <ErrorPage message='Quiz not found' />,
      //   loader: editQuizLoader
      // }
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
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
