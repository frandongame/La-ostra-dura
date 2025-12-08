<?php
// Rutas de las imágenes de las criaturas (para la pelea)
$base_img_url = "../assets/images/";
// Icono/Logo (archivo en `src/assets/icons/logo.png`)
$logo_icon = "../assets/icons/logo.png";

// LUCHADORES
// Nombres de archivos de las criaturas graciosas
$criaturas_marinas = [
    "almeja1.png",
    "almeja2.jpeg",
    "almeja3.webp",
    "pezFeoGanador.webp", // Ejemplo de criatura 4
    "pezMamador.jpg", // Ejemplo de criatura 5
    "pezTriste.jpg", // Ejemplo de criatura 6
    "pezDientudo.jpg" // Ejemplo de criatura 7
];

// RESULTADOS (Las imágenes de los platos cocinados y el ganador)
$img_ganador = $base_img_url . "pezFeoGanador.webp"; // Imagen de victoria/ganador
$img_derrota_1 = $base_img_url . "almejaCocinada.jpeg"; // Imagen de almejas cocinadas
$img_derrota_2 = $base_img_url . "pezCocinado.webp"; // Imagen de pez cocinado
$img_chef = $base_img_url . "chef_macabro.gif"; // Usaremos un GIF para el icono de derrota

// OTROS JUEGOS (Se mantienen las rutas, asumiendo que existen)
$gif_ruleta = $img_ganador; // fallback: imagen existente
$gif_tragaperlas = $img_ganador; // fallback: imagen existente
$img_blackjack = $img_ganador; // fallback: imagen existente
$gif_cangrejo = $base_img_url . "pezTriste.jpg"; // usar imagen existente
$img_poker = $img_ganador; // fallback: imagen existente
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LA OSTRA DURA - Apuesta y Reza</title>
    <!-- Font Awesome para iconos (sustituyendo emojis) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Rutas de estilos y scripts según tu solicitud -->
    <link rel="stylesheet" href="../CSS/estilos.css">
    <link rel="icon" type="image/png" href="favicon.ico"> 
</head>
<body>
    
    <!-- La ruta de las criaturas marinas se pasa al JS a través de un data-attribute para la selección dinámica -->
    <div data-criaturas='<?php echo json_encode($criaturas_marinas); ?>' id="img-data-container" 
        data-ganador="<?php echo $img_ganador; ?>"
        data-derrota1="<?php echo $img_derrota_1; ?>"
        data-derrota2="<?php echo $img_derrota_2; ?>"
        data-chef="<?php echo $img_chef; ?>">
    </div>

    <!-- VERIFICACIÓN DE EDAD -->
    <div class="age-verification" id="ageVerification">
        <div class="age-card">
            <h1 class="age-title-content">
                <i class="fas fa-exclamation-triangle warning-icon"></i>
                ¡DETENTE, CÁSCARA FRÁGIL!
            </h1>
            <p><strong>¿ERES MAYOR DE 18 AÑOS?</strong></p>
            <p>
                Este sitio es el fondo abisal de las apuestas.<br>
                Aquí se pierden perlas, dignidad y el respeto de tu familia.<br>
                <strong>SI TU MAMÁ TE PREGUNTA, DILE QUE ESTUDIAS BIOLOGÍA MARINA.</strong>
            </p>
            
            <div class="warning">
                <i class="fas fa-skull-crossbones warning-icon"></i> <strong>ADVERTENCIA</strong>: Esta página puede causar adicción, bancarrota y antojo de mariscos 
            </div>

            <div class="age-buttons">
                <button class="age-btn" onclick="enterSite()">
                    <i class="fas fa-check-circle"></i> SÍ, TENGO 18+ Y ASUMO QUE VOY A PERDERLO TODO
                </button>
                <button class="age-btn danger" onclick="rejectAccess()">
                    <i class="fas fa-times-circle"></i> NO, SOY MENOR Y/O TENGO SENTIDO COMÚN
                </button>
            </div>
        </div>
    </div>

    <!-- FONDO Y CABECERA (Se mantienen igual) -->
    <div class="ocean-bg" id="oceanBg"></div>

    <header>
        <div class="header-content">
            <div class="neon-logo"> 
                <!-- Icono de Font Awesome para logo -->
                <img src="../assets/icons/logo.png">
                <div class="neon-text">
                    <h1 class="glitch-text" data-text="LA OSTRA DURA">LA OSTRA DURA</h1>
                    <p class="slogan">APUESTA Y REZA (QUE GANE TU ALMEJA)</p>
                </div>
            </div>
            
            <button class="live-btn" onclick="alert('El directo está cargando...')">
                <i class="fas fa-satellite-dish live-icon"></i> EN VIVO
            </button>
            
            <div class="balance" id="balance">10,000 <i class="fas fa-coins money-icon"></i></div>
        </div>
    </header>

    <!-- CUERPO PRINCIPAL DEL JUEGO -->
    <div class="container">
        
        <div class="module-box fight-arena">
            <h3 class="arena-title"><i class="fas fa-fist-raised fight-icon"></i> ARENA SUBMARINA</h3>
            
            <!-- CONTENEDOR DE LUCHADORES -->
            <div class="fighters-display">
                <!-- LUCHADOR 1 -->
                <div class="fighter" id="fighter-card-1">
                    <div class="fighter-card">
                        <img src="" alt="Criatura 1" class="fighter-avatar" id="fighter-img-1">
                        <div class="fighter-info">
                            <div class="fighter-name" id="name1"></div>
                            <div class="fighter-title">"El Conquistador del Fondo"</div>
                            <div class="health-bar-container"><div class="health-bar" id="health1" style="width: 100%;">100 HP</div></div>
                            <div class="fighter-stats" id="stats1"></div>
                        </div>
                    </div>
                </div>

                <div class="vs-section">
                    <div class="vs-text">X</div>
                    <div class="round-counter" id="round">ROUND 1</div>
                </div>

                <!-- LUCHADOR 2 -->
                <div class="fighter" id="fighter-card-2">
                    <div class="fighter-card">
                        <img src="" alt="Criatura 2" class="fighter-avatar" id="fighter-img-2">
                        <div class="fighter-info">
                            <div class="fighter-name" id="name2"></div>
                            <div class="fighter-title">"La Perla Asesina"</div>
                            <div class="health-bar-container"><div class="health-bar" id="health2" style="width: 100%;">100 HP</div></div>
                            <div class="fighter-stats" id="stats2"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- SECCIÓN DE APUESTAS -->
            <div class="betting-section">
                <h4 class="betting-title"><i class="fas fa-gavel bet-icon"></i> Apuesta por tu molusco favorito</h4>
                <div class="betting-options">
                    <div class="bet-option" id="betOption1" onclick="selectFighter(1)">
                        <img src="" alt="Apuesta 1" class="bet-clam-icon" id="bet-thumb-1">
                        <div id="betName1"></div>
                    </div>
                    <div class="bet-option" id="betOption2" onclick="selectFighter(2)">
                        <img src="" alt="Apuesta 2" class="bet-clam-icon" id="bet-thumb-2">
                        <div id="betName2"></div>
                    </div>
                </div>
                <input type="number" class="bet-amount-input" id="betAmount" value="500" min="50" max="10000" placeholder="Cantidad a apostar">
                <button class="bet-btn" id="startFightBtn" onclick="startFight()"><i class="fas fa-hand-holding-usd"></i> APOSTAR Y REZAR</button>
            </div>

            <!-- COMENTARIOS -->
            <div class="commentary-box"><div class="commentary-title"><i class="fas fa-commentators comment-icon"></i> Comentarios en Vivo</div><div id="commentary"></div></div>
        </div>
        
        <!-- Otros módulos (Minijuegos y Estadísticas) -->
        <div class="module-box">
            <h3 class="arena-title"><i class="fas fa-dice slot-icon"></i> OTROS JUEGOS DEL OCÉANO</h3>
            
            <div class="games-carousel">
                <!-- Se mantienen las imágenes de los minijuegos -->
                <div class="game-card" onclick="alert('Cargando Ruleta...')">
                    <img src="<?php echo $gif_ruleta; ?>" alt="Ruleta GIF" class="game-icon-img">
                    <div class="game-name">Ruleta Almejil</div>
                </div>
                <div class="game-card" onclick="alert('Cargando Tragaperlas...')">
                    <img src="<?php echo $gif_tragaperlas; ?>" alt="Tragaperlas GIF" class="game-icon-img">
                    <div class="game-name">Tragaperlas 777</div>
                </div>
                <div class="game-card" onclick="alert('Cargando Póker...')">
                    <img src="<?php echo $img_poker; ?>" alt="Poker Icono" class="game-icon-img">
                    <div class="game-name">Poker de Percebes</div>
                </div>
                <div class="game-card" onclick="alert('Cargando Blackjack...')">
                    <img src="<?php echo $img_blackjack; ?>" alt="Blackjack Icono" class="game-icon-img">
                    <div class="game-name">Blackjack Oceánico</div>
                </div>
                <div class="game-card" onclick="alert('Cargando Carreras...')">
                    <img src="<?php echo $gif_cangrejo; ?>" alt="Cangrejo GIF" class="game-icon-img">
                    <div class="game-name">Carreras de Cangrejos</div>
                </div>
            </div>
        </div>

        <div class="module-box">
            <h3 class="arena-title"><i class="fas fa-chart-line"></i> MAREAS DE LA FORTUNA</h3>
            <div class="stats-dashboard">
                <div class="stat-box">
                    <div class="stat-value" id="stats-sacrificios">1,567</div>
                    <div class="stat-label">Moluscos Cocinados Hoy</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="stats-apuestas">$45,892</div>
                    <div class="stat-label">Monto de Apuestas (Total)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="stats-activos">892</div>
                    <div class="stat-label">Pescadores Activos</div>
                </div>
            </div>
        </div>
        
    </div>

    <!-- MODAL DE RESULTADO -->
    <div class="result-modal" id="resultModal">
        <div class="result-content">
            <!-- Icono de Resultado (Será una imagen dinámica en JS) -->
            <div class="result-icon">
                <img src="" alt="Imagen de resultado" class="result-icon-img" id="resultImage">
            </div>
            <h2 class="result-title" id="resultTitle"></h2>
            <p class="result-message" id="resultMessage"></p>
            <button class="bet-btn" onclick="closeResult()"><i class="fas fa-times-circle"></i> ACEPTAR MI DESTINO</button>
        </div>
    </div>
    
    <!-- PIE DE PÁGINA -->
    <footer>
        <div class="footer-links">
            <a href="#" class="footer-link">Sobre Nosotros</a>
            <a href="#" class="footer-link">Juego Responsable</a>
            <a href="#" class="footer-link">Contacto</a>
        </div>
        <p>LA OSTRA DURA © 2025. Una creación de mentes adictas. Juega bajo tu propio riesgo.
        <br> "Sacarles el dinero a los ludópatas es nuestro principal objetivo" - El Administrador</p>
        <div class="advertencia-legal">
            <p>ADVERTENCIA LEGAL: Este sitio es completamente ficticio y con fines de entretenimiento. No apostamos animales reales ni promovemos peleas de animales. Las criaturas son CGI de última generación. Probablemente todo tu dinero sea imaginario. (O no).</p>
        </div>
    </footer>

    <script src="../JS/App.js"></script>
</body>
</html>