import dayjs from "dayjs";

export const getDiferenciaFecha = (fechaProxima:string):number=>{

    

    try {

        if(!fechaProxima)
        return 150;

        const fechaSplit = fechaProxima.split(' ');
        const [dia, hora] = fechaSplit;
        const separaDia = dia.split('-');
        const[dd,mm,aa] = separaDia;
        const separaHora = hora.split(':');
        const [hh, mi] = separaHora;
        const fechaProximaDate = new Date(Number(aa),Number(mm)-1,Number(dd),Number(hh),Number(mi),0,0);
        const fechaProx = dayjs(fechaProximaDate);
                        
        const ahora = dayjs();

        const diferencia = fechaProx.diff(ahora,'minutes');
        
        return diferencia;
    } catch (error) {
        return 150;
    }       

}


export const getDiferenciaFechaSec = (fechaProxima:string):number=>{

    

    try {

        if(!fechaProxima)
        return 150;

        const fechaSplit = fechaProxima.split(' ');
        const [dia, hora] = fechaSplit;
        const separaDia = dia.split('-');
        const[dd,mm,aa] = separaDia;
        const separaHora = hora.split(':');
        const [hh, mi] = separaHora;
        const fechaProximaDate = new Date(Number(aa),Number(mm)-1,Number(dd),Number(hh),Number(mi),0,0);
        const fechaProx = dayjs(fechaProximaDate);
                        
        const ahora = dayjs();

        const diferencia = fechaProx.diff(ahora,'seconds');
        
        return diferencia;
    } catch (error) {
        return 150;
    }       

}

export const convertMinsToHrsMins = (mins:number, segs:number):string => {

    try {        

        if(isNaN(mins)){
            return '';
        }

        const h = Math.floor(mins / 60);
        const m = Math.round(mins % 60);

        let msgH = '';
        let msgM = '';

        if(h===0){
            msgH = ''
        } else if(h===1){
            msgH = `${h} hora`
        } else {
            msgH = `${h} horas`
        }

        if(m===0){
            msgM = ''
        } else if(m===1){
            msgM = `1 minuto`
        } else {
            msgM = `${m} minutos`
        }

        let msg = '';

        if(msgH && msgM){
            msg = `${msgH} y ${msgM}`;
        } else if(msgH && !msgM){
            msg = msgH;
        } else if(!msgH && msgM){
            msg = msgM;
        } else if(!msgH && !msgM){
            if(segs <= 0){
                msg ='este momento!!!'
            } else {
                msg = `${segs} seg.`
            }
        }

        

        return msg;

    } catch (error) {
        return ''
    }


    
  }