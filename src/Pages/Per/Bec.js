import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "../Bec/bec.scss";
import { Link } from "react-router-dom";

function ListBe() {
  const baseUrl = "http://localhost:80/api/bec/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    celular: "",
    carrera: "",
    anio: "",
    nom_pad: "",
    nom_mad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("apellido", usuarioSeleccionado.apellido);
    f.append("email", usuarioSeleccionado.email);
    f.append("contrasena", usuarioSeleccionado.contrasena);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("carrera", usuarioSeleccionado.carrera);
    f.append("anio", usuarioSeleccionado.anio);
    f.append("nom_pad", usuarioSeleccionado.nom_pad);
    f.append("nom_mad", usuarioSeleccionado.nom_mad);
    f.append("METHOD", "POST");
    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("apellido", usuarioSeleccionado.apellido);
    f.append("email", usuarioSeleccionado.email);
    f.append("contrasena", usuarioSeleccionado.contrasena);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("carrera", usuarioSeleccionado.carrera);
    f.append("anio", usuarioSeleccionado.anio);
    f.append("nom_pad", usuarioSeleccionado.nom_pad);
    f.append("nom_mad", usuarioSeleccionado.nom_mad);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: usuarioSeleccionado.id } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((Usuario) => {
          if (Usuario.id === usuarioSeleccionado.id) {
            Usuario.nombre = usuarioSeleccionado.nombre;
            Usuario.apellido = usuarioSeleccionado.apellido;
            Usuario.email = usuarioSeleccionado.email;
            Usuario.contrasena = usuarioSeleccionado.contrasena;
            Usuario.celular = usuarioSeleccionado.celular;
            Usuario.carrera = usuarioSeleccionado.carrera;
            Usuario.anio = usuarioSeleccionado.anio;
            Usuario.nom_pad = usuarioSeleccionado.nom_pad;
            Usuario.nom_mad = usuarioSeleccionado.nom_mad;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, f, { params: { id: usuarioSeleccionado.id } })
      .then((response) => {
        setData(
          data.filter((Usuario) => Usuario.id !== usuarioSeleccionado.id)
        );
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Listado Becarios</h2>
        </div>
        <div id="subt">
          <Link
            to={"http://localhost:80/api/PDF/reporte_pdf_becarios.php"}
            target="_blank"
          >
            <Button color="primary" size="lg">
              <FaIcons.FaFileDownload /> Reporte
            </Button>
          </Link>
        </div>
        <br />
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center tra title-form">
              <th>#</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Carrera</th>
              <th>Año</th>
              <th>Telf/Cel</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Nombre Padre</th>
              <th>Nombre Madre</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Usuario) => (
              <tr className="text-center" key={Usuario.id}>
                <td>{Usuario.id}</td>
                <td>{Usuario.nombre}</td>
                <td>{Usuario.apellido}</td>
                <td>{Usuario.email}</td>
                <td>{Usuario.carrera}</td>
                <td>{Usuario.anio}</td>
                <td>{Usuario.celular}</td>
                <td>{Usuario.ciudad}</td>
                <td>{Usuario.direccion}</td>
                <td>{Usuario.nom_pad}</td>
                <td>{Usuario.nom_mad}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar Usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre Becario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
              />
              <br />
              <label>Apellidos: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="apellido"
                onChange={handleChange}
              />
              <br />
              <label>Correo: </label>
              <br />
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
              <br />
              <label>Clave: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="contrasena"
                onChange={handleChange}
              />
              <br />
              <label>Celular: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="celular"
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" size="lg" onClick={() => peticionPost()}>
              Guardar
            </Button>
            <Button
              color="danger"
              size="lg"
              onClick={() => abrirCerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombres: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.nombre}
              />
              <br />
              <label>Apellidos: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="apellido"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.apellido}
              />
              <br />
              <label>Correo: </label>
              <br />
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.email}
              />
              <br />
              <label>Clave: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="contrasena"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.contrasena}
              />
              <br />
              <label>Celular: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="celular"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.celular}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPut()}>
              Editar
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => abrirCerrarModalEditar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el Usuario{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => peticionDelete()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerrarModalEliminar()}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default ListBe;
