import LoginPage from "./components/login/LoginPage";
import Header from "./components/header/Header";
import Home from "./components/home/HomePage";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

// Weird spacing thing w/ auto formatter in the file
function App() {
    const routesArray = [
        {
            path: "*",
            element: <LoginPage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },

        {
            path: "/home",
            element: <Home />,
        },
    ];

    let routesElement = useRoutes(routesArray);

    return (
        <AuthProvider>
            <Header />
            <div className="w-full h-screen flex flex-col">{routesElement}</div>
        </AuthProvider>
  );
}

export default App;
