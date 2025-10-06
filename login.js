document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault()

    let usuario=document.getElementById("username").value;
    let contraseña=document.getElementById("password").value;

    if (usuario === "admin" && contraseña === "06102025") {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("usuario", usuario);
        window.location.href = "main.html"
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});



