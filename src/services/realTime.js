import { addEquipo, editEquipo,deleteEquipo } from '../features/inventarioSlice';
import {addInspeccion,editInspeccion,deleteInspeccion} from '../features/actaSlice';
import {addMovimiento,editMovimiento,deleteMov,updateClientRut} from '../features/movimientoSlice';
import {addCliente, editNewCliente, removeCliente,changeRut} from '../features/clienteSlice';
import {addModelo, editModelo, removeModel, removeModelo} from '../features/modeloSlice';

export class EquipoSocketServices {

    constructor(dispatch){
        this.dispatch = dispatch;
    }
    addEquipo = (data) => {
        this.dispatch(addEquipo(data));
    }
    editEquipo = (data) => {
        this.dispatch(editEquipo(data));
    }
    removeEquipo = (id) => {
        this.dispatch(deleteEquipo(id));

    }
  

}

export class ActaSocketServices {

    constructor(dispatch){
        this.dispatch = dispatch;
    }
    addActa = (data) => {
        this.dispatch(addInspeccion(data));
    }
    editActa = (data) => {
        this.dispatch(editInspeccion(data));
    }
    removeActa = (id) => {
        this.dispatch(deleteInspeccion({id:id}));

    }
  

}

export class MovimientoSocketServices {

    constructor(dispatch){
        this.dispatch = dispatch;
    }
    addMovimiento = (data) => {
        this.dispatch(addMovimiento(data));
    }
    editMovimiento = (data) => {
        this.dispatch(editMovimiento(data));
    }
    removeMovimiento = (id) => {
        this.dispatch(deleteMov({idMovimiento:id}));

    }
  

}



export class ClienteSocketServices {

    constructor(dispatch){
        this.dispatch = dispatch;
    }
    add = (data) => {
        this.dispatch(addCliente(data));
    }
    edit = (data) => {
        this.dispatch(editNewCliente(data));
    }
    remove = (rut) => {
        this.dispatch(removeCliente({rut:rut}));

    }
    updateMovAsWell = (data) => {
        this.dispatch(changeRut(data));
        this.dispatch(updateClientRut(data));
    }
  

}


export class ModeloImgSocketServices {

    constructor(dispatch){
        this.dispatch = dispatch;
    }
    add = (data) => {
        this.dispatch(addModelo(data));
    }
    edit = (data) => {
        this.dispatch(editModelo(data));
    }
    remove = (modelo) => {
        this.dispatch(removeModelo({modelo:modelo}));

    }
  

}