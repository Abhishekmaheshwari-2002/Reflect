"use server"
import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCollection = async (data) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Get request data for ArcJet
        const req = await request();

        // Check rate limit
        const decision = await aj.protect(req, {
            userId,
            requested: 1,// Specify how many tokens to consume
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                const { remaining, reset } = decision.reason;
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details: {
                        remaining,
                        resetInSecond: reset,
                    },
                });
                throw new Error("Too many request.Please try again later");
            }
            throw new Error("Request Blocked");
        }
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const collection = await db.collection.create({
            data: {
                name: data.name,
                description: data.description,
                userId: user.id,
            },
        });
        revalidatePath("/dashboard");
        return collection;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCollections = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    // Fetch the user's collections
    const collections = await db.collection.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc"
        },
    });
    return collections;
}

export const getCollection = async (collectionId) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    // Fetch the user's collections
    const collections = await db.collection.findUnique({
        where: {
            userId: user.id,
            id: collectionId,
        },
    });
    return collections;
}

export const deleteCollection = async (collectionId) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        // Check if collection exists and belongs to user
        const collection = await db.collection.findFirst({
            where: {
                userId: user.id,
                id: collectionId,
            },
        });


        if (!collection) throw new Error("Collection not found");
        // Delete the collection (entries will be cascade deleted)
        await db.collection.delete({
            where: {
                id: collectionId,

            },
        });
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
}
