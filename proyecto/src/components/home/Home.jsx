import Navigation from "./Navigation";
import ShowPedidos from "./ShowPedidos";

export function Home(){
    return(
        <div>
            <h1>Pedidos</h1>
            <ShowPedidos/>
            <Navigation/>

        </div>
    )
}