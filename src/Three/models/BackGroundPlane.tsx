import { getPath } from '@/utils';
import { useGLTFWithKTX2 } from '@/utils/useGLTFWithKTX2';

//. Types 
import type { GLTFResultBackGround } from '@/types/threetypes';
import { RigidBody, type RigidBodyProps } from '@react-three/rapier';


export function BackGroundPlane(props : RigidBodyProps) {
    const filePath = `${ getPath() }/BackGroundPlane.glb`;
    const { nodes, materials } = useGLTFWithKTX2(filePath) as unknown as GLTFResultBackGround;

    // const mergedVertices = useMemo(() => {
    //     const geometry = nodes.Background.geometry.attributes.position.array;
    //     return geometry;
    // }, [nodes]);

    return (
        <RigidBody
            type="fixed" // <-- ¡ESTA ES LA CLAVE!
            colliders="hull" // Otra forma de definir el colisionador
            position={[0, 2.72, 0]} // <-- Pasa la posición aquí
            scale={54.666}         // <-- Y la escala aquí
            {...props} // Pasamos el resto de las props al RigidBody
        >
            <group {...props} dispose={null}>
                <mesh castShadow receiveShadow geometry={nodes.Background.geometry} material={materials.BackGroundMaterial} />
            </group>

        </RigidBody>
    )
}