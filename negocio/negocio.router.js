const express = require("express");
const router = express.Router();
const qr = require("qrcode");

router.get("/", (req, res) => {
  res.send("Esta es una ruta de ejemplo negocio.");
});


//Esta ruta es para generar el QR 
router.get("/qr/:negocioId", (req, res) => {

  const configQr = {
    type: "png", // Tipo de archivo de imagen (png, svg, ...)
    quality: 0.9, // Calidad de la imagen (valor entre 0 y 1)
    margin: 1, // Margen alrededor del código QR
    color: {
      // Colores del código QR
      dark: "#000", // Color oscurUwU
      light: "#fff", // Color clarOwO
    },
  };

  const negocioId = req.params.negocioId; //Aqui obtengo el ID del negociOwO

  qr.toBuffer(negocioId, configQr, (err, buffer) => {
    if (err) {
      console.error("Error al generar el código QR:", err);
      return;
    }
     res.set('Content-Type', 'image/png');
     res.send(buffer);
  });
});

//Y esta ruta es para generar los links 
router.get("/link/:negocioId", (req, res) => {
  const negocioId = req.params.negocioId; //Aqui obtengo el ID del negociOwO
  const enlace = `http://localhost:3000/negocio/${negocioId}`; //modificar el link despois 
  res.send(enlace);
});

module.exports = router;
