import { getEnvVariable } from "@/utils";
import {  useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react"; 
import * as THREE from 'three'; 
import { DirectionalLightHelper } from "three";

type CustomDirectionalLightProps = {
    color?: string;
    intensity?: number;
} & React.ComponentProps<'directionalLight'>;


export default function DirectionalLight( props: CustomDirectionalLightProps ) {
    const lightRef = useRef<THREE.DirectionalLight>(null!);

    const debug = getEnvVariable('VITE_DEBUG', 'false');
    if (debug === 'true') useHelper(lightRef, DirectionalLightHelper, 2, "red");
  
    

    const area = 30;
    

    useEffect(() => {
        if (lightRef.current) {
            
            const targetPosition = [1, 1, 1];
            
            lightRef.current.target.position.set(
                targetPosition[0], 
                targetPosition[1], 
                targetPosition[2]
            );
            
            lightRef.current.target.updateMatrixWorld();
        }
    }, []); 
    const { color = 'white', intensity = 1, ...rest } = props;
    return (
        <>
            <directionalLight
                {...rest}
                castShadow
                ref={lightRef}
                color={color}       
                intensity={intensity}
                shadow-bias={-0.00126} // -0.0013 , -0.00126
                shadow-normalBias={0.05}
                
                shadow-mapSize-width={4096}      
                shadow-mapSize-height={4096}     

                shadow-camera-far={100}           

                shadow-camera-left={-area}         
                shadow-camera-right={area}         
                shadow-camera-top={area}           
                shadow-camera-bottom={-area}       
            />
        </>
    )
}
