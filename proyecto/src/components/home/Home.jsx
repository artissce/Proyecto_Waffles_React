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
                <Route path='/pedidos/' element={<ShowPedidos/>}/>
                <Route path='/pedidos/create' element={<CreatePedido/>}/>
                <Route path='/pedidos/edit/:idPedido' element={<EditPedido/>}/>

                <Route path='/menu' element={<ShowMenu/>}/>
            </Routes>
        </div>
    )
}