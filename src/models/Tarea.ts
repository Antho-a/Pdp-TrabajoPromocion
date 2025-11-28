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

    public getEliminado(): boolean {
        return this.eliminado;
    }

    public setEliminado(eliminado: boolean): void {
        this.eliminado = eliminado;
        this.ultimaEdicion = new Date();
    }

    public setElim(){
        this.eliminado = !this.eliminado;
    }
}
