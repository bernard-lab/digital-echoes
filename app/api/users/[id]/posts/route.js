import Echo from "../../../../../models/echo";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const echoes = await Echo.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(echoes), { status: 200 });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
