
export function showMenu():number{
     
    console.log("\n MENU");
    console.log("1.Eliminar Tarea");
    console.log("2.Ordenar Tareas");
    console.log("3.Obtener estadisticas");
    console.log("4.Consultas");
    console.log("5.Salir");
    const opcion = prompt("Seleccione una opcion: ");
    const opcionNumber = Number(opcion);

    return opcionNumber;

     
}