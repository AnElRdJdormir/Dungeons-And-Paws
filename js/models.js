import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// Variables para objetos 3D
export let objBunny = new THREE.Object3D();
export let objWolf = new THREE.Object3D();
export let objCoin = new THREE.Object3D();
export let objCoinV = new THREE.Object3D();
export let objCoinM = new THREE.Object3D();
export let objPiso = new THREE.Object3D();  

//Porteria Izquierda
export let objParedIzq = new THREE.Object3D();
export let objParedIzq2 = new THREE.Object3D();  

//Porteria Derecha
export let objParedDer = new THREE.Object3D();  
export let objParedDer2 = new THREE.Object3D();  


//Techos
export let objTechoArriba = new THREE.Object3D();  
export let objTechoAbajo = new THREE.Object3D();  

export function Modelos3D(scene, manager) {
    const loaderBunny = new OBJLoader(manager);
    const mtlBunny = new MTLLoader(manager);

    mtlBunny.load('models/bunny/buns.mtl', function (materials) {
        materials.preload();
        loaderBunny.setMaterials(materials);
        loaderBunny.load('models/bunny/buns.obj', function (object) {
            object.name = "Bunny";
            object.scale.copy(new THREE.Vector3(0.15, 0.15, 0.15));
            object.position.set(8, 0, 0);
            object.rotation.y = Math.PI / -2; // 90 grados en el eje Y

            object.rotation.x = Math.PI / 2; // 90 grados en el eje Y
            objBunny = object;
            scene.add(object);
        });
    });

    const loaderWolf = new OBJLoader(manager);
    const mtlWolf = new MTLLoader(manager);

    mtlWolf.load('models/wolf/wolfy.mtl', function (materials) {
        materials.preload();
        loaderWolf.setMaterials(materials);
        loaderWolf.load('models/wolf/wolfy.obj', function (object) {
            object.name = "Wolf";
            object.scale.copy(new THREE.Vector3(0.20, 0.20, 0.20));
            object.position.set(-8, 0, 0);
            object.rotation.x = Math.PI / 2; // 90 grados en el eje Y
            object.rotation.y= Math.PI / 2; // 90 grados en el eje Y
            objWolf = object;
            scene.add(object);
        });
    });

/*
    const loaderCoin = new OBJLoader(manager);
    const mtlCoin = new MTLLoader(manager);

    mtlCoin.load('models/coin/coin.mtl', function (materials) {
        materials.preload();
        loaderCoin.setMaterials(materials);
        loaderCoin.load('models/coin/coin.obj', function (object) {
            object.name = "Coin";
            object.scale.copy(new THREE.Vector3(1, 1, 0.6));
            object.position.set(-4, 4, 0);

            objCoin = object;
            scene.add(object);
        });
    });

    const loaderCoinV = new OBJLoader(manager);
    const mtlCoinV = new MTLLoader(manager);

    mtlCoinV.load('models/coin/coinVerde.mtl', function (materials) {
        materials.preload();
        loaderCoinV.setMaterials(materials);
        loaderCoinV.load('models/coin/coinVerde.obj', function (object) {
            object.name = "CoinV";
            object.scale.copy(new THREE.Vector3(1, 1, 0.6));
            object.position.set(2, 0, 0.4);

            objCoinV = object;
            scene.add(object);
        });
    });

    const loaderCoinM = new OBJLoader(manager);
    const mtlCoinM = new MTLLoader(manager);

    mtlCoinM.load('models/coin/coinMorada.mtl', function (materials) {
        materials.preload();
        loaderCoinM.setMaterials(materials);
        loaderCoinM.load('models/coin/coinMorada.obj', function (object) {
            object.name = "Coin";
            object.scale.copy(new THREE.Vector3(1, 1, 0.6));
            object.position.set(0, 0, 0.4);

            objCoinM = object;
            scene.add(object);
        });
    });

    */


    //ESTO ES EL FONDO 
    const mtlpiso = new MTLLoader(manager);
    const loaderpiso = new OBJLoader(manager);
    mtlpiso.load('models/Nivel1PG/Piso N1.mtl', function (materials) {
        materials.preload();
        loaderpiso.setMaterials(materials);
        loaderpiso.load('models/Nivel1PG/Piso N1.obj', function (object) {
            object.name = "Piso";
            object.scale.copy(new THREE.Vector3(5, 5, 5));
            object.position.set(0, 0, -1);

            objPiso = object;
            scene.add(object);
        });
    });

    //ESTA ES LA PARED IZQUIERDA SUPERIOR
    const mtlpared1 = new MTLLoader(manager);
    const loaderpared1 = new OBJLoader(manager);
    mtlpared1.load('models/Nivel1PG/Pared6N1.mtl', function (materials) {
        materials.preload();
        loaderpared1.setMaterials(materials);
        loaderpared1.load('models/Nivel1PG/Pared6N1.obj', function (object) {
            object.name = "Pared1";
            object.scale.copy(new THREE.Vector3(1, 2, 1));
            object.position.set(-5.5, 11.5, 0);
            objParedDer = object;
            scene.add(object);
        });
    });

        //ESTA ES LA PARED IZQUIERDA INFERIOR
    const mtlpared3 = new MTLLoader(manager);
    const loaderpared3 = new OBJLoader(manager);
    mtlpared1.load('models/Nivel1PG/Pared6N1.mtl', function (materials) {
        materials.preload();
        loaderpared3.setMaterials(materials);
        loaderpared3.load('models/Nivel1PG/Pared6N1.obj', function (object) {
            object.name = "Pared1-2";
            object.scale.copy(new THREE.Vector3(1, 2, 1));
            object.position.set(-5.5, -6, 0);
            objParedDer2 = object;
            scene.add(object);
        });
    });


     //ESTA ES LA PARED DERECHA SUPERIOR
    const mtlpared2 = new MTLLoader(manager);
    const loaderpared2 = new OBJLoader(manager);
    mtlpared2.load('models/Nivel1PG/Pared6N1.mtl', function (materials) {
        materials.preload();
        loaderpared2.setMaterials(materials);
        loaderpared2.load('models/Nivel1PG/Pared6N1.obj', function (object) {
            object.name = "Pared2";
            object.scale.copy(new THREE.Vector3(1, 2, 1));
            object.position.set(12.5, 11.5, 0);

            objParedIzq = object;
            scene.add(object);
        });
    });

      //ESTA ES LA PARED DERECHA INFERIOR
    const mtlpared4 = new MTLLoader(manager);
    const loaderpared4 = new OBJLoader(manager);
    mtlpared4.load('models/Nivel1PG/Pared6N1.mtl', function (materials) {
        materials.preload();
        loaderpared4.setMaterials(materials);
        loaderpared4.load('models/Nivel1PG/Pared6N1.obj', function (object) {
            object.name = "Pared2-2";
            object.scale.copy(new THREE.Vector3(1, 2, 1));
            object.position.set(12.5, -6, 0);

            objParedIzq2 = object;
            scene.add(object);
        });
    });


    //PARTE DE ABAJO
    const mtltecho = new MTLLoader(manager);
    const loadertecho = new OBJLoader(manager);
    mtltecho.load('models/Nivel1PG/Pared6N1.mtl', function (materials) {
        materials.preload();
        loadertecho.setMaterials(materials);
        loadertecho.load('models/Nivel1PG/Pared6N1.obj', function (object) {
            object.name = "Techo1";
            object.scale.copy(new THREE.Vector3(1, 2.5, 1.25));
            object.position.set(-3.25, -2, 0);
            object.rotation.z = Math.PI /2; // 90 grados en el eje Y

            objTechoArriba = object;
            scene.add(object);
        });
    });

    //PARTE DE ARRIBA 
    const mtltecho2 = new MTLLoader(manager);
    const loadertecho2 = new OBJLoader(manager);
    mtltecho2.load('models/Nivel1PG/Pared6N1.mtl', function (materials) {
        materials.preload();
        loadertecho2.setMaterials(materials);
        loadertecho2.load('models/Nivel1PG/Pared6N1.obj', function (object) {
            object.name = "Techo2";
            object.scale.copy(new THREE.Vector3(1, 2.6, 1.25));
            object.position.set(-3.5, 9, 0);
            object.rotation.z = Math.PI /2; // 90 grados en el eje Y

            objTechoAbajo = object;
            scene.add(object);
        });
    });

}
