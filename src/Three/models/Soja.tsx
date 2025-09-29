import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';
import { RigidBody, ConvexHullCollider, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'
//. Types 
import type { GLTFResultSoja } from '@/types/threetypes';
import { useMemo, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';

export function Soja(props : RigidBodyProps ) {
    const filePath = `${ getPath() }/Soja.glb`;
    const { nodes, materials } = useGLTFWithKTX2(filePath) as unknown as GLTFResultSoja;

    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const mergedVertices = useMemo(() => {
        // Obtenemos los arrays de vértices de cada pieza del sushi
        const geometries = [
            nodes.Plane002.geometry.attributes.position.array,
            nodes.Plane002_1.geometry.attributes.position.array,
            nodes.Plane002_2.geometry.attributes.position.array
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
        console.log('Soja clicked');
        if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse({ x: 0, y: 8000, z: 0 }, true);
        }
    };
    return (
        <RigidBody
            {...props}
            ref={rigidBodyRef}
            mass={1}
            restitution={0.5}
        >
            <group dispose={null} onClick={handleClick}>
                <group>
                    <mesh castShadow receiveShadow geometry={nodes.Plane002.geometry} material={materials.SalsaMaterial} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane002_1.geometry} material={materials.SalsaMaterial2} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane002_2.geometry} material={materials['Material.006']} />
                </group>
            </group>
            <ConvexHullCollider args={[mergedVertices]} />
        </RigidBody>
    )
}