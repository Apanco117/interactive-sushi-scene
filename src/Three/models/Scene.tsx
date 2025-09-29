import AreaLightWhite from "../components/lights/AreaLightWhite";
import AreaLightYellow from "../components/lights/AreaLightYellow";
import DirectionalLight from "../components/lights/DirectionalLight";
import { BackGroundPlane } from "./BackGroundPlane";
import { PlateSushi } from "./PlateSushi";
import { Physics } from '@react-three/rapier'
import { Suspense, useEffect, useState } from "react"; // <-- 1. Importa Suspense desde React
import { Sushi } from "./Sushi";
import { Palillo1 } from "../components/lights/Palillo1";
import { Soja } from "./Soja";
import { PlateChurros } from "./PlateChurro";
import { Churro } from "./Churro";
import { PlateSashimi } from "./PlateSashimi";
import { Sashimi } from "./Sashimi";
import { Glass } from "./Glass";
import { Bow } from "./Bow";
import { Wasabi } from "./Wasabi";

type PhysicsReadyTriggerProps = {
    onReady: () => void;
};


const PhysicsReadyTrigger = ({ onReady } : PhysicsReadyTriggerProps ) => {
    useEffect(() => {
        // Llama a la función una sola vez cuando el componente está listo.
        onReady();
    }, [onReady]);

    return null; // No renderiza nada visible.
};

export default function Scene() {
    const [ready, setReady] = useState(false);
    return (
        <group>
            <Suspense fallback={null}>
                <Physics gravity={[0, -30.81, 0]} paused={!ready}>
                    <Suspense fallback={null}>

                        <PlateSushi position={[2.687, 3, 0.378]} scale={5.691}/>
                        <BackGroundPlane/>
                        <Sushi position={[-0.239, 5, 1.889]} scale={0.898}/>
                        <Sushi position={[-0.239, 5, -1.189]} scale={0.898}/>

                        <Sushi position={[2.761, 5, 1.889]} scale={0.898}/>
                        <Sushi position={[2.761, 5, -1.189]} scale={0.898}/>

                        <Sushi position={[5.761, 5, 1.889]} scale={0.898}/>
                        <Sushi position={[5.761, 5, -1.189]} scale={0.898}/>

                        <Palillo1 position={[2.614, 3.469, 5.526]} />
                        <Palillo1 position={[2.614, 3.469, 4.767]} rotation={[0, 0.081, 0]} />

                        <Soja position={[-8.406, 2.72, 1.884]} scale={1.726}/>

                        <PlateChurros position={[-0.03, 2.719, -10.339]} scale={3.13}  />

                        <Churro position={[-1.627, 3.1593, -9.959]} rotation={[0, 0, 0]} scale={[0.584, 0.584, 2.335]} /> 
                        <Churro position={[0.0585, 3.1593, -10.3367]} rotation={[0, 0, 0]} scale={[0.584, 0.584, 2.335]} /> 
                        <Churro position={[1.672, 3.1593, -10.6684]} rotation={[0, 0, 0]} scale={[0.584, 0.584, 2.335]} /> 

                        <Churro position={[-0.645562, 4.33387, -10.5072]} rotation={[0, 0, 0]} scale={[0.584, 0.584, 2.335]} />
                        <Churro position={[1.024, 4.334, -10.839]} rotation={[0, 0.101, 0]} scale={[0.584, 0.584, 2.335]} />

                        <PlateSashimi position={[-8.652, 2.784, -7.953]} scale={[3.536, 3.536, 6.459]} />

                        <Sashimi position={[-8.615, 3.375, -4.093]} scale={[1, 1, 1]}/>
                        <Sashimi position={[-8.615, 3.375, -7.93503]}  rotation={[0, -4.83541 * (Math.PI / 180), 0]}  scale={[1, 1, 1]}/>
                        <Sashimi position={[-8.615, 3.375, -11.8709]}  rotation={[0, 7.455 * (Math.PI / 180), 0]}  scale={[1, 1, 1]}/>
                        
                        <Glass position={[6.611, 2.72, -9.368]} scale={1.651} />
                        <Bow position={[-0.292, 3.467, -4.7]} scale={[1.897, 1.106, 1.106]}/>
                        <Wasabi position={[3.547, 3.477, -4.713]} scale={0.721}  />
                        <PhysicsReadyTrigger onReady={() => setReady(true)} />
                    </Suspense>
                </Physics>
            </Suspense>
            <AreaLightWhite/>
            <AreaLightYellow/>
            <DirectionalLight position={[10, 10, 10]} intensity={3}/>
            <DirectionalLight position={[10, 10, -10]} intensity={3} />
        </group>
    )
}
