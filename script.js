(function() {
  const preguntas = [
    { texto: "¿Cuál es el objetivo del trabajo independiente que deseas que tus estudiantes desarrollen?", tipo: "texto" },
    { texto: "¿Qué nivel cognitivo deseas fomentar en tus estudiantes según la Taxonomía de Bloom?", tipo: "opciones", opciones: ["Recordar", "Comprender", "Aplicar", "Analizar", "Evaluar", "Crear"] },
    { texto: "¿Qué asignatura o tema estás trabajando con tus estudiantes?", tipo: "texto" },
    { texto: "¿Qué tipo(s) de inteligencia deseas estimular en tus estudiantes con esta actividad?", tipo: "opciones", opciones: ["Lingüística", "Lógico-matemática", "Visual-espacial", "Corporal-kinestésica", "Musical", "Interpersonal", "Intrapersonal", "Naturalista"], multiple: true },
    { texto: "¿Deseas que la actividad sea individual o grupal?", tipo: "opciones", opciones: ["Individual", "Grupal", "Mixta"] },
    { texto: "¿Qué tipo de producto final deseas que elaboren tus estudiantes?", tipo: "opciones", opciones: ["Infografía", "Ensayo", "Video educativo", "Podcast", "Presentación interactiva", "Mapa mental", "Portafolio digital"] },
    { texto: "¿Qué nivel de familiaridad tienen tus estudiantes con el uso de herramientas de IA?", tipo: "opciones", opciones: ["Básico", "Intermedio", "Avanzado"] },
    { texto: "¿Qué herramientas de IA te interesa utilizar en esta actividad?", tipo: "opciones", opciones: ["ChatGPT", "Perplexity", "Canva IA", "Gamma", "HeyGen", "Notion AI"], multiple: true },
    { texto: "¿Qué problema, necesidad o reto educativo buscas atender con esta actividad?", tipo: "texto" },
    { texto: "¿Qué criterios utilizarás para valorar si la actividad fue innovadora y significativa para el aprendizaje?", tipo: "opciones", opciones: ["Originalidad", "Participación", "Análisis crítico", "Creatividad", "Aplicación práctica", "Reflexión del estudiante"], multiple: true }
  ];

  let respuestas = [];
  let actual = 0;

  const preguntaEl = document.getElementById("preguntaActual");
  const respuestasEl = document.getElementById("respuestas");
  const btnAnterior = document.getElementById("anterior");
  const btnSiguiente = document.getElementById("siguiente");
  const resultadoEl = document.getElementById("resultado");
  const sugerenciaEl = document.getElementById("sugerencia");

  function mostrarPregunta() {
    const p = preguntas[actual];
    preguntaEl.innerText = p.texto;
    respuestasEl.innerHTML = "";

    if (p.tipo === "texto") {
      const input = document.createElement("textarea");
      input.value = respuestas[actual] || "";
      input.oninput = () => respuestas[actual] = input.value;
      respuestasEl.appendChild(input);
    } else if (p.tipo === "opciones") {
      p.opciones.forEach(opcion => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = p.multiple ? "checkbox" : "radio";
        input.name = "opcion";
        input.value = opcion;
        if (respuestas[actual]?.includes?.(opcion)) input.checked = true;

        input.onchange = () => {
          if (p.multiple) {
            const seleccionadas = Array.from(respuestasEl.querySelectorAll("input:checked")).map(el => el.value);
            respuestas[actual] = seleccionadas;
          } else {
            respuestas[actual] = opcion;
          }
        };

        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + opcion));
        respuestasEl.appendChild(label);
      });
    }

    btnAnterior.disabled = actual === 0;
    btnSiguiente.innerText = actual === preguntas.length - 1 ? "Finalizar" : "Siguiente";
  }

  btnAnterior.onclick = () => {
    if (actual > 0) {
      actual--;
      mostrarPregunta();
    }
  };

  btnSiguiente.onclick = () => {
    if (actual < preguntas.length - 1) {
      actual++;
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  };

  function mostrarResultado() {
    document.getElementById("formulario").classList.add("oculto");
    resultadoEl.classList.remove("oculto");

    const producto = respuestas[5] || "material educativo";
    const herramienta = (respuestas[7] || []).join(", ") || "una herramienta de IA";
    const cognitivo = respuestas[1] || "algún nivel cognitivo";

    const sugerencia = `Puedes pedir a tus estudiantes que desarrollen un ${producto.toLowerCase()} usando ${herramienta}. Diseña la actividad para fomentar el pensamiento de tipo ${cognitivo.toLowerCase()} y resolver el problema que mencionaste.`;

    sugerenciaEl.innerText = sugerencia;
  }

  mostrarPregunta();
})();
