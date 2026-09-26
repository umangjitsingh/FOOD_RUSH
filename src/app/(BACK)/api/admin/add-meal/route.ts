import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/app/(BACK)/config/db";
import {auth} from "@/auth";
import uploadImage from "@/app/(BACK)/config/cloudinary";
import Meal from "@/app/(BACK)/models/meal.model";

export const POST = async (req: NextRequest) => {
    try{
        await connectDb();
        const session = await auth();
        if (session?.user?.role !== "admin") {
            return new Response("Unauthorized to add grocery", {status: 401});
        }

        const formData = await req.formData();
        const name=formData.get("name") as string;
        const category=formData.get("category") as string;
        const price=Number(formData.get("price"));
        const size=formData.get("size") as string;


        const imageBlobs=formData.getAll("images") as Blob[] | null;

        if (!name || !category || !price || !size ) {
            return NextResponse.json({message:"Missing required fields"}, {status: 400});
        }

        if (imageBlobs && imageBlobs.length > 4) {
            return NextResponse.json({message:"Maximum 4 images allowed"}, {status: 400});
        }

        let IMAGE_URLS:string[]=[];
        if(imageBlobs && imageBlobs.length > 0){
            try {
                const uploads = await Promise.all(imageBlobs.map(blob => uploadImage(blob)));
                IMAGE_URLS.push(...uploads.filter((url): url is string => url !== null));
            } catch (uploadError) {
                console.error("Image upload failed, continuing without images:", uploadError);
            }
        }

        const meal=await Meal.create({
            name,price,category,size,image:IMAGE_URLS
        })

        return  NextResponse.json({message:"Meal added successfully", meal}, {status: 201});
    }catch (e) {
        console.error("Error in add-meal API:", e);
        return  NextResponse.json({message:"Failed to add meal", error: e instanceof Error ? e.message : String(e)}, {status: 500});
    }
}