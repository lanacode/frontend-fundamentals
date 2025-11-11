document.addEventListener('DOMContentLoaded', () => {
    // ... (Variáveis e referências do DOM) ...
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let contadorTentativas = 0;

    const campoPalpite = document.getElementById('campo-palpite');
    const botaoPalpitar = document.getElementById('botao-palpitar');
    const listaPalpites = document.getElementById('lista-palpites');
    const contadorSpan = document.getElementById('contador-tentativas');
    const dicaElemento = document.getElementById('dica');
    const botaoNovoJogo = document.getElementById('botao-novo-jogo'); // Botão na seção de novo jogo
    const botaoComecar = document.getElementById('botao-comecar');
    const secaoControles = document.getElementById('secao-controles');
    const secaoHistorico = document.getElementById('secao-historico');


    // --- FUNÇÕES DO JOGO ---

    function finalizarJogo() {
        // Desativa os controles de input
        campoPalpite.disabled = true;
        botaoPalpitar.disabled = true;

        // Exibe o botão de Novo Jogo (removendo a classe 'oculto')
        botaoNovoJogo.classList.remove('oculto');
    }

    function reiniciarJogo() {
        // 1. Reset das variáveis e sorteio de um novo número secreto
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        contadorTentativas = 0;

        // 2. Reset dos elementos visuais
        dicaElemento.textContent = 'Digite seu palpite:';
        contadorSpan.textContent = 0;

        // 3. Limpa o histórico (remove todos os <li> da <ul>)
        while (listaPalpites.firstChild) {
            listaPalpites.removeChild(listaPalpites.firstChild);
        }

        // 4. Reativa os controles e oculta o botão de Novo Jogo
        campoPalpite.disabled = false;
        botaoPalpitar.disabled = false;
        botaoNovoJogo.classList.add('oculto');

        campoPalpite.focus();
    }

    // --- 5. LISTENERS DE EVENTOS ---

    // Listener para o botão 'Começar' (inicia a primeira partida)
    botaoComecar.addEventListener('click', () => {
        botaoComecar.classList.add('oculto');
        secaoControles.style.display = 'block';
        secaoHistorico.style.display = 'block';
        dicaElemento.textContent = 'Digite seu primeiro palpite:';
        campoPalpite.focus();
    });

    // Listener para o botão 'Adivinhar' (lógica principal)
    botaoPalpitar.addEventListener('click', function (evento) {
        evento.preventDefault();

        // ... (Lógica de validação e adição de LI) ...
        const palpite = parseInt(campoPalpite.value);

        if (isNaN(palpite) || palpite < 1 || palpite > 100) {
            alert("Por favor, digite um número inteiro válido entre 1 e 100.");
            campoPalpite.value = '';
            campoPalpite.focus();
            return;
        }

        contadorTentativas++;
        contadorSpan.textContent = contadorTentativas;

        const novoLi = document.createElement('li');
        novoLi.textContent = palpite;
        listaPalpites.prepend(novoLi);

        if (palpite === numeroSecreto) {
            // 🎉 Se acertou:
            dicaElemento.textContent = `🎉 Parabéns! Você acertou o número secreto (${numeroSecreto}) em ${contadorTentativas} tentativas!`;

            novoLi.style.backgroundColor = 'var(--verde)';
            novoLi.style.color = '#011522';

            finalizarJogo(); // Chama a função que exibe o botão

        } else {
            // ❌ Se errou:
            dicaElemento.textContent = `❌ Errado! O palpite é ${palpite > numeroSecreto ? 'muito alto' : 'muito baixo'}. Tente novamente!`;
        }

        campoPalpite.value = '';
        campoPalpite.focus();
    });

    // Listener para o botão 'Novo Jogo' (reinicia a partida)
    // ⚠️ Importante: Anexamos este listener apenas uma vez.
    botaoNovoJogo.addEventListener('click', reiniciarJogo);
});