import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { KTX2Loader } from "three-stdlib";

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath("/basis/");


//. Carga modelo 3d ( GLTF ) que utiliza texturas de compresion KTX2
export function useGLTFWithKTX2(path : string) {
    const { gl } = useThree(); // renderizador de WebGL de Three.js. Detecta qué capacidades tiene la GPU del usuario.

    return useGLTF(path, true, true, (loader) => { // Funcion que se ejecuta previo a que cargue el modelo
        loader.setKTX2Loader(ktx2Loader.detectSupport(gl)); // Configura el cargador KTFX 
    });
}
