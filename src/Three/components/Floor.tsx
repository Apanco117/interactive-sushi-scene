import { RigidBody } from '@react-three/rapier'


export default function Floor() {
    return (
        <RigidBody type="fixed" position-y={-1}>
            <mesh receiveShadow>
                <boxGeometry args={[100, 1, 100]} />
                <meshStandardMaterial color="green" />
            </mesh>
        </RigidBody>
    )
}
