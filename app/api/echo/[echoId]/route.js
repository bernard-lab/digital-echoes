import Echo from "../../../../models/echo";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const echo = await Echo.findById(params.echoId).populate("creator");
    if (!echo) return new Response("Echo Not Found", { status: 404 });

    return new Response(JSON.stringify(echo), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { echo, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing echo by ID
    const existingEcho = await Echo.findById(params.echoId);

    if (!existingEcho) {
      return new Response("Echo not found", { status: 404 });
    }

    // Update the echo with new data
    existingEcho.echo = echo;
    existingEcho.tag = tag;

    await existingEcho.save();

    return new Response("Successfully updated the Echo", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Echo", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the echo by ID and remove it
    await Echo.findByIdAndDelete(params.echoId);

    return new Response("Echo deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
