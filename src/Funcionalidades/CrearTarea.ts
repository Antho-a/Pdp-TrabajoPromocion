import { Tarea, DIFICULTADES_TAREA, ESTADOS_TAREA } from "../models/Tarea"; 
import { rangoNumero , preguntaYN} from "../funcionalidades-Puras/Comprobaciones";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

function CrearTarea(tareas : Tarea[]) : Tarea{
    
    // Función visual simple
    const header = (titulo: string) => {
        console.clear();
        console.log("\n========================================");
        console.log(`   NUEVA TAREA | ${titulo}`);
        console.log("========================================\n");
    };

    // Variables de flujo
    let validacion: boolean = true;
    let confirmar: string = "";
    
    // Variables de la tarea
    let titulo :string = "";
    let descripcionInput: string = "";
    let estado: string ;
    let dificultad: string;
    let fechaVencimiento: Date | undefined = undefined;
    let fechaCreacion: Date;

    // --- 1. TÍTULO ---
    do{
        validacion = false;
        header("Paso 1/4: Título");

        console.log("Ingrese el título de la tarea (max 100 caracteres):");
        titulo = prompt(" > ")?.trim()||""; 
        
        if(titulo.length=== 0){
            console.log("\n [!] El título no puede estar vacío.");
            prompt(" Presione Enter para reintentar...");
            validacion = true;
            continue;
        }

        if(titulo.length > 100){
            console.log("\n [!] El título supera los 100 caracteres.");
            prompt(" Presione Enter para reintentar...");
            validacion = true;
            continue;
        }

        for (let i : number = 0; i<tareas.length ; i++){
            if (titulo.toLowerCase() == tareas[i].getTitulo().toLowerCase()){
                console.log("\n [!] Ya existe una tarea con ese título.");
                prompt(" Presione Enter para reintentar...");
                validacion=true;
            }
        }
    }while(validacion);
    
    // --- 2. DESCRIPCIÓN ---
    do{
        validacion = false;
        header("Paso 2/4: Descripción");

        console.log("Ingrese la descripción (max 500 caracteres):");
        descripcionInput = prompt(" > ")?.trim() || ""; 

        if(descripcionInput.length === 0){  
            console.log("\n [i] La descripción está vacía.");
            confirmar = preguntaYN(prompt("     ¿Desea dejarla así? (y/n): ")?.trim().toLowerCase() || "")

            while (confirmar === "-1"){
                confirmar = preguntaYN(prompt("     Opción inválida. ¿Desea dejarla así? (y/n): ")?.trim().toLowerCase() || "")
            }
            
            if(confirmar == "0") {validacion = true}
        } 

        if(descripcionInput.length > 500){
            console.log("\n [!] La descripción supera los 500 caracteres.");
            prompt(" Presione Enter para reintentar...");
            validacion = true;
            continue;
        }
    }while(validacion);

    // --- 3. ESTADO ---
    header("Paso 3/4: Estado");

    console.log("Seleccione el estado actual:\n");
    for(let i : number = 0 ; i<ESTADOS_TAREA.length; i++){
        console.log(`   [${i+1}] ${ESTADOS_TAREA[i]}`);
    }
    console.log("\n (Enter para default: Pendiente)");
    
    estado = prompt(" > ")?.trim() ||"";

    // Lógica original de Estado

    if(rangoNumero(estado,1,ESTADOS_TAREA.length,true) === "1" ){
        estado="1";
    }

    else{
        while(rangoNumero(estado,1,ESTADOS_TAREA.length,false) === "-1"){
            console.log(" [!] Entrada inválida.");
            
            estado = prompt(" > ")?.trim() ||"";



            if(rangoNumero(estado,1,ESTADOS_TAREA.length,true) === "1" ){
                estado="1";
            }
        }
    }

    // --- 4. DIFICULTAD ---
    header("Paso 4/4: Dificultad");

    console.log("Seleccione la dificultad:\n");
    for(let i : number = 0 ; i<DIFICULTADES_TAREA.length; i++){
        console.log(`   [${i+1}] ${DIFICULTADES_TAREA[i]}`);
    }
    console.log("\n (Enter para default: Baja ⭐)");

    dificultad = prompt(" > ")?.trim() ||"";
    
    // COPIADA LA LÓGICA EXACTA DE ESTADO (Cambiando variables y array)
    // El 'true' permite vacío y asumo que tu función rangoNumero devuelve "1" en ese caso
    if(rangoNumero(dificultad, 1, DIFICULTADES_TAREA.length, true) === "1" ){
        dificultad="1";
    }
    else{
        while(rangoNumero(dificultad, 1, DIFICULTADES_TAREA.length, false) === "-1"){ 
            console.log(" [!] Entrada inválida.");
            dificultad = prompt(" > ")?.trim() ||"";
            if(rangoNumero(dificultad, 1, DIFICULTADES_TAREA.length, true) === "1" ){
                dificultad="1";
            }
        }
    }
        
    // --- 5. FECHA DE VENCIMIENTO ---
    header("Configuración final");
    
    console.log("¿Desea asignar una fecha de vencimiento?");
    console.log("   [1] Sí");
    console.log("   [2] No");

    let opcionFecha : string = rangoNumero( prompt(" > ")?.trim() || "",1,2,false);

    while(opcionFecha === "-1"){
        opcionFecha = rangoNumero( prompt(" [!] Entrada inválida. Intente de nuevo: ")?.trim() || "",1,2,false); 
    }

    if(opcionFecha === "1"){
        console.log("\n--- Ingrese la fecha ---");
        
        let año : number = parseInt(prompt(" Año (YYYY): ")?.trim() || "");
        while(isNaN(año) || año < 2024){
            console.log("   [!] Año inválido.");
            año = parseInt(prompt(" Año (YYYY): ")?.trim() || "");
        }
        
        let mes : number = parseInt(prompt(" Mes (1-12): ")?.trim() || "");
        while(isNaN(mes) || mes < 1 || mes > 12){
            console.log("   [!] Mes inválido.");
            mes = parseInt(prompt(" Mes (1-12): ")?.trim() || "");
        }
        
        let dia : number = parseInt(prompt(" Día (1-31): ")?.trim() || "");
        while(isNaN(dia) || dia < 1 || dia > 31){
            console.log("   [!] Día inválido.");
            dia = parseInt(prompt(" Día (1-31): ")?.trim() || "");
        }

        fechaVencimiento = new Date(año, mes-1, dia);
    }

    console.clear();
    console.log("\n========================================");
    console.log("      ¡TAREA CREADA CON ÉXITO!");
    console.log("========================================\n");

    fechaCreacion = new Date();

    // Ahora 'dificultad' nunca será NaN porque el IF de arriba asegura que sea "1" si es vacío
    return new Tarea(titulo, descripcionInput, ESTADOS_TAREA[parseInt(estado)-1], DIFICULTADES_TAREA[parseInt(dificultad)-1], fechaVencimiento!);
}

export { CrearTarea };