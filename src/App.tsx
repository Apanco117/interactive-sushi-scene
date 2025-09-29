import ClickHintToast from "./components/ClickHintToast";
import Loading from "./components/Loading";
import Experience from "./Three/Experience";

export default function App() {
    return (
        <div className="w-screen h-dvh bg-[#170D1A] overflow-hidden relative">
            <Loading/>
            <ClickHintToast/> 
            <Experience />
        </div>
    )
}
