export default function SpotLights() {
    return (
        <>
            <spotLight
                // Props directas de la luz
                position={[2.5, 5, 5]}
                angle={Math.PI / 3}
                penumbra={0.5}
                castShadow
                // Args del constructor: (color, intensity)
                args={[undefined, Math.PI * 10]}
                // Props anidadas (para la sombra)
                shadow-radius={5}
                shadow-blurSamples={10}
            />
            <spotLight
                position={[-2.5, 5, 5]}
                angle={Math.PI / 3}
                penumbra={0.5}
                castShadow
                args={[undefined, Math.PI * 10]}
                shadow-radius={5}
                shadow-blurSamples={10}
            />
        </>
    )
}
