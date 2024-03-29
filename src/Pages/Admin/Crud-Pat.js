import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "../Bec/bec.scss";

function ListUserPat() {
  const baseUrl = "http://localhost:80/api/pat/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id: "",
    nombre: "",
    pais: "",
    email: "",
    direccion: "",
    celular: "",
    institucion: "",
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
  const act = () => {
    window.location.reload();
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
    f.append("pais", usuarioSeleccionado.pais);
    f.append("email", usuarioSeleccionado.email);
    f.append("direccion", usuarioSeleccionado.direccion);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("institucion", usuarioSeleccionado.institucion);
    f.append("METHOD", "POST");
    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        act();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", usuarioSeleccionado.nombre);
    f.append("pais", usuarioSeleccionado.pais);
    f.append("email", usuarioSeleccionado.email);
    f.append("direccion", usuarioSeleccionado.direccion);
    f.append("celular", usuarioSeleccionado.celular);
    f.append("institucion", usuarioSeleccionado.institucion);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: usuarioSeleccionado.id } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((Usuario) => {
          if (Usuario.id === usuarioSeleccionado.id) {
            Usuario.nombre = usuarioSeleccionado.nombre;
            Usuario.pais = usuarioSeleccionado.pais;
            Usuario.email = usuarioSeleccionado.email;
            Usuario.direccion = usuarioSeleccionado.direccion;
            Usuario.celular = usuarioSeleccionado.celular;
            Usuario.institucion = usuarioSeleccionado.institucion;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
        act();
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

  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Listado Patrocinadores</h2>
        </div>
        <div id="subt">
          {/* <Link to="user/create"> */}
          <Button
            color="success"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}
          >
            <FaIcons.FaPlus /> Añadir
          </Button>
          {/* </Link> */}
        </div>
        <br />
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Nombres</th>
              <th>Pais</th>
              <th>Correo</th>
              <th>Direccion</th>
              <th>Celular</th>
              <th>Institucion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Usuario) => (
              <tr className="text-center" key={Usuario.id}>
                <td>{Usuario.id}</td>
                <td>{Usuario.nombre}</td>
                <td>{Usuario.pais}</td>
                <td>{Usuario.email}</td>
                <td>{Usuario.direccion}</td>
                <td>{Usuario.celular}</td>
                <td>{Usuario.institucion}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionarUsuario(Usuario, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  {"  "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarUsuario(Usuario, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar Usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombres: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
              />
              <br />
              <label>Pais: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pais"
                onChange={handleChange}
              />
              <br />
              <label>Correo: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
              <br />
              <label>Direccion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="direccion"
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
              <label>Institucion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="institucion"
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
              <label>paiss: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pais"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.pais}
              />
              <br />
              <label>Correo: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.email}
              />
              <br />
              <label>Direccion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="direccion"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.direccion}
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
              <label>Institucion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="institucion"
                onChange={handleChange}
                value={usuarioSeleccionado && usuarioSeleccionado.institucion}
              />
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

export default ListUserPat;
