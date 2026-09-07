import { useContext, useState } from "react"
import bgImage from "./images/user-page.jpg"
import { useNavigate } from "react-router-dom"
import thisContext from "./context"
export default function UserPage() {
    const {view,setView}=useContext(thisContext)
    const nav=useNavigate()
    function viewModel(){
        setView("model")
        nav("/viewModel")
    }
    function viewSeller(){
        setView("seller")
        nav("/viewModel")
    }
    return (
        <div>
            <section className="relative flex h-screen w-full items-center overflow-hidden px-12 pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgImage}
                        alt="Silver scale model car in museum setting"
                        className="h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1e23] via-[#1a1e23]/80 to-transparent" />
                </div>
                <div className="absolute top-[40px] mb-4 text2xl font-bold tracking-[0.2em] text-[#ff8a7a] uppercase">
                        Modelo
                    </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-2xl">
                    
                    <h1 className="mb-6 text-7xl font-bold leading-[1.1] tracking-tighter uppercase text-red-700 max-[500px]:text-4xl ">
                        Built for  <br />
                        <span className="text-white/90">All collectors</span>
                    </h1>
                    <p className="mb-10 max-w-lg text-lg leading-relaxed text-red-400">
                        Discover, connect and collect 
                    </p>
                    <div className="flex gap-4">
                        <button className="border border-white/20 bg-white/5 px-8 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-red-700" onClick={viewModel}>
                            View by models
                        </button>
                        <button className="border border-white/20 bg-white/5 px-8 py-4 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-red-700" onClick={viewSeller}>
                            View by shops
                        </button>
                    </div>
                </div>

                {/* Decorative Grid Line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
            </section>
        </div>

    )
}