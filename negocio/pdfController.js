// pdfController.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { Negocio } from '../database/models.js'; // Asume que tienes un modelo de negocio definido

export const generatePDF = async (req, res) => {
  try {
    const negocioId = req.params.negocioId;

    // Consultar los datos del negocio en la base de datos
    const negocio = await Negocio.findById(negocioId);

    if (!negocio) {
      return res.status(404).json({ message: 'Negocio no encontrado' });
    }

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar el título y otros datos del PDF
    doc.info['Title'] = `Información de ${negocio.nombre}`;
    doc.info['Author'] = 'Tu Nombre o el Nombre de tu Empresa';

    // Configurar los colores y fuentes del negocio
    doc.fillColor(negocio.colorPrincipal);
    doc.font(negocio.fontFamily);

    // Agregar contenido al PDF
    doc.fontSize(20).text(`Información del Negocio: ${negocio.nombre}`);
    doc.fontSize(16).text(`Dirección: ${negocio.direccion}`);
    doc.fontSize(16).text(`Teléfono: ${negocio.telefono}`);
    doc.fontSize(16).text(`Correo Electrónico: ${negocio.email}`);

    // Guardar el PDF en el sistema de archivos
    const fileName = `negocio_${negocioId}.pdf`;
    const filePath = `pdfs/${fileName}`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.end();

    // Enviar el PDF como respuesta al cliente
    res.status(200).download(filePath, fileName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el PDF' });
  }
};
