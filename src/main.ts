import { gestor } from "./logica/Gestor";


function main():void{
    const gestorTareas = new gestor("tareas");
    console.log(gestorTareas.items);

}

main();