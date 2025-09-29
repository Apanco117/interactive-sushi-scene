import { useExperienceStore } from "@/store";
import gsap from "gsap";
import { MousePointerClick } from "lucide-react";
import { useEffect, useRef } from "react";


export default function ClickHintToast() {
    const isWelcomeAnimationFinished = useExperienceStore((state) => state.isWelcomeAnimationFinished);
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Si la experiencia está lista y el toast existe...
        if (isWelcomeAnimationFinished && toastRef.current) {
            // 3. ...creamos una animación con GSAP
            const tl = gsap.timeline();

            tl.to(toastRef.current, {
                // Animación de entrada
                duration: 1.2,
                y: 0, // Mueve el toast a su posición visible
                opacity: 1,
                ease: 'power3.out',
                delay: 1, // Un pequeño retraso después de que la pantalla de carga desaparece
            }).to(toastRef.current, {
                // Animación de salida (después de una pausa)
                duration: 1.2,
                y: '150%', // Mueve el toast fuera de la pantalla
                opacity: 0,
                ease: 'power3.in',
                delay: 4, // ¿Cuánto tiempo se queda visible el toast?
            });
        }
    }, [isWelcomeAnimationFinished]);
    return (
        <div
            ref={toastRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-[150%] opacity-0 z-[1000] flex items-center gap-3 py-3 px-5 bg-black bg-opacity-70 text-white rounded-lg shadow-lg backdrop-blur-sm"
        >
            <MousePointerClick className="h-5 w-5" />
            <p className="text-sm font-light">Haz clic en los objetos para interactuar.</p>
    </div>
    )
}
