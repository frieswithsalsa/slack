import "./styles/index.scss"
import AppRouter from "@/app/providers/router/ui/AppRouter";
import {Header} from "@/widgets/Header";

function App() {
    return (
        <div className="app light">
            <Header/>
            <AppRouter/>
        </div>
    );
}

export default App;
