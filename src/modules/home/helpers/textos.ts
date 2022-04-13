export const diferenciaMamaderas = (dif:number):string=>{

    if(dif === 0) return 'Mismas mamaderas que ayer';

    else if(dif === 1) return '1 mamadera más que ayer';
    else if(dif === -1) return '1 mamadera menos que ayer';

    else if(dif > 1) return `${dif} mamaderas más que ayer`;
    else if(dif < -1) return `${dif} mamaderas menos que ayer`;

    else return '';

}