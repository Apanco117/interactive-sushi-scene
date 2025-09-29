import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';
import { RigidBody, ConvexHullCollider, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'
//. Types 
import type { GLTFResultBow } from '@/types/threetypes';
import { useMemo, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';

export function Bow(props : RigidBodyProps ) {
    const filePath = `${ getPath() }/Bow.glb`;
    const { nodes, materials } = useGLTFWithKTX2(filePath) as unknown as GLTFResultBow;
    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const mergedVertices = useMemo(() => {
        // Obtenemos los arrays de vértices de cada pieza del sushi
        const geometries = [
            nodes.Plane008.geometry.attributes.position.array,
            nodes.Plane008_1.geometry.attributes.position.array,
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
            rigidBodyRef.current.applyImpulse({ x: 0, y: 700, z: 0 }, true);
        }
    };
    return (
        <RigidBody
            {...props}
            ref={rigidBodyRef}
            mass={100}
            restitution={0.5}
        >
            <group onClick={handleClick} dispose={null}>
                <group>
                    <mesh castShadow receiveShadow geometry={nodes.Plane008.geometry} material={materials.CowMaterial} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane008_1.geometry} material={materials.CowMaterial2} />
                </group>
            </group>
            <ConvexHullCollider args={[mergedVertices]} />
        </RigidBody>
    )
}