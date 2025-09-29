import * as THREE from 'three'
import type { GLTF } from 'three-stdlib';


export type GLTFResultBackGround = GLTF & {
    nodes: {
        Background: THREE.Mesh
    }
    materials: {
        BackGroundMaterial: THREE.MeshStandardMaterial
    }
}

export type GLTFResultPlateSushi = GLTF & {
    nodes: {
        Plate: THREE.Mesh
    }
    materials: {
        MaterialPlate: THREE.MeshStandardMaterial
    }
}

export type GLTFResultSushi = GLTF & {
    nodes: {
        Cube: THREE.Mesh
        Cube_1: THREE.Mesh
        Cube_2: THREE.Mesh
        Cube_3: THREE.Mesh
    }
    materials: {
        'Material.001': THREE.MeshStandardMaterial
        'Material.002': THREE.MeshStandardMaterial
        'Material.003': THREE.MeshStandardMaterial
        'Material.004': THREE.MeshStandardMaterial
    }
}

export type GLTFResultPalillo1 = GLTF & {
    nodes: {
        Palillo_1: THREE.Mesh
    }
    materials: {
        MaterialPalillo: THREE.MeshStandardMaterial
    }
}

export type GLTFResultSoja = GLTF & {
    nodes: {
        Plane002: THREE.Mesh
        Plane002_1: THREE.Mesh
        Plane002_2: THREE.Mesh
    }
    materials: {
        SalsaMaterial: THREE.MeshStandardMaterial
        SalsaMaterial2: THREE.MeshStandardMaterial
        'Material.006': THREE.MeshStandardMaterial
    }
}

export type GLTFResultPlateChurro = GLTF & {
    nodes: {
        Plate2: THREE.Mesh
    }
    materials: {
        Plate2Material: THREE.MeshStandardMaterial
    }
}

export type GLTFResultChurro = GLTF & {
    nodes: {
        Plane004: THREE.Mesh
        Plane004_1: THREE.Mesh
    }
    materials: {
        'Material.007': THREE.MeshStandardMaterial
        'Material.008': THREE.MeshStandardMaterial
    }
}

export type GLTFResultPlateSashimi = GLTF & {
    nodes: {
        Plate3: THREE.Mesh
    }
    materials: {
        Plate3Material: THREE.MeshStandardMaterial
    }
}

export type GLTFResultSashimi = GLTF & {
    nodes: {
        Plane010: THREE.Mesh
        Plane010_1: THREE.Mesh
        Plane010_2: THREE.Mesh
    }
    materials: {
        SashimiMaterial: THREE.MeshStandardMaterial
        SashimiMaterial2: THREE.MeshStandardMaterial
        ['Material.009']: THREE.MeshStandardMaterial
    }
}

export type GLTFResultGlass = GLTF & {
    nodes: {
        Glass: THREE.Mesh 
    }
    materials: {}
}
export type GLTFResultBow = GLTF & {
    nodes: {
        Plane008: THREE.Mesh
        Plane008_1: THREE.Mesh
    }
    materials: {
        CowMaterial: THREE.MeshStandardMaterial
        CowMaterial2: THREE.MeshStandardMaterial
    }
}

export type GLTFResultWasabi = GLTF & {
    nodes: {
        Wasabi: THREE.Mesh
    }
    materials: {
        WasabiMaterial: THREE.MeshStandardMaterial
    }
}

export type ResponsiveStore = {
    isMobile : boolean,
    screenWidth: number,
    screenHeight : number
}

export type ExperienceState = {
    isExperienceReady: boolean;
    setIsExperienceReady: () => void;
    isWelcomeAnimationFinished: boolean;
    setIsWelcomeAnimationFinished: (isFinished: boolean) => void;
}