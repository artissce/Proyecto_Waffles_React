import './Formulario.css'
import { useState } from 'react'
export function Formulario(){
    const [user,setUser]=useState("");
    const [pwd,setPwd]=useState("");
    return(
        <section >
            <h1>Login</h1>
            <form className='formulario'>
                <div class="form-group">
                    <label for="text">Usuario </label>
                    <br/>
                    <input type="text" class="form-control" id="user" value={user} onChange={e=>setUser(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="pwd">Contraseña </label>
                    <br/>
                    <input type="password" class="form-control" id="pwd"/>
                </div>
                <button type="submit" class="btn btn-default">Iniciar</button>
            </form>
        </section>
    )
}