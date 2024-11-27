document.addEventListener('DOMContentLoaded', function() {
    // Elementos de áudio
    const initialMusic = document.getElementById('initial-music');
    const successMusic = document.getElementById('success-music');
    const buttonSound = document.getElementById('button-sound');
    const musicToggle = document.getElementById('music-toggle');
    
    let currentMusic = initialMusic;
    
    // Configurar volumes
    initialMusic.volume = 0.5;
    successMusic.volume = 0.3; // Volume mais baixo para a música final
    buttonSound.volume = 0.5;
    
    // Iniciar música inicial automaticamente
    initialMusic.play().catch(err => console.log('Erro ao tocar música:', err));
    
    // Controle de música
    musicToggle.addEventListener('click', () => {
        if (currentMusic.paused) {
            currentMusic.play().catch(err => console.log('Erro ao tocar música:', err));
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            currentMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Função para trocar música
    function changeMusic(newMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
        currentMusic = newMusic;
        currentMusic.play().catch(err => console.log('Erro ao tocar música:', err));
    }

    // Botões e telas
    const startButton = document.getElementById('start-button');
    const acceptButton = document.getElementById('accept-button');
    const registerButton = document.getElementById('register-player');
    const playerNameInput = document.getElementById('player-name');
    
    const screens = {
        initial: document.querySelector('.initial-screen'),
        loading: document.querySelector('.loading-screen'),
        mission: document.querySelector('.mission-screen'),
        player: document.querySelector('.player-screen'),
        confirmation: document.querySelector('.confirmation-screen')
    };

    // Função para tocar som do botão
    function playButtonSound() {
        buttonSound.currentTime = 0;
        buttonSound.play().catch(err => console.log('Erro ao tocar som:', err));
    }

    // Função para mudar de tela
    function switchScreen(from, to) {
        from.classList.remove('active');
        to.classList.add('active');
    }

    // Simulação de carregamento
    function simulateLoading() {
        return new Promise(resolve => {
            const progressBar = document.querySelector('.progress-bar');
            const loadingText = document.querySelector('.loading-text');
            let progress = 0;
            const messages = [
                'Iniciando sistemas...',
                'Carregando sorrisos...',
                'Preparando diversão...',
                'Maximizando alegria...',
                'Ativando modo festa...',
                'Estabelecendo conexão segura...',
                'Verificando credenciais...',
                'Preparando briefing...',
                'Analisando nível de diversão...',
                'Calculando taxa de sorrisos...',
                'Medindo energia para festa...',
                'Confirmando localização...',
                'Verificando power-ups...',
                'Calibrando sistema de diversão...',
                'PRONTO!'
            ];
            let currentMessage = 0;

            // Atualizar a barra de progresso
            const progressInterval = setInterval(() => {
                progress += 0.5;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(messageInterval);
                    resolve();
                }
            }, 90); // ~18 segundos total

            // Atualizar as mensagens
            const messageInterval = setInterval(() => {
                if (currentMessage < messages.length) {
                    loadingText.textContent = messages[currentMessage];
                    currentMessage++;
                }
            }, 1200); // Nova mensagem a cada 1.2 segundos
        });
    }

    // Botão inicial
    startButton.addEventListener('click', async () => {
        playButtonSound();
        switchScreen(screens.initial, screens.loading);
        await simulateLoading();
        switchScreen(screens.loading, screens.mission);
    });

    // Botão de aceitar missão
    acceptButton.addEventListener('click', () => {
        playButtonSound();
        switchScreen(screens.mission, screens.player);
    });

    // Botão de registro
    registerButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            playButtonSound();
            document.getElementById('display-player-name').textContent = playerName;
            switchScreen(screens.player, screens.confirmation);
            changeMusic(successMusic);
            startCountdown();
        } else {
            alert('Por favor, digite seu nome!');
        }
    });

    // Contagem regressiva
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        const jokeText = document.querySelector('.joke-text');
        let count = 10;
        
        jokeText.style.display = 'none';
        jokeText.classList.remove('show');
        countdownElement.textContent = count;
        
        const interval = setInterval(() => {
            count--;
            countdownElement.textContent = count;
            
            if (count <= 0) {
                clearInterval(interval);
                countdownElement.textContent = '0';
                
                setTimeout(() => {
                    jokeText.style.display = 'block';
                    jokeText.textContent = 'É brincadeira!';
                    requestAnimationFrame(() => {
                        jokeText.classList.add('show');
                    });
                }, 1500);
            }
        }, 1000);
    }
});
