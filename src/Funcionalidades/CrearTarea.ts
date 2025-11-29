import { Tarea, DIFICULTADES_TAREA, ESTADOS_TAREA } from "../models/Tarea";  
import PromptSync from "prompt-sync";
const prompt = PromptSync();

function CrearTarea(tareas : Tarea[]) : Tarea{
    
    let validacion: boolean = true;
    let titulo :string = "";
    let descripcionInput: string = "";
    let estado: string ;
    let dificultad: string;
    let fechaVencimiento: Date | undefined = undefined;
    let fechaCreacion: Date;

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
    console.clear();

    //Descripcion
    do{
        validacion = false;
        descripcionInput = prompt("Ingrese la descripcion de la tarea (max 500 caracteres): ")?.trim() || ""; // elimino los caracters vacios
        if(descripcionInput.length === 0){ 
            console.clear();
            let confirmar = prompt("La descripcion esta vacia, desea dejarla asi ? (y/n): ")?.toLowerCase() || "";
            while (confirmar !== "y" && confirmar !== "n"){
                console.clear();
                confirmar = prompt("Entrada invalida. La descripcion esta vacia, desea dejarla asi ? (y/n): ")?.toLowerCase() || "";
            }
            if(confirmar === "y"){

                validacion = false;
            }
            else{
                validacion = true;
                continue;
            }
        }

        if(descripcionInput.length > 500){
            console.clear();
            console.log("La descripcion no puede superar los 500 caracteres, por favor ingrese una descripcion valida.");
            validacion = true;
            continue;
        }
    }while(validacion);
    console.clear();
    
    
    
    //Estado
    console.log("Ingrese el estado de la tarea");

    for(let i : number = 0 ; i<ESTADOS_TAREA.length; i++){
        console.log(`[${i+1}] ${ESTADOS_TAREA[i]}`);
    }

    estado=prompt( "Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default (pendiente):")?.trim() ||"";
    if(""=== estado){
        estado="1";
    }

    
    while( isNaN(parseInt(estado)) && (parseInt(estado) < 1 || parseInt(estado) > ESTADOS_TAREA.length)){
        console.clear();
        estado=prompt( "Entrada invalida. Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default (pendiente):")?.trim() ||"";

        if(""=== estado) {estado="1";}
    }


    //Dificultad
    console.log("Ingrese la dificultad de la tarea");
    dificultad = prompt( "Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default ( Baja:⭐ ): ")?.trim() ||"";

    if( "" === dificultad) {dificultad="1"}

    while( isNaN(parseInt(dificultad)) && (parseInt(dificultad) < 1 || parseInt(dificultad) > DIFICULTADES_TAREA.length)){

        console.clear();
        estado=prompt( "Entrada invalida. Porfavor ingrese una de las opcines, Precionar ENTER dejara la tarea con el estado en default (pendiente):")?.trim() ||"";
        if(""=== dificultad) { dificultad= "1"; }

    }
    console.clear();


    console.log("Desea ingresar fecha de nacimiento ? ");
    console.log("[1] Si");
    console.log("[2] No");
    let opcionFecha : string = prompt("Ingrese una opcion: ")?.trim() || "";

    while(opcionFecha !== "1" && opcionFecha !== "2"){
        console.clear();
        opcionFecha = prompt("Entrada invalida. Ingrese una opcion: ")?.trim() || "";
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
    fechaCreacion = new Date();

    return new Tarea(titulo, descripcionInput, ESTADOS_TAREA[parseInt(estado)-1], DIFICULTADES_TAREA[parseInt(dificultad)-1], fechaVencimiento!);

}