import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME, API_KEY, API_SECRET} from '../config/config.js';

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET,
    secure: true
});

export async function uploadIimage(filePath){
    return await cloudinary.uploader.upload(filePath,{
        folder: 'reinado'
    });
}
export async function deleteImage(publicId){
    return await cloudinary.uploader.destroy(publicId);
}
