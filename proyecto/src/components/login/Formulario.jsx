import './Formulario.css'
import { useState } from 'react'
export function Formulario({setUsuario}){
    const [user,setUser]=useState("");
    const [pwd,setPwd]=useState("");
    const [error,setError]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(user==="" || pwd === ""){
            setError(true)
            return
        }
        setError(false)//regresar sin el cartel
        setUsuario([user])
    }
    return(
        <section >
            <h1>Login</h1>
            <form className='formulario' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label forhtml="text">Usuario </label>
                    <br/>
                    <input type="text" className="form-control" value={user} onChange={e=>setUser(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label forhtml="pwd">Contraseña </label>
                    <br/>
                    <input type="password" className="form-control" value={pwd} onChange={e=>setPwd(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-default">Iniciar</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    )
}