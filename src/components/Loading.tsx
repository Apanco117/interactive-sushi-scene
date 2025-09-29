import { useExperienceStore } from "@/store";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { Cog } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ExperienceStore {
    setIsExperienceReady: () => void;
}

export default function Loading() {
    const { progress } = useProgress();
    // Tipado de las referencias a elementos HTML
    const topHalfRef = useRef<HTMLDivElement>(null);
    const bottomHalfRef = useRef<HTMLDivElement>(null);
    const progressText = useRef<HTMLDivElement>(null);
    //const progressBar = useRef<HTMLDivElement>(null);
    const spinnerRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    // Tipado explícito para el estado
    const [onlyOnce, setOnlyOnce] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    
    // Tipado del hook de Zustand
    const setIsExperienceReady = useExperienceStore(
        (state: ExperienceStore) => state.setIsExperienceReady
    );

    const setIsWelcomeAnimationFinished = useExperienceStore((state) => state.setIsWelcomeAnimationFinished);

    useEffect(() => {
        if (progress === 100 && !onlyOnce) {
            setOnlyOnce(true);
            setIsExperienceReady(  );

            const tl = gsap.timeline();

            tl.to(
                [progressText.current, spinnerRef.current],
                {
                    opacity: 0,
                    duration: 1.5,
                    delay: 0.7,
                    ease: "power2.out",
                }
            )
            .to(messageRef.current, {
                opacity: 1,
                duration: 0.7,
                y: "-100%",
                ease: "power2.out",
            })
            .to(messageRef.current, {
                opacity: 0,
                duration: 2,
                delay: 1,
                y: "-200%",
                ease: "power2.out",
            })
            .to(
                topHalfRef.current,
                {
                y: "-100%",
                duration: 1.25,
                ease: "power2.out",
                },
                "-=0.75"
            )
            .to(
                bottomHalfRef.current,
                {
                    y: "100%",
                    duration: 1.25,
                    ease: "power2.out",
                    onComplete: () => {
                        setIsVisible(false);
                        setIsWelcomeAnimationFinished(true);
                    },
                },
                "<"
            );
        }
    }, [progress, onlyOnce, setIsExperienceReady]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden z-[100000]">
            {/* Las dos mitades del fondo que se animan */}
            <div ref={topHalfRef} className="absolute top-0 h-1/2 w-full bg-[#060606]"></div>
            <div ref={bottomHalfRef} className="absolute top-1/2 h-1/2 w-full bg-[#060606]"></div>
            
            {/* Contenedor de la información de carga */}
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-6">
                <div 
                ref={messageRef} 
                className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center text-white text-2xl sm:text-3xl opacity-0 font-light"
                >
                    Escenario preparado.
                </div>
                
                {/* Barra de progreso y porcentaje */}
                <div className="w-full max-w-xs sm:max-w-sm flex-col items-center justify-center">
                    <div className="relative w-full h-px pb-10">
                        <div ref={spinnerRef} className=" flex justify-center">
                            <Cog className="h-10 w-10 text-white animate-spin" />
                        </div>
                    </div>
                    <div ref={progressText} className="mt-6 text-xs text-white text-center font-light">
                        {Math.round(progress)}%
                    </div>
                </div>
            </div>
        </div>
    )
}
