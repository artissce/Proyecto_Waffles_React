import ShowPedidos from "./ShowPedidos";
import { Route,Routes } from 'react-router-dom';
import CreatePedido from "./CreatePedido";
import EditPedido from "./EditPedido";
import MenuHome from "./MenuHome";
import ShowMenu from "./ShowMenu";
export function Home(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<MenuHome/>}/>
                <Route path='/pedido/' element={<ShowPedidos/>}/>
                <Route path='/pedido/create' element={<CreatePedido/>}/>
                <Route path='/pedido/edit/:idPedido' element={<EditPedido/>}/>

                <Route path='/menu' element={<ShowMenu/>}/>
            </Routes>
        </div>
    )
}