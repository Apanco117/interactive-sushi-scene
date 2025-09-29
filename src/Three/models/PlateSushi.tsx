
import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';
//. Types 
import type { GLTFResultPlateSushi } from '@/types/threetypes';
import { useMemo, useRef } from 'react';
import { RigidBody, ConvexHullCollider, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'

export function PlateSushi(props : RigidBodyProps ) {
    const filePath = `${ getPath() }/PlateSushi.glb`;
    const { nodes } = useGLTFWithKTX2(filePath) as unknown as GLTFResultPlateSushi;
 
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    
    const mergedVertices = useMemo(() => {
        // Obtenemos los arrays de vértices de cada pieza del sushi
        const geometries = [
            nodes.Plate.geometry.attributes.position.array,
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

    const handleClick = () => {
        console.log('Plato clicked');
        if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse({ x: 0, y: 7000, z: 0 }, true);
        }
    };

    return (
        <RigidBody
            {...props}
            ref={rigidBodyRef}
            mass={1}
            restitution={0.75}
        >
            <group dispose={null} onClick={handleClick}>
                <mesh 
                    castShadow receiveShadow 
                    geometry={nodes.Plate.geometry} 
                    //material={materials.MaterialPlate} 
                >
                    <meshStandardMaterial color={"#222222"} />
                </mesh>
            </group>
            <ConvexHullCollider args={[mergedVertices]} />
        </RigidBody>
    )
}
