import { Tarea, DIFICULTADES_TAREA, ESTADOS_TAREA } from "../models/Tarea"; 
import PromptSync from "prompt-sync";
import { pedirNumero, esTituloValido, esDescripcionValida,esfechaValida } from "./Verificadores";
import { obtenerListaEstados, obtenerListaDificultades } from "../Interfaz/Consola";

// Inicialización de la librería para capturar entrada por consola
const prompt = PromptSync();
/**
 * Función encargada de solicitar datos al usuario para construir una nueva Tarea.
 * Realiza validaciones de longitud, duplicados y tipos de datos.
 * * @param tareas - Lista actual de tareas para verificar que no se repitan títulos.
 * @returns Una nueva instancia de la clase Tarea con los datos ingresados.
 */
function header(titulo: string) {
    return "========================================\n" +
           `   NUEVA TAREA | ${titulo}\n` +
           "========================================\n";
}
function CrearTarea(tareas : Tarea[]) : Tarea{
    
    // Función visual simple: Limpia la consola y muestra un encabezado estilizado

    
    // Declaración de variables que almacenarán las propiedades de la nueva tarea
    let titulo :string;
    let descripcion: string;
    let estado: number ;
    let dificultad: number;
    let fechaVencimiento: Date | undefined;
    let estados=ESTADOS_TAREA;
    let dificultades= DIFICULTADES_TAREA;
    // --- 1. TÍTULO ---
    console.clear();
    header("Paso 1/4: Título");
    // Primer intento de captura del título
    titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() ||"";
    
    // Bucle de validación: Se repite si está vacío, excede 100 caracteres o si el título ya existe en el array 'tareas'
    while(!esTituloValido(titulo, tareas)){
        console.log("\n [!] Título inválido. Intente nuevamente.")
        titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() ||"";
    }
    // --- 2. DESCRIPCIÓN ---
    console.clear();
    header("Paso 2/4: Descripción");
    // Captura de la descripción (es opcional, por lo que puede quedar vacía)
    descripcion = prompt("Ingrese la descripción (Opcional, max 500 caracteres): ")?.trim() ||"";
    
    // Validación de longitud máxima permitida para la descripción
    while(!esDescripcionValida(descripcion)){
        console.log("\n [!] Descripción inválida. Intente nuevamente.")
        descripcion = prompt("Ingrese la descripción (max 500 caracteres): ")?.trim() ||"";
    }
    // --- 3. ESTADO ---
    console.clear();
    header("Paso 3/4: Estado"); 
     
    // Muestra en consola la lista de estados disponibles
    console.log(obtenerListaEstados(estados));

    // Solicita un número al usuario validando que esté dentro del rango del array ESTADOS_TAREA
    estado = pedirNumero(" Seleccione el estado actual." , 1 , ESTADOS_TAREA.length , true);
    // --- 4. DIFICULTAD ---
    console.clear();
    header("Paso 4/4: Dificultad"); 
    // Muestra en consola la lista de dificultades disponibles
    console.log(obtenerListaDificultades(dificultades));
    
    // Solicita seleccionar la dificultad validando el rango numérico
    dificultad=pedirNumero(" Seleccione La dificultad." , 1 , DIFICULTADES_TAREA.length , true);
    // --- CONFIGURACIÓN DE FECHA ---
    console.clear();
    header("Configuración final");
    // Pregunta al usuario si desea agregar una fecha límite (1 = Sí, 2 = No)
    let opcionFecha : number = pedirNumero( "¿Desea asignar una fecha de vencimiento?\n   [1] Sí\n   [2] No",1,2,false);

    // Si el usuario elige "Sí" (opción 1), solicita los componentes de la fecha
    if(opcionFecha === 1){
        do{
        console.log("\n--- Ingrese la fecha ---");
        
        // Solicita año, mes y día con sus respectivos rangos de validación
        let año : number = pedirNumero("Porfavor indique el año de vencimiento\n" , 2025 , 2035 , false);
        
        // Nota: El mes en el constructor de Date suele ser 0-11, aquí se pide 1-12. 
        // (Se asume que la conversión se maneja internamente o al instanciar Date).
        let mes : number = pedirNumero("Porfavor indique el mes de vencimiento \n" , 1 , 12 , false);
        
        let dia : number = pedirNumero("Porfavor indique el dia de vencimiento \n" , 1 , 31 , false);

        // Crea el objeto Date con los datos recolectados
        fechaVencimiento = new Date(año, mes-1, dia);
        }while(!esfechaValida(fechaVencimiento,new Date()));
        
    }else{
        // Si elige "No", la fecha queda indefinida
        fechaVencimiento = undefined;
    }

    // Limpia la pantalla y muestra mensaje de éxito
    console.clear();
    console.log("\n========================================");
    console.log("      ¡TAREA CREADA CON ÉXITO!");
    console.log("========================================\n");
    
    // Retorna la nueva instancia usando los índices obtenidos (ajustados con -1 para base 0)
    return new Tarea(titulo, descripcion, ESTADOS_TAREA[estado-1], DIFICULTADES_TAREA[dificultad-1], fechaVencimiento);
}

export { CrearTarea };