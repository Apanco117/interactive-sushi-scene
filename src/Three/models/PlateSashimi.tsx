import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';
import { RigidBody, ConvexHullCollider, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'
//. Types 
import type { GLTFResultPlateSashimi } from '@/types/threetypes';
import { useMemo, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';


export function PlateSashimi(props : RigidBodyProps ) {
    const filePath = `${ getPath() }/PlateSashimi.glb`;
    const { nodes, materials } = useGLTFWithKTX2(filePath) as unknown as GLTFResultPlateSashimi;

    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const mergedVertices = useMemo(() => {
        // Obtenemos los arrays de vértices de cada pieza del sushi
        const geometries = [
            nodes.Plate3.geometry.attributes.position.array,
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
            rigidBodyRef.current.applyImpulse({ x: 0, y: 4000, z: 0 }, true);
        }
    };

    return (
        <RigidBody
            {...props}
            ref={rigidBodyRef}
            mass={1}
            restitution={0.5}
        >
            <group dispose={null } onClick={ handleClick }>
                <mesh castShadow receiveShadow geometry={nodes.Plate3.geometry} material={materials.Plate3Material}  />
            </group>
            <ConvexHullCollider args={[mergedVertices]} />
        </RigidBody>
    )
}
