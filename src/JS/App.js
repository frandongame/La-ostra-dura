/**
 * ============================================================================
 * PROYECTO: LA OSTRA DURA - MOTOR DE JUEGO (v3.1.0 - FIXED)
 * ============================================================================
 * Correcciones aplicadas:
 * - Fix animaciones de combate (hit/attacking se remueven correctamente)
 * - Fix localStorage sincronización
 * - Fix modal responsive
 * - Fix sistema de comentarios (typing mejorado)
 * - Fix selección de imágenes únicas
 * - Fix re-habilitación de controles en errores
 * ============================================================================
 */

// ============================================================================
// 1. CONFIGURACIÓN Y CONSTANTES GLOBALES
// ============================================================================

const CONFIG = {
    initialBalance: 5000,
    minBet: 50,
    maxBet: 10000,
    volume: 0.5,
    paths: {
        images: '../assets/images/',
        sounds: '../assets/sounds/'
    },
    delays: {
        typingSpeed: 30,
        roundDelay: 2000,
        turnDelay: 1200,
        introDelay: 4000
    }
};

// ============================================================================
// 2. BASE DE DATOS LOCAL (MOCK DATA)
// ============================================================================

const DB_FIGHTER_NAMES = [
    'ALMEJANDRO MAGNO', 'EL MAKO', 'ALMEJA NITRO', 'CONCHA TU MADRE',
    'NAPOLEÓN BONALMEJA', 'BRUCE LEE-MEJA', 'MOHAMMED ALMEJÁ', 'ROCKY BALMEJA',
    'MIKE CONCHAISON', 'PEQUEÑO BASTARDO', 'CONOR MCCONCHA', 'ANDERSON SALMEJA',
    'JON CONCHONES', 'KHABIB NURMAGOALMEJA', 'EL SCAPERLAS', 'DEMETRIOUS CONCHASON',
    'ALMEJA VELÁSQUEZ', 'FRANCIS NGANNALMEJA', 'MR.CONCHUDO', 'KAMARU USCHAMEJA',
    'PROFETA DEL SUSHI', 'GUARDIÁN DE LA PAELLA', 'AHOGADOR DE PECES', 'JUSTIN GAETHJEJA',
    'ALJAMAIN CONCHALING', 'ESPANTA CEBOS', 'MERAB DVALISHVALMEJA', 'ILIA TOPURIEJA',
    'LA PERLA NEGRA', 'CAPITÁN CORAL', 'TIBURÓN DE TIERRA', 'EL CRUSTÁCEO CASCARRABIAS',
    'BOB ESPONJA DOPEADO', 'PATRICIO ESTRELLA DE LA MUERTE', 'CALAMARDO GUAPO', 'PLANKTON ROID',
    'DON CANGREJO CAPITALISTA', 'ARENITA MEJILLAS DE ACERO', 'LA OSTRA ASESINA', 'EL MOLUSCO MALDITO'
];

const DB_FIGHTER_STATS = [
    { type: 'Tank', power: 75, defense: 90, speed: 60, hp: 120 },
    { type: 'Glass Cannon', power: 98, defense: 50, speed: 95, hp: 80 },
    { type: 'Balanced', power: 85, defense: 80, speed: 80, hp: 100 },
    { type: 'Dodger', power: 70, defense: 60, speed: 100, hp: 90 },
    { type: 'Bruiser', power: 90, defense: 85, speed: 70, hp: 110 },
    { type: 'Speedster', power: 80, defense: 70, speed: 98, hp: 95 },
    { type: 'Juggernaut', power: 95, defense: 95, speed: 50, hp: 130 }
];

const DB_COMMENTS = {
    intro: [
        '🎙️ ¡Buenas noches, degenerados! Soy el Pulpo Locutor desde el fondo del abismo.',
        '🎙️ ¡Preparen sus billeteras! El chef ya está afilando los cuchillos.',
        '🎙️ ¡Bienvenidos a LA OSTRA DURA! Donde la dignidad se pierde más rápido que el dinero.',
        '🎙️ El olor a miedo y a mantequilla de ajo inunda la arena...',
        '🎙️ Hoy tenemos un menú especial: ¡Dolor y Mariscos!',
        '🎙️ Recuerden: La casa siempre gana, pero soñar es gratis (por ahora).'
    ],
    roundStart: [
        '🔔 ¡ROUND {round}! ¿Quién terminará en el plato?',
        '🔔 ¡Suena la campana! ¡Protéjanse las conchas!',
        '🔔 Round {round}: La tensión se corta con un cuchillo de cocina.',
        '🔔 ¡A pelear! El perdedor paga la cena (literalmente es la cena).',
        '🔔 ¡Round {round}! ¡Muestren de qué están hechos (carbonato de calcio)!',
        '🔔 ¡Comienza la ronda {round}! ¡Hagan sus últimas oraciones a Poseidón!'
    ],
    lightHit: [
        '💥 Un golpe suave, apenas le quitó el alga.',
        '💥 ¡Plaf! Sonó como una chancla mojada.',
        '💥 Le acarició la cara. ¿Eso fue un ataque o un coqueteo?',
        '💥 Golpe de advertencia. "¡No me toques la perla!"',
        '💥 ¡Boing! Rebotó en su caparazón.',
        '💥 Un ataque tímido. Le falta odio a ese golpe.'
    ],
    heavyHit: [
        '💥 ¡BAM! ¡Le movió hasta los ancestros!',
        '💥 ¡CRACK! Creo que escuché una grieta...',
        '💥 ¡QUÉ GOLPAZO! Le sacó el agua salada por las orejas (si tuviera).',
        '💥 ¡PUM! Directo a la valva. Eso va a doler mañana.',
        '💥 ¡ZASCA! Le reinició el Windows submarino.',
        '💥 ¡BRUTAL! Ese golpe se sintió en la Atlántida.'
    ],
    critical: [
        '🔥🔥🔥 ¡¡CRÍTICO!! ¡LE ARRANCÓ MEDIA CONCHA!',
        '🔥🔥🔥 ¡¡DEVASTADOR!! ¡ALGUIEN LLAME A LA AMBULANCIA MARINA!',
        '🔥🔥🔥 ¡¡FATALITY!! ¡ESO FUE ILEGAL EN 7 OCÉANOS!',
        '🔥🔥🔥 ¡¡GOLPE MAESTRO!! ¡Le ha dado en su punto débil!',
        '🔥🔥🔥 ¡¡INSANE!! ¡El público enloquece con esa violencia!',
        '🔥🔥🔥 ¡¡DESTRUCCIÓN!! ¡Lo ha dejado viendo estrellas de mar!'
    ],
    dodge: [
        '💀 ¡Matrix! Esquivó ese golpe como si debiera dinero.',
        '💀 ¡Falló! Se movió más rápido que un pez vela con cafeína.',
        '💀 ¡Aire! Solo golpeó el agua. Qué vergüenza.',
        '💀 ¡Increíble agilidad para algo sin piernas!',
        '💀 ¡Uy! Por un pelo de gamba no le da.',
        '💀 ¡Reflejos de ninja! Esa almeja entrena crossfit.'
    ],
    lowHp: [
        '😰 ¡Se tambalea! Huele a sopa de mariscos...',
        '😰 ¡Está a un golpe de ser paella!',
        '😰 ¡Resiste! ¡No vayas hacia la luz (del barco pesquero)!',
        '😰 ¡Está sangrando... o es salsa de tomate? No, es sangre.',
        '😰 ¡El chef está precalentando la sartén! ¡Corre!',
        '😰 ¡Peligro crítico! ¡Su vida pende de un hilo de pescar!'
    ],
    win: [
        '🏆 ¡TENEMOS GANADOR! La cena está servida.',
        '🏆 ¡VICTORIA! El mar tiene un nuevo rey (o reina).',
        '🏆 ¡SE ACABÓ! Recojan los pedazos del perdedor.',
        '🏆 ¡K.O.! Una victoria limpia... bueno, llena de arena y sangre.',
        '🏆 ¡INCREÍBLE! Nadie daba un duro por él, ¡pero ganó!',
        '🏆 ¡CAMPEÓN! Ahora a cobrar (o a pagar).'
    ],
    lose: [
        '🔪 El perdedor está siendo marinado en este momento.',
        '🔪 ¡Derrota humillante! Al menos sabrá bien con limón.',
        '🔪 Se acabó para él. Descanse en (pez) paz.',
        '🔪 ¡Adiós! Fue un buen luchador, será un mejor plato.',
        '🔪 La derrota amarga... casi tanto como la bilis de pez.',
        '🔪 Ha caído. El ciclo de la vida (y la cocina) continúa.'
    ]
};

// ============================================================================
// 3. CLASE AUDIOMANAGER (MOTOR DE SONIDO ROBUSTO)
// ============================================================================

class AudioManager {
    constructor() {
        this.sounds = {};
        this.bgmMenu = null; // Música del menú (soundtrack.mp3)
        this.bgmFight = null; // Música de pelea (pelea-fondo.mp3)
        this.currentBGM = null; // BGM actual sonando
        this.isMuted = false;
        this.masterVolume = 0.4;
        this.initialized = false;
        this.isFighting = false; // Estado de pelea
        
        this.library = {
            bgmMenu: 'soundtrack.mp3',
            bgmFight: 'pelea-fondo.mp3',
            hit_light: 'puñetazos.mp3',
            hit_heavy: 'puñetazoFuerte.mp3',
            crit: 'puñetazoFuerte.mp3',
            dodge: 'esquivar.mp3',
            cash: 'dineros.mp3',
            win: 'victoria.mp3',
            lose: 'derrota.mp3',
            bell: 'campana.mp3',
            click: 'dineros.mp3'
        };
    }

    init() {
        if (this.initialized) return;

        console.log("🔊 AudioManager: Inicializando sistema de sonido...");
        
        // Cargar ambas pistas de música
        this.bgmMenu = new Audio(CONFIG.paths.sounds + this.library.bgmMenu);
        this.bgmMenu.loop = true;
        this.bgmMenu.volume = this.masterVolume * 0.8;

        this.bgmFight = new Audio(CONFIG.paths.sounds + this.library.bgmFight);
        this.bgmFight.loop = true;
        this.bgmFight.volume = this.masterVolume * 0.9; // Un poco más alta para la pelea

        // Precargar efectos
        for (const [key, filename] of Object.entries(this.library)) {
            if (key !== 'bgmMenu' && key !== 'bgmFight') {
                const audio = new Audio(CONFIG.paths.sounds + filename);
                audio.preload = 'auto';
                this.sounds[key] = audio;
            }
        }

        // Iniciar con música del menú
        this.playMenuMusic();
        this.initialized = true;
    }

    playMenuMusic() {
        if (this.isMuted) return;
        
        console.log("🎵 [MENU] Cambiando a soundtrack.mp3...");
        
        // DETENER completamente la música de pelea
        if (this.bgmFight) {
            this.bgmFight.pause();
            this.bgmFight.currentTime = 0;
            console.log("⏹️ pelea-fondo.mp3 detenido");
        }

        // REPRODUCIR música del menú
        if (this.bgmMenu) {
            this.bgmMenu.currentTime = 0;
            this.bgmMenu.volume = this.masterVolume * 0.8;
            
            const playPromise = this.bgmMenu.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("✅ [MENU] soundtrack.mp3 sonando");
                    this.currentBGM = this.bgmMenu;
                    this.isFighting = false;
                }).catch(error => {
                    console.error("❌ [MENU] Error reproduciendo soundtrack:", error);
                });
            }
        }
    }

    playFightMusic() {
        if (this.isMuted) return;
        
        console.log("🎵 [PELEA] Cambiando a pelea-fondo.mp3...");
        
        // DETENER completamente la música del menú
        if (this.bgmMenu) {
            this.bgmMenu.pause();
            this.bgmMenu.currentTime = 0;
            console.log("⏹️ soundtrack.mp3 detenido");
        }

        // REPRODUCIR música de pelea
        if (this.bgmFight) {
            this.bgmFight.currentTime = 0;
            this.bgmFight.volume = this.masterVolume * 0.9;
            
            const playPromise = this.bgmFight.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("✅ [PELEA] pelea-fondo.mp3 sonando");
                    this.currentBGM = this.bgmFight;
                    this.isFighting = true;
                }).catch(error => {
                    console.error("❌ [PELEA] Error reproduciendo pelea-fondo:", error);
                });
            }
        }
    }

    // Efecto de fade in
    fadeIn(audio) {
        if (!audio) return;
        
        audio.volume = 0;
        const targetVolume = this.masterVolume * (audio === this.bgmFight ? 0.9 : 0.8);
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                let currentVol = 0;
                const fadeInterval = setInterval(() => {
                    if (currentVol < targetVolume) {
                        currentVol += 0.05;
                        audio.volume = Math.min(currentVol, targetVolume);
                    } else {
                        audio.volume = targetVolume;
                        clearInterval(fadeInterval);
                    }
                }, 50);
            }).catch(error => {
                console.warn("🔊 Autoplay bloqueado. Esperando interacción UI.");
            });
        }
    }

    // Efecto de fade out
    fadeOut(audio, callback) {
        if (!audio || audio.paused) {
            if (callback) callback();
            return;
        }
        
        const fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume = Math.max(audio.volume - 0.05, 0);
            } else {
                audio.volume = 0;
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 50);
    }

    stopAllMusic() {
        if (this.bgmMenu) {
            this.bgmMenu.pause();
            this.bgmMenu.currentTime = 0;
        }
        if (this.bgmFight) {
            this.bgmFight.pause();
            this.bgmFight.currentTime = 0;
        }
    }

    play(key) {
        if (this.isMuted || !this.sounds[key]) return;

        try {
            const soundClone = this.sounds[key].cloneNode();
            soundClone.volume = this.masterVolume;
            
            const playPromise = soundClone.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn(`🔊 Error reproduciendo ${key}:`, error);
                });
            }
        } catch (e) {
            console.error(`🔊 Error crítico en audio ${key}:`, e);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopAllMusic();
        } else {
            // Restaurar la música según el estado
            if (this.isFighting) {
                this.playFightMusic();
            } else {
                this.playMenuMusic();
            }
        }
        console.log(`🔊 Audio Muted: ${this.isMuted}`);
        return this.isMuted;
    }
}

const audioManager = new AudioManager();

// ============================================================================
// 4. CLASE GAMEENGINE (LÓGICA DEL JUEGO)
// ============================================================================

class GameEngine {
    constructor() {
        this.balance = Number(localStorage.getItem('balance')) || CONFIG.initialBalance;
        this.betAmount = CONFIG.minBet;
        this.selectedFighter = null;
        this.isFighting = false;
        
        this.fighters = {
            1: { name: '', stats: {}, hp: 100, maxHp: 100, image: '' },
            2: { name: '', stats: {}, hp: 100, maxHp: 100, image: '' }
        };
        
        this.round = 1;
        this.history = [];
        this.imagesList = [];
        this.usedImages = []; // FIX: Track imágenes usadas
        
        this.ui = new UIController();
    }

    init() {
        this.loadImagesFromDOM();
        this.randomizeFighters();
        this.ui.updateBalance(this.balance);
        this.ui.addSystemLog("Sistema cargado correctamente.");
        this.saveBalance(); // FIX: Save inicial
    }

    loadImagesFromDOM() {
        try {
            const dataContainer = document.getElementById('img-data-container');
            if (dataContainer && dataContainer.dataset.criaturas) {
                const rawData = JSON.parse(dataContainer.dataset.criaturas);
                this.imagesList = rawData.map(img => CONFIG.paths.images + img);
                console.log("🖼️ Imágenes cargadas:", this.imagesList.length);
            } else {
                console.warn("⚠️ No se encontraron datos de imágenes PHP.");
                this.imagesList = [
                    'https://via.placeholder.com/150?text=Almeja1', 
                    'https://via.placeholder.com/150?text=Pez1'
                ];
            }
            
            this.resultImages = {
                win: dataContainer ? dataContainer.dataset.ganador : '',
                lose1: dataContainer ? dataContainer.dataset.derrota1 : '',
                lose2: dataContainer ? dataContainer.dataset.derrota2 : ''
            };

        } catch (e) {
            console.error("❌ Error parseando imágenes PHP:", e);
        }
    }

    randomizeFighters() {
        this.round = 1;
        this.selectedFighter = null;
        this.usedImages = []; // FIX: Reset imágenes usadas
        this.ui.resetHealthBars();
        this.ui.clearSelection();
        this.ui.updateRound(1);
        
        this.fighters[1] = this.createRandomFighter();
        
        do {
            this.fighters[2] = this.createRandomFighter();
        } while (
            this.fighters[2].name === this.fighters[1].name || 
            this.fighters[2].image === this.fighters[1].image
        );

        this.ui.renderFighter(1, this.fighters[1]);
        this.ui.renderFighter(2, this.fighters[2]);
        this.ui.updateBetNames(
            this.fighters[1].name, 
            this.fighters[2].name, 
            this.fighters[1].image, 
            this.fighters[2].image
        );
    }

    createRandomFighter() {
        const name = DB_FIGHTER_NAMES[Math.floor(Math.random() * DB_FIGHTER_NAMES.length)];
        const templateStats = DB_FIGHTER_STATS[Math.floor(Math.random() * DB_FIGHTER_STATS.length)];
        
        const variance = () => 0.9 + Math.random() * 0.2;
        
        const stats = {
            power: Math.floor(templateStats.power * variance()),
            defense: Math.floor(templateStats.defense * variance()),
            speed: Math.floor(templateStats.speed * variance()),
            hp: Math.floor(templateStats.hp * variance())
        };

        // FIX: Seleccionar imagen única
        let image = '';
        if (this.imagesList.length > 0) {
            const availableImages = this.imagesList.filter(img => !this.usedImages.includes(img));
            if (availableImages.length > 0) {
                image = availableImages[Math.floor(Math.random() * availableImages.length)];
                this.usedImages.push(image);
            } else {
                image = this.imagesList[Math.floor(Math.random() * this.imagesList.length)];
            }
        }

        return {
            name: name,
            stats: stats,
            hp: stats.hp,
            maxHp: stats.hp,
            image: image,
            type: templateStats.type
        };
    }

    selectFighter(id) {
        if (this.isFighting) return;
        
        this.selectedFighter = id;
        this.ui.highlightSelection(id);
        audioManager.play('click');
        
        const name = this.fighters[id].name;
        this.ui.typeComment(`💰 Has puesto tu fe (y tu dinero) en ${name}.`, 40);
    }

    startFight() {
        const inputBet = parseInt(document.getElementById('betAmount').value);
        
        if (this.isFighting) return;
        
        if (!this.selectedFighter) {
            alert("⚠️ ¡Debes seleccionar un luchador primero!");
            return;
        }

        if (isNaN(inputBet) || inputBet < CONFIG.minBet) {
            alert(`⚠️ La apuesta mínima es ${CONFIG.minBet}.`);
            return;
        }

        if (inputBet > this.balance) {
            alert("💸 No tienes suficiente saldo. ¡Vende un riñón o algo!");
            return;
        }

        this.isFighting = true;
        this.betAmount = inputBet;
        this.balance -= this.betAmount;
        this.saveBalance(); // FIX: Save después de restar
        this.ui.updateBalance(this.balance);
        this.ui.toggleControls(false);
        
        audioManager.play('cash');
        this.ui.clearComments();
        
        this.ui.typeComment(this.getRandomComment('intro'), CONFIG.delays.typingSpeed);
        
        setTimeout(() => {
            audioManager.play('bell');
            this.ui.addComment("🔔 ¡ROUND 1! ¡FIGHT!", true);
            this.battleLoop();
        }, 3000);
    }

    battleLoop() {
        if (!this.isFighting) return;

        if (this.fighters[1].hp <= 0 || this.fighters[2].hp <= 0) {
            this.endFight();
            return;
        }

        const speed1 = this.fighters[1].stats.speed * Math.random();
        const speed2 = this.fighters[2].stats.speed * Math.random();
        
        const attackerId = speed1 > speed2 ? 1 : 2;
        const defenderId = attackerId === 1 ? 2 : 1;

        this.executeTurn(attackerId, defenderId);

        setTimeout(() => this.battleLoop(), CONFIG.delays.turnDelay);
    }

    executeTurn(attackerId, defenderId) {
        const attacker = this.fighters[attackerId];
        const defender = this.fighters[defenderId];

        let damage = (attacker.stats.power * 0.5) + (Math.random() * 20);
        let reduction = (defender.stats.defense * 0.3);
        let finalDamage = Math.max(5, Math.floor(damage - reduction));

        const hitChance = 0.9 - ((defender.stats.speed - attacker.stats.speed) * 0.002);
        const isHit = Math.random() < hitChance;
        
        const isCrit = Math.random() < 0.15;

        // FIX: Mostrar animación de atacante
        this.ui.animateAttacker(attackerId);

        if (!isHit) {
            audioManager.play('dodge');
            this.ui.animateDodge(defenderId);
            this.ui.typeComment(`${defender.name} esquiva: ` + this.getRandomComment('dodge'), 20);
        } else {
            if (isCrit) {
                finalDamage = Math.floor(finalDamage * 1.8);
                audioManager.play('crit');
                this.ui.animateCrit(defenderId);
                this.ui.addComment(`🔥 CRÍTICO: ${this.getRandomComment('critical')}`, true);
            } else {
                audioManager.play(finalDamage > 20 ? 'hit_heavy' : 'hit_light');
                this.ui.animateHit(defenderId);
                
                if (Math.random() > 0.6) {
                    this.ui.typeComment(this.getRandomComment(finalDamage > 20 ? 'heavyHit' : 'lightHit'), 30);
                }
            }

            defender.hp -= finalDamage;
            this.ui.updateHealth(defenderId, defender.hp, defender.maxHp);
            this.ui.showDamageNumber(defenderId, finalDamage, isCrit);
        }

        if (defender.hp > 0 && defender.hp < (defender.maxHp * 0.2) && Math.random() > 0.7) {
            this.ui.typeComment(this.getRandomComment('lowHp'), 40, true);
        }

        if (Math.random() > 0.95 && this.fighters[1].hp > 0 && this.fighters[2].hp > 0) {
            this.round++;
            this.ui.updateRound(this.round);
            audioManager.play('bell');
            this.ui.addComment(`🔔 ROUND ${this.round} - La fatiga se nota...`, true);
        }
    }

    endFight() {
        this.isFighting = false;
        
        const winnerId = this.fighters[1].hp > 0 ? 1 : 2;
        const loserId = winnerId === 1 ? 2 : 1;
        const playerWon = this.selectedFighter === winnerId;
        
        const winnerName = this.fighters[winnerId].name;
        const loserName = this.fighters[loserId].name;

        if (playerWon) {
            const winnings = this.betAmount * 2;
            this.balance += winnings;
            this.saveBalance(); // FIX: Save después de ganar
            this.ui.updateBalance(this.balance);
            
            audioManager.play('win');
            this.ui.addComment(this.getRandomComment('win'), true, 'winner');
            this.ui.showResultModal(true, winnerName, winnings, this.resultImages.win);
        } else {
            this.saveBalance(); // FIX: Save después de perder
            
            audioManager.play('lose');
            this.ui.addComment(this.getRandomComment('lose'), true, 'shout');
            
            const defeatImg = Math.random() > 0.5 ? this.resultImages.lose1 : this.resultImages.lose2;
            this.ui.showResultModal(false, loserName, this.betAmount, defeatImg);
        }
        
        this.ui.toggleControls(true);
    }

    // FIX: Método para guardar balance
    saveBalance() {
        try {
            localStorage.setItem('balance', this.balance);
        } catch (e) {
            console.error("❌ Error guardando balance:", e);
        }
    }

    getRandomComment(type) {
        const list = DB_COMMENTS[type] || [];
        if (list.length === 0) return "...";
        return list[Math.floor(Math.random() * list.length)];
    }
}

// ============================================================================
// 5. UI CONTROLLER (MANIPULACIÓN DEL DOM)
// ============================================================================

class UIController {
    constructor() {
        this.commentaryBox = document.getElementById('commentary');
        this.balanceDisplay = document.getElementById('balance');
        this.startBtn = document.getElementById('startFightBtn');
        this.typingTimeout = null; // FIX: Para cancelar typing anterior
    }

    updateBalance(amount) {
        this.balanceDisplay.innerHTML = `${amount.toLocaleString()} <i class="fas fa-coins money-icon"></i>`;
        this.balanceDisplay.classList.add('flash');
        setTimeout(() => this.balanceDisplay.classList.remove('flash'), 500);
    }

    renderFighter(id, data) {
        document.getElementById(`name${id}`).textContent = data.name;
        document.getElementById(`fighter-img-${id}`).src = data.image;
        document.getElementById(`stats${id}`).innerHTML = 
            `<i class="fas fa-fist-raised"></i> ${data.stats.power} | ` +
            `<i class="fas fa-shield-alt"></i> ${data.stats.defense} | ` +
            `<i class="fas fa-tachometer-alt"></i> ${data.stats.speed}`;
        
        const titleEl = document.querySelector(`#fighter-card-${id} .fighter-title`);
        if(titleEl) titleEl.textContent = `Clase: ${data.type}`;
    }

    updateBetNames(n1, n2, img1, img2) {
        document.getElementById('betName1').textContent = n1;
        document.getElementById('betName2').textContent = n2;
        document.getElementById('bet-thumb-1').src = img1;
        document.getElementById('bet-thumb-2').src = img2;
    }

    resetHealthBars() {
        this.updateHealth(1, 100, 100);
        this.updateHealth(2, 100, 100);
    }

    updateHealth(id, current, max) {
        const percentage = Math.max(0, (current / max) * 100);
        const bar = document.getElementById(`health${id}`);
        
        bar.style.width = `${percentage}%`;
        bar.textContent = `${Math.ceil(current)} HP`;

        bar.style.background = percentage > 50 ? 'linear-gradient(90deg, #00ff00, #adff2f)' :
                               percentage > 25 ? 'linear-gradient(90deg, #ffae00, #ffd700)' :
                               'linear-gradient(90deg, #ff0000, #ff4d4d)';
    }

    highlightSelection(id) {
        document.querySelectorAll('.bet-option').forEach(el => el.classList.remove('selected'));
        const el = document.getElementById(`betOption${id}`);
        if(el) el.classList.add('selected');
    }

    clearSelection() {
        document.querySelectorAll('.bet-option').forEach(el => el.classList.remove('selected'));
    }

    toggleControls(enable) {
        this.startBtn.disabled = !enable;
        document.getElementById('betAmount').disabled = !enable;
        
        // FIX: También deshabilitar botones de selección
        document.querySelectorAll('.bet-option').forEach(el => {
            el.style.pointerEvents = enable ? 'auto' : 'none';
            el.style.opacity = enable ? '1' : '0.6';
        });
        
        if (!enable) {
            this.startBtn.innerHTML = '<i class="fas fa-skull"></i> PELEA EN CURSO...';
            this.startBtn.style.background = '#333';
        } else {
            this.startBtn.innerHTML = '<i class="fas fa-hand-holding-usd"></i> APOSTAR Y REZAR';
            this.startBtn.style.background = '';
        }
    }

    updateRound(r) {
        document.getElementById('round').textContent = `ROUND ${r}`;
    }

    addComment(text, isShout = false, extraClass = '') {
        const div = document.createElement('div');
        div.className = `comment ${isShout ? 'shout' : ''} ${extraClass}`;
        const time = new Date().toLocaleTimeString('es-ES', { hour12: false });
        div.innerHTML = `<span class="comment-time">[${time}]</span> ${text}`;
        
        this.commentaryBox.prepend(div);
        
        // FIX: Limitar comentarios para no saturar el DOM
        const comments = this.commentaryBox.querySelectorAll('.comment');
        if (comments.length > 50) {
            comments[comments.length - 1].remove();
        }
    }

    typeComment(text, speed, isShout = false) {
        // FIX: Cancelar typing anterior si existe
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        const div = document.createElement('div');
        div.className = `comment ${isShout ? 'shout' : ''}`;
        const time = new Date().toLocaleTimeString('es-ES', { hour12: false });
        
        const textSpan = document.createElement('span');
        div.innerHTML = `<span class="comment-time">[${time}]</span> `;
        div.appendChild(textSpan);
        
        this.commentaryBox.prepend(div);

        let i = 0;
        const type = () => {
            if (i < text.length) {
                textSpan.textContent += text.charAt(i);
                i++;
                this.typingTimeout = setTimeout(type, speed);
            }
        };
        type();
    }

    clearComments() {
        this.commentaryBox.innerHTML = '';
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
    }

    addSystemLog(text) {
        this.addComment(`⚙️ ${text}`, false);
    }

    // FIX: Animación de atacante
    animateAttacker(id) {
        const img = document.getElementById(`fighter-img-${id}`);
        img.classList.add('attacking');
        setTimeout(() => img.classList.remove('attacking'), 400);
    }

    // FIX: Mejorar animación de hit con limpieza correcta
    animateHit(id) {
        const img = document.getElementById(`fighter-img-${id}`);
        img.classList.remove('hit'); // FIX: Remover clase previa
        void img.offsetWidth; // Force reflow
        img.classList.add('hit');
        
        // FIX: Auto-remover después de animación
        setTimeout(() => img.classList.remove('hit'), 500);
    }

    animateCrit(id) {
        this.animateHit(id);
        const img = document.getElementById(`fighter-img-${id}`);
        const originalFilter = img.style.filter;
        img.style.filter = "brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)";
        setTimeout(() => img.style.filter = originalFilter, 500);
    }

    animateDodge(id) {
        const img = document.getElementById(`fighter-img-${id}`);
        const originalTransform = img.style.transform;
        const originalOpacity = img.style.opacity;
        
        img.style.transform = "translateX(20px) skewX(-10deg)";
        img.style.opacity = "0.5";
        
        setTimeout(() => {
            img.style.transform = originalTransform;
            img.style.opacity = originalOpacity;
        }, 300);
    }

    showDamageNumber(id, amount, isCrit) {
        const parent = document.getElementById(`fighter-card-${id}`);
        const el = document.createElement('div');
        el.textContent = `-${amount}`;
        el.style.cssText = `
            position: absolute;
            color: ${isCrit ? '#ff0000' : '#fff'};
            font-size: ${isCrit ? '3rem' : '2rem'};
            font-weight: bold;
            text-shadow: 0 0 5px black;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            z-index: 100;
            pointer-events: none;
            animation: floatUp 1s forwards;
        `;
        
        if (!document.getElementById('dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.innerHTML = `
                @keyframes floatUp {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
                    20% { transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -150px) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        parent.style.position = 'relative';
        parent.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }

    showResultModal(win, name, amount, imgSrc) {
        const modal = document.getElementById('resultModal');
        const title = document.getElementById('resultTitle');
        const msg = document.getElementById('resultMessage');
        const img = document.getElementById('resultImage');
        const content = document.querySelector('.result-content');

        title.textContent = win ? "¡GANASTE!" : "¡PERDISTE!";
        title.style.color = win ? "var(--color-gold)" : "var(--color-red)";
        
        msg.innerHTML = win 
            ? `Tu campeón <strong>${name}</strong> ha triunfado.<br>Ganancia: <span style="color:gold">${amount} $</span>`
            : `<strong>${name}</strong> ha sido derrotado.<br>Has perdido <span style="color:red">${amount} $</span>.`;
        
        img.src = imgSrc || "https://via.placeholder.com/150";

        if (win) {
            content.classList.remove('lose');
            content.style.borderColor = 'var(--color-gold)';
        } else {
            content.classList.add('lose');
            content.style.borderColor = 'var(--color-red)';
        }

        modal.classList.add('show');
    }
}

// ============================================================================
// 6. INICIALIZACIÓN Y EVENTOS
// ============================================================================

const game = new GameEngine();

document.addEventListener('DOMContentLoaded', () => {
    game.init();
    createBubbles();
});

window.enterSite = function() {
    const verif = document.getElementById('ageVerification');
    verif.style.transition = "opacity 0.5s";
    verif.style.opacity = "0";
    
    audioManager.init();
    audioManager.play('click');

    setTimeout(() => {
        verif.classList.add('hidden');
        game.ui.typeComment('Sistema de apuestas inicializado. Bienvenido al abismo.', 50);
    }, 500);
};

window.rejectAccess = function() {
    alert("¡Sabia decisión! Huye mientras puedas.");
    window.location.href = "https://www.google.com";
};

window.selectFighter = function(id) {
    audioManager.init();
    game.selectFighter(id);
};

window.startFight = function() {
    audioManager.init();
    game.startFight();
};

window.closeResult = function() {
    audioManager.play('click');
    document.getElementById('resultModal').classList.remove('show');
    
    setTimeout(() => {
        game.randomizeFighters();
        game.ui.addComment("Preparando nuevos contendientes...", false);
    }, 1000);
};

function createBubbles() {
    const container = document.getElementById('oceanBg');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        bubble.style.animationDuration = `${15 + Math.random() * 20}s`;
        container.appendChild(bubble);
    }
}

// Easter Egg: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            game.balance += 10000;
            game.saveBalance(); // FIX: Guardar el cheat
            game.ui.updateBalance(game.balance);
            audioManager.play('win');
            alert("CHEAT ACTIVADO: +10,000$ (Sucio tramposo)");
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Exponer para debug
window.game = game;