
import * as XLSX from 'xlsx'

const head = {
    0: "Accesorios",
    1: "Sistema Hidraulico",
    2: "Sistema Electrico",
    3: "Chasis Estructura",
    4: "Pruebas de Operacion",
}

export default function excelExport(acta) {



    var new_workbook = XLSX.utils.book_new();


    const breakPoints = {
        0: 15,
        1: 8,
        2: 9,
        3: 9,
        4: 12,
    }


    for (var i = 0; i < 5; i++) {
        const data = dataSheet(acta, i);


        var worksheet = XLSX.utils.aoa_to_sheet(data[0]);
        const merge = [];

        for (let j = 0; j < 15; j++) {
            if (j >= breakPoints[i]) {
                break;
            }

            merge.push({ s: { r: j, c: 0 }, e: { r: j, c: 2 } },);
            if (i == 0 && [6, 7, 8, 9, 10, 11].includes(j)) {
                merge.push({ s: { r: j, c: 3 }, e: { r: j, c: 4 } },);
            }


        }

        worksheet["!merges"] = merge;
        XLSX.utils.book_append_sheet(new_workbook, worksheet, head[i]);
    }

    XLSX.writeFile(new_workbook, "acta_"+acta.idInspeccion+".xlsx");

}

function stringToTicket(estado) {
    if (estado == 'bueno') {
        return [, , , "✓", ,];

    }
    if (estado == 'regular') {
        return [, , , , "✓",];

    } if (estado == 'malo') {
        return [, , , , , "✓"];
    }
    return "";
}

function stringToTicketSpecialCamp(estado) {
    if (estado == 'bueno') {
        return [, , "✓", ,];

    }
    if (estado == 'regular') {
        return [, , , "✓",];

    } if (estado == 'malo') {
        return [, , , , "✓"];
    }
    return "";
}
function concatSpecialCamp(acta) {

}
function dataSheet(acta, rowIndex) {
    const topArray = [, , , , , , "Bueno", "Regular", "Malo"];
    const data = [];
    if (acta.tipo == "acta_equipo") {
        if (rowIndex == 0) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Alarma de retroceso", , ,].concat(stringToTicket(acta.alarmaRetroceso)),
                ["Asiento operador", , ,].concat(stringToTicket(acta.asientoOperador)),
                ["Baliza", , ,].concat(stringToTicket(acta.baliza)),
                ["Bocina", , ,].concat(stringToTicket(acta.bocina)),
                ["Extintor", , ,].concat(stringToTicket(acta.extintor)),
                ["Espejos", , ,].concat(["Cantidad:  " + acta.cantidadEspejos]).concat(stringToTicketSpecialCamp(acta.espejos)),
                ["Focos faeneros delanteros", , ,].concat(["Cantidad:  " + acta.cantidadFocosFaenerosDelanteros]).concat(stringToTicketSpecialCamp(acta.focosFaenerosDelanteros)),
                ["Focos faeneros traseros", , ,].concat(["Cantidad:  " + acta.cantidadFocosFaenerosTraseros]).concat(stringToTicketSpecialCamp(acta.focosFaenerosTraseros)),
                ["LLave de contacto", , ,].concat(["Cantidad:  " + acta.cantidadLlaveContacto]).concat(stringToTicketSpecialCamp(acta.llaveContacto)),
                ["Intermitentes delanteros", , ,].concat(["Cantidad:  " + acta.cantidadIntermitentesDelanteros]).concat(stringToTicketSpecialCamp(acta.intermitentesDelanteros)),
                ["Intermitentes traseros", , ,].concat(["Cantidad:  " + acta.cantidadIntermitentesTraseros]).concat(stringToTicketSpecialCamp(acta.intermitentesTraseros)),
                ["Palanca freno mano", , ,].concat(stringToTicket(acta.palancaFrenoMano)),
                ["Pera de volante", , ,].concat(stringToTicket(acta.peraVolante)),
                ["Arnes de cilindro de gas", , ,].
                    concat(["Cilindro de gas: " + acta.cilindroDeGas == 1 ? "SI" : "NO"]).


                    concat(stringToTicketSpecialCamp(acta.arnesCilindroGas)),
                ["Tablero instrumentos", , ,].concat(stringToTicket(acta.tableroIntrumentos))]);
        }
        if (rowIndex == 1) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Cilindro desplazador", , ,].concat(stringToTicket(
                    acta.cilindroDesplazador)), [
                        "Cilindro direccion", , ,].concat(stringToTicket(
                            acta.cilindroDireccion)), [
                                "Cilindro levante central", , ,].concat(stringToTicket(
                                    acta.cilindroLevanteCentral)), [
                                        "Cilindro inclinacion", , ,].concat(stringToTicket(
                                            acta.cilindroInclinacion)), [
                                                "Cilindro levante laterales", , ,].concat(stringToTicket(
                                                    acta.cilindroLevanteLateral)), [
                                                        "Flexibles hidraulicas", , ,].concat(stringToTicket(
                                                            acta.flexibleHidraulico)), [
                                                                "Fuga por conectores y mangueras", , ,].concat(stringToTicket(
                                                                    acta.fugaConectores))]);
        }
        if (rowIndex == 2) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Altenador", , ,].concat(stringToTicket(acta.altenador)),
                ["Bateria", , ,].concat(stringToTicket(acta.bateria)),
                ["Chapa de contacto", , ,].concat(stringToTicket(acta.chapaContacto)),
                ["Sistema electrico", , ,].concat(stringToTicket(acta.sistemaElectrico)),
                ["Horometro", , ,].concat(stringToTicket(acta.horometro)),
                ["Palanca comandos", , ,].concat(stringToTicket(acta.palancaComandos)),
                ["Switch de luces", , ,].concat(stringToTicket(acta.switchLuces)),
                ["Switch de marchas", , ,].concat(stringToTicket(acta.switchMarchas)),
            ]);
        }
        if (rowIndex == 3) {
            data.push([[
                [head[rowIndex]],
                topArray,
                "Cadenas", , ,].concat(stringToTicket(acta.cadena)), [
                    "Carro y su respaldo de carga", , ,].concat(["Respaldo de carga: " + (acta.carga == 1 ? "SI" : "NO")]).

                    concat(stringToTicketSpecialCamp(
                        acta.carro)), [
                            "Horquillas y seguros", , ,].concat(stringToTicket(
                                acta.horquilla)), [
                                    "Jaula de proteccion", , ,].concat(stringToTicket(acta.jaula)), [
                                        "LLantas", , ,].concat(stringToTicket(acta.llantas)), [
                                            "Mastil", , ,].concat(stringToTicket(acta.mastil)), [
                                                "Pintura", , ,].concat(stringToTicket(acta.pintura)), [
                                                    "Ruedas", , ,].concat(["Cantidad:  " + acta.cantidadRueda]).concat(stringToTicketSpecialCamp(acta.rueda))
            ])
        }
        if (rowIndex == 4) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Desplazador lateral", , ,].concat(stringToTicket(
                    acta.desplazadorLateral)),
                ["Direccion", , ,].concat(stringToTicket(acta.direccion)), [
                    "Freno mano", , ,].concat(stringToTicket(acta.frenoMano)), [
                        "Freno pie", , ,].concat(stringToTicket(acta.frenoPie)), [
                            "Inclinacion", , ,].concat(stringToTicket(acta.inclinacion)), [
                                "Levante", , ,].concat(stringToTicket(acta.levante)), [
                                    "Motor", , ,].concat(stringToTicket(acta.motor)), [
                                        "Nivel aceite hidraulico", , ,].concat(stringToTicket(
                                            acta.nivelAceiteHidraulico)), [
                                                "Nivel aceite motor", , ,].concat(stringToTicket(
                                                    acta.nivelAceiteMotor)), [
                                                        "Nivel aceite transmision", , ,].concat(stringToTicket(
                                                            acta.nivelAceiteTransmision)), [
                                                                "Nivel liquido de freno", , ,].concat(stringToTicket(
                                                                    acta.nivelLiquinoFreno)), [
                                                                        "Tapa combustible", , ,].concat(stringToTicket(
                                                                            acta.tapaCombustible)), [
                                                                                "Tapa radiador", , ,].concat(stringToTicket(acta.tapaRadiador)), [
                                                                                    "Transmision", , ,].concat(stringToTicket(acta.transmision))])
        }
    } else {
        if (rowIndex == 0) {
            data.push([
                [head[rowIndex]],
                topArray,
                ['Alarma retroceso', , ,].concat(stringToTicket(
                    acta.alarmaRetroceso)),
                ['Asiento operdor', , ,].concat(stringToTicket(acta.asientoOperador)),
                ['Baliza', , ,].concat(stringToTicket(acta.baliza)), [
                    'Bocina', , ,].concat(stringToTicket(acta.bocina)), [
                        'Extintor', , ,].concat(stringToTicket(acta.extintor)),
                ["Espejos", , ,].concat(["Cantidad:  " + acta.cantidadEspejos]).concat(stringToTicketSpecialCamp(acta.espejos)),
                ["Focos faeneros delanteros", , ,].concat(["Cantidad:  " + acta.cantidadFocosFaenerosDelanteros]).concat(stringToTicketSpecialCamp(acta.focosFaenerosDelanteros)),
                ["Focos faeneros traseros", , ,].concat(["Cantidad:  " + acta.cantidadFocosFaenerosTraseros]).concat(stringToTicketSpecialCamp(acta.focosFaenerosTraseros)),
                ["LLave de contacto", , ,].concat(["Cantidad:  " + acta.cantidadLlaveContacto]).concat(stringToTicketSpecialCamp(acta.llaveContacto)),
                ["Intermitentes delanteros", , ,].concat(["Cantidad:  " + acta.cantidadIntermitentesDelanteros]).concat(stringToTicketSpecialCamp(acta.intermitentesDelanteros)),
                ["Intermitentes traseros", , ,].concat(["Cantidad:  " + acta.cantidadIntermitentesTraseros]).concat(stringToTicketSpecialCamp(acta.intermitentesTraseros)),
                ["Palanca freno mano", , ,].concat(stringToTicket(
                    acta.palancaFrenoMano)), [
                        "Pera de volante", , ,].concat(stringToTicket(acta.peraVolante)), [

                            "Tablero instrumentos", , ,].concat(stringToTicket(
                                acta.tableroIntrumentos))



            ]);
        }
        if (rowIndex == 1) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Cilindro desplazador", , ,].concat(stringToTicket(
                    acta.cilindroDesplazador)), [
                        "Cilindro direccion cadena", , ,].concat(stringToTicket(
                            acta.cilindroDireccion)), [
                                "Cilindro levante central", , ,].concat(stringToTicket(
                                    acta.cilindroLevanteCentral)), [
                                        "Cilindro inclinacion", , ,].concat(stringToTicket(
                                            acta.cilindroInclinacion)), [
                                                "Cilindro levante laterales", , ,].concat(stringToTicket(
                                                    acta.cilindroLevanteLateral)), [
                                                        "Flexibles hidraulicas", , ,].concat(stringToTicket(
                                                            acta.flexibleHidraulico)), [
                                                                "Fuga por conectores y mangueras", , ,].concat(stringToTicket(
                                                                    acta.fugaConectores))]);

        }
        if (rowIndex == 2) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Bateria", , ,].concat(["Observaciones: " + acta.bateriaObservaciones]).
                    concat(stringToTicketSpecialCamp(acta.bateria))
                , [
                    "Chapa de contacto", , ,].concat(stringToTicket(
                        acta.chapaContacto)), [
                            "Sistema electrico", , ,].concat(stringToTicket(
                                acta.sistemaElectrico)), [
                                    "Horometro", , ,].concat(stringToTicket(acta.horometro)), [

                                        "Palanca comandos", , ,].concat(stringToTicket(
                                            acta.palancaComando)), [
                                                "Switch de luces", , ,].concat(stringToTicket(acta.switchLuces)), [
                                                    "Switch de marchas", , ,].concat(stringToTicket(
                                                        acta.switchMarcha)), [
                                                            "Joystick", , ,].concat(stringToTicket(acta.joystick))]);
        }
        if (rowIndex == 3) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Cadenas", , ,].concat(stringToTicket(acta.cadena)), 
                ["Carro y su respaldo de carga", , ,].concat(["Respaldo de carga: " + (acta.carga == 1 ? "Si" : "NO")]).
                    concat(stringToTicketSpecialCamp(
                        acta.carro)),
                [
                    "Horquillas y seguros", , ,].concat(stringToTicket(
                        acta.horquilla)), [
                            "Jaula de proteccion", , ,].concat(stringToTicket(acta.jaula)), [
                                "LLantas", , ,].concat(stringToTicket(acta.llantas)), [
                                    "Mastil", , ,].concat(stringToTicket(acta.mastil)), [
                                        "Pintura", , ,].concat(stringToTicket(acta.pintura)),
                ["Ruedas", , ,].concat(["Cantidad:  " + acta.cantidadRueda]).concat(stringToTicketSpecialCamp(acta.rueda))]);
        }
        if (rowIndex == 4) {
            data.push([
                [head[rowIndex]],
                topArray,
                ["Desplazador lateral", , ,].concat(stringToTicket(
                    acta.desplazadorLateral)), [
                        "Direccion", , ,].concat(stringToTicket(acta.direccion)), [
                            "Freno mano", , ,].concat(stringToTicket(acta.frenoMano)), [
                                "Freno pie", , ,].concat(stringToTicket(acta.frenoPie)), [
                                    "Inclinacion", , ,].concat(stringToTicket(acta.inclinacion)), [
                                        "Levante", , ,].concat(stringToTicket(acta.levante)), [

                                            "Nivel aceite hidraulico", , ,].concat(stringToTicket(
                                                acta.nivelAceiteHidraulico)), [
                                                    "Serie cargador", , ,].
                                                    concat(["Serie: " + acta.serieCargardorText]).
                                                    concat(stringToTicketSpecialCamp(acta.serieCargador)),
                [
                    "Nivel liquido de freno", , ,].concat(stringToTicket(
                        acta.nivelLiquinoFreno)), [
                            "Cargador voltaje y amperaje", , ,].
                            concat(["Voltaje: " + acta.cargadorVoltajeInfo + "V"]).
                            concat(stringToTicketSpecialCamp(
                                acta.cargadorVoltaje)), [
                                    "Enchufes", , ,].concat(["Tipo enchufe: " +
                                        acta.enchufeInfo.split("-")[0] + "V " + "polo " + acta.enchufeInfo.split("-")[1]])  .concat(stringToTicketSpecialCamp(
                                            acta.enchufe))]);

        }

    }
    return data;

}


