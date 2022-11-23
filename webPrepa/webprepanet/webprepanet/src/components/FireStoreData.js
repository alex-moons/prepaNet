import React from "react";
import { useGetDataAlumno, useGetDataDoc, useGetDataGrupoTaller, useGetDataInscripcion, useGetDataTaller } from "../hooks/useGetData";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Container, Row, Col, Link, Dropdown, Form, Table } from 'react-bootstrap';
import { UpdateEstatus } from "./Update";
import { AddValueInscripcion } from "./Add";
import "../InfoTaller.css";
import "../TablaAlumnosAdmin.css";
import firebase from "firebase/compat/app";

async function getDoc(docu) {


    const db = firebase.firestore();
    let arr = [];
    const docum = db.collection(docu.parent.id).doc(docu.id)
    const documen = await docum.get().then(
        (doc) => {
            if (doc.exists) {
                //   console.log("existo", doc.data());
                arr.push({ id: doc.id, value: doc.data() });
                return arr;

            } else {
                console.log("no existo")
            }
        }
    );
    return arr;
}

// Estos metodos ense�an datos
export const FireStoreDataAlumno = () => {

    // los documentos son del metodo useGetData
    const [documents] = useGetDataAlumno();


    return (
        <div>
            <span>Values</span>
            {/*se corre lo de adentro por cada elemento dentro de documents*/}
            {documents.map((documents) => (
                <div key={documents.id}> {/*key es importante para identificar cada iteracion*/}
                    <div>
                        Document: {documents.id} Value: {documents.value.nombre}
                    </div>
                </div>
            ))}
        </div>
    );
};

// construir la tabla de los alumnos de TableAlumnosAdmin.js
export const FireStoreTablaAlumnosInfo = () => {

    // cada uno de estos tiene todas las colecciones de cada uno
    const [sortedField, setSortedField] = React.useState(null);
    const [alumnos] = useGetDataAlumno();
    const [inscripciones] = useGetDataInscripcion();
    const [grupos] = useGetDataGrupoTaller();
    const [talleres] = useGetDataTaller();
    let tabla = [];
    let fila = [];
    let curr = 0;
    let cont = 0;

    for (let i = 0; i < inscripciones.length; i++) {
        InfoAlumnoTabla(inscripciones[i].value.alumno_idStr)

        InfoGrupoTabla(inscripciones[i].value.grupo_idStr, inscripciones[i])
    }

    if (sortedField !== null) {

    tabla.sort(sortMatri);
    }

    function sortMatri(a, b) {
        if (sortedField == 3) {
            return (a[sortedField] < b[sortedField]) ? -1 : 1;
        }
        else if (sortedField < 6 || sortedField > 7) {
            return (a[sortedField].toLowerCase() < b[sortedField].toLowerCase()) ? -1 : 1;

        }
        else if (sortedField < 8) {
            return (a[sortedField] < b[sortedField]) ? -1 : 1;
        }
    }

    // firebase principal

    function InfoAlumnoTabla(alumnoId) {


        // console.log(document);
        for (let i = 0; i < alumnos.length; i++) {
            if (alumnos[i].id == alumnoId) {
                fila.push(alumnos[i].value.matricula);
                fila.push(alumnos[i].value.nombre);
                fila.push(alumnos[i].value.campus);
                fila.push(alumnos[i].value.tetramestre);
                fila.push(alumnos[i].value.periodo_de_ingreso);
                fila.length = 5;

            }
        }

    }

    function InfoGrupoTabla(grupoId, inscripcion) {

        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function formatDate(date) {
            return [
                padTo2Digits(date.getDate()),
                padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join('/');
        }

        for (let i = 0; i < grupos.length; i++) {
            if (grupos[i].id == grupoId) {
                let fechaInicio = grupos[i].value.fecha_inicio.toDate()
                let fechaFin = grupos[i].value.fecha_fin.toDate()
                for (let j = 0; j < talleres.length; j++) {

                    if (talleres[j].id == grupos[i].value.taller_idStr) {
                        fila.push(formatDate(fechaInicio) + " - " + formatDate(fechaFin));
                        fila.push(talleres[j].value.id);
                        fila.push(grupos[i].value.numero_grupo);
                        fila.push(inscripcion.value.taller_aprobado ? 'Verdadero' : 'Falso')
                        fila.push(inscripcion.value.estatus)
                        fila.push(inscripcion)
                        let aux = [...fila]
                        if (aux.length == 11) {
                            tabla.push(aux)
                        }
                        console.log(tabla)
                        fila.length = 0;


                    }

                }
            }
        }


    }


    return (
        <div className="bg-tablas">
            <Container>
                <Row className="tabla-row">
                    <Col>
                        <h1 className="tabla-titulo">Alumnos</h1>
                    </Col>
                    <Col className="tabla-filter">
                        <Form className="tabla-buscar">
                            <Form.Control type="email" placeholder="Buscar" />
                        </Form>
                    </Col>
                   
                </Row>
                <Row className="tabla-datos">
                    <Table responsive striped bordered hover variant="light" style={{ overflow: "auto" }}>
                        <thead>
                            <tr>
                                <th>
                                    <button type="button" onClick={() => setSortedField(0)}>
                                        Matricula
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(1)}>
                                        Alumno
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(2)}>
                                        Campus
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(3)}>
                                        Tetramestre
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(4)}>
                                        Periodo
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(5)}>
                                        Fechas
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(6)}>
                                        Taller Inscrito
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(7)}>
                                        Grupo
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(8)}>
                                        Taller Aprobado
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => setSortedField(9)}>
                                        Estatus
                                    </button>
                                </th>

                                <th>Actualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla.map((tabla, ind) => (
                                <React.Fragment key={inscripciones.id}>
                                    <tr>
                                        <td>{tabla[0]}</td>
                                        <td>{tabla[1]}</td>
                                        <td>{tabla[2]}</td>
                                        <td>{tabla[3]}</td>
                                        <td>{tabla[4]}</td>
                                        <td>{tabla[5]}</td>
                                        <td>{tabla[6]}</td>
                                        <td>{tabla[7]}</td>
                                        <td>{tabla[8]}</td>
                                        {/* <InfoAlumno myId={inscripciones.value.alumno_idStr} index={ind} />
                                        <InfoGrupo myId={inscripciones.value.grupo_idStr} myDoc={inscripciones} />
                                        <td>{inscripciones.value.taller_aprobado ? 'Verdadero' : 'Falso'}</td>*/}

                                        <UpdateEstatus doc={tabla[10]} />


                                    </tr>
                                </React.Fragment>

                            ))}
                        </tbody>
                    </Table>
                </Row>

            </Container>
        </ div >

    );


};

// Construir la tabla de los talleres
export const FireStoreDataGrupos = () => {

    // los documentos son del metodo useGetData
    const [grupos] = useGetDataGrupoTaller();
    const [talleres] = useGetDataTaller();
    let idTaller = ''

    let cont = 0;

    function Fecha(props) {

        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function formatDate(date) {
            return [
                padTo2Digits(date.getDate()),
                padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join('/');
        }

        let tallerId = props.myID;
        let tallerIdgrupo = props.myIDgrupo
        let ind = props.index


        if (tallerId == tallerIdgrupo) {
            cont = cont + 1;
            return (
                <>
                    <p><b>Grupo: {grupos[ind].value.numero_grupo}</b></p>
                    <p><b>Inicio de inscripciones:</b> {formatDate(grupos[ind].value.inscripcion_inicio.toDate())}</p>
                    <p><b>Fin de inscripciones:</b> {formatDate(grupos[ind].value.inscripcion_fin.toDate())}</p>
                    <p><b>Inicio del curso:</b> {formatDate(grupos[ind].value.fecha_inicio.toDate())}</p>
                    <p><b>Fin del curso:</b> {formatDate(grupos[ind].value.fecha_fin.toDate())}</p>

                </>
            );
        }



    }


    return (
        <>
            {talleres.map((talleres) => (
                <React.Fragment key={talleres.id}>
                    <Row className="taller-row">
                        <Col className="flex">
                            <h2 className="taller-titulo">
                                {talleres.value.nombre}
                            </h2>
                        </Col>

                        <Col>
                            <h2 className="taller-fecha">Fechas</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="taller-texto">
                            {talleres.value.descripcion}
                        </Col>
                        <Col className="taller-texto">
                            {grupos.map((grupos, index) => {
                                return (

                                    <Fecha myID={talleres.id} myIDgrupo={grupos.value.taller_idStr} index={index} />


                                );

                            })}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="center-taller">
                            <Button className="taller-button">Lista</Button>
                        </Col>
                        <Col className="center-taller">
                            <Button className="taller-button">Editar</Button>
                        </Col>
                    </Row>
                </React.Fragment>

            ))}
        </>
    );
};

