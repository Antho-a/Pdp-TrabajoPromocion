import { Tarea } from "../models/Tarea";
import { DIFICULTADES_TAREA } from "../models/Tarea";


// Tipos de ordenamiento disponibles
export type TipoOrdenamiento = 'titulo' | 'fechaVencimiento' | 'fechaCreacion' | 'dificultad' | 'ninguno';

// --- Comparadores Puros ---

const compararPorTitulo = (a: Tarea, b: Tarea): number => 
    a.getTitulo().localeCompare(b.getTitulo());

const compararPorFechaVencimiento = (a: Tarea, b: Tarea): number => {
    const fechaA = a.getFechaVencimiento();
    const fechaB = b.getFechaVencimiento();
    if (!fechaA) return 1;
    if (!fechaB) return -1;
    return new Date(fechaA).getTime() - new Date(fechaB).getTime();
};

const compararPorFechaCreacion = (a: Tarea, b: Tarea): number => {
    const tiempoA = new Date(a.getFechaCreacion());
    const tiempoB = new Date(b.getFechaCreacion());
    return tiempoA.getTime() - tiempoB.getTime();
};

const compararPorDificultad = (a: Tarea, b: Tarea): number => {
    const indexA = DIFICULTADES_TAREA.indexOf(a.getDificultad());
    const indexB = DIFICULTADES_TAREA.indexOf(b.getDificultad());
    return indexA - indexB;
};

// --- Función Pura de Ordenamiento Genérica ---

const ordenarLista = (items: Tarea[], comparador: (a: Tarea, b: Tarea) => number): Tarea[] => {
    return [...items].sort(comparador);
};

// --- Mapa de Comparadores (Función Pura) ---

const obtenerComparador = (tipo: TipoOrdenamiento): ((a: Tarea, b: Tarea) => number) | null => {
    const comparadores: Record<TipoOrdenamiento, ((a: Tarea, b: Tarea) => number) | null> = {
        'titulo': compararPorTitulo,
        'fechaVencimiento': compararPorFechaVencimiento,
        'fechaCreacion': compararPorFechaCreacion,
        'dificultad': compararPorDificultad,
        'ninguno': null
    };
    return comparadores[tipo];
};

// ============================================================================
// FUNCIONES PURAS EXPORTADAS
// ============================================================================

/**
 * Función pura: Ordena una lista de tareas según el tipo especificado.
 * @param tareas - Lista de tareas a ordenar (NO se muta)
 * @param tipo - Tipo de ordenamiento a aplicar
 * @returns Nueva lista ordenada
 */
export const ordenarTareas = (tareas: Tarea[], tipo: TipoOrdenamiento): Tarea[] => {
    const comparador = obtenerComparador(tipo);
    if (!comparador) return [...tareas]; // 'ninguno' retorna copia sin ordenar
    return ordenarLista(tareas, comparador);
};

/**
 * Función pura: Ordena por título alfabéticamente.
 */
export const ordenarPorTitulo = (tareas: Tarea[]): Tarea[] => {
    return ordenarLista(tareas, compararPorTitulo);
};

/**
 * Función pura: Ordena por fecha de vencimiento (tareas sin fecha van al final).
 */
export const ordenarPorFechaVencimiento = (tareas: Tarea[]): Tarea[] => {
    return ordenarLista(tareas, compararPorFechaVencimiento);
};

/**
 * Función pura: Ordena por fecha de creación (más antigua a más reciente).
 */
export const ordenarPorFechaCreacion = (tareas: Tarea[]): Tarea[] => {
    return ordenarLista(tareas, compararPorFechaCreacion);
};

/**
 * Función pura: Ordena por dificultad (baja, media, alta).
 */
export const ordenarPorDificultad = (tareas: Tarea[]): Tarea[] => {
    return ordenarLista(tareas, compararPorDificultad);
};
