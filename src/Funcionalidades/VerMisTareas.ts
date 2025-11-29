/*import prompt from "prompt-sync";
import { Tarea } from "../models/Tarea";  
import { OrdenTareasASC, VerMisTareas } from "../Interfaz/Consola";
import { rangoNumero } from "../funcionalidades-Puras/comprobaciones";
import { gestor } from "../logica/Gestor";
import {filterCurso, filterPendientes , filtercanceladas , filterterminadas , filtrarTodas} from "../funcionalidades-Puras/FiltroSegunEstado"


const input = prompt();

/* Sin terminar *//* Sin terminar *//* Sin terminar *//* Sin terminar *//* Sin terminar *//* Sin terminar *//* Sin terminar *//* Sin terminar *//*

function verMisTareas(  tareas : gestor ):void{
    console.clear();

    //varibales de uso interno
    let opcionVerTareas : string = "";
    //-------------------------------------------------------------
    console.log(VerMisTareas());

    let Tareasfiltradas : Tarea[];


    opcionVerTareas = input("Ingrese una opcion: ").trim()||"";
    while(rangoNumero(opcionVerTareas,1,5,false) === "-1"){
        opcionVerTareas = input("Entrada invalida. Ingrese una opcion: ").trim()||"";
    }

    switch(parseInt(opcionVerTareas)){

        case 1:
        
        Tareasfiltradas = filtrarTodas(tareas.getItems()); //Cada caso forma una array apundar para poder ver solo los elementos que quiero buscar 

        break;

        case 2:

        Tareasfiltradas= filterPendientes(tareas.getItems());

        break;

        case 3:

        Tareasfiltradas= filterCurso(tareas.getItems());

        break

        case 4:
            Tareasfiltradas = Tareasfiltradas= filterterminadas(tareas.getItems());

        break;

        case 5: 

        console.clear();

        console.log("Saliendo al menu principal .....")

        return;

        break;
    }


    console.log(OrdenTareasASC);

    opcionVerTareas = input("Ingrese una opcion: ").trim()||"";

    while(rangoNumero(opcionVerTareas, 1 , 4 , false)){

    }













}
*/