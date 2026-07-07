import React from 'react';
import TntButton from './TntButton';

export default function UsuarioTable({ usuarios, onEditar, onEliminar, busqueda, onBusquedaChange }) {
  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Usuarios registrados</h4>
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Buscar por nombre, correo o país..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Apellido paterno</th>
              <th>Apellido materno</th>
              <th>País</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.correo}</td>
                <td>{u.nombre}</td>
                <td>{u.apellidoPaterno}</td>
                <td>{u.apellidoMaterno}</td>
                <td>{u.pais}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(u)}>
                    Editar
                  </button>
                  <TntButton onExplode={() => onEliminar(u.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}