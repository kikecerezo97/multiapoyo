import {ChangeEvent} from "react";

export type InputChange = ChangeEvent <HTMLInputElement>


export const loadPaginationList =  (totalPages: number, currentPage: number)=> {
    let auxPaginacion: number[] = [];
    //   console.log('current page: ' +  currentPage)

    // mostar de 5 en 5
    const nShow = 5
    // vamos a calcular los multiplos para obtener las
    // secciones
    const residuo = currentPage% nShow;
    if (residuo==0){ // si el que seleccione es multiplo de 5
        for (let i = currentPage- nShow; i< currentPage; i++){
            auxPaginacion.push(i+1);
        }
    }else {// si no entonces calcular la paginación sin pasarse del numero total de pages
        let nSeccion = Math.trunc(currentPage/ nShow);
        //    console.log('nSeccion: ' +  nSeccion)
        for (let i=(nSeccion*nShow) ; i<(nSeccion+1)*nShow; i++){
            let page = i+1
            if (page<=totalPages){
                auxPaginacion.push(page)
            }
        }
    }




    return auxPaginacion;


};