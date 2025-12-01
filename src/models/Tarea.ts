import { v4 as uuid } from 'uuid';

// Constantes globales que definen los valores permitidos para el estado y dificultad
export const ESTADOS_TAREA : string[] = ['Pendiente', 'En curso', 'Terminada' , "Cancelada"];
export const DIFICULTADES_TAREA : string[] = ['Baja: ⭐', 'Media: ⭐⭐', 'Alta: ⭐⭐⭐'];

/**
 * Clase principal que representa una Tarea dentro del sistema.
 * Contiene toda la información de estado, tiempos y validaciones.
 */
export class Tarea {

    // Identificador único generado automáticamente (UUID)
    private  id : string;
    private titulo: string;
    private descripcion: string;
    private estado: string;
    private dificultad: string;
    // Fechas de control para auditoría y ordenamiento
    private fechaCreacion: Date; 
    private fechaVencimiento?: Date;
    private ultimaEdicion?: Date;
    // Bandera lógica para "borrado suave" (soft delete)
    private eliminado: boolean;

    /**
     * Constructor de la clase Tarea.
     * Inicializa una nueva tarea con valores por defecto si no son provistos.
     * @param titulo - Título de la tarea.
     * @param descripcion - Descripción detallada.
     * @param estado - Estado inicial (por defecto: Pendiente).
     * @param dificultad - Nivel de dificultad (por defecto: Baja).
     * @param fechaVencimiento - Fecha límite opcional.
     */
    public constructor(titulo: string, descripcion: string, estado: string ,dificultad : string , fechaVencimiento?: Date ){

        this.id = uuid(); // Genera un ID único al instanciar
        this.titulo = titulo;
        this.descripcion = descripcion;
        // Asignación con fallback: si viene vacío, usa el primer elemento de los arrays de constantes
        this.estado = estado || ESTADOS_TAREA[0];
        this.dificultad = dificultad || DIFICULTADES_TAREA[0];
        this.fechaCreacion = new Date(); // Marca de tiempo actual
        this.fechaVencimiento = fechaVencimiento || undefined;
        this.eliminado = false;
    }

    // --- GETTERS (Accesores de lectura) ---

    public getId(): string {
        return this.id;
    }
    
    public getTitulo(): string {
        return this.titulo;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getEstado(): string {
        return this.estado;
    }

    public getDificultad(): string {
        return this.dificultad;
    }

    public getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

    public getFechaVencimiento(): Date | undefined {
        return this.fechaVencimiento;
    }

    public getUltimaEdicion(): Date | undefined {
        return this.ultimaEdicion;
    }
    
    public getEliminado(): boolean {
        return this.eliminado;
    }
  

    // --- SETTERS (Accesores de escritura) ---
    // Nota: La mayoría de los setters actualizan automáticamente la fecha de 'ultimaEdicion'

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
        this.ultimaEdicion = new Date();
    }

    public setEstado(estado: string): void {
        this.estado = estado;
        this.ultimaEdicion = new Date();
    }

    public setDificultad(dificultad: string): void {
        this.dificultad = dificultad;
        this.ultimaEdicion = new Date();
    }

    public setFechaVencimiento(fechaVencimiento: Date): void {
        this.fechaVencimiento = fechaVencimiento;
        this.ultimaEdicion = new Date();
    }

    // Alterna el estado de eliminado (Soft Delete)
    public setElimado(){
        this.eliminado = !this.eliminado;
        this.ultimaEdicion = new Date();
    }

    // Actualiza el título
    public setTitulo (tituloNuevo:string){
        this.titulo = tituloNuevo;
        // Nota: Aquí falta this.ultimaEdicion = new Date() en tu lógica original,
        // pero se suele llamar a setEdicion() externamente en el gestor.
    }

    // Método auxiliar para forzar la actualización de la fecha de edición
    public setEdicion (){
        this.ultimaEdicion = new Date();
    }

    /**
     * Devuelve una representación en texto plano de la tarea.
     * Útil para depuración o visualización rápida en consola.
     */
    public toString(): string {
        return `Tarea \nID=${this.id}\n Título=${this.titulo}\n Descripción=${this.descripcion}\n Estado=${this.estado}\n Dificultad=${this.dificultad}\n Fecha de Creación=${this.fechaCreacion.toLocaleString()}\n Fecha de Vencimiento=${this.fechaVencimiento ? this.fechaVencimiento.toLocaleString() : 'No establecida'}\n Última Edición=${this.ultimaEdicion ? this.ultimaEdicion.toLocaleString() : 'No editada'}\n Eliminado=${this.eliminado}]`;
    }
    
    /**
     * Método estático para reconstruir una instancia de Tarea a partir de un objeto JSON plano.
     * Esencial para leer datos guardados en archivos de texto/JSON y recuperar los métodos de la clase.
     * @param obj - Objeto genérico o interfaz parcial de Tarea.
     * @returns Una instancia completa de la clase Tarea.
     */
    public static fromJSON(obj: any | Tarea ): Tarea {

        // Validar campos obligatorios para asegurar integridad de datos
        if (obj.id === undefined ) throw new Error("Falta 'id' en el JSON.");
        if (obj.titulo === undefined) throw new Error("Falta 'titulo' en el JSON.");
        if (obj.descripcion === undefined) throw new Error("Falta 'descripcion' en el JSON.");
        if (obj.estado === undefined) throw new Error("Falta 'estado' en el JSON.");
        if (obj.dificultad === undefined) throw new Error("Falta 'dificultad' en el JSON.");
        if (obj.fechaCreacion === undefined) throw new Error("Falta 'fechaCreacion' en el JSON.");
        if (obj.eliminado === undefined) throw new Error("Falta 'eliminado' en el JSON.");

        // Crear la tarea utilizando el constructor para inicializar la lógica base
        const tarea = new Tarea(
            obj.titulo,
            obj.descripcion,
            obj.estado,
            obj.dificultad,
            obj.fechaVencimiento ? new Date(obj.fechaVencimiento) : undefined
        );

        // Restaurar atributos específicos que el constructor generaría nuevos si no los forzamos
        // (Por ejemplo, el ID y la Fecha de Creación originales del JSON, no los nuevos)
        tarea.id = obj.id;
        tarea.fechaCreacion = new Date(obj.fechaCreacion);
        tarea.ultimaEdicion = obj.ultimaEdicion ? new Date(obj.ultimaEdicion) : undefined;
        tarea.eliminado = obj.eliminado;

        return tarea;
    }
}