import { BrowserRouter, Route,Routes } from 'react-router-dom';
import ShowRol from "./rol/ShowRol";
import CreateRol from "./rol/CreateRol";
import EditRol from "./rol/EditRol";
import ShowUser from "./user/ShowUser";
import CreateUser from "./user/CreateUser";
import EditUser from "./user/EditUser";
import CreateTI from "./ti/CreateTI";
import ShowTI from "./ti/ShowTI";
import EditTI from "./ti/EditTI";
import ShowIng from './ing/ShowIng';
import CreateIng from './ing/CreateIng';
import EditIng from './ing/EditIng';
export function HomeAdmin(){
    return(
        <div>
           <Routes>
            <Route path="/" element={<ShowRol />} />
            <Route path="roles" element={<ShowRol />} />
            <Route path="roles/create" element={<CreateRol />} />
            <Route path="roles/edit/:idRol" element={<EditRol />} />

            <Route path="usuarios" element={<ShowUser />} />
            <Route path="usuarios/create" element={<CreateUser />} />
            <Route path="usuarios/edit/:idUser" element={<EditUser />} />

            <Route path="tipo" element={<ShowTI />} />
            <Route path="tipo/create" element={<CreateTI />} />
            <Route path="tipo/edit/:idTipo" element={<EditTI/>} />

            <Route path="ing" element={<ShowIng />} />
            <Route path="ing/create" element={<CreateIng />} />
            <Route path="ing/edit/:idIng" element={<EditIng/>} />
         </Routes>
        </div>
    )
}