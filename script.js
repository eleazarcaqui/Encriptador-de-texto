function mostrarAdvertencia(mensaje) {
    const advertencia = document.querySelector("#warning");
    advertencia.style.color = "red";
    advertencia.style.fontSize = "16px";
    advertencia.textContent = mensaje;
}

function alternarVisibilidad(elemento, esVisible) {
    elemento.classList.toggle("invisible", !esVisible);
}

function encriptarTexto(traduccion) {
    const textArea = document.querySelector("#text");
    const text = textArea.value.trim();
    const area_default = document.querySelector("#default");
    const area_result = document.querySelector("#result");
    const textSectionTwo = document.querySelector("#textSectionTwo");

    textArea.value = "";

    if (!text) {
        alternarVisibilidad(area_default, true);
        alternarVisibilidad(area_result, false);
        return;
    }

    let resultado = "";
    for (const char of text) {
        if (!/[a-z\s]/.test(char)) {
            mostrarAdvertencia("¡Carácter no válido detectado!");
            return;
        }
        resultado += traduccion[char] || char;
    }

    alternarVisibilidad(area_default, false);
    alternarVisibilidad(area_result, true);
    textSectionTwo.textContent = resultado;
}

function desencriptarTexto(traduccion) {
    const textArea = document.querySelector("#text");
    let text = textArea.value.trim();
    const area_default = document.querySelector("#default");
    const area_result = document.querySelector("#result");
    const textSectionTwo = document.querySelector("#textSectionTwo");

    if (!text) {
        alternarVisibilidad(area_default, true);
        alternarVisibilidad(area_result, false);
        return;
    }

    for (const char of text) {
        if (!/[a-z\s]/.test(char)) {
            mostrarAdvertencia("¡Carácter no válido detectado!");
            return;
        }
    }

    for (const [key, value] of Object.entries(traduccion)) {
        text = text.replace(new RegExp(value, "g"), key);
    }

    alternarVisibilidad(area_default, false);
    alternarVisibilidad(area_result, true);
    textSectionTwo.textContent = text;
}

function copiarTextAreaDos() {
    const textSectionTwo = document.querySelector("#textSectionTwo");
    navigator.clipboard.writeText(textSectionTwo.textContent);
}


const traduccion = { "a": "al", "e": "env", "i": "isl", "o": "olus", "u": "upna" };

document.querySelector('#encrypt').addEventListener('click', () => encriptarTexto(traduccion));
document.querySelector('#decrypt').addEventListener('click', () => {
    setTimeout(() => desencriptarTexto(traduccion), 0);
});

document.querySelector('#copy').addEventListener('click', copiarTextAreaDos);
