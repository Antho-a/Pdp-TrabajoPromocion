import PromptSync from "prompt-sync";
import { Tarea } from "../models/Tarea";
const prompt = PromptSync();

/**
 * Valida si un número está dentro de un rango.
 * @param numero Número a validar.
 * @param min Mínimo.
 * @param max Máximo.
 * @returns true si es válido.
 */
export function validarRango(numero: number, min: number, max: number): boolean {
    return !Number.isNaN(numero) && numero >= min && numero <= max;
}

/**
 * Valida si la respuesta es 'y' o 'n'.
 * @param input Entrada del usuario.
 * @returns true si es válida.
 */
export function esRespuestaConfirmacion(input: string): boolean {
    return input === "y" || input === "n";
}

/**
 * Solicita al usuario un número entero dentro de un rango específico.
 * Permite configurar un valor por defecto si el usuario presiona Enter sin escribir nada.
 * * @param mensaje - El texto que se mostrará al usuario antes de pedir el dato.
 * @param min - El valor mínimo aceptado (y el valor por defecto si activadorVacio es true).
 * @param max - El valor máximo aceptado.
 * @param activadorVacio - Si es true, permite dejar el campo vacío (seleccionando 'min' automáticamente).
 * @returns El número validado ingresado por el usuario.
 */
export function pedirNumero(mensaje: string, min: number, max: number, activadorVacio: boolean): number {

    console.log(mensaje);
    
    // Muestra instrucciones diferentes dependiendo de si es obligatorio o opcional
    if (activadorVacio) {
        console.log(` (Opciones ${min}-${max}. Enter para seleccionar: ${min})`);
    } else {
        console.log(` (Ingrese un valor entre ${min} y ${max})\n`);
    }

    // Captura la entrada inicial limpiando espacios
    let entrada: string = prompt(" > ")?.trim() || "";

    // Si se permite vacío y el usuario da Enter, retorna el valor mínimo por defecto
    if (entrada === "" && activadorVacio) {
        return min;
    }
    
    // Intenta convertir la entrada a número
    let numero = parseInt(entrada);

    // Bucle de validación: Se ejecuta mientras NO sea un número, o sea menor al min, o mayor al max
    while (!validarRango(numero, min, max)) {

        // Vuelve a comprobar si es vacío dentro del bucle (por si el usuario falla y luego decide dar Enter)
        if (entrada === "" && activadorVacio) {
            return min;
        }  
        console.log(" [!] Entrada inválida.");
        
        // Solicita el dato nuevamente
        entrada = prompt(" Intente nuevamente: > ")?.trim() || "";
        numero = parseInt(entrada);
    }

    return numero;
}

/**
 * Solicita una confirmación de tipo Sí/No al usuario.
 * Fuerza al usuario a ingresar 'Y' o 'N' (insensible a mayúsculas).
 * * @param mensaje - La pregunta que se le hará al usuario.
 * @returns Retorna 1 si la respuesta es 'Sí' (Y), o 0 si la respuesta es 'No' (N).
 */
export function Confirmacion(mensaje: string): number {

    let salida : number;
    
    // 1. Mostrar la pregunta clara y separada con las opciones visuales
    console.log(`\n ${mensaje}`);
    console.log("   [Y] Sí   [N] No\n");

    // 2. Captura inicial (convertimos a minúscula de una vez para facilitar la validación)
    let input: string = prompt(" > ")?.trim().toLowerCase() || "";

    // 3. Bucle de validación "Blindado": Solo permite salir si es 'y' o 'n'
    while (!esRespuestaConfirmacion(input)) {
        console.log(" [!] Opción inválida. Por favor escriba 'Y' o 'N'.");
        input = prompt(" > ")?.trim().toLowerCase() || "";
    }

    // Asignación de valor numérico según la respuesta
    if(input =="y"){
        salida = 1;
    }
    else{
        salida = 0;
    }
    
    // Retorna el valor numérico (1 o 0)
    return salida
}

/**
 * Valida si un título es válido para una tarea.
 * Verifica que no esté vacío, no exceda 100 caracteres y no exista ya en la lista de tareas.
 * @param titulo - El título a validar.
 * @param tareas - La lista de tareas existentes.
 * @returns true si el título es válido, false en caso contrario.
 */
export function esTituloValido(titulo: string, tareas: Tarea[]): boolean {
    if (!titulo || titulo.trim().length === 0 || titulo.length > 100) {
        return false;
    }
    // Verifica duplicados (insensible a mayúsculas/minúsculas)
    return !tareas.some(t => t.getTitulo().toLowerCase() === titulo.toLowerCase());
}

/**
 * Valida si una descripción es válida.
 * Verifica que no exceda los 500 caracteres.
 * @param descripcion - La descripción a validar.
 * @returns true si la descripción es válida, false en caso contrario.
 */
export function esDescripcionValida(descripcion: string): boolean {
    return descripcion.length <= 500;
}
export function esfechaValida(fecha: Date,hoy:Date): boolean {
    return fecha > hoy;
}