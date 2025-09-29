//. Conjunto de utilerias para Three js

import * as THREE from "three";
//? Importaciones

export function getPath() : string {
    return "/models";
}

export function getEnvVariable(variableName: string, defaultValue: string = ''): string {
    const value = import.meta.env[variableName];
    return value !== undefined ? value : defaultValue;
}

// Convierte materiales complejos y realistas en materiales mas simples y rapidos de procesar
export function convertMaterialsToBasic( materials : { [key: string]: THREE.Material } , alphaTestValue = 0 ){
    const newMaterials: { [key: string]: THREE.MeshBasicMaterial } = {};

    Object.entries(materials).forEach( ( [key, oldMaterial] ) => {
        //console.log(`Procesando material: ${key}`);
        if (oldMaterial instanceof THREE.MeshStandardMaterial) {
            const newMaterial = new THREE.MeshBasicMaterial();

            newMaterial.map = oldMaterial.map;
            newMaterial.color.copy(oldMaterial.color);
            newMaterial.name = oldMaterial.name; 

            // Aplicar transparencia si la textura tiene canal alfa
            if (newMaterial.map?.format === THREE.RGBAFormat) {
                newMaterial.transparent = true;
                newMaterial.alphaTest = alphaTestValue;
            }

            newMaterials[key] = newMaterial;

        }
    } )

    return newMaterials;
}
/*
1. Recibe un objeto que contiene todos los materiales originales del modelo (los materials que vienes del archivo GLB).
2. Crea un objeto nuevo y vacío llamado newMaterials para guardar los resultados.
3. Recorre cada material del objeto original. Para cada uno, obtiene su nombre (la key) y el material en sí (oldMaterial).
4. Comprueba si el material es un MeshStandardMaterial. Este es el tipo de material PBR (renderizado basado en física) que se usa para crear superficies realistas que reaccionan a la luz, las sombras y los reflejos.
5. Si lo es, crea un nuevo MeshBasicMaterial. Este es el material más simple de Three.js; no reacciona a la luz en absoluto.
6. Copia las propiedades esenciales del material "Standard" al material "Basic", como la textura (.map) y el color (.color).
7. Guarda el nuevo material básico en el objeto newMaterials, usando el mismo nombre (key) que el material original.
8. Finalmente, devuelve el objeto newMaterials, que ahora contiene una versión simplificada de cada material original.
*/

