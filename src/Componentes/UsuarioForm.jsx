
import React, { useState, useEffect } from 'react';

export default function UsuarioForm({ onGuardar, usuarioEnEdicion }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [pais, setPais] = useState('');

  // si se selecciona un usuario para editar, se llenan los espacios
  useEffect(() => {
    if (usuarioEnEdicion) {
      setCorreo(usuarioEnEdicion.correo);
      setClave(usuarioEnEdicion.clave);
      setNombre(usuarioEnEdicion.nombre);
      setApellidoPaterno(usuarioEnEdicion.apellidoPaterno);
      setApellidoMaterno(usuarioEnEdicion.apellidoMaterno);
      setPais(usuarioEnEdicion.pais);
    } else {
      limpiarFormulario();
    }
  }, [usuarioEnEdicion]);

  const limpiarFormulario = () => {
    setCorreo('');
    setClave('');
    setNombre('');
    setApellidoPaterno('');
    setApellidoMaterno('');
    setPais('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo || !clave || !nombre || !apellidoPaterno || !apellidoMaterno  || !pais) {
      alert("Por favor rellena los campos principales");
      return;
    }
    
    onGuardar({ correo, clave, nombre, apellidoPaterno, apellidoMaterno, pais });
    limpiarFormulario();
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h3 className="mb-3">{usuarioEnEdicion ? 'Modificar Usuario' : 'Agregar Usuario'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Clave</label>
            <input type="password" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} minLength={8} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} minLength={2} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Apellido Paterno</label>
            <input type="text" className="form-control" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} minLength={2} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Apellido Materno</label>
            <input type="text" className="form-control" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} minLength={2} required/>
          </div>
          <div className="col-md-12">
            <label className="form-label">País</label>
            <input type="text" className="form-control" value={pais} onChange={(e) => setPais(e.target.value)} required />
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {usuarioEnEdicion ? 'Actualizar' : 'Agregar usuario'}
          </button>
          {usuarioEnEdicion && (
            <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}