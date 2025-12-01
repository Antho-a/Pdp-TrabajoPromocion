import prompt from "prompt-sync";
import { DIFICULTADES_TAREA, Tarea } from "../models/Tarea";  
import { OrdenTareasASC, VerMisTareas,EditarY_N, PreguntaEditar } from "../Interfaz/Consola";
import { preguntaYN, rangoNumero } from "../funcionalidades-Puras/Comprobaciones";
import { gestor } from "../logica/Gestor";
import { filter, filtrarTodas } from "../funcionalidades-Puras/FiltroSegunEstado"
import { OrdenadorTareas } from "../funcionalidades-Puras/ObjetoOrdenamiento";
import { mostarTitulos , mostrarTareaCompletas } from "../Interfaz/ConsolaTarea";
import { validate } from "uuid";


const input = prompt();

function verMisTareas( tareas : gestor ):void{

    console.clear();

    //varibales de uso interno
    let opcionVerTareas : string = ""; // variable principal que lee la opcion del usuario
    
    const Ordenador = new OrdenadorTareas; // objeto que ordena segun titulo , fecha de vencimiento, fecha de creacion y dificultad 
    
    let tareasfiltradas : Tarea[] = []; // este arreglo tendra las tareas con la seleccion de estado 
    
    let tareasfiltradasordenanadas : Tarea[] = []; // este tendra el ordenamiento de dichas tareas con un determinado estado 
    
    let tareaSeleccionada : Tarea ; // tiene la copia de la tarea que seleecionamos 

    let validacion : boolean ; // sirve para el ciclo do del editar (puede cambiar )
    
    let index : string; // gurda el indice de la tarea que elgio el usuario en el arreglo "tareasfiltradasordenadas"
    
    let dato : string; // es el dato que pedimos a el usuario segun el cambio que elige  

    

    //-------------------------------------------------------------
    // 1. SELECCIÓN DE FILTRO
    //-------------------------------------------------------------
    console.log(VerMisTareas()); // Muestra el menú puro

    opcionVerTareas = input(" > ").trim()||"";

    while(rangoNumero(opcionVerTareas,1,5,false) === "-1"){
        console.clear();
        console.log(VerMisTareas());
        console.log("\n [!] Opción inválida. Intente nuevamente.");
        opcionVerTareas = input(" > ").trim()||"";
    }

    if(opcionVerTareas == "5"){
        console.log("\n Volviendo al menú principal...");
        input(" Presione Enter..."); // Pausa para leer
        return; 
    }

    // Lógica de filtrado (Intacta)
    switch(parseInt(opcionVerTareas)){
        case 1:
            tareasfiltradas = filtrarTodas(tareas.getItems()); 
        break;
        case 2:
            tareasfiltradas = filter(tareas.getItems() , DIFICULTADES_TAREA[0] );
        break;
        case 3:
            tareasfiltradas= filter(tareas.getItems(), DIFICULTADES_TAREA[1]);
        break
        case 4:
            tareasfiltradas = filter(tareas.getItems(), DIFICULTADES_TAREA[2]);
        break;
        case 5: 
            // Este caso ya se manejó arriba con el if, pero lo dejo por tu lógica
            console.clear();
            console.log("Saliendo al menu principal .....")
            return;
    }

    //-------------------------------------------------------------
    // 2. SELECCIÓN DE ORDENAMIENTO
    //-------------------------------------------------------------
    console.clear();
    console.log(OrdenTareasASC()); // Muestra menú de orden

    opcionVerTareas = input(" > ").trim()||"";

    while(rangoNumero(opcionVerTareas, 1 , 4 , false) === "-1"){
        console.clear();
        console.log(OrdenTareasASC()); // Faltaba los paréntesis en tu código original
        console.log("\n [!] Opción incorrecta.");
        opcionVerTareas = input(" > ").trim()||"";
    }

    // Lógica de ordenamiento (Intacta)
    switch(parseInt(opcionVerTareas)){
        case 1:
            tareasfiltradasordenanadas = Ordenador.porTitulo(tareasfiltradas);
        break;
        case 2 :
            tareasfiltradasordenanadas = Ordenador.porFechaVencimiento(tareasfiltradas);
        break;
        case 3 : 
            tareasfiltradasordenanadas = Ordenador.porFechaCreacion(tareasfiltradas);
        break;
        case 4 :
            tareasfiltradasordenanadas = Ordenador.porDificultad(tareasfiltradas, DIFICULTADES_TAREA)
        break;
    }

    //-------------------------------------------------------------
    // 3. SELECCIÓN DE TAREA ESPECÍFICA
    //-------------------------------------------------------------
    console.clear();
    console.log("\n========================================");
    console.log("       RESULTADOS DE LA BÚSQUEDA        ");
    console.log("========================================\n");
    
    // Muestra la lista de títulos
    console.log(mostarTitulos(tareasfiltradasordenanadas , tareasfiltradasordenanadas.length , 0 ));

    // Si no hay tareas, avisamos y salimos
    if (tareasfiltradasordenanadas.length === 0) {
        console.log("\n [i] No se encontraron tareas con ese criterio.");
        input("\n Presione Enter para volver...");
        return;
    }

    console.log("\n----------------------------------------");
    index = input(" Indique el N° de tarea a visualizar: > ");

    while(rangoNumero(index, 1 , tareasfiltradasordenanadas.length, false) == "-1"){
        console.clear();
        console.log("\n========================================");
        console.log("       RESULTADOS DE LA BÚSQUEDA        ");
        console.log("========================================\n");
        
        mostarTitulos(tareasfiltradasordenanadas , tareasfiltradasordenanadas.length , 0);

        console.log("\n [!] Número de tarea incorrecto.");
        index = input(" Indique el N° de tarea a visualizar: > ");
    }

    //-------------------------------------------------------------
    // 4. MOSTRAR DETALLE
    //-------------------------------------------------------------
    console.clear();

    tareaSeleccionada = Tarea.fromJSON(tareasfiltradasordenanadas[parseInt(index)-1]);
    
    console.log(mostrarTareaCompletas(tareaSeleccionada));

    input("enter para seguir...");

    

    console.log(EditarY_N);
    opcionVerTareas = input("");

    while(preguntaYN(opcionVerTareas) == "-1"){
        console.log("Seleccion invalida, vuelva a ingresarla")
        opcionVerTareas = input("");
    }


    if(preguntaYN(opcionVerTareas)=="0"){
        console.log("Volviendo al menu")
        input("Presione Enter para volver al menu...");
        return;
    }

    do{

        validacion = true ;
        console.log(PreguntaEditar());
        opcionVerTareas = input("")

        switch(parseInt(opcionVerTareas)){

            case 1:
                console.clear();
            break;

            case 2:
            break;

            case 3:
            break;
            case 4:
            break;

            case 5:

            break;

            case 6:
                console.log("Volviendo al menu principal");
                input("Seleccione enter para salir....");
                console.clear();
                return;

            break;

            default:
                console.log("Opcion incorrecta, porfavor seleccione una opcion valida");
                input("Seleccione enter para volver a intentarlo...");
                console.clear();
            break;

        }
    }while(validacion);
    


}


export {verMisTareas as vertarea}