import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';
import { RigidBody, ConvexHullCollider, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'
//. Types 
import type { GLTFResultChurro } from '@/types/threetypes';
import { useMemo, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';


export function Churro(props : RigidBodyProps ) {
    const filePath = `${ getPath() }/Churro.glb`;
    const { nodes, materials } = useGLTFWithKTX2(filePath) as unknown as GLTFResultChurro;

    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const mergedVertices = useMemo(() => {
        // Obtenemos los arrays de vértices de cada pieza del sushi
        const geometries = [
            nodes.Plane004.geometry.attributes.position.array,
            nodes.Plane004_1.geometry.attributes.position.array,
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
        console.log('Plato churros clicked');
        if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse({ x: 0, y: 500, z: 0 }, true);
        }
    };

    return (
        <RigidBody
            {...props}
            ref={rigidBodyRef}
            mass={1}
            restitution={0.5}
        >
            <group dispose={null} onClick={ handleClick }>
                <group>
                    <mesh castShadow receiveShadow geometry={nodes.Plane004.geometry} material={materials['Material.007']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane004_1.geometry} material={materials['Material.008']} />
                </group>
            </group>
            <ConvexHullCollider args={[mergedVertices]} />
        </RigidBody>
    )
}
