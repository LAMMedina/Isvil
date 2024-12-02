import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File): Promise<string> {
  try {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'isvil',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error in cloudinary upload:', error);
    throw error;
  }
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`isvil/${publicId}`);
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
}

export default cloudinary;