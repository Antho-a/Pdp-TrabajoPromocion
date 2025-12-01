import { Tarea } from "../models/Tarea";

function menu(): string {
    return "\n" +
    "========================================\n" +
    "            MENÚ PRINCIPAL              \n" +
    "========================================\n" +
    "   [1] - Ver Mis Tareas\n" +
    "   [2] - Buscar Tarea\n" +
    "   [3] - Agregar Tarea\n" +
    "   [4] - Eliminar Tarea\n" +
    "   [5] - Salir\n" +
    "========================================";
}

function VerMisTareas(): string {
    return "\n" +
    "--- FILTRAR TAREAS ---\n" +
    "\n" +
    "   [1] Todas\n" +
    "   [2] Pendientes\n" +
    "   [3] En curso\n" +
    "   [4] Terminadas\n" +
    "   [6] Volver al menú principal\n";
}

function OrdenTareasASC(): string {
    return "\n" +
    "--- ORDENAR POR ---\n" +
    "\n" +
    "   [1] Título ascendente\n" +
    "   [2] Fecha de vencimiento ascendente\n" +
    "   [3] Fecha de creación ascendente\n" +
    "   [4] Dificultad (de baja a alta)\n" +
    "   [5] Volver al menú principal\n";
}

function Estadisiticas(): string {
    return "\n" +
    "--- ESTADÍSTICAS ---\n" +
    "\n" +
    "   [1] Total de tareas\n" +
    "   [2] Porcentaje de tareas por estado\n" +
    "   [3] Porcentaje de tareas por dificultad\n" +
    "   [4] Volver al menú principal\n";
}

function Consultas(): string {
    return "\n" +
    "--- CONSULTAS AVANZADAS ---\n" +
    "\n" +
    "   [1] Tareas de alta prioridad\n" +
    "   [2] Tareas relacionadas\n" +
    "   [3] Listado de tareas vencidas\n" +
    "   [4] Volver al menú principal\n";
}

function PreguntaEditar(): string {
    return "\n" +
    "--- EDITAR CAMPO ---\n" +
    "\n" +
    "   [1] Título\n" +
    "   [2] Descripción\n" +
    "   [3] Estado\n" +
    "   [4] Dificultad\n" +
    "   [5] Fecha de vencimiento\n" +
    "   [6] Volver al menú principal\n";
}

function EditarY_N (): string{
    return "- Desea editar la tarea? (Y/N)\n"
}




export { 
    menu, 
    VerMisTareas, 
    OrdenTareasASC, 
    Estadisiticas, 
    Consultas, 
    PreguntaEditar,
    EditarY_N
};