import PromptSync from "prompt-sync";
const prompt = PromptSync();

import { gestor } from "./logica/Gestor";
import { Tarea } from "./models/Tarea";
import {menu} from "./Interfaz/Consola";
import { CrearTarea } from "./Funcionalidades/CrearTarea";

function main():void{
    console.clear();

    const gestorTareas = new gestor("TareasGuardadas.json"); // creador de gestor de tareas

    // variables utilizadas para la seleccion del menu
  
    
     let opcionesMenu :number;

    //---------------------------------------------------------------------------
    
    
    do{ //clico para el menu principal
        
        console.log(menu());
         
        // proceso de seleccion del menu

            opcionesMenu = parseInt(prompt("Seleccione una opción del menú: "));

            while( !isNaN(opcionesMenu) && (opcionesMenu < 1 || opcionesMenu > 4)){
                console.clear();
                console.log(menu());
                opcionesMenu = parseInt(prompt("Entrada invalida. Seleccione una opción del menú: "));
            }

        //fin proceso de seleccion del menu

        console.clear();


        
        switch(opcionesMenu){
            case 1:
                console.log("Ver Mis Tareas");
            break;

            case 2:
                console.log("Buscar Tarea");

            break;

            case 3:
                gestorTareas.addItem( CrearTarea(gestorTareas.items) );
                console.log("Tarea agregada con exito.");

            break;

            case 4:
                console.log("Eliminar tarea");
            
            break;
        }

    }while(opcionesMenu !== 4);
}

main();