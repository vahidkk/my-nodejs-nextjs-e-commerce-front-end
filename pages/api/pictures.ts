import cloudinary from "cloudinary";
 import { encode } from "base64-arraybuffer"; 

cloudinary.v2.config({ cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
     api_secret: process.env.CLOUD_API_SECRET, });
export const getPictures = async (resources) =>
{
      
const urls = await resources.map((resource)=>
 { const smallUrl = resource.replace('upload/', 'upload/c_thumb,g_face,w_200/')
 const thumbUrl= resource.replace('upload/', 'upload/c_thumb,w_350/')
     return { largeUrl: resource,
         smallUrl,
         thumbUrl, }; 
     }); 

const promises = urls.map((url)=> fetchBase64(url.smallUrl));
 const resolvedPromises = await Promise.all(promises); 
const response = urls.map((url, idx)=> ({
     large: url.largeUrl,
    small: resolvedPromises[idx],
     thumb:url.thumbUrl
})); 
return response; 
} ; 
const fetchBase64 = async (url: string): Promise<string> =>
{ const buffer = await (await fetch(url)).arrayBuffer();
     const base64 = await encode(buffer); 
     return base64
     };
const getThumbnail = (publicId: string): string=>  {
     const url = cloudinary.v2.url(publicId, { 
        gravity: "face",
        width: 200,
        crop: "thumb", });
return url; }; 
