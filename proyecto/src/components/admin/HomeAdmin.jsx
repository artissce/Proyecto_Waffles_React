import { BrowserRouter, Route,Routes } from 'react-router-dom';
import ShowRol from "./rol/ShowRol";
import CreateRol from "./rol/CreateRol";
import EditRol from "./rol/EditRol";
export function HomeAdmin(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<h1>Checa el path</h1>}/>
                    <Route path='/roles' element={<ShowRol/>}/>
                    <Route path='/roles/create' element={<CreateRol/>}/>
                    <Route path='/roles/edit/:idRol' element={<EditRol/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}