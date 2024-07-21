import { connectToDB } from "../../../../utils/database";
import Echo from "../../../../models/echo";

export const POST = async (req) => {
  const { userId, echo, tag } = await req.json();

  try {
    await connectToDB();
    const newEcho = new Echo({
      creator: userId,
      echo,
      tag,
    });

    await newEcho.save();

    return new Response(JSON.stringify(newEcho), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new echo", { status: 500 });
  }
};
