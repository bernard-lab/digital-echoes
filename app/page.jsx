import Feed from "../components/Feed"
import Loading from "./loading"; 
import { Suspense } from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text blue_gradient text-center">
            Discover, Share, & Explore
            <br />
            <span className="electric_gradient text-center"> Echoing Ideas in the Digital World.</span>
        </h1>
        <p className="desc text-center">
        Digital Echoes is your space for sharing and exploring thoughts and reflections in the digital age. Discover a vibrant collection of insights and stories that resonate with today's world
        </p>

        <Suspense fallback={<Loading/>}>
          <Feed />
        </Suspense>
    </section>
  )
}

export default Home