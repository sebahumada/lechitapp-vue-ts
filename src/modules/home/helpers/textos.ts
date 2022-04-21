export const diferenciaMamaderas = (dif:number):string=>{

    if(dif === 0) return 'Mismas mamaderas que ayer';

    else if(dif === 1) return '1 mamadera más que ayer';
    else if(dif === -1) return '1 mamadera menos que ayer';

    else if(dif > 1) return `${dif} mamaderas más que ayer`;
    else if(dif < -1) return `${dif*-1} mamaderas menos que ayer`;

    else return '';

}

export const diferenciaMl = (dif:number):string=>{

    if(dif === 0) return 'Sin diferencia';    
    else if(dif > 0) return `${dif} ml. más que ayer`;
    else if(dif < 0) return `${dif*-1} ml. menos que ayer`;

    else return '';

}