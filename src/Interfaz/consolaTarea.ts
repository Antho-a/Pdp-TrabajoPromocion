import { Tarea } from "../models/Tarea";

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
           "    • Vencimiento:  " + (tarea.getFechaVencimiento() ? tarea.getFechaVencimiento() : "No establecida") + "\n" +
           "    • Últ. Edición: " + (tarea.getUltimaEdicion() ? tarea.getUltimaEdicion() : "No editada") + "\n" +
           "   --------------------------------------------------\n" + 
           "\n========================================";    
}

export {mostarTitulos , mostrarTareaCompletas}