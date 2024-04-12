import Navigation from "./Navigation";
import ShowPedidos from "./ShowPedidos";
import { BrowserRouter, Route,Routes } from 'react-router-dom';
export function Home(){
    return(
        <div>
            <h1>Pedidos</h1>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ShowPedidos/>}>
                    </Route>
                </Routes>
                <Navigation/>
            </BrowserRouter>

        </div>
    )
}