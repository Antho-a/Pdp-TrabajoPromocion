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
    let confirmar: string;
    
    // Variables de la tarea
    let titulo :string;
    let descripcion: string;
    let estado: string ;
    let dificultad: string;
    let fechaVencimiento: Date | undefined;
    let fechaCreacion: Date;

    // --- 1. TÍTULO ---
    header("Paso 1/4: Título");
    titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() ||"";
    while(titulo.length == 0 || titulo.length > 100 || tareas.some(tarea => tarea.getTitulo().toLowerCase() === titulo.toLowerCase())){
        console.log("\n [!] Título inválido. Intente nuevamente.")
        titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() ||"";
    }

    header("Paso 2/4: Descripción");
    descripcion = prompt("Ingrese la descripción (Opcional, max 500 caracteres): ")?.trim() ||"";
    while(descripcion.length > 500){
        console.log("\n [!] Descripción inválida. Intente nuevamente.")
        descripcion = prompt("Ingrese la descripción (max 500 caracteres): ")?.trim() ||"";
    }

    header("Paso 3/4: Estado");
    estado=prompt("Seleccione el estado actual(pendiente, en curso, terminada): ")?.trim() ||"";
    while(estado!="" && !ESTADOS_TAREA.includes(estado)){
        console.log("\n [!] Estado inválido. Intente nuevamente.")
        estado=prompt("Seleccione el estado actual(pendiente, en curso, terminada): ")?.trim() ||"";
    }
    if(estado==""){
        console.log("\n [i] Estado por defecto: Pendiente.");
        estado="1";
        
    }

    header("Paso 4/4: Dificultad");
    dificultad=prompt("Seleccione la dificultad(baja, media, alta): ")?.trim() ||"";
    while(dificultad!="" && !DIFICULTADES_TAREA.includes(dificultad)){
        console.log("\n [!] Dificultad inválida. Intente nuevamente.")
        dificultad=prompt("Seleccione la dificultad(baja, media, alta): ")?.trim() ||"";
    }
    if(dificultad==""){
        console.log("\n [i] Dificultad por defecto: Baja.");
        dificultad="1";
    }

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

        fechaVencimiento = new Date(año, mes, dia);
    }else{
        fechaVencimiento = undefined;
    }
    
    console.clear();
    console.log("\n========================================");
    console.log("      ¡TAREA CREADA CON ÉXITO!");
    console.log("========================================\n");
    return new Tarea(titulo, descripcion, ESTADOS_TAREA[parseInt(estado)-1], DIFICULTADES_TAREA[parseInt(dificultad)-1], fechaVencimiento);
}

export { CrearTarea };