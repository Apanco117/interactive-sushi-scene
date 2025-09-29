import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls  } from "@react-three/drei";  
import Scene from "./models/Scene";
import { useEffect, useRef } from "react";
import { type OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three' // <-- Importa THREE
import { useResponsiveStore } from "@/store";

export default function Experience() {

    const controlsRef = useRef<OrbitControlsImpl>(null!);
    const cameraRef = useRef<THREE.OrthographicCamera>(null);
    const { isMobile } = useResponsiveStore();

    const zoomValues = {
        default: isMobile ? 74 : 135,
        animation: isMobile ? 65 : 110,
    };

    const CameraSetup = () => {
        const controls = controlsRef.current;
        const { camera } = useThree();

        // Este hook se ejecuta una sola vez cuando el componente se monta
        useEffect(() => {
            // Forzamos la posición inicial de la cámara
            if ( isMobile ) camera.position.set(17, 17, 20);
            else camera.position.set(13, 15, 10);
            
            if (controls) {
                console.log("UPdate")
                controls.target.set(10, 4, 10);
                controls.update();
            }
        }, [camera, controls]); // Se ejecuta si la cámara o los controles cambian
        console.log('Camera position:', camera.position);
        console.log('Camera lookAt:', controls?.target);
        return null; // Este componente no renderiza nada, solo ejecuta lógica
    };

    useEffect( () => {
        if (!cameraRef.current) return;
        zoomValues.default = isMobile ? 0 : 135;
        zoomValues.animation = isMobile ? 0 : 110;

        cameraRef.current.zoom = zoomValues.default;
        cameraRef.current.updateProjectionMatrix();

    }, [isMobile] )

    console.log(isMobile)



    return (
        <Canvas 
            shadows  
            style={{ position: "fixed", zIndex: 1, top: 0, left: 0 }}
            gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
        >   
            
            <Scene/>
            <OrbitControls 
                target={[1, 4, 1]}  
                enablePan={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 2} 

                 // Limita el giro a 45 grados hacia la derecha
                minAzimuthAngle={0}
                // Limita el giro a 45 grados hacia la izquierda
                maxAzimuthAngle={Math.PI / 2}
                
                enableZoom={false} 
                />
            <ambientLight color="#9E6BD4" intensity={3} />
            <CameraSetup />
        </Canvas>
    )
}
