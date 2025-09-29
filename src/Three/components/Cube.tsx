import { useRef } from 'react'
import { RigidBody, CuboidCollider,  type RapierRigidBody } from '@react-three/rapier'


export default function Cube() {
    const rigidBodyRef = useRef<RapierRigidBody>(null)
    const handleClick = () => {
        if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse(
                { x: 0, y: 10, z: 0 },
                true
            )
        }
    }
    return (
        <RigidBody
            ref={rigidBodyRef}
            position={[0, 5, 0]} 
            mass={1}             
            restitution={1.1}    
        >
            <mesh castShadow onClick={handleClick} >
                <boxGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <CuboidCollider args={[0.5, 0.5, 0.5]} /> {/* .cuboid(0.5, 0.5, 0.5) */}
        </RigidBody>
    )
}
