import { gestor } from "./logica/Gestor";
import { Tarea } from "./models/Tarea";
import {eliminarTarea  } from "./Eliminar";
import { showMenu } from "./Menu";


function main():void{
    const gestorTareas = new gestor("tareas");
    console.log(gestorTareas.items);
    let opcion:number;
    opcion = showMenu();
    while(opcion !== 5){
        switch(opcion){
            case 1:

            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
            break;
            case 5:
                console.log("Saliendo...");
            break;
            default:
                console.log("Opcion no valida");
            break;
        }
        opcion = showMenu();
    }



}

main();