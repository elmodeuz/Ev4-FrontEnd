// acceso a datos, todas las operaciones sobre localStorage.


const KEY = 'usuarios_videojuegos'

export function listarUsuarios() {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

function guardarTodos(usuarios) {
  localStorage.setItem(KEY, JSON.stringify(usuarios))
}

export function agregarUsuario(usuario) {
  const usuarios = listarUsuarios()
  const nuevo = { id: Date.now().toString(), ...usuario }
  usuarios.push(nuevo)
  guardarTodos(usuarios)
  return nuevo
}

export function modificarUsuario(id, datosActualizados) {
  const usuarios = listarUsuarios()
  const index = usuarios.findIndex((u) => u.id === id)
  if (index === -1) return null
  usuarios[index] = { ...usuarios[index], ...datosActualizados }
  guardarTodos(usuarios)
  return usuarios[index]
}

export function eliminarUsuario(id) {
  const usuarios = listarUsuarios().filter((u) => u.id !== id)
  guardarTodos(usuarios)
}

export function buscarUsuarios(texto) {
  const usuarios = listarUsuarios()
  if (!texto) return usuarios
  const t = texto.toLowerCase()
  return usuarios.filter(
    (u) =>
      u.correo.toLowerCase().includes(t) ||
      u.nombre.toLowerCase().includes(t) ||
      u.apellidoPaterno.toLowerCase().includes(t) ||
      u.apellidoMaterno.toLowerCase().includes(t) ||
      u.pais.toLowerCase().includes(t)
  )
}