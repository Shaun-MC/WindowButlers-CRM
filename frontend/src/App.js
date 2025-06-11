import { AuthProvider } from "./contexts/auth/index.jsx";
import AppRouter from "./routes/index.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.js";

function App() {
    return (
        <AuthProvider>
            <div className="app-wrapper">
                <Header />
                <div className="main-content-wrapper">
                    <AppRouter />
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
