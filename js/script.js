// ------------------------------
// MENU PARA CELULAR
// ------------------------------

// Seleciona o botão e o menu de navegação
const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");

// Abre ou fecha o menu quando o botão é clicado
botaoMenu.addEventListener("click", () => {
    const menuEstaAberto = menuPrincipal.classList.toggle("aberto");

    // Atualiza o estado do botão para leitores de tela
    botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
    botaoMenu.setAttribute(
        "aria-label",
        menuEstaAberto ? "Fechar menu" : "Abrir menu"
    );
});

// Fecha o menu depois que uma opção é selecionada
menuPrincipal.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuPrincipal.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
});


// ------------------------------
// ANO AUTOMÁTICO NO RODAPÉ
// ------------------------------

// Atualiza o ano do rodapé automaticamente
document.querySelector("#ano-atual").textContent = new Date().getFullYear();


// ------------------------------
// JANELA PARA AMPLIAR FOTOS
// ------------------------------

const visualizador = document.querySelector("#visualizador");
const imagemAmpliada = document.querySelector("#imagem-ampliada");
const botaoFechar = document.querySelector("#fechar-visualizador");

// Abre uma imagem em tamanho maior
function abrirFotoAmpliada(caminho, descricao) {
    imagemAmpliada.src = caminho;
    imagemAmpliada.alt = descricao;
    visualizador.showModal();
}

// Fecha a foto pelo botão de fechar
botaoFechar.addEventListener("click", () => {
    visualizador.close();
});

// Fecha também ao clicar fora da foto, no fundo escuro
visualizador.addEventListener("click", (evento) => {
    if (evento.target === visualizador) {
        visualizador.close();
    }
});


// ------------------------------
// GALERIAS DE FOTOGRAFIAS
// ------------------------------

// Lista os arquivos de cada seção.
// Os nomes precisam corresponder exatamente aos arquivos em imagens/.
const galerias = [
    {
        id: "galeria-atl",
        descricao: "ATL 2024",
        arquivos: [
            
            "atl1H.jpg",
            "atl2H.jpg",
            "atl3H.jpg",
            "atl4H.jpg",
            "atl5H.jpg",
            "atl6H.jpg"
            
        ]
    },
    {
        id: "galeria-slanvy",
        descricao: "Slanvy 2023",
        arquivos: [
            "slanvy1H.jpg",
            "slanvy2H.jpg",
            "slanvy3H.jpg",
            "slanvy1V.jpg",
            "slanvy2V.jpg",
            "slanvy3V.jpg",
            "slanvy4V.jpg",
            "slanvy5V.jpg"
        ]
    },
    {
        id: "galeria-santa",
        descricao: "Santa Luzia/Estrutural 2023",
        arquivos: [
            "santa0V.jpg",
            "santa1V.jpg",
            "santa2V.jpg",
            "santa3V.jpg",
            "santa4V.jpg",
            "santa5V.jpg"
        ]
    },
    {
        id: "galeria-camara",
        descricao: "Câmara dos Deputados 2024",
        arquivos: [
            
            "camara1V.jpg",
            "camara2V.jpg",
            "camara3V.jpg",
            "camara4V.jpg",
            "camara1H.jpg"
        ]
    },
    {
        id: "galeria-batalha",
        descricao: "Batalha da Estrutural 2023",
        arquivos: [
            "batalha1H.jpg",
            "batalha2H.jpg",
            "batalha1V.jpg",
            "batalha2V.jpg",
            "batalha3V.jpg",
            "batalha4V.jpg",
            "batalha5V.jpg"
        ]
    }
];

// Cria cada galeria e adiciona suas fotos na página
galerias.forEach((galeria) => {
    const elementoGaleria = document.querySelector(`#${galeria.id}`);

    // Interrompe esta etapa se a galeria não estiver no HTML
    if (!elementoGaleria) {
        return;
    }

    galeria.arquivos.forEach((arquivo, indice) => {
        // Cria um botão para cada foto
        const botaoFoto = document.createElement("button");
        botaoFoto.className = "foto-item";
        botaoFoto.type = "button";
        botaoFoto.setAttribute(
            "aria-label",
            `Ampliar foto ${indice + 1} da seção ${galeria.descricao}`
        );

        // Cria e configura a imagem
        const imagem = document.createElement("img");
        imagem.src = `imagens/${arquivo}`;
        imagem.alt = `Fotografia ${indice + 1} — ${galeria.descricao}`;
        imagem.loading = "lazy";

        // Abre a imagem em tamanho maior quando ela é clicada
        botaoFoto.addEventListener("click", () => {
            abrirFotoAmpliada(imagem.src, imagem.alt);
        });

        // Coloca a imagem no botão e o botão na galeria
        botaoFoto.appendChild(imagem);
        elementoGaleria.appendChild(botaoFoto);
    });
});


// ------------------------------
// CARROSSEL DO PROJETO CLICK
// ------------------------------

// Lista das 11 fotografias horizontais
const fotosClick = [
    "click1.jpg",
    "click2.jpg",
    "click3.jpg",
    "click4.jpg",
    "click5.jpg",
    "click6.jpg",
    "click7.jpg",
    "click8.jpg",
    "click9.jpg",
    "click10.jpg",
    "click11.jpg"
];

// Seleciona os elementos do carrossel
const carrossel = document.querySelector("#carrossel-click");
const carrosselJanela = document.querySelector("#carrossel-janela");
const carrosselImagens = document.querySelector("#carrossel-imagens");
const contadorClick = document.querySelector("#contador-click");
const botaoClickAnterior = document.querySelector("#click-anterior");
const botaoClickProximo = document.querySelector("#click-proximo");

let indiceClickAtual = 0;
let temporizadorClick;

// Cria os slides com base na lista de arquivos
fotosClick.forEach((arquivo, indice) => {
    const slide = document.createElement("figure");
    slide.className = "slide-click";

    // A primeira foto começa visível
    if (indice === 0) {
        slide.classList.add("ativo");
    }

    const imagem = document.createElement("img");
    imagem.src = `imagens/${arquivo}`;
    imagem.alt = `Fotografia ${indice + 1} do Projeto Click — Brazlândia 2024`;
    imagem.loading = indice === 0 ? "eager" : "lazy";

    // Ajusta a moldura à proporção original da foto, evitando faixas
    function ajustarMoldura() {
        if (imagem.naturalWidth && imagem.naturalHeight) {
            carrosselJanela.style.aspectRatio =
                `${imagem.naturalWidth} / ${imagem.naturalHeight}`;
        }
    }

    // Ajusta a proporção quando a imagem terminar de carregar
    imagem.addEventListener("load", ajustarMoldura);

    // Abre a imagem ampliada se a pessoa clicar nela
    imagem.addEventListener("click", () => {
        abrirFotoAmpliada(imagem.src, imagem.alt);
    });

    slide.appendChild(imagem);
    carrosselImagens.appendChild(slide);

    // Ajusta também se o arquivo já estiver carregado pelo navegador
    if (indice === 0 && imagem.complete) {
        ajustarMoldura();
    }
});

// Atualiza o slide visível e o contador
function mostrarFotoClick(novoIndice) {
    const slides = carrosselImagens.querySelectorAll(".slide-click");

    slides[indiceClickAtual].classList.remove("ativo");

    // Faz o carrossel voltar ao início depois da última foto
    indiceClickAtual = (novoIndice + fotosClick.length) % fotosClick.length;

    slides[indiceClickAtual].classList.add("ativo");

    // Atualiza a moldura para acompanhar a proporção da foto atual
    const imagemAtual = slides[indiceClickAtual].querySelector("img");

    if (imagemAtual.complete && imagemAtual.naturalWidth) {
        carrosselJanela.style.aspectRatio =
            `${imagemAtual.naturalWidth} / ${imagemAtual.naturalHeight}`;
    } else {
        imagemAtual.addEventListener(
            "load",
            () => {
                carrosselJanela.style.aspectRatio =
                    `${imagemAtual.naturalWidth} / ${imagemAtual.naturalHeight}`;
            },
            { once: true }
        );
    }

    contadorClick.textContent =
        `${indiceClickAtual + 1} / ${fotosClick.length}`;
}

// Avança para a próxima foto
function proximaFotoClick() {
    mostrarFotoClick(indiceClickAtual + 1);
}

// Volta para a foto anterior
function fotoClickAnterior() {
    mostrarFotoClick(indiceClickAtual - 1);
}

// Para o temporizador antes de iniciar outro
function pararCarrosselClick() {
    clearInterval(temporizadorClick);
}

// Inicia a troca automática a cada cinco segundos
function iniciarCarrosselClick() {
    pararCarrosselClick();

    temporizadorClick = setInterval(() => {
        proximaFotoClick();
    }, 5000);
}

// Liga o botão de avançar
botaoClickProximo.addEventListener("click", () => {
    proximaFotoClick();
    iniciarCarrosselClick();
});

// Liga o botão de voltar
botaoClickAnterior.addEventListener("click", () => {
    fotoClickAnterior();
    iniciarCarrosselClick();
});

// Pausa quando o cursor está sobre o carrossel
carrossel.addEventListener("mouseenter", pararCarrosselClick);
carrossel.addEventListener("mouseleave", iniciarCarrosselClick);

// Pausa enquanto alguém usa os controles com o teclado
carrossel.addEventListener("focusin", pararCarrosselClick);
carrossel.addEventListener("focusout", iniciarCarrosselClick);

// Respeita a preferência do dispositivo por menos animações
const prefereMovimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// Só começa a troca automática se a pessoa não pediu menos movimento
if (!prefereMovimentoReduzido) {
    iniciarCarrosselClick();
}
