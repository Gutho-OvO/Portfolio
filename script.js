// Barra de progresso: o personagem anda enquanto a página está a rolar
const raiz = document.documentElement;
const personagem = document.querySelector(".personagem");

let ultimoY = window.scrollY;
let temporizador;
let agendado = false;

function atualizar() {
  agendado = false;
  const maximo = raiz.scrollHeight - window.innerHeight;
  const progresso = maximo > 0 ? Math.min(1, Math.max(0, window.scrollY / maximo)) : 0;
  raiz.style.setProperty("--p", progresso.toFixed(4));
}

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;

    // Descer a página: ele anda de frente. Subir: anda de costas
    if (y !== ultimoY) {
      personagem.dataset.dir = y > ultimoY ? "frente" : "costas";
      ultimoY = y;
    }

    // Anda enquanto há scroll e para 150 ms depois de parar
    personagem.classList.add("andando");
    clearTimeout(temporizador);
    temporizador = setTimeout(() => personagem.classList.remove("andando"), 150);

    if (!agendado) {
      agendado = true;
      requestAnimationFrame(atualizar);
    }
  },
  { passive: true }
);

window.addEventListener("resize", atualizar);
atualizar();