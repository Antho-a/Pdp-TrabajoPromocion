import { OrdenTareasASC } from "../Interfaz/Consola";
import { Tarea, ESTADOS_TAREA, DIFICULTADES_TAREA } from "../models/Tarea";

function contarPorEstado(tareas: Tarea[], estado: string): number {
    return (tareas.reduce((count, tarea) => {
        return count + (tarea.getEstado() === estado ? 1 : 0);
    }, 0)/ tareas.length) * 100;
}

function contarPorDificultad(tareas: Tarea[], dificultad: string): number {
    return (tareas.reduce((count, tarea) => {
        return count + (tarea.getDificultad() === dificultad ? 1 : 0);
    }, 0)/ tareas.length) * 100;
} 


export { contarPorEstado, contarPorDificultad };
