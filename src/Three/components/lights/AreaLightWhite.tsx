import { useRef } from 'react'
import * as THREE from 'three'
import { useHelper } from '@react-three/drei'
import { RectAreaLightHelper } from 'three-stdlib' 
import { getEnvVariable } from '@/utils'

export default function AreaLightWhite() {
    const rectLightRef = useRef<THREE.RectAreaLight>(null!)
    const debug = getEnvVariable('VITE_DEBUG', 'false');
    if (debug === 'true') useHelper(rectLightRef, RectAreaLightHelper)
    return (
        <>
            <rectAreaLight
                ref={rectLightRef}
                width={15}
                height={15}
                intensity={5} // <-- Valor ajustado visualmente para que se parezca a 250W
                color={"#F1FBC7"}
                position={[-15, 15, -10]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </>
    )
}
