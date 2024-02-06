import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table, Button } from "reactstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "../Bec/bec.scss";

function Informe2() {
  const [lista, setLista] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [nom, setNom] = useState("");
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    getImagenes();
  }, []);

  async function getImagenes() {
    const res = await axios.get("http://localhost:80/api/inf/");
    setLista(res.data);
    console.log(res.data);
  }

  async function addImagen(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("archivo_per", imagen);
    fd.append("nom_usu", descripcion);
    fd.append("nom_doc", nom);
    const res = await axios.post("http://localhost:80/api/inf/", fd);
    console.log(res.data);
    abrirCerrarModalInsertar();
    getImagenes();
  }

  async function deleteImagen(id_doc) {
    const res = await axios.delete(
      "http://localhost:80/api/inf/?id_doc=" + id_doc
    );
    abrirCerrarModalEliminar();
    getImagenes();
    console.log(res.data);
  }
  //General
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
    id_doc: "",
    nom_doc: "",
    nom_usu: "",
    archivo_per: "",
    f_cargado: "",
  });
  const seleccionarUsuario = (Usuario, caso) => {
    setusuarioSeleccionado(Usuario);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };
  //modal insertar
  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  //modal editar
  const [modalEditar, setModalEditar] = useState(false);
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  //modal eliminar

  const [modalEliminar, setModalEliminar] = useState(false);
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  //modal ver

  const [modalVer, setModalVer] = useState(false);
  const abrirCerrarModalVer = () => {
    setModalVer(!modalVer);
  };

  return (
    <div id="main_content">
      <div className="tra">
        <div className="tra title-form">
          <h2 className>Listado Informes Entregados</h2>
        </div>
        <div id="subt">
          <Button
            color="success"
            size="lg"
            onClick={() => abrirCerrarModalInsertar()}>
            <FaIcons.FaPlus /> Añadir
          </Button>
        </div>
        <br />
        <br />
        <Table responsive="sm" id="tabl">
          <thead>
            <tr className="text-center">
              {/* <th>#</th> */}
              <th>Nombre documento</th>
              <th>Usuario</th>
              <th>Fecha cargado</th>
              {/* <th>Archivo</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr className="text-center" key={item.id_doc}>
                {/* <td>{item.id_doc}</td> */}
                <td>{item.nom_doc}</td>
                <td>{item.nom_usu}</td>
                <td>{item.f_cargado}</td>
                {/* <td>
                  <img
                    src={"data:archivo_per/png;base64," + item.archivo_per}
                    className=""
                    alt="archivo_per"
                  />
                </td> */}
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => abrirCerrarModalVer()}>
                    Descargar
                  </button>{" "}
                  {/* <button
                    className="btn btn-warning"
                    onClick={() => seleccionarUsuario(item, "Editar")}
                  >
                    Editar
                  </button>{" "} */}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarUsuario(item, "Eliminar")}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>Cargar documento</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre documento: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nom_doc"
                onChange={(e) => setNom(e.target.value)}
              />
              <br />
              <label>Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nom_usu"
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <br />
              <label>Informe personal: </label>
              <br />
              <input
                type="file"
                className="form-control"
                accept="archivo_per/*"
                onChange={(e) => setImagen(e.target.files[0])}
                multiple
              />
              <br />
              <label>Fecha cargado: </label>
              <br />
              <input
                type="datetime-local"
                className="form-control"
                name="f_cargado"
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" size="lg" onClick={(e) => addImagen(e)}>
              Guardar
            </Button>
            <Button
              color="danger"
              size="lg"
              onClick={() => abrirCerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el documento{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => deleteImagen(usuarioSeleccionado.id_doc)}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerrarModalEliminar()}>
              No
            </button>
          </ModalFooter>
        </Modal>

        {/* //OTRO VER */}
        <Modal isOpen={modalVer}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el documento{" "}
            {usuarioSeleccionado && usuarioSeleccionado.nom_doc}?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => deleteImagen(usuarioSeleccionado.id_doc)}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerrarModalVer()}>
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Informe2;
