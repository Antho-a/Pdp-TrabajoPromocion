import { Tarea, ESTADOS_TAREA, DIFICULTADES_TAREA } from "../models/Tarea";
const Logic = require('logicjs');

const lvar = Logic.lvar,
eq = Logic.eq,
and = Logic.and,
or = Logic.or,
run = Logic.run;


function Count(conditions:any[]):number {
    const n = lvar();
    const results = run(n, Logic.and(...conditions, eq(n, 1)));
    return results.length;
}

function estarea (tarea: Tarea) {
    return and(eq(tarea.getEliminado(),false));
}

function Contartareas(tareas:Tarea[]):number{

    return Count(tareas.map(tarea => estarea(tarea))); 
}

function ContarEstadoPendiente(tareas:Tarea[], estado:string):number{

    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getEstado() == 'Pendiente', true)
    ))); 
}

function contarEstadoEnCurso(tareas:Tarea[], estado:string):number{
    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getEstado() == 'En curso', true)
    ))); 
}

function contarEstadoTerminada(tareas:Tarea[], estado:string):number{
    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getEstado() == 'Terminada', true)
    ))); 
}

function contarEstadoCancelada(tareas:Tarea[], estado:string):number{   
    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getEstado() == 'Cancelada', true)
    ))); 
}

function contarDificultadBaja(tareas:Tarea[], dificultad:string):number{
    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getDificultad() == 'Baja: ⭐', true)
    ))); 
}

function contarDificultadMedia(tareas:Tarea[], dificultad:string):number{
    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getDificultad() == 'Media: ⭐⭐ ', true)
    ))); 
}

function contarDificultadAlta(tareas:Tarea[], dificultad:string):number{
    return Count(tareas.map(tarea => and(
        estarea(tarea),
        eq(tarea.getDificultad() == 'Alta: ⭐⭐⭐', true)
    ))); 
}

export{
    Contartareas,
    ContarEstadoPendiente,
    contarEstadoEnCurso,
    contarEstadoTerminada,
    contarEstadoCancelada,
    contarDificultadBaja,
    contarDificultadMedia,
    contarDificultadAlta
}



