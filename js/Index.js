window.addEventListener('DOMContentLoaded', () => {
    const BtnArr = document.querySelectorAll(".ContenedorCalculadora--Botones--Boton");
    const pantalla = document.querySelector(".ContenedorCalculadora--Expresion")

    for (const object of BtnArr) {
        object.addEventListener("click", () => {
            if (!object.hasAttribute("operador")) {
                if (pantalla.innerHTML === '0') {
                    pantalla.innerHTML = object.innerText;
                } else {
                    pantalla.append(object.innerText);
                }
            } else {
                switch (object.getAttribute("operador").valueOf()) {
                    case "borrar":
                        pantalla.innerHTML = pantalla.innerHTML.slice(0, -1);
                        if (pantalla.innerHTML.length === 0) {
                            pantalla.innerHTML = '0';
                        }
                        break;
                    case "dividir":
                        pantalla.append('/');
                        break;
                    case "multiplicar":
                        pantalla.append('*');
                        break;
                    case "restar":
                        pantalla.append('-');
                        break;
                    case "sumar":
                        pantalla.append('+');
                        break;
                    case "reiniciar":
                        pantalla.innerHTML = 0;
                        break;
                    case "igual a":
                        const resultado = eval(pantalla.innerHTML);
                        let historial_de_operaciones = localStorage.getItem('historial_de_operaciones');
                        if (!historial_de_operaciones) historial_de_operaciones = "";
                        historial_de_operaciones += `${pantalla.innerHTML}-${resultado},`;
                        localStorage.setItem('historial_de_operaciones', historial_de_operaciones);
                        pantalla.innerHTML = resultado;
                        break;
                    case "historial":
                        const hdo = localStorage.getItem('historial_de_operaciones');
                        const arrSeparador = hdo.split(",");
                        document.querySelector(".ContenedorCalculadora--Historial").innerHTML = "";
                        for (const element of arrSeparador) {
                            if (!element) continue;
                            const arrOperaciones = element.split("-");
                            const Tarjeta__Historial = `
                            <div class="ContenedorCalculadora--Historial--Tarjeta">
                            <div class="ContenedorCalculadora--Historial--Tarjeta--Operacion">
                                ${arrOperaciones[0]}
                            </div>
                            <div class="ContenedorCalculadora--Historial--Tarjeta--Resultado"> ${arrOperaciones[1]} </div>
                            </div>`;
                            document.querySelector(".ContenedorCalculadora--Historial").innerHTML += Tarjeta__Historial;
                        }
                        const botones = `
                        <div class="ContenedorCalculadora--Historial-Botones">
                        <button id="borrar" class="ContenedorCalculadora--Historial--Botones--Boton">Borrar Historial</button>
                        <button id="cerrar" class="ContenedorCalculadora--Historial--Botones--Boton">Cerrar Historial</button>
                        </div>
                        `;
                        document.querySelector(".ContenedorCalculadora--Historial").innerHTML += botones;
                        document.querySelector("#borrar").addEventListener("click", () => {
                            localStorage.clear();
                            document.querySelector(".ContenedorCalculadora--Historial").innerHTML = "";
                        });
                        document.querySelector("#cerrar").addEventListener("click", () => {
                            document.querySelector(".ContenedorCalculadora--Historial").innerHTML = "";
                        });
                        break;
                    default:
                        break;
                }
            }
        });
    }
});