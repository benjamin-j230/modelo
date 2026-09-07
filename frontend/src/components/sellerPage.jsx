import { useContext, useState } from "react"
import bgImage from "./images/sellerPage.jpg"
import thisContext from "./context"
import { useNavigate } from "react-router-dom"

export default function SellerPage() {
    const [open, setOpen] = useState(false)
    const { seller, setSeller } = useContext(thisContext)
    const nav = useNavigate()
    function handleShop() {
        setSeller("shop name")
        nav("/sellerConfig")
    }
    function handlePrivate() {
        setSeller("username")
        nav("/sellerConfig")
    }

    return (
        <div>
            <nav className="bg-gradient-to-r from-gray-900 to-gray-200 shadow ">
                <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-12">
                    {/* Logo + mobile toggle */}
                    <div className="flex w-full items-center justify-between lg:w-auto">
                        <div className="text-2xl font-bold uppercase tracking-[0.2em] text-[#ff8a7a] mt-0 ">
                            Modelo
                        </div>

                    </div>


                </div>
            </nav>

          
           
            <div className="h-[91vh] w-screen bg-[oklch(21%_0.034_264.665)] flex items-center justify-center">
                <div className="relative h-[50vh] w-[80vw] bg-blue-500 bg-black-50" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/70">
                        <h1 className="mb-6 text-7xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-4xl ">
                            Meet collectors  <br />
                            <span className="text-white/90">sell models</span>
                        </h1>
                        <button className="absolute bottom-[40px] left-[40px] border border-white/20 bg-red-700 px-8 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-black hover:text-red-700" onClick={handleShop} >
                            Sign up for shop
                        </button>

                        <button className="absolute bottom-[40px] left-[250px] border border-white/20 bg-red-700 px-8 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-black hover:text-red-700" onClick={handlePrivate} >
                            Sign up to sell privately
                        </button>
                    </div>

                </div>


            </div>
        </div>
    )
}