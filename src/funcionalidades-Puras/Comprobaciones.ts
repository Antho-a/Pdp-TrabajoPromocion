function rangoNumero(value: string, min: number, max: number, vacio: boolean ): string {

    if (vacio && value == "") {
        return "1";
    }

    else if (isNaN(Number(value)) || Number(value) < min || Number(value) > max) {
        return "-1";
    }

    return value;
    
}


function preguntaYN(value: string): string {

    if (value.toLowerCase() === 'y') {
        return "1";
    } else if (value.toLowerCase() === 'n') {
        return "0";
    }

    return "-1";
}


export { rangoNumero , preguntaYN };