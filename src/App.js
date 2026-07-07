// src/App.js
import { useState, useEffect } from 'react'
import UsuarioForm from './Componentes/UsuarioForm.jsx'
import UsuarioTable from './Componentes/UsuarioTable.jsx'
import {
  listarUsuarios,
  agregarUsuario,
  modificarUsuario,
  eliminarUsuario,
  buscarUsuarios,
} from './Storage/UsuarioStorage.js'

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    setUsuarios(listarUsuarios())
  }, [])

  useEffect(() => {
    setUsuarios(buscarUsuarios(busqueda))
  }, [busqueda])

  function handleGuardar(datos) {
    if (usuarioEnEdicion) {
      modificarUsuario(usuarioEnEdicion.id, datos)
      setUsuarioEnEdicion(null)
    } else {
      agregarUsuario(datos)
    }
    setUsuarios(buscarUsuarios(busqueda))
  }

  function handleEditar(usuario) {
    setUsuarioEnEdicion(usuario)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleEliminar(id) {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      eliminarUsuario(id)
      setUsuarios(buscarUsuarios(busqueda))
    }
  }

  function handleCancelar() {
    setUsuarioEnEdicion(null)
  }

  return (
    <div className="container py-5">
      <header className="mb-4 text-center d-flex align-items-center justify-content-center gap-3">
        <img
          src="/img/suiface.png"
          alt="Logo izquierdo"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />

        <div>
          <h1 className="fw-bold m-0">Registro usuarios server</h1>
        </div>

        <img
          src="/img/elmoface.png"
          alt="Logo derecho"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />
      </header>

      <UsuarioForm
        usuarioEnEdicion={usuarioEnEdicion}
        onGuardar={handleGuardar}
        onCancelar={handleCancelar}
      />

      <UsuarioTable
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
      />
    </div>
  )
}