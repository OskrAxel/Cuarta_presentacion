import React, { useState, useEffect } from "react";
// import * as FaIcons from "react-icons/fa"; // npm i react-icons
import axios from "axios"; // npm i axios
import "axios";
function Informe() {
  const [lista, setLista] = useState([]);
  const [descripcion, setDescripcion] = useState("");
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
    const res = await axios.post("http://localhost:80/api/inf/", fd);
    console.log(res.data);
    getImagenes();
  }
  async function deleteImagen(id_doc) {
    if (window.confirm("Quieres eliminar?")) {
      const res = await axios.delete(
        "http://localhost:80/api/inf/?id_doc=" + id_doc
      );
      getImagenes();
      console.log(res.data);
    }
  }
  return (
    <div className="container ">
      <div className="row p-3">
        <div className="col-md-5 p-2 ">
          <form
            className="card p-2 mt-2 border-secondary"
            encType="multipart/form-data">
            <h5>React Imagen</h5>
            <textarea
              cols="4"
              placeholder="nom_usu"
              className="form-control"
              onChange={(e) => setDescripcion(e.target.value)}></textarea>
            <div className="form-group">
              <label htmlFor="img">imagen</label>
              <input
                type="file"
                className="form-control-file"
                accept="archivo_per/*"
                onChange={(e) => setImagen(e.target.files[0])}
                multiple
              />
            </div>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={(e) => addImagen(e)}>
              ADD
              {/* Add <FaCheckCircle /> */}
            </button>
          </form>
        </div>
        <div className="col-md-7 p-2">
          {lista.map((item) => (
            <div className="card p-2 mt-2 border-secondary" key={item.id_doc}>
              <div className="card-body">
                <img
                  src={"data:archivo_per/png;base64," + item.archivo_per}
                  className="img-fluid"
                  alt="archivo_per"
                />
                <h5 className="text-primary"> {item.nom_usu}</h5>
                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn btn-outline-danger btn-sm "
                    onClick={() => deleteImagen(item.id_doc)}>
                    {/* <FaTrash /> */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Informe;
// import React, { useState, useEffect } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import { Table, Button } from "reactstrap";
// import * as FaIcons from "react-icons/fa";
// import axios from "axios";
// import "../Bec/bec.scss";

// function Informe() {
//   const baseUrl = "http://localhost:80/api/inf/";
//   const [data, setData] = useState([]);
//   const [modalInsertar, setModalInsertar] = useState(false);
//   const [modalEditar, setModalEditar] = useState(false);
//   const [modalEliminar, setModalEliminar] = useState(false);
//   const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
//     id_doc: "",
//     nom_doc: "",
//     nom_usu: "",
//     f_cargado: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setusuarioSeleccionado((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     console.log(usuarioSeleccionado);
//   };
//   const abrirCerrarModalInsertar = () => {
//     setModalInsertar(!modalInsertar);
//   };

//   const abrirCerrarModalEditar = () => {
//     setModalEditar(!modalEditar);
//   };

//   const abrirCerrarModalEliminar = () => {
//     setModalEliminar(!modalEliminar);
//   };
//   ///
//   const peticionGet = async () => {
//     await axios
//       .get(baseUrl)
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionPost = async () => {
//     var f = new FormData();
//     f.append("nom_doc", usuarioSeleccionado.nom_doc);
//     f.append("nom_usu", usuarioSeleccionado.nom_usu);
//     f.append("f_cargado", usuarioSeleccionado.f_cargado);
//     f.append("archivo", usuarioSeleccionado.archivo);
//     f.append("METHOD", "POST");
//     await axios
//       .post(baseUrl, f)
//       .then((response) => {
//         setData(data.concat(response.data));
//         abrirCerrarModalInsertar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionPut = async () => {
//     var f = new FormData();
//     f.append("nom_doc", usuarioSeleccionado.nom_doc);
//     f.append("nom_usu", usuarioSeleccionado.nom_usu);
//     f.append("f_cargado", usuarioSeleccionado.f_cargado);
//     f.append("METHOD", "PUT");
//     await axios
//       .post(baseUrl, f, { params: { id_doc: usuarioSeleccionado.id_doc } })
//       .then((response) => {
//         var dataNueva = data;
//         dataNueva.map((Usuario) => {
//           if (Usuario.id_doc === usuarioSeleccionado.id_doc) {
//             Usuario.nom_doc = usuarioSeleccionado.nom_doc;
//             Usuario.nom_usu = usuarioSeleccionado.nom_usu;
//             Usuario.f_cargado = usuarioSeleccionado.f_cargado;
//           }
//         });
//         setData(dataNueva);
//         abrirCerrarModalEditar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionDelete = async () => {
//     var f = new FormData();
//     f.append("METHOD", "DELETE");
//     await axios
//       .post(baseUrl, f, { params: { id_doc: usuarioSeleccionado.id_doc } })
//       .then((response) => {
//         setData(
//           data.filter(
//             (Usuario) => Usuario.id_doc !== usuarioSeleccionado.id_doc
//           )
//         );
//         abrirCerrarModalEliminar();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   ////

//   const seleccionarUsuario = (Usuario, caso) => {
//     setusuarioSeleccionado(Usuario);

//     caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
//   };

//   useEffect(() => {
//     peticionGet();
//   }, []);
//   return (
//     <div id="main_content">
//       <div className="tra">
//         <div className="tra title-form">
//           <h2 className>Listado Patrocinadores</h2>
//         </div>
//         <div id="subt">
//           {/* <Link to="user/create"> */}
//           <Button
//             color="success"
//             size="lg"
//             onClick={() => abrirCerrarModalInsertar()}>
//             <FaIcons.FaPlus /> Añadir
//           </Button>
//           {/* </Link> */}
//         </div>
//         <br />
//         <br />
//         <Table responsive="sm" id="tabl">
//           <thead>
//             <tr className="text-center">
//               <th>#</th>
//               <th>Nombre documento</th>
//               <th>Usuario</th>
//               <th>Fecha cargado</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((Usuario) => (
//               <tr className="text-center" key={Usuario.id_doc}>
//                 <td>{Usuario.id_doc}</td>
//                 <td>{Usuario.nom_doc}</td>
//                 <td>{Usuario.nom_usu}</td>
//                 <td>{Usuario.f_cargado}</td>
//                 <td>
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => seleccionarUsuario(Usuario, "Editar")}>
//                     Editar
//                   </button>{" "}
//                   {"  "}
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => seleccionarUsuario(Usuario, "Eliminar")}>
//                     Eliminar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         <Modal isOpen={modalInsertar}>
//           <ModalHeader>Cargar documento</ModalHeader>
//           <ModalBody>
//             <div className="form-group">
//               <label>Nombre documento: </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 name="nom_doc"
//                 onChange={handleChange}
//               />
//               <br />
//               <label>Usuario: </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 name="nom_usu"
//                 onChange={handleChange}
//               />
//               <br />
//               <label>Fecha cargado: </label>
//               <br />
//               <input
//                 type="datetime-local"
//                 className="form-control"
//                 name="f_cargado"
//                 onChange={handleChange}
//               />
//               <br />
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="success" size="lg" onClick={() => peticionPost()}>
//               Guardar
//             </Button>
//             <Button
//               color="danger"
//               size="lg"
//               onClick={() => abrirCerrarModalInsertar()}>
//               Cancelar
//             </Button>
//           </ModalFooter>
//         </Modal>

//         <Modal isOpen={modalEditar}>
//           <ModalHeader>Editar Usuario</ModalHeader>
//           <ModalBody>
//             <div className="form-group">
//               <label>Nombre documento:</label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 name="nom_doc"
//                 onChange={handleChange}
//                 value={usuarioSeleccionado && usuarioSeleccionado.nom_doc}
//               />
//               <br />
//               <label>Usuario: </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 name="nom_usu"
//                 onChange={handleChange}
//                 value={usuarioSeleccionado && usuarioSeleccionado.nom_usu}
//               />
//               <br />
//               <label>Fecha cargado: </label>
//               <br />
//               <input
//                 type="datetime-local"
//                 className="form-control"
//                 name="f_cargado"
//                 onChange={handleChange}
//                 value={usuarioSeleccionado && usuarioSeleccionado.f_cargado}
//               />
//               <br />
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <button className="btn btn-primary" onClick={() => peticionPut()}>
//               Editar
//             </button>
//             {"   "}
//             <button
//               className="btn btn-danger"
//               onClick={() => abrirCerrarModalEditar()}>
//               Cancelar
//             </button>
//           </ModalFooter>
//         </Modal>

//         <Modal isOpen={modalEliminar}>
//           <ModalBody>
//             ¿Estás seguro que deseas eliminar el documento{" "}
//             {usuarioSeleccionado && usuarioSeleccionado.nom_doc}?
//           </ModalBody>
//           <ModalFooter>
//             <button className="btn btn-danger" onClick={() => peticionDelete()}>
//               Sí
//             </button>
//             <button
//               className="btn btn-secondary"
//               onClick={() => abrirCerrarModalEliminar()}>
//               No
//             </button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default Informe;
