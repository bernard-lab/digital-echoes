import "../styles/globals.css"
import Navbar from "../components/Navbar"
import Provider from "../components/Provider";

export const metadata = {
    title: "Digital Echoes",
    description: "Digital Echoes is a dynamic platform where ideas resonate and stories reverberate. Here, we capture the essence of modern thoughts, reflections, and experiences, creating a vibrant tapestry of digital expressions. Whether you're sharing your latest insights, exploring new perspectives, or engaging in meaningful conversations, Digital Echoes amplifies your presence in the ever-expanding digital landscape. Join our community and let your echoes be heard",
    author: "Bernard Acero",
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <div className="main"> </div>
                
                <main className="app">
                    <Navbar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;