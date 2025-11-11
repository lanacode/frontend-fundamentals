document.addEventListener('DOMContentLoaded', () => {
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let contadorTentativas = 0;

    const campoPalpite = document.getElementById('campo-palpite');
    const botaoPalpitar = document.getElementById('botao-palpitar');
    const listaPalpites = document.getElementById('lista-palpites');
    const contadorSpan = document.getElementById('contador-tentativas');
    const dica = document.getElementById('dica');
    const botaoNovoJogo = document.getElementById('botao-novo-jogo');
    const botaoComecar = document.getElementById('botao-comecar');
    const secaoControles = document.getElementById('secao-controles');
    const secaoHistorico = document.getElementById('secao-historico');
    const secaoNovoJogo = document.getElementById('secao-novo-jogo');


    function finalizarJogo() {
        campoPalpite.disabled = true;
        botaoPalpitar.disabled = true;

        secaoNovoJogo.classList.remove('oculto');
    }

    botaoNovoJogo.addEventListener('click', function () {
        location.reload();
    });

    function reiniciarJogo() {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        contadorTentativas = 0;

        contadorSpan.textContent = 0;

        while (listaPalpites.firstChild) {
            listaPalpites.removeChild(listaPalpites.firstChild);
        }

        campoPalpite.style.display = 'flex';
        botaoPalpitar.style.display = 'flex';
        secaoNovoJogo.classList.add('oculto');

        campoPalpite.focus();
    }


    botaoComecar.addEventListener('click', () => {
        botaoComecar.classList.add('oculto');
        secaoControles.style.display = 'block';
        secaoHistorico.style.display = 'block';
        dica.textContent = 'Digite seu primeiro palpite!';
        campoPalpite.focus();
    });

    botaoPalpitar.addEventListener('click', function (evento) {
        evento.preventDefault();

        const palpite = parseInt(campoPalpite.value);

        if (isNaN(palpite) || palpite < 1 || palpite > 100) {
            alert("Por favor, digite um número inteiro entre 1 e 100.");
            campoPalpite.value = '';
            campoPalpite.focus();
            return;
        }

        contadorTentativas++;
        contadorSpan.textContent = contadorTentativas;

        const novoLi = document.createElement('li');
        novoLi.classList.add('li-palpite');
        novoLi.textContent = palpite;
        listaPalpites.prepend(novoLi);

        if (palpite === numeroSecreto) {
            dica.textContent = `🎉 Parabéns! Você acertou o número secreto (${numeroSecreto}) em ${contadorTentativas} tentativas!`;
            secaoControles.style.display = 'none';
            secaoNovoJogo.style.display = 'flex';
            novoLi.style.backgroundColor = 'var(--verde)';
            novoLi.style.padding = '5px';
            novoLi.style.borderRadius = '999px';
            novoLi.style.color = '#011522';

            finalizarJogo();

        } else {
            dica.textContent = `❌ Errado! O palpite é ${palpite > numeroSecreto ? 'muito alto' : 'muito baixo'} Tente novamente!`;
        }

        campoPalpite.value = '';
        campoPalpite.focus();
    });

    secaoNovoJogo.addEventListener('click', reiniciarJogo);
});