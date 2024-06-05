import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../lib/mongoDb";
import { userSchema } from "@/app/lib/userSchema";

const collectionName = process.env.NEXT_ATLAS_COLLECTION;

export async function POST(request: NextRequest) {
  const connection = await connectToDatabase();

  const { database } = await connectToDatabase();
  const mongoClient = connection?.mongoClient;

  if (!mongoClient) {
    console.error("Failed to connect to MongoDB");
    return NextResponse.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
  //  else {
  //   return NextResponse.json({ result: "connect", status: 200 });
  // }

  try {
    const body = await request.json();

    console.log(body);

    const collection = database.collection(collectionName!);

    const result = await collection.insertOne({ email: body.data });
    console.log("User inserted:", result.insertedId);

    return NextResponse.json({
      result: result.insertedId,
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
