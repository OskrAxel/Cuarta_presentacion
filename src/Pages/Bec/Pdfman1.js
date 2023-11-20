import React, { Component } from "react";

class Pdfman1 extends Component {
  componentDidMount() {
    if (typeof window.orientation !== "undefined") {
      document.getElementById("enlaceDescargarPdf").click();
      window.close();
    }
  }

  render() {
    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <object
          data={require("../Admin/documentos/manuales/MANUAL USUARIO BECARIO.pdf")}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <br />
          <a
            href={require("../Admin/documentos/manuales/MANUAL USUARIO BECARIO.pdf")}
            id="enlaceDescargarPdf"
            download="Convocatoria.pdf"
          >
            Tu dispositivo no puede visualizar los PDF, da click aquí para
            descargarlo
          </a>
        </object>
      </div>
    );
  }
}

export default Pdfman1;
