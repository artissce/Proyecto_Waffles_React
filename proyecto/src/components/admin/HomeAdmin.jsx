import { BrowserRouter, Route,Routes } from 'react-router-dom';
import ShowRol from "./rol/ShowRol";
import CreateRol from "./rol/CreateRol";
import EditRol from "./rol/EditRol";
import ShowUser from "./user/ShowUser";
import CreateUser from "./user/CreateUser";
import EditUser from "./user/EditUser";
export function HomeAdmin(){
    return(
        <div>
           <Routes>
            <Route path="/" element={<h1>Checa el path</h1>} />
            <Route path="roles" element={<ShowRol />} />
            <Route path="roles/create" element={<CreateRol />} />
            <Route path="roles/edit/:idRol" element={<EditRol />} />

            <Route path="usuarios" element={<ShowUser />} />
            <Route path="usuarios/create" element={<CreateUser />} />
            <Route path="usuarios/edit/:idUser" element={<EditUser />} />
         </Routes>
        </div>
    )
}