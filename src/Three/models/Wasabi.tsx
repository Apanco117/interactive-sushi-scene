import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';
import { RigidBody, ConvexHullCollider, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'
//. Types 
import type { GLTFResultWasabi } from '@/types/threetypes';
import { useMemo, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';

export function Wasabi(props : RigidBodyProps ) {
    const filePath = `${ getPath() }/Wasabi.glb`;
    const { nodes, materials } = useGLTFWithKTX2(filePath) as unknown as GLTFResultWasabi;

    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const mergedVertices = useMemo(() => {
        // Obtenemos los arrays de vértices de cada pieza del sushi
        const geometries = [
            nodes.Wasabi.geometry.attributes.position.array,
        ];
        // Calculamos el tamaño total necesario
        const totalLength = geometries.reduce((acc, val) => acc + val.length, 0);
        // Creamos un nuevo Float32Array para contener todos los vértices
        const combined = new Float32Array(totalLength);
        // Copiamos los vértices de cada pieza en el nuevo array
        let offset = 0;
        for (const geometry of geometries) {
            combined.set(geometry, offset);
            offset += geometry.length;
        }
        
        return combined;
    }, [nodes]);

    const handleClick = ( event: ThreeEvent<MouseEvent> ) => {
        event.stopPropagation();
        console.log('Sashimi clicked');
        if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse({ x: 0, y: 100, z: 0 }, true);
        }
    };

    return (
        <RigidBody
            {...props}
            ref={rigidBodyRef}
            mass={10000}
            restitution={0.5}
        >
            <group onClick={handleClick} dispose={null}>
                <mesh castShadow receiveShadow geometry={nodes.Wasabi.geometry} material={materials.WasabiMaterial}/>
            </group>
            <ConvexHullCollider args={[mergedVertices]} />
        </RigidBody>
    )
}