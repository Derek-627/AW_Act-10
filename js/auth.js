// USUARIOS DE EJEMPLO
const USUARIOS_BASE = [
  {
    username: "jugador1",
    email: "jugador@guias.com",
    password: "123",
    rol: "usuario" 
},
  {
    username: "creador1",
    email: "creador@guias.com",
    password: "123",
    rol: "creador" 
  }
];

// USUARIOS GUARDADOS
function obtenerUsuarios() {
  const guardados = JSON.parse(localStorage.getItem("usuariosGuias"));
  if (!guardados) {
    localStorage.setItem("usuariosGuias", JSON.stringify(USUARIOS_BASE));
    return USUARIOS_BASE;
  }
  return guardados;
}

// INICIOS DE SESION GUARDADOS 
function guardarSesion(usuario) {
  localStorage.setItem("sesionActual", JSON.stringify(usuario));
}

// SESION ACTUAL
function obtenerSesion() {
  return JSON.parse(localStorage.getItem("sesionActual"));
}

// REDIRIGE SEGUN EL ROL 
function redirigirPorRol(rol) {
  if (rol === "creador") {
   
    window.location.href = "index_mateo.html";
  } else if (rol === "usuario") {
    window.location.href = "index_mateo.html";
  } else {
  
    window.location.href = "index_mateo.html";
  }
}

// LOGEARSE DESDE EL FORMULARIO
function iniciarSesion(event) {
  event.preventDefault();

  const datoUsuario = document.getElementById("loginUsuario").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const mensaje = document.getElementById("mensajeLogin");

  const usuarios = obtenerUsuarios();

  // BUSCA USERNAME Y VALIDA LA CONTRASEÑA 
  const encontrado = usuarios.find(
    (u) => (u.username === datoUsuario || u.email === datoUsuario) && u.password === password
  );

  if (encontrado) {
    guardarSesion(encontrado);
    redirigirPorRol(encontrado.rol);
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos. Prueba con jugador1 / 123 o creador1 / 123";
  }
}

// ENTRAR COMO INVITADO
function entrarComoInvitado() {
  const invitado = {
    username: "Invitado",
    rol: "invitado"
  };
  guardarSesion(invitado);
  redirigirPorRol("invitado");
}

// REGISTRAR USUARIO NUEVO
function registrarUsuario(event) {
  event.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const rol = document.getElementById("regRol").value;

  if (!username || !email || !password) {
    alert("Completa todos los campos.");
    return;
  }

  const usuarios = obtenerUsuarios();
  const nuevoUsuario = { username, email, password, rol };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuariosGuias", JSON.stringify(usuarios));
  guardarSesion(nuevoUsuario);

  redirigirPorRol(rol);
}

// MUESTRA PERFIL DE USUARIO EN LA PAGINA
function mostrarPerfilEnPagina() {
  const sesion = obtenerSesion();
  const badgePerfil = document.getElementById("infoPerfil");

  if (badgePerfil) {
    if (sesion) {
      badgePerfil.textContent = `${sesion.username} (${sesion.rol})`;
    } else {
      badgePerfil.textContent = "Sin sesión";
    }
  }
}

function cerrarSesion() {
  localStorage.removeItem("sesionActual");
  window.location.href = "index_bienvenida.html";
}