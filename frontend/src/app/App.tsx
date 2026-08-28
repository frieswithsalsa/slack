import "./styles/index.scss"
import AppRouter from "@/app/providers/router/ui/AppRouter";
import {Header} from "@/widgets/Header";
import {Slide, ToastContainer} from "react-toastify";

function App() {
    return (
        <div className="app light">
            <ToastContainer
                position="bottom-right"
                /* Slide: уведомление уходит тем же путём, каким пришло.
                   Дефолтный Bounce влетает с перелётом, а исчезает схлопыванием —
                   вход и выход не совпадают, и связь с местом появления теряется. */
                transition={Slide}
                /* 3.5с хватает, чтобы прочитать строку; 5с держат внимание дольше,
                   чем того стоит сообщение об успехе */
                autoClose={3500}
                /* Полоса обратного отсчёта на «канал создан» — шум:
                   тост и так исчезнет, а внимание она забирает как у важного элемента */
                hideProgressBar
                newestOnTop={false}
                /* Клик закрывает: у пользователя должен быть быстрый способ убрать
                   уведомление, не целясь в крестик */
                closeOnClick
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
