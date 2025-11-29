import { Tarea, DIFICULTADES_TAREA, ESTADOS_TAREA } from "../models/Tarea";  
import { rangoNumero , preguntaYN} from "../funcionalidades-Puras/comprobaciones";



import PromptSync from "prompt-sync";
const prompt = PromptSync();

function CrearTarea(tareas : Tarea[]) : Tarea{
    console.clear();

    console.log("----------------------------------------------------------------\n");
    console.log("                  Creación de una nueva tarea \n");
    console.log("----------------------------------------------------------------\n");
    
    //variables para el flujo del codigo
    let validacion: boolean = true;
    let confirmar: string = "";
    
    
    // variables para el objeto tarea
    let titulo :string = "";
    let descripcionInput: string = "";
    let estado: string ;
    let dificultad: string;
    let fechaVencimiento: Date | undefined = undefined;
    let fechaCreacion: Date;

    //Titulo ------------------------------------------------------------------------------------------------------------
    do{

    validacion = false;
    titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim()||""; // trim sirve para eliminar espacios blancos al pricipio y al final
    
    if(titulo.length=== 0){
        console.clear();
        console.log("El titulo no puede estar vacio, por favor ingrese un titulo valido.");
        validacion = true;
        continue;
    }

    if(titulo.length > 100){
        console.clear();
        console.log("El titulo no puede superar los 100 caracteres, por favor ingrese un titulo valido.");
        validacion = true;
        continue;
    }

    for (let i : number = 0; i<tareas.length ; i++){
        if (titulo.toLowerCase() == tareas[i].getTitulo().toLowerCase()){
            console.clear();
            console.log("Ya se encuentra una tarea con ese mismo titulo, porfavor introduzca uno nuevo")
            validacion=true;
        }
    }

    }while(validacion);
    //---------------------------------------------------------------------------------------------------------------------
    
    console.clear();

    //Descripcion ------------------------------------------------------------------------------------------------------

    do{
        validacion = false;
        descripcionInput = prompt("Ingrese la descripcion de la tarea (max 500 caracteres): ")?.trim() || ""; // elimino los caracters vacios

        if(descripcionInput.length === 0){  // Pregunta de si quiere dejar la descripcion vacia

            console.clear();
            confirmar = preguntaYN(prompt("La descripcion esta vacia, desea dejarla asi ? (y/n): ")?.trim().toLowerCase() || "")
            while (confirmar === "-1"){
                console.clear();
                confirmar = preguntaYN(prompt("La descripcion esta vacia, desea dejarla asi ? (y/n): ")?.trim().toLowerCase() || "")
            }
           
        


        } // fin de la pregutna 

        if(descripcionInput.length > 500){
            console.clear();
            console.log("La descripcion no puede superar los 500 caracteres, por favor ingrese una descripcion valida.");
            validacion = true;
            continue;
        }
    }while(validacion);

    //---------------------------------------------------------------------------------------------------------------------

    console.clear();
    
    
    
    // Estado -------------------------------------------------------------------

    console.log("Ingrese el estado de la tarea");
    for(let i : number = 0 ; i<ESTADOS_TAREA.length; i++){
        console.log(`[${i+1}] ${ESTADOS_TAREA[i]}\n`);
    }
    estado=prompt( "Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default (pendiente):")?.trim() ||"";
    if(rangoNumero(estado,1,ESTADOS_TAREA.length,true) === "1" ){
        estado="1";
    }
    else{
        while(rangoNumero(estado,1,ESTADOS_TAREA.length,false) === "-1"){
            estado=prompt( "Entrada invalida. Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default (pendiente):")?.trim() ||"";
            if(rangoNumero(estado,1,ESTADOS_TAREA.length,true) === "1" ){
                estado="1";
            }
        }
    }

    //----------------------------------------------------------------------------
    console.clear();

    //Dificultad -----------------------------------------------------------------
    
    console.log("Ingrese la dificultad de la tarea");

    for(let i : number = 0 ; i<DIFICULTADES_TAREA.length; i++){
        console.log(`[${i+1}] ${DIFICULTADES_TAREA[i]}\n`);
    }

    dificultad = prompt( "Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default ( Baja:⭐ ): ")?.trim() ||"";
    if(rangoNumero(dificultad,1,DIFICULTADES_TAREA.length,true) === "1" ){
    dificultad="1";
    }
    else{
        while(rangoNumero(dificultad,1,DIFICULTADES_TAREA.length,false) === "-1"){ 
            dificultad = prompt( "Entrada invalida. Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default ( Baja:⭐ ): ")?.trim() ||"";
            if(rangoNumero(dificultad,1,DIFICULTADES_TAREA.length,true) === "1" ){
                dificultad="1";
            }
        }
    }       
    //----------------------------------------------------------------------------

    console.clear();

    //Fecha de vencimiento -------------------------------------------------------
    
    console.log("Desea ingresar fecha de nacimiento ? ");

    console.log("1) - Si");
    console.log("2) - No");

    let opcionFecha : string = rangoNumero( prompt("Ingrese una opcion: ")?.trim() || "",1,2,false);

    while(opcionFecha === "-1"){
        opcionFecha = rangoNumero( prompt("Entrada invalida. Ingrese una opcion: ")?.trim() || "",1,2,false); 
    }


    if(opcionFecha === "1"){

        console.clear();
        
        console.log("Ingrese la fecha de vencimiento:");
        
        let año : number = parseInt(prompt("Año (YYYY): ")?.trim() || "");
        while(isNaN(año) || año < 2024){
            console.clear();
            año = parseInt(prompt("Entrada invalida. Año (YYYY): ")?.trim() || "");
        }

        
        let mes : number = parseInt(prompt("Mes (1-12): ")?.trim() || "");
        while(isNaN(mes) || mes < 1 || mes > 12){
            console.clear();
            mes = parseInt(prompt("Entrada invalida. Mes (1-12): ")?.trim() || "");
        }

        
        let dia : number = parseInt(prompt("Día (1-31): ")?.trim() || "");
        while(isNaN(dia) || dia < 1 || dia > 31){
            console.clear();
            dia = parseInt(prompt("Entrada invalida. Día (1-31): ")?.trim() || "");
        }

        fechaVencimiento = new Date(año, mes, dia);
    }

    //----------------------------------------------------------------------------
    console.clear();


    fechaCreacion = new Date();

    return new Tarea(titulo, descripcionInput, ESTADOS_TAREA[parseInt(estado)-1], DIFICULTADES_TAREA[parseInt(dificultad)-1], fechaVencimiento!);

}


export { CrearTarea };