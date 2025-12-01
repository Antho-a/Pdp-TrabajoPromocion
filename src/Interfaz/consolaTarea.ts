import { Tarea } from "../models/Tarea";

/**
 * Función recursiva que genera un string con la lista numerada de los títulos de las tareas.
 * Útil para mostrar un menú de selección dinámico.
 * * **Salida en consola:**
 * ```text
 * [1] Comprar leche
 * [2] Estudiar TypeScript
 * [3] Pasear al perro
 * ```
 * @param tareas - Arreglo de tareas a listar.
 * @param longitud - La cantidad total de tareas (usualmente tareas.length).
 * @param contador - Índice actual para la recursividad (iniciar en 0).
 * @returns Un string concatenado con todos los títulos numerados.
 */
function mostarTitulos(tareas: Tarea[] , longitud : number , contador : number): String {
    if(contador < longitud){ 
        // Agregué el índice [1], [2] para que coincida con la selección del usuario
        // y un poco de indentación para que se vea ordenado.
        return `   [${contador + 1}] ` + tareas[contador].getTitulo() + "\n" + mostarTitulos(tareas, longitud, contador + 1);
    } 
    else{ 
        return ""; 
    }
}

/**
 * Genera una representación visual detallada y formateada de una tarea específica.
 * Incluye bordes y secciones para facilitar la lectura.
 * * **Salida en consola:**
 * ```text
 * ========================================
 * DETALLE DE TAREA            
 * ========================================
 *
 * --------------------------------------------------
 * TÍTULO: APRENDER ANGULAR
 * --------------------------------------------------
 * > ID:           123e4567-e89b...
 *
 * DESCRIPCIÓN:
 * Repasar componentes y servicios.
 *
 * ESTADO Y DIFICULTAD:
 * • Estado:       En curso
 * • Dificultad:   Media: ⭐⭐ 
 *
 * FECHAS:
 * • Creación:     1/12/2025, 10:00:00
 * • Vencimiento:  5/12/2025, 00:00:00
 * • Últ. Edición: No editada
 * --------------------------------------------------
 *
 * ========================================
 * ```
 * @param tarea - El objeto Tarea del cual se extraerán los datos.
 * @returns Un string con el diseño completo de la ficha de la tarea.
 */
function mostrarTareaCompletas(tarea: Tarea): String {
    return "\n========================================\n" +
           "            DETALLE DE TAREA            \n" +
           "========================================\n" +
           "\n" +
           "   --------------------------------------------------\n" +
           "    TÍTULO: " + tarea.getTitulo().toUpperCase() + "\n" +
           "   --------------------------------------------------\n" +
           "    > ID:           " + tarea.getId() + "\n\n" +
           "    DESCRIPCIÓN:\n" +
           "    " + tarea.getDescripcion() + "\n\n" +
           "    ESTADO Y DIFICULTAD:\n" +
           "    • Estado:       " + tarea.getEstado() + "\n" +
           "    • Dificultad:   " + tarea.getDificultad() + "\n\n" +
           "    FECHAS:\n" +
           "    • Creación:     " + tarea.getFechaCreacion().toLocaleString() + "\n" + 
           "    • Vencimiento:  " + (tarea.getFechaVencimiento() ? tarea.getFechaVencimiento()?.toLocaleString() : "No establecida") + "\n" +
           "    • Últ. Edición: " + (tarea.getUltimaEdicion() ? tarea.getUltimaEdicion()?.toLocaleString() : "No editada") + "\n" +
           "   --------------------------------------------------\n" + 
           "\n========================================";    
}

export {mostarTitulos , mostrarTareaCompletas}