// ===== Configuração da data de liberação =====
//const releaseDate = new Date("November 25, 2025 00:00:00").getTime();
// Teste rápido:
//const releaseDate = new Date(new Date().getTime() + 4000).getTime();
const releaseDate = new Date(2025, 10, 25, 0, 0, 0).getTime();


// ===== Seleção dos elementos =====
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');


const openBtn = document.getElementById('openBtn');
const lockScreen = document.getElementById('lock');
const content = document.getElementById('content');
const typingEl = document.getElementById('typing');
const bgAudio = document.getElementById('bgAudio');
const playMusicBtn = document.getElementById('playMusic');

// ===== Mensagem de digitação =====
const messages = [
    {
        id: "typing",
        text: `Antes de tudo, quero que saiba que este pequeno cantinho foi feito inteiramente para você.  
                Cada foto, cada palavra, cada detalhe aqui guardam um pedacinho do que aprendi com você e do que admiro em quem você é.\n  
                
                Este não é só uma página — é um reflexo da Emilly que conheci,  
                da Emilly que me encantou, que me ensinou, e que continua sendo uma das pessoas mais incríveis que já passaram pela minha vida.\n  
                
                Hoje, o dia é seu, mas a verdade é que todos os dias em que você existe já são, por si só, especiais.  
                E é por isso que quis registrar aqui tudo o que vejo e sinto quando penso em você:  
                todas as versões da Emilly que tive o privilégio de conhecer.\n`,
        photosAfter: [] // sem fotos neste primeiro texto
    },
    {
        id: "typing2",
        text: `E quero começar falando desta Emilly,
                a primeira Emilly que conheci. Uma Emilly que era cheia de medos e incertezas sobre si própria,
                mas uma Emilly tão incrivelmente doce, gentil e amorosa que era impossível não se encantar por ela,
                uma emilly que sempre deu alegria e sorrisos a todos a sua volta, uma Emilly cheia de amor, carinho,
                justiça....poderia descrevê-la por horas. Mas o mais importante,
                uma Emilly cheia de amor, sabe? uma Emilly que não senti ódio mesmo que a machuquem,
                uma Emilly como nenhuma outra Emilly ou mulher, uma diferente e especial`,
        photosAfter: [document.querySelectorAll('.photos-test')[0]]
    },
    {
        id: "typing3",
        text: `Agora essa Emilly... que Emilly incrível!  
                Essa Emilly se despedia de um lugar de conforto para um mundo totalmente novo,
                e por mais que estivesse com medo (e quando eu digo medo, digo MUITO medo porque você é a maior medrosa do mundo),
                ela sorriu outra vez.  
                O que me assusta e continua me encantando até hoje é a sua capacidade de sempre sorrir,
                não importa o que aconteça.`,
        photosAfter: [document.querySelectorAll('.photos-test')[1]]
    },
    {
        id: "typing4",
        text: `Essa Emilly me proporcionou um ano incrível e cheio de aprendizados.
                E quando eu digo aprendizados, posso dizer que não seria o homem que sou hoje sem ela.
                Sempre sorridente, amorosa, carinhosa, gentil e companheira, uma alegria e espirito 
                que contagia todos a sua volta, a definição de luz que brilha no escuro.
                Essa Emilly não só enfrenta seus medos, mas também suporta os dos outros. E Emilly que consola mesmo
                se estiver triste, que escuta mesmo que queira falar e que está sempre disposta a ajudar
                não importa quem seja, o tipo de pessoa que trás felicidade as nossas vidas,
                essa é a Emilly que me encantou e me ensinou, e não só a mim,
                 a ser a melhor.`,
        photosAfter: [
            document.querySelectorAll('.photos-test')[2],

        ]
    },
    {
        id: "typing6",
        text: `Essa Emilly...para ela não tem definição simples.
            Aquela que não está só nos momentos bons, mas principalmente nos ruins.
            Que me ensinou umas das lições mais dificeis que já tive, mas
            necessária, que era o quanto eu precisava amadurecer e me tornar um homem melhor.
            Essa Emilly tem um coração tão grande, tão cheio de amor e empatia,
            que parece abraçar o mundo inteiro mesmo quando o mundo não merece.\n

            Essa Emilly?
            Eu vi essa Emilly amar uma menininha bonita e pequena com os olhos de uma mãe.
            Eu vi ela querer proteger, cuidar, estar sempre por perto, mesmo se não fosse necessário.
            E isso só mostra o quanto todos os textos acima se completam em uma só resposta:
            o quão maravilhosa e incrível você é, tem se tornado e será.\n

            Você é um dos tesouros mais raros que a humanidade possui —
            não apenas pela beleza, que nenhuma outra se compara,
            mas pelo coração precioso que ilumina quem tem a sorte de estar ao seu lado.\n

            Então, se eu pudesse resumir todas as Emillys que conheci,
            eu diria apenas uma coisa:
            é impossível não se encantar por qualquer uma delas.\n
            
            Para o seu dia eu desejo um dia repleto de amor, alegria e momentos inesquecíveis.
            Que você continue a brilhar intensamente, espalhando sua luz e amor por onde passar
            como você tem sempre feito.
            Feliz aniversário! Que este novo ano de vida seja tão maravilhoso.\n 

Feliz aniversário 💖`,
        photosAfter: [document.querySelectorAll('.photos-test')[3],
            document.querySelectorAll('.photos-test')[4]] // sem fotos extras após o último texto
    }
];


// ===== Esconde textos e fotos antes de começar =====
function clearInitialContent() {
    messages.forEach(msg => {
        const el = document.getElementById(msg.id);
        if (el) el.textContent = "";
    });

    document.querySelectorAll('.photos-test').forEach(p => {
        p.classList.remove('show');
    });
}

// ===== Digitação com efeito =====
function typeMessage(elementId, text) {
    return new Promise((resolve) => {
        const el = document.getElementById(elementId);
        if (!el) return resolve();

        el.style.opacity = 1;
        el.textContent = "";
        let i = 0;

        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, 80);
    });
}

// ===== Sequência completa de digitação =====
async function startTypingSequence() {
    clearInitialContent();

    for (const msg of messages) {
        // mostra as fotos antes de digitar o texto
        if (msg.photosAfter && msg.photosAfter.length > 0) {
            for (const photoGroup of msg.photosAfter) {
                if (photoGroup) {
                    photoGroup.classList.add('show');
                }
            }
        }

        await typeMessage(msg.id, msg.text);
        await new Promise(r => setTimeout(r, 1200));
    }

    // 👉 Exibe o botão só depois do último texto
    showFinalButton();
}

// ===== Mostra o botão no final =====
function showFinalButton() {
    const btn = document.getElementById("surpriseFlower");
    if (!btn) return;
    btn.style.display = "block";
    btn.style.opacity = 0;

    setTimeout(() => {
        btn.style.transition = "opacity 1.5s ease";
        btn.style.opacity = 1;
    }, 200);
}

// ===== Libera o conteúdo =====
function unlockContent() {
    lockScreen.style.display = "none";
    content.style.display = "block";
    content.setAttribute("aria-hidden", "false");
    startTypingSequence();
}

// ===== Evento do botão "Abrir surpresa" =====
openBtn.addEventListener('click', () => {
    if (content.style.display === 'block') return;
    unlockContent();
});

// ===== Contador =====
function updateCountdown() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    if (distance <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        unlockContent();
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// ===== Botão surpresa: redireciona =====
const surpriseBtn = document.getElementById('surpriseFlower');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        window.location.href = 'flower.html';
    });
}