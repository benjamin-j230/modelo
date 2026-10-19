import { useContext } from "react"
import thisContext from "./context"
export default function ViewLicense(){
    const {selectedLicense}=useContext(thisContext)
    return(
<img  className="w-full h-full object-contain" src={`http://localhost:5000/uploads/${selectedLicense}`}></img>

    )
}