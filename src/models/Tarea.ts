import { v4 as uuid } from 'uuid';

export const ESTADOS_TAREA : string[] = ['Pendiente', 'En curso', 'Terminada' , "Cancelada"];
export const DIFICULTADES_TAREA : string[] = ['Baja: ⭐', 'Media: ⭐⭐ ', 'Alta: ⭐⭐⭐'];

export class Tarea {


    private  id : string;
    private titulo: string;
    private descripcion: string;
    private estado: string;
    private dificultad: string;
    private fechaCreacion: Date; 
    private fechaVencimiento?: Date;
    private ultimaEdicion?: Date;
    private eliminado: boolean;


    public constructor(titulo: string, descripcion: string, estado: string ,dificultad : string , fechaVencimiento?: Date ){

        this.id = uuid();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.dificultad = dificultad;
        this.fechaCreacion = new Date();
        this.fechaVencimiento = fechaVencimiento;
        this.eliminado = false;
    }

    // Getters

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
  

    // Setters
    

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

    public setEliminado(eliminado: boolean): void {
        this.eliminado = eliminado;
        this.ultimaEdicion = new Date();
    }

    public setElim(){
        this.eliminado = !this.eliminado;
    }

    
    // explicacion https://chatgpt.com/share/692aafab-d70c-8001-ba3b-c56c86831afc
    public static fromJSON(obj: any | Tarea ): Tarea {

        // Validar campos obligatorios
        if (obj.id === undefined ) throw new Error("Falta 'id' en el JSON.");
        if (obj.titulo === undefined) throw new Error("Falta 'titulo' en el JSON.");
        if (obj.descripcion === undefined) throw new Error("Falta 'descripcion' en el JSON.");
        if (obj.estado === undefined) throw new Error("Falta 'estado' en el JSON.");
        if (obj.dificultad === undefined) throw new Error("Falta 'dificultad' en el JSON.");
        if (obj.fechaCreacion === undefined) throw new Error("Falta 'fechaCreacion' en el JSON.");
        if (obj.eliminado === undefined) throw new Error("Falta 'eliminado' en el JSON.");

        // Crear la tarea con los datos base
        const tarea = new Tarea(
            obj.titulo,
            obj.descripcion,
            obj.estado,
            obj.dificultad,
            obj.fechaVencimiento ? new Date(obj.fechaVencimiento) : undefined
        );

        // Restaurar atributos que el constructor no recrea
        tarea.id = obj.id;
        tarea.fechaCreacion = new Date(obj.fechaCreacion);
        tarea.ultimaEdicion = obj.ultimaEdicion ? new Date(obj.ultimaEdicion) : undefined;
        tarea.eliminado = obj.eliminado;

        return tarea;
    }



}
