import { gestor } from "../logica/Gestor";
import { Tarea } from "../models/Tarea";
import { ESTADOS_TAREA ,  DIFICULTADES_TAREA} from "../models/Tarea"; 

function filtrarTodas(tareas : Tarea[]): Tarea[] {
    return tareas.filter(tarea => tarea.getEliminado() === false);
}

function filterPendientes(tareas : Tarea[]) : Tarea[]{
    return tareas.filter(tarea => tarea.getEliminado() === false && tarea.getEstado() === ESTADOS_TAREA[0]);
}

function filterCurso(tareas : Tarea[]) : Tarea[]{
    return tareas.filter(tarea => tarea.getEliminado() === false && tarea.getEstado() === ESTADOS_TAREA[1]);
}

function filterterminadas(tareas : Tarea[]) : Tarea[]{
    return tareas.filter(tarea => tarea.getEliminado() === false && tarea.getEstado() === ESTADOS_TAREA[2]);
}

function filtercanceladas(tareas : Tarea[]) : Tarea[]{
    return tareas.filter(tarea => tarea.getEliminado() === false && tarea.getEstado() === ESTADOS_TAREA[3]);
}


export{ filterCurso, filterPendientes , filtercanceladas , filterterminadas , filtrarTodas}