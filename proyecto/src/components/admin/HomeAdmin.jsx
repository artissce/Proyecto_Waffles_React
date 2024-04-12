import Navigation from "./Navigation";
import ShowPedidos from "./ShowPedidos";
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import CreatePedido from "./CreatePedido";
import EditPedido from "./EditPedido";
export function Home(Admin){
    return(
        <div>
            <BrowserRouter>
             <Navigation/>
                <Routes>
                    <Route path='/' element={<ShowPedidos/>}/>
                    <Route path='/create' element={<CreatePedido/>}/>
                    <Route path='/edit/:idPedido' element={<EditPedido/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}