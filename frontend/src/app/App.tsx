import "./styles/index.scss"
import AppRouter from "@/app/providers/router/ui/AppRouter";
import {Header} from "@/widgets/Header";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <div className="app light">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Header/>
            <AppRouter/>
        </div>
    );
}

export default App;
