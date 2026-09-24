import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING"
});

const uploadImage = async (imagePath: Blob): Promise<string | null> => {
    if (!imagePath) return null;
    try {
        // convert blob to buffer that nodejs understands
        const arrayBuffer = await imagePath.arrayBuffer();
        const bufferThatNodeUnderstand = Buffer.from(arrayBuffer);

        const url = await new Promise<string | null>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary full error:", JSON.stringify(error, null, 2));
                        return reject(error);
                    }else {
                        resolve(result?.secure_url ?? null);
                    }
                }
            )

            uploadStream.end(bufferThatNodeUnderstand);
        });
        return url;


    } catch (error) {
        console.error(error);
        return null;
    }

};
export default uploadImage;

