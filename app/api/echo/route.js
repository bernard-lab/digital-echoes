import { connectToDB } from "../../../utils/database";
import Echo from "../../../models/echo";

export const GET = async (request) => {
  try {
    await connectToDB();

    const echoes = await Echo.find({}).populate("creator");

    return new Response(JSON.stringify(echoes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all echoes", { status: 500 });
  }
};
