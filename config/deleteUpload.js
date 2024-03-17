import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });

async function deleteImageFromS3( fileKey) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log("Archivo eliminado exitosamente", fileKey);
  } catch (err) {
    console.log("Error al eliminar el archivo", err);
    throw new Error("Error al eliminar el archivo de S3");
  }
}
  
export default deleteImageFromS3;