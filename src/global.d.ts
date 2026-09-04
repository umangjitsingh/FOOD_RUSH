import mongoose from "mongoose";

declare global {
    var box : {
        conn: typeof mongoose | null,
        promise: Promise<typeof mongoose> | null,
    }
}

export {}