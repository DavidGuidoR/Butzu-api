import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Sube un archivo a AWS S3 en la carpeta especificada y devuelve la URL del archivo.
 * 
 * @param {Buffer} fileBuffer - El buffer del archivo a subir.
 * @param {string} fileName - El nombre original del archivo.
 * @param {string} mimeType - El tipo MIME del archivo.
 * @param {string} folderName - El nombre de la carpeta donde se guardará el archivo.
 * @returns {Promise<string>} La URL del archivo subido.
 */
const uploadFileToS3 = async (fileBuffer, fileName, mimeType, folderName) => {
  const Key = `${folderName}/${uuidv4()}-${fileName}`;

  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Body: fileBuffer,
      ContentType: mimeType,
    }));

    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Key}`;
  } catch (error) {
    console.error("Error al subir el archivo a S3", error);
    throw new Error("Error al subir el archivo a S3.");
  }
};

export default uploadFileToS3;