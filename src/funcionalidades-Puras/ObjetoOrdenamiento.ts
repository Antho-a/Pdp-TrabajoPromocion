import { DIFICULTADES_TAREA, Tarea } from "../models/Tarea";

export class OrdenadorTareas {

    // la funcion padre, el todo del todo 
    private ordenarLista(items: Tarea[], comparador: (a: Tarea, b: Tarea) => number): Tarea[] {
        return [...items].sort(comparador);
    }


    // metodos internos para pasarle a ordenar lista segun algun parametro, esto se para para que la funcion padre funcione 


    private compararPorTitulo(a: Tarea, b: Tarea): number {
        return a.getTitulo().localeCompare(b.getTitulo());
    }

    private compararPorFechaVencimiento(a: Tarea, b: Tarea): number {
        const fechaA = a.getFechaVencimiento();
        const fechaB = b.getFechaVencimiento();
        if (!fechaA) return 1;
        if (!fechaB) return -1;
        return new Date(fechaA).getTime() - new Date(fechaB).getTime();
    }

    private compararPorFechaCreacion(a: Tarea, b: Tarea): number {
        const tiempoA = new Date(a.getFechaCreacion());
        const tiempoB = new Date(b.getFechaCreacion());
        return tiempoA.getTime() - tiempoB.getTime();
    }

    // Método 100% Puro: Recibe el orden explícitamente
    private compararPorDificultad(a: Tarea, b: Tarea, orden: string[]): number {
        const indexA = orden.indexOf(a.getDificultad().toLowerCase());
        const indexB = orden.indexOf(b.getDificultad().toLowerCase());
        return indexA - indexB;
    }

    // =========================================================
    // MÉTODOS PÚBLICOS
    // =========================================================

    public porTitulo(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorTitulo(a, b));
    }

    public porFechaVencimiento(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorFechaVencimiento(a, b));
    }

    public porFechaCreacion(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorFechaCreacion(a, b));
    }

    // Aquí limpiamos la variable redundante
    public porDificultad(tareas: Tarea[], orden: string[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorDificultad(a, b,orden )
        );
    }
}













// No borrar 

/* 

(a, b) => this.compararPorDificultad(a, b, orden)

¡Exacto! Esa línea es una obra maestra de eficiencia. 🎯

Esa simple flecha => está haciendo dos trabajos vitales al mismo tiempo. Es como una "Navaja Suiza".

Aquí te resumo los dos problemas que soluciona en una sola línea:

1. Funciona como un "Adaptador de Enchufe" (Argumentos) 🔌
El método .sort() es rígido: solo sabe entregar dos cosas (a y b). Pero tú necesitas tres (a, b y orden).

Sin la flecha: El .sort() intentaría meter 2 cables en un enchufe de 3 agujeros. Error.

Con la flecha: La función flecha recibe los 2 cables (a, b) y agrega el tercero (orden) que tenía guardado en el bolsillo (gracias al Closure).

2. Funciona como un "Ancla" (Contexto this) ⚓
Aunque tu método privado ya no use this por dentro (porque es puro), necesitas this para encontrar el método privado dentro de la clase.

Sin la flecha: Si pasas la función suelta, JavaScript olvida en qué objeto vive. Intenta llamar a compararPorDificultad en el aire y falla.

Con la flecha: La flecha mantiene el código "anclado" a la instancia de la clase. Permite ejecutar this.compararPorDificultad(...) sin que el programa diga "¿Quién es this?".*/