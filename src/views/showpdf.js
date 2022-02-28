import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';







pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Row = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content:space-between ;
  border-style: solid;
  border-width:1px;
  padding:5px;
  
`;


const Column = styled.div`
display:flex;
flex-direction: column;
gap:0rem;
  
`;





export default function ShowPdf() {
    const params = useParams();
    const navigate = useNavigate();

    const movList = useSelector((state) => state.movimiento.data);
    const cliente = useSelector((state) => state.cliente.data);
    const actas = useSelector((state) => state.acta.data);

    var url = null;
    var mov = null;
    var nombreCliente = "";
    var idEquipo = "";
    if (movList.length > 0) {
        mov = movList.find(x => x.idMovimiento == params.id);
        if (mov != null) {
            nombreCliente = cliente.find(x => x.rut == mov.rut).nombre;
            idEquipo = actas.find(x => x.idInspeccion == mov.idInspeccion).idEquipo;
            url = mov.urlGuiaDespacho;
           
        }


    }






    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    
    const backFunc = () => {
        navigate(-1);
    }

    const downloadDocument = () =>{
        window.location.href =url;
    };


    return (
        <>

            <div style={{ display: "flex", gap: "1rem" }} >

                <div style={{width:"40%",gap:"0.5rem",display:"flex",flexDirection:"column"}}>
                <Button  onClick={backFunc} 
                
                startIcon={<ArrowBackIcon></ArrowBackIcon>}
                sx={{background:"var(--black)" ,width:150}} variant="contained">Volver</Button>
        


                <Box sx={{ bgcolor: 'white', height: "min-content" }}>
            
                  
                        {mov != null && <>
                          <Column>
                            <Row>
                                <div>idMovimiento</div>
                                <div>{mov.idMovimiento}</div>
                            </Row>
                            <Row>
                                <div>Transporte</div>
                                <div>{mov.transporte}</div>
                            </Row>
                            
                            <Row>
                                <div>Fecha movimiento</div>
                                <div>{mov.fechaMov.split("T")[0]}</div>
                            </Row>
                            <Row>
                                <div>Fecha retiro</div>
                                <div>{mov.fechaRetiro !=null ? mov.fechaRetiro.split("T")[0]:""}</div>
                            </Row>
                            <Row>
                                <div>Tipo:</div>
                                <div>{mov.tipo}</div>
                            </Row>
                            <Row>
                                <div>idEquipo</div>
                                <div>{ idEquipo }</div>
                            </Row>
                            <Row>
                                <div>idInspeccion</div>
                                <div>{mov.idInspeccion}</div>
                            </Row>
                            <Row>
                                <div>Rut</div>
                                <div>{mov.rut}</div>
                            </Row>
                            <Row>
                                <div>Nombre empresa</div>
                                <div>{nombreCliente}</div>
                            </Row>
                            <Row>
                                <div>N° Guia de despacho</div>
                                <div>{mov.idGuiaDespacho}</div>
                            </Row>
                            <Row>
                                <div>Cambio</div>
                                <div>{mov.cambio}</div>
                            </Row>
                        
                            <Row>
                                <div>Observaciones:</div>
                                <div>{mov.observaciones}</div>
                            </Row>
                            </Column>
                            </>
                        }
                   


                </Box>

                </div>

                {url != null &&

                    <div>
                        <div>
                        <div  style={{ display: "flex",justifyContent:"space-between" }} > 
                            <div  style={{ display: "flex",gap:"0.5rem"}}>
                                <Button
                                startIcon={<ArrowBackIcon></ArrowBackIcon>}
                                sx={{background:"var(--black)"}}
                                variant="contained" disabled={pageNumber <= 1} onClick={previousPage}>  Anterior</Button>

                                <Button  sx={{background:"var(--black)"}} 
                                endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                                variant="contained" disabled={pageNumber >= numPages} onClick={nextPage}>  Siguiente</Button>
                            </div>
                            <Button 
                             sx={{background:"var(--black)"}}   
                             onClick={downloadDocument}
                            startIcon={<DownloadIcon></DownloadIcon>} variant="contained">Descargar</Button>
                        </div>
                            <p>
                                Pagina {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
                            </p>

                        </div>

                        <Document
                            file={{
                                url:
                                    url,
                            }}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={(error) => console.log("Inside Error", error)}
                        >
                            <Page pageNumber={pageNumber} />

                        </Document>
                    </div>
                }
            </div>

        </>
    );

};