import React, { useState, useMemo } from "react";
import { Calculator } from "lucide-react";

/**
 * Datos de construcción del telar por nombre.
 * Cada telar tiene:
 *  - tamaños: opciones predefinidas (ancho × alto en cm)
 *  - calcular(ancho, alto): función que devuelve { materiales[], herramientas[], notas[] }
 *    con cantidades exactas según las medidas ingresadas.
 */
const DATOS_TELAR = {
  "Telar de Cartón": {
    descripcion: "Telar básico hecho con cartón corrugado grueso. Las ranuras son la urdimbre.",
    unidadAncho: "ancho de la pieza tejida (cm)",
    unidadAlto: "largo de la pieza tejida (cm)",
    tamaños: [
      { label: "Mini (posavasos)", ancho: 12, alto: 12 },
      { label: "Pequeño (tapete)", ancho: 20, alto: 25 },
      { label: "Mediano (cojín)", ancho: 30, alto: 30 },
    ],
    calcular(a, h) {
      const ranuras = Math.floor(a / 0.5); // 1 ranura cada 5mm
      const largoUrdimbre = Math.round(h * ranuras * 2.2 / 100); // metros
      const margenCarton = 4; // cm extra por lado
      return {
        materiales: [
          `1 pieza de cartón corrugado grueso (≥ 4 mm) de ${a + margenCarton * 2} × ${h + margenCarton * 2} cm`,
          `${largoUrdimbre} m de hilo de urdimbre (lana gruesa o hilo resistente)`,
          `${Math.round(largoUrdimbre * 1.5)} m de hilo de trama (el hilo decorativo que elegís)`,
          "Cinta de papel o masking tape (para proteger los bordes del cartón)",
        ],
        herramientas: [
          "Tijera o cúter + regla metálica",
          "Regla y lápiz para marcar",
          `Aguja de lana grande (punta roma) — 1 unidad`,
          "Peine fino o tenedor para apretar la trama",
        ],
        pasos_detallados: [
          `Cortá el cartón a ${a + margenCarton * 2} × ${h + margenCarton * 2} cm.`,
          `Marcá en los bordes superior e inferior una serie de muescas cada 5 mm. Necesitás ${ranuras} muescas en cada borde (${ranuras} hilos de urdimbre).`,
          `Cortá las muescas con tijera o cúter: 5 mm de profundidad, 2 mm de ancho.`,
          `Pasá el hilo de urdimbre desde la muesca superior 1 hacia abajo, rodeá el cartón y subí por la muesca inferior 1; continuá hasta completar las ${ranuras} ranuras. Usá los ${largoUrdimbre} m de hilo.`,
          `Tensá la urdimbre de forma pareja — cada hilo debe tener la misma tensión que los demás.`,
          `Enhebra la aguja con el hilo de trama. Comenzá en el borde inferior pasando la aguja por encima-abajo de los hilos alternados.`,
          `Al llegar al otro extremo, girá y continuá en la fila siguiente invirtiendo el patrón (lo que estaba arriba va abajo).`,
          `Cada 2–3 filas, apretá la trama con el peine o tenedor hacia abajo para lograr un tejido firme y uniforme.`,
          `Cuando termines, cortá los hilos de urdimbre dejando 5 cm de margen y hacé nudos dobles en pares para rematar.`,
        ],
        notas: [
          `Con ${ranuras} hilos de urdimbre y trama cada 3 mm, obtenés un tejido de densidad media — ideal para proyectos decorativos.`,
          "Si el cartón se dobla, pegá dos capas con cola vinílica.",
          "Para piezas más grandes de 30 cm, reforzá el cartón con palitos de madera o varillas pegadas en los bordes.",
        ],
      };
    },
  },

  "Telar de Bastidor": {
    descripcion: "Marco de madera rectangular con clavos para tensar la urdimbre. Versátil y duradero.",
    unidadAncho: "ancho interior útil del telar (cm)",
    unidadAlto: "alto interior útil del telar (cm)",
    tamaños: [
      { label: "Pequeño (tapiz deco)", ancho: 30, alto: 40 },
      { label: "Mediano (tapete)", ancho: 50, alto: 70 },
      { label: "Grande (manta)", ancho: 80, alto: 100 },
    ],
    calcular(a, h) {
      const perimetro = Math.round(2 * (a + h) / 100 * 1.15); // metros de listón
      const clavos = Math.floor(a / 1.0) * 2; // 1 clavo cada cm en ambos lados horizontales
      const tornillos = 8; // 2 por esquina
      const largoUrdimbre = Math.round((h + 40) * Math.floor(a / 1.0) / 100); // metros
      const listones = [
        `2 listones de pino cepillado de 2 × 4 cm × ${a + 10} cm (travesaños horizontales)`,
        `2 listones de pino cepillado de 2 × 4 cm × ${h + 10} cm (laterales verticales)`,
      ];
      return {
        materiales: [
          ...listones,
          `${clavos} clavos sin cabeza de 3 cm (${clavos / 2} por cada travesaño horizontal)`,
          `${tornillos} tornillos de 4 × 40 mm para unir las esquinas (2 por esquina)`,
          "Cola de carpintero (40 ml aprox.)",
          `${largoUrdimbre + 2} m de hilo de algodón encerado o nailon Nº 10 para la urdimbre`,
          "Lija de grano 120 para alisar bordes",
        ],
        herramientas: [
          "Sierra o serrucho para cortar los listones",
          "Martillo para los clavos",
          "Destornillador o taladro (broca 3 mm para pretaladrar esquinas)",
          "Escuadra de 90° — imprescindible para que el marco sea recto",
          "Flexómetro o regla metálica",
          "Lápiz",
          "Sargentos o prensas de carpintero (2 pares) para mantener el marco mientras seca la cola",
          "Aguja de lana grande para enhebrar",
          "Peine o lanzadera para apretar la trama",
        ],
        pasos_detallados: [
          `Cortá los 4 listones a las medidas indicadas: 2 de ${a + 10} cm y 2 de ${h + 10} cm.`,
          "Lijá todos los cantos para evitar que el hilo se corte.",
          "Armá el marco en escuadra: los dos listones largos (verticales) entre los dos cortos (horizontales). Verificá con la escuadra que cada ángulo sea exactamente 90°.",
          "Aplicá cola de carpintero en las uniones, sujetá con sargentos y esperá 30 min.",
          `Pretaladra 2 orificios por esquina con la broca de 3 mm y colocá los ${tornillos} tornillos. Esto evita que la madera se parta.`,
          `Clavá los ${clavos / 2} clavos en el travesaño superior a intervalos de 1 cm exacto, dejando 1 cm de separación de los bordes. Repetí en el travesaño inferior, alineando los clavos del superior con los del inferior.`,
          `Tensá la urdimbre: atá el hilo al primer clavo superior con un nudo doble y pasá el hilo al primer clavo inferior, rodeá y subí al segundo clavo superior, continuá así en zigzag hasta completar los ${Math.floor(a / 1.0)} hilos. Cortá y atá al último clavo.`,
          "Verificá que todos los hilos de urdimbre tengan la misma tensión pellizcándolos: deben vibrar igual que las cuerdas de una guitarra.",
          "Ya podés empezar a tejer: pasá la trama por encima-abajo en las filas alternas y apretá con el peine.",
        ],
        notas: [
          `El marco terminado ocupa ${a + 10} × ${h + 10} cm. La zona útil de tejido es ${a} × ${h} cm.`,
          `Con ${Math.floor(a / 1.0)} hilos de urdimbre obtenés una densidad de 10 hilos/10 cm — adecuada para lana gruesa.`,
          "Para telas más finas, reducí el espaciado de los clavos a 0.5 cm y doblá el número de hilos.",
          "Si vas a usar este telar frecuentemente, barnizá la madera para protegerla de la humedad.",
        ],
      };
    },
  },

  "Telar Circular o Redondo": {
    descripcion: "Aro o arandela de madera con radios. Produce piezas circulares como mandalas y apliques.",
    unidadAncho: "diámetro del telar (cm)",
    unidadAlto: "diámetro del telar (cm)", // mismo valor, es circular
    tamaños: [
      { label: "Pequeño mandala", ancho: 20, alto: 20 },
      { label: "Mediano decorativo", ancho: 35, alto: 35 },
      { label: "Grande (alfombra)", ancho: 60, alto: 60 },
    ],
    calcular(a, _h) {
      const diametro = a;
      const radio = diametro / 2;
      const radios = Math.floor(diametro * 1.1 / 2) * 2 + 1; // siempre impar
      const circunferencia = Math.round(Math.PI * diametro);
      const largoUrdimbre = Math.round(radios * (radio + 5) * 2 / 100); // metros
      const largoTrama = Math.round(Math.PI * radio * radio * 0.06); // metros (espiral aprox.)
      return {
        materiales: [
          `1 aro de madera o bastidor circular de ${diametro} cm de diámetro (o usá un aro de bordado)`,
          `${largoUrdimbre} m de hilo de urdimbre resistente (nailon o algodón crochet Nº 8)`,
          `${largoTrama} m de hilo o lana de trama (el decorativo)`,
          "Pegamento de madera o cola blanca (si fabricás el aro vos mismo)",
        ],
        herramientas: [
          `Sierra de marquetería (si fabricás el aro de madera de ${diametro} cm)`,
          `Lija fina grano 180`,
          "Aguja de lana de punta roma",
          "Tijera",
          "Cinta métrica",
          "Marcador permanente para marcar los radios",
        ],
        pasos_detallados: [
          `Conseguí o fabricá un aro de ${diametro} cm de diámetro. Si lo fabricás, cortá una tira de madera de 1 × 1 cm y ${Math.round(circunferencia + 5)} cm de largo, doblá en círculo y pegá los extremos con cola.`,
          "Lijá el aro hasta que quede completamente liso — cualquier aspereza puede cortar el hilo.",
          `Marcá ${radios} puntos equidistantes en el aro con el marcador (un número impar es obligatorio para que el patrón alternado funcione sin interrupciones).`,
          `Atá el hilo de urdimbre al primer punto con nudo doble. Pasá el hilo al centro del aro y luego al punto opuesto, cruzando por el centro en cada pasada. Completá los ${radios} radios.`,
          "En el centro del aro, hacé 2–3 vueltas circulares apretadas con el hilo de urdimbre para fijar todos los radios. Hacé un nudo firme.",
          "Comenzá la trama desde el centro: enhebra la aguja con el hilo de trama y tejé en espiral pasando por encima-abajo alternado en cada radio.",
          "Continuá hacia afuera empujando la trama hacia el centro con el dedo en cada vuelta para mantenerla compacta.",
          "Al llegar al borde del aro, terminá con un nudo y cortá el hilo dejando 10 cm; entretejé ese extremo entre los radios para rematar limpio.",
        ],
        notas: [
          `Con ${radios} radios (número impar) el patrón de sobre-bajo alterna automáticamente en cada vuelta.`,
          "Si usás un número par de radios, tendrás que agregar un radio extra o saltearlo a mano en cada vuelta.",
          "Podés superponer varios aros de distintos tamaños para hacer mandalas en capas.",
        ],
      };
    },
  },

  "Telar de Peine Rígido": {
    descripcion: "Peine con ranuras fijas que permite tejer tiras de tela larga. Se sujeta entre el cuerpo y un punto fijo.",
    unidadAncho: "ancho del tejido deseado (cm)",
    unidadAlto: "largo del tejido deseado (cm)",
    tamaños: [
      { label: "Cinta/pulsera", ancho: 5, alto: 30 },
      { label: "Bufanda infantil", ancho: 15, alto: 100 },
      { label: "Bufanda adulto", ancho: 20, alto: 160 },
    ],
    calcular(a, h) {
      const ranurasPorCm = 2; // 2 ranuras por cm (estándar)
      const ranuras = a * ranurasPorCm;
      const largoUrdimbre = Math.round(ranuras * (h + 50) / 100 * 1.1); // m (+ 25cm cada extremo + 10% merma)
      const largoTrama = Math.round(a * h * 0.014); // metros
      return {
        materiales: [
          `1 peine rígido de ${a} cm de ancho (se consigue en tiendas de artesanías; también puede fabricarse en madera)`,
          `${largoUrdimbre} m de hilo de urdimbre resistente — algodón peinado Nº 8 o nailon`,
          `${largoTrama} m de hilo de trama decorativo`,
          "1 tablita o palito de madera de ${a + 5} cm para hacer la calada (separador de hilos)",
          "1 lanzadera de cartón o madera de ${a - 2} cm",
        ],
        herramientas: [
          "Aguja de peine o gancho incluido con el peine",
          "Tijera",
          "Cinta métrica",
          `Silla o gancho de pared para fijar el extremo de la urdimbre`,
          "Aguja de lana para entretejer los remates",
        ],
        pasos_detallados: [
          `Calculá la urdimbre: necesitás ${ranuras} hilos, cada uno de ${h + 50} cm de largo. Cortá con ese largo o trabajá directamente desde el ovillo.`,
          `Enhebra el primer hilo por la primera ranura del peine de abajo hacia arriba, pasá por el primer orificio (si el peine tiene orificios y ranuras alternos), y atá el extremo a la barra de urdimbre o al objeto fijo.`,
          "Repetí para todos los hilos alternando ranura-orificio hasta completar el ancho del peine.",
          "Atá el extremo libre de todos los hilos de urdimbre a tu cintura (usando un tablero de apoyo o correa) para tensarlos con tu propio cuerpo.",
          "Girá el peine 90° para separar la calada (los hilos de arriba y los de abajo se separan). Pasá la lanzadera con el hilo de trama de lado a lado.",
          "Girá el peine al otro lado para cambiar la calada y volvé a pasar la lanzadera. Apretá la trama con el peine hacia abajo.",
          "Repetí: girar peine — pasar trama — girar peine — apretar — hasta alcanzar los ${h} cm de largo.",
          "Para rematar, cortá la urdimbre dejando 10 cm de margen en cada extremo y hacé nudos en pares.",
        ],
        notas: [
          `Con ${ranurasPorCm} ranuras por cm el tejido tendrá una densidad de ${ranurasPorCm * 2} hilos/cm — adecuado para lana fina a media.`,
          "El largo máximo de la pieza solo está limitado por la cantidad de hilo de urdimbre que preparés.",
          "Si el peine es pequeño, podés hacer múltiples tiras y unirlas a crochet o cosiendo.",
        ],
      };
    },
  },

  "Telar María": {
    descripcion: "Telar de marco con lizos (heddles) para separar caladas. Permite piezas más anchas y diseños complejos.",
    unidadAncho: "ancho útil del tejido (cm)",
    unidadAlto: "largo de la pieza tejida (cm)",
    tamaños: [
      { label: "Tela angosta", ancho: 30, alto: 80 },
      { label: "Camino de mesa", ancho: 50, alto: 150 },
      { label: "Tela ancha", ancho: 80, alto: 200 },
    ],
    calcular(a, h) {
      const listonesMayor = `${a + 30}`;
      const listonesLateral = `${h + 40}`;
      const clavos = Math.floor(a / 0.8) * 2;
      const hilosLizo = Math.floor(a / 0.8);
      const largoUrdimbre = Math.round(hilosLizo * (h + 60) / 100 * 1.15);
      const largoTrama = Math.round(a * h * 0.016);
      return {
        materiales: [
          `2 listones de pino de 3 × 5 cm × ${a + 30} cm (travesaños superior e inferior)`,
          `2 listones de pino de 3 × 5 cm × ${h + 40} cm (laterales)`,
          `1 listón de 2 × 3 cm × ${a + 10} cm para el lizo (separador de calada)`,
          `${hilosLizo} presillas de cordel de algodón de 10 cm c/u para los elos del lizo`,
          `${clavos} clavos sin cabeza de 2.5 cm`,
          "12 tornillos de 4 × 50 mm para el ensamble",
          "Cola de carpintero",
          `${largoUrdimbre} m de hilo de algodón encerado o lino Nº 10`,
          `${largoTrama} m de hilo de trama`,
        ],
        herramientas: [
          "Sierra o serrucho",
          "Taladro con brocas 3 mm y 5 mm",
          "Martillo",
          "Escuadra de 90°",
          "2 sargentos o prensas",
          "Lija grano 120",
          "Lanzadera de madera (o de cartón de ${a - 2} cm)",
          "Peine de densidad 5 dientes/cm",
          "Aguja de enhebrar",
          "Tijera",
        ],
        pasos_detallados: [
          `Cortá los 4 listones: 2 de ${a + 30} cm y 2 de ${h + 40} cm. Lijá todos.`,
          "Ensamblá el marco en escuadra con cola + tornillos (2 por esquina). Verificá la perpendicularidad con la escuadra. Dejá secar con sargentos.",
          `Clavá los ${clavos / 2} clavos en el travesaño superior a 8 mm de espaciado. Repetí en el inferior, alineados con los superiores.`,
          `Fabricá el lizo: al listón de 2 × 3 × ${a + 10} cm, atale ${hilosLizo} presillas de cordel (elos) equidistantes, una por cada par de clavos. Cada presilla forma un ojo por donde pasará un hilo de urdimbre.`,
          "Tensá la urdimbre alternado hilo-lizo / hilo-libre: el primer hilo pasa por el ojo del lizo, el segundo queda libre (detrás del lizo), y así alternado.",
          "Al levantar el lizo, los hilos impares suben y los pares quedan abajo — eso es la calada.",
          "Pasá la lanzadera con el hilo de trama por la calada abierta. Bajá el lizo, usá un palo separador para abrir la calada inversa y volvé a pasar la lanzadera.",
          "Apretá la trama con el peine después de cada pasada.",
          "Continuá hasta alcanzar la longitud deseada. Remata cortando la urdimbre con 10 cm de margen y haciendo nudos en pares.",
        ],
        notas: [
          `El marco terminado mide ${a + 30} × ${h + 40} cm; la zona de tejido es ${a} × ${h} cm.`,
          `Con ${hilosLizo} hilos de urdimbre a 8 mm obtenés 12 hilos/10 cm de densidad — ideal para lana media.`,
          "Para mayor densidad, reducí la separación de los clavos a 5 mm y doblá la cantidad de hilos.",
        ],
      };
    },
  },

  "Telar Mapuche": {
    descripcion: "Telar vertical de palos con tensores. Requiere dos palos horizontales (wara) y dos verticales (llamado witral en mapudungún).",
    unidadAncho: "ancho de la pieza tejida (cm)",
    unidadAlto: "largo de la pieza tejida (cm)",
    tamaños: [
      { label: "Faja pequeña", ancho: 20, alto: 60 },
      { label: "Poncho chico", ancho: 60, alto: 120 },
      { label: "Manta tradicional", ancho: 100, alto: 200 },
    ],
    calcular(a, h) {
      const palosHorizontales = `${a + 20}`;
      const palosVerticales = `${h + 60}`;
      const hilos = Math.floor(a / 0.5); // 2 hilos/cm
      const largoUrdimbre = Math.round(hilos * (h + 60) / 100 * 1.2);
      const largoTrama = Math.round(a * h * 0.018);
      return {
        materiales: [
          `2 palos o cañas de ${a + 20} cm de largo y 2–3 cm de diámetro (wara superior e inferior)`,
          `2 palos o cañas de ${h + 60} cm de largo y 3–4 cm de diámetro (laterales)`,
          `${Math.round((a + h) * 0.5)} m de cordel de sisal o algodón grueso para atar el marco`,
          `${largoUrdimbre} m de hilo de urdimbre (lana de oveja 100% o hilado artesanal)`,
          `${largoTrama} m de lana o hilado de trama (color principal + colores de diseño)`,
          "1 lanzadera de madera o cartón de ${a - 5} cm",
          "1 palo separador de calada de ${a + 5} cm (kallwa)",
        ],
        herramientas: [
          "Sierra o machete para cortar los palos (si son ramas o cañas naturales)",
          "Lija gruesa para alisar los palos",
          "Aguja de lana de punta roma (pikún)",
          "Peine de madera o dientes de cardado (rütrü) para apretar la trama",
          "Cuerda de sisal para tensar el marco al poste o soporte",
          "Tijera",
        ],
        pasos_detallados: [
          `Cortá y lijá los 4 palos: 2 de ${a + 20} cm (horizontales/wara) y 2 de ${h + 60} cm (verticales).`,
          "Armá el marco atando cada esquina con varias vueltas de cordel en X y en cuadrado. Apretá bien — este marco soportará toda la tensión del tejido.",
          `Colgá el marco del wara superior desde un soporte o pared. La distancia del suelo al wara superior debe ser de ${h + 70} cm para trabajar cómodamente de pie.`,
          `Tensá la urdimbre: atá el inicio al wara superior y pasá el hilo en zigzag entre el wara superior e inferior. Necesitás ${hilos} hilos de urdimbre separados 5 mm entre sí.`,
          "Insertá el palo separador de calada (kallwa) entre los hilos pares e impares. Al girar el kallwa de costado, se abre la calada.",
          "Con la aguja (pikún) creá los lizos manuales para la segunda calada: pasá un hilo de control por delante de cada hilo par, atándolos a una varilla auxiliar.",
          "Comenzá a tejer desde abajo: abrí la calada con el kallwa, pasá la lanzadera; luego usá el lizo manual para la calada inversa y volvé a pasar.",
          "Apretá cada fila con el peine de madera (rütrü) golpeando hacia abajo.",
          "Para los diseños geométricos, cambiá de color de trama según el patrón contado en hilos.",
        ],
        notas: [
          `Con ${hilos} hilos a 5 mm obtenés una urdimbre de 20 hilos/10 cm — apropiado para lana artesanal gruesa.`,
          "Este telar no se desmonta al terminar: el wara queda como barra superior de la pieza.",
          "Los nudos del marco deben controlarse al inicio de cada sesión; si afloja, el tejido pierde tensión.",
        ],
      };
    },
  },

  "Telar Vikingo": {
    descripcion: "Telar de tablillas (tablets) que produce cintas tubulares o planas con patrones trenzados complejos.",
    unidadAncho: "ancho de la cinta (cm)",
    unidadAlto: "largo de la cinta (cm)",
    tamaños: [
      { label: "Pulsera", ancho: 2, alto: 22 },
      { label: "Cinta decorativa", ancho: 4, alto: 100 },
      { label: "Cinturón", ancho: 5, alto: 120 },
    ],
    calcular(a, h) {
      const tablillas = Math.round(a / 0.6); // 1 tablilla cada 6mm aprox
      const hilosPortablilla = 4;
      const hilosTotales = tablillas * hilosPortablilla;
      const largoUrdimbre = Math.round(hilosTotales * (h + 80) / 100 * 1.2);
      return {
        materiales: [
          `${tablillas} tablillas cuadradas de 6 × 6 cm (cartón 3 mm plastificado, madera de 3 mm o plástico rígido)`,
          `${hilosTotales} hilos de urdimbre de ${h + 80} cm cada uno — lana fina, seda o hilo de algodón`,
          `${Math.round(largoUrdimbre * 0.4)} m adicionales de hilo de trama (si el diseño lleva trama separada)`,
          "2 palitos o pinzas de ropa para mantener la posición de las tablillas",
          `1 tablita de ${a + 5} cm de largo para enrollar el tejido terminado`,
        ],
        herramientas: [
          "Cortante y regla metálica para cortar las tablillas",
          "Perforadora de papel (4 orificios por tablilla, uno en cada esquina)",
          "Lápiz para numerar cada tablilla (A, B, C… o 1, 2, 3…)",
          "Abrazadera o pinza para fijar un extremo a la silla o poste",
          "Aguja de lana para entretejer remates",
          "Tijera",
        ],
        pasos_detallados: [
          `Fabricá las ${tablillas} tablillas: cortá cuadrados de 6 × 6 cm y perforá un orificio en cada esquina (los 4 orificios se marcan A, B, C, D en las esquinas). Numerá cada tablilla del 1 al ${tablillas}.`,
          "Preparala urdimbre: cortá los hilos al largo indicado y pasá 1 hilo por cada orificio de cada tablilla (4 hilos por tablilla). El color en cada orificio define el patrón.",
          "Alineá todas las tablillas con la letra A hacia arriba. Atá juntos todos los extremos del lado de trabajo a tu cintura (o a un soporte), y los del otro extremo a la silla o pared.",
          "Para tejer, girá TODAS las tablillas un cuarto de vuelta hacia adelante. Pasá el hilo de trama de izquierda a derecha. Apretá.",
          "Girá de nuevo un cuarto hacia adelante. Pasá la trama de derecha a izquierda. Apretá.",
          "Repetí 4 veces hacia adelante y luego 4 veces hacia atrás (esto evita que la urdimbre se enrolle y trabe).",
          "Para patrones de diseño, algunas tablillas giran hacia adelante y otras hacia atrás en la misma pasada — seguí el esquema del diseño.",
          `Continuá hasta llegar a los ${h} cm de largo. Terminá haciendo 3 vueltas sin girar las tablillas y atando los extremos.`,
        ],
        notas: [
          `Con ${tablillas} tablillas de 4 hilos cada una tenés ${hilosTotales} hilos de urdimbre — suficiente para una cinta de ${a} cm.`,
          "Numerá y marcá la orientación de cada tablilla ANTES de montar la urdimbre para evitar confusiones.",
          "Si el cordel se traba al girar, es señal de que diste demasiadas vueltas en un solo sentido — alternaz la dirección.",
        ],
      };
    },
  },

  "Telar de Clavijas para Mantas": {
    descripcion: "Tablero o bastidor con clavijas de madera donde se enrosca la lana. Produce piezas grandes y esponjosas muy rápido.",
    unidadAncho: "ancho de la manta (cm)",
    unidadAlto: "largo de la manta (cm)",
    tamaños: [
      { label: "Cojín", ancho: 40, alto: 40 },
      { label: "Manta individual", ancho: 120, alto: 150 },
      { label: "Manta matrimonial", ancho: 180, alto: 200 },
    ],
    calcular(a, h) {
      const separacion = 5; // cm entre clavijas
      const clavijasX = Math.floor(a / separacion) + 1;
      const clavijasY = Math.floor(h / separacion) + 1;
      const totalClavijas = clavijasX * clavijasY;
      const tablero = `${a + 10} × ${h + 10}`;
      // Metros de lana: cada lazada mide ~2× la separación, hay muchas lazadas
      const lazadas = (clavijasX - 1) * clavijasY + (clavijasY - 1) * clavijasX;
      const largoLana = Math.round(lazadas * separacion * 2.4 / 100);
      const ovillos100g = Math.ceil(largoLana * 7 / 100); // lana supergruesa ~7g/m
      return {
        materiales: [
          `1 tablero de madera MDF de 16 mm o madera maciza de ${tablero} cm`,
          `${totalClavijas} clavijas de madera de 1.5 cm de diámetro × 8 cm de largo`,
          "Cola de carpintero o epoxi para fijar las clavijas",
          `${largoLana} m de lana supergruesa o XXL (equivale a ~${ovillos100g} ovillos de 100 g)`,
          "Lija de grano 80 para el tablero",
        ],
        herramientas: [
          `Taladro con broca de 1.5 cm (del mismo diámetro que las clavijas) — necesitás perforar ${totalClavijas} huecos`,
          "Regla y escuadra para marcar la grilla de orificios",
          "Lápiz",
          "Prensa de banco o mordaza para sostener el tablero",
          "Mazo de goma para insertar las clavijas",
          "Ganchillo grueso (6 mm o más) para enrollar la lana",
          "Tijera o cuchilla",
        ],
        pasos_detallados: [
          `Cortá el tablero de MDF a ${a + 10} × ${h + 10} cm. Lijá bien la superficie.`,
          `Marcá la grilla de orificios: comenzá a 5 cm del borde y marcá puntos cada ${separacion} cm en ambas direcciones. Obtendrás ${clavijasX} columnas × ${clavijasY} filas = ${totalClavijas} puntos.`,
          `Perforá cada punto con la broca de 1.5 cm a una profundidad de 4 cm (la mitad de la clavija). Mantené el taladro perpendicular al tablero.`,
          `Aplicá cola en cada orificio e insertá las ${totalClavijas} clavijas con el mazo de goma. Dejá secar 2 horas.`,
          "Comenzá a enhebrar la lana: atá el inicio a la clavija del ángulo superior-izquierdo con nudo doble.",
          "Pasá la lana en zigzag horizontalmente de clavija en clavija por toda la primera fila. Al llegar al final, bajá a la siguiente fila y continuá.",
          "Una vez terminadas las filas horizontales, repetí el proceso en sentido vertical, entrelazando la lana con la anterior.",
          "Para rematar, cortá la lana dejando 15 cm y pasala por las lazadas adyacentes con el ganchillo, haciendo puntos de cadeneta para cerrar.",
        ],
        notas: [
          `Con clavijas cada ${separacion} cm y lana supergruesa, el tejido tendrá un punto de tamaño ${separacion} × ${separacion} cm — muy vistoso.`,
          `Los ${totalClavijas} huecos tardan unas 2 horas en perforarse; hacelo antes del fin de semana en que vas a tejer.`,
          "Si no tenés tablero, podés usar una caja de madera o incluso un cartón de embalaje muy grueso para proyectos temporales.",
        ],
      };
    },
  },

  "Telar Huck Weaving (Brioche)": {
    descripcion: "Telar de bastidor con lizos múltiples para crear texturas tridimensionales (relieve tipo nido de abeja).",
    unidadAncho: "ancho del tejido (cm)",
    unidadAlto: "largo del tejido (cm)",
    tamaños: [
      { label: "Muestra de práctica", ancho: 15, alto: 20 },
      { label: "Bufanda texturizada", ancho: 20, alto: 150 },
      { label: "Tela de cojín", ancho: 40, alto: 50 },
    ],
    calcular(a, h) {
      const hilosPorCm = 3;
      const hilosTotales = a * hilosPorCm;
      const lizos = 4; // Huck requiere 4 lizos
      const largoUrdimbre = Math.round(hilosTotales * (h + 80) / 100 * 1.25);
      const largoTrama = Math.round(a * h * 0.02);
      const clavos = hilosTotales * 2;
      return {
        materiales: [
          `1 bastidor de madera de ${a + 20} × ${h + 30} cm (armado como el Telar de Bastidor)`,
          `${lizos} barras de lizo de ${a + 10} cm (varillas metálicas o listones de 1 × 1 cm)`,
          `${hilosTotales * lizos} presillas de hilo resistente para los elos de los lizos (${hilosTotales} por lizo)`,
          `${clavos} clavos finos de 2 cm para los travesaños`,
          `${largoUrdimbre} m de hilo de algodón peinado Nº 5 para la urdimbre`,
          `${largoTrama} m de hilo de trama (igual grosor que la urdimbre)`,
        ],
        herramientas: [
          "Sierra y taladro (para el bastidor — ver instrucciones Telar de Bastidor)",
          "Escuadra de 90°",
          `Peine de densidad ${hilosPorCm * 2} dientes/cm`,
          "Lanzadera de madera de ${a - 2} cm",
          "Aguja de enhebrar",
          "Cuaderno cuadriculado para diseñar el patrón Huck antes de enhebrar",
        ],
        pasos_detallados: [
          `Armá el bastidor de ${a + 20} × ${h + 30} cm (ver instrucciones detalladas en Telar de Bastidor).`,
          `Clavá los ${clavos / 2} clavos a 3.3 mm de separación en el travesaño superior e inferior (${hilosPorCm} hilos/cm).`,
          "Diseñá el patrón Huck en papel cuadriculado: el patrón básico es 5 hilos × 5 filas formando bloques. Definí qué hilos irán en cada uno de los 4 lizos.",
          `Enhebra los ${hilosTotales} hilos de urdimbre asignando cada hilo a su lizo correspondiente. Enhebra en este orden: lizo 1, lizo 2, lizo 3, lizo 4, lizo 1, lizo 2…`,
          "Montá los 4 lizos en el bastidor en orden, cada uno separado 3 cm del siguiente. Tensá los elos (presillas) de forma pareja.",
          "Para tejer, levantá los lizos en la secuencia del patrón (ej.: lizos 1+3, luego 2+4 para la tafetán base; lizos 1+2 para el bloque de relieve).",
          "Pasá la lanzadera con la trama con cada calada y apretá con el peine.",
          "Alterná la secuencia de lizos según tu diseño para crear las texturas en relieve.",
        ],
        notas: [
          `Con ${hilosPorCm} hilos/cm y hilo Nº 5, el tejido tendrá ${hilosTotales} hilos en ${a} cm — correcto para el patrón Huck estándar.`,
          "El enhebrado de 4 lizos es la parte más tediosa. Hacelo con luz buena y con la tabla de enhebrado a la vista.",
          "Un error en el enhebrado se ve inmediatamente en las primeras 3 filas. Vale la pena revisar antes de seguir.",
        ],
      };
    },
  },

  "Telar Circular para Calcetines": {
    descripcion: "Telar de agujas circulares con manivela que produce tubos sin costuras. Puede fabricarse con impresión 3D o piezas de madera.",
    unidadAncho: "circunferencia del pie (cm)",
    unidadAlto: "largo del calcetín (cm)",
    tamaños: [
      { label: "Bebé (0–12 meses)", ancho: 12, alto: 14 },
      { label: "Niño/a (3–8 años)", ancho: 16, alto: 20 },
      { label: "Adulto estándar", ancho: 22, alto: 26 },
    ],
    calcular(a, h) {
      const agujas = Math.round(a * 2.5); // agujas por cm de circunferencia
      const vueltas = h * 4; // ~4 vueltas por cm de tejido
      const largoHilo = Math.round(agujas * vueltas * 0.003 * 1.3); // metros
      const ovillos = Math.ceil(largoHilo * 4 / 100); // 4g/m lana para calcetines
      return {
        materiales: [
          `1 telar circular de ${agujas} agujas de ${a} cm de diámetro (se consigue en tiendas de artesanías o se imprime en 3D)`,
          `${largoHilo} m de lana para calcetines (mezcla lana 75% + nailon 25%) — equivale a ~${ovillos} ovillos de 100 g`,
          "Hilo de contraste para marcar el inicio de vuelta (50 cm)",
          "2 marcadores de punto (anillos de plástico o lazadas de hilo)",
        ],
        herramientas: [
          "El telar circular con su manivela (viene con el kit o se fabrica en 3D)",
          "Ganchillo de 2–3 mm para recoger puntos caídos",
          "Aguja de lana de punta roma para rematar",
          "Tijera",
          "Cinta métrica para medir el avance",
        ],
        pasos_detallados: [
          `Verificá que las ${agujas} agujas estén bien enganchadas en sus ranuras y que la manivela gire sin atascarse. Si hay agujas trabadas, ajustalas con el ganchillo.`,
          "Montá los puntos iniciales: hacé un nudo corredizo al inicio de la lana, engancha en la primera aguja y girá la manivela muy lentamente 2 vueltas completas para montar los puntos de arranque.",
          "Tejé 4–6 vueltas de elástico: girar manivela lentamente y guiar el hilo con la mano para que entre en cada aguja. Las primeras vueltas son las más delicadas.",
          `Para el cuerpo del calcetín, girá la manivela de forma fluida y pareja. Contá las vueltas: necesitás ${vueltas} vueltas para ${h} cm de largo.`,
          "Para el talón, sacá la mitad de los puntos del telar a un hilo auxiliar (o usá la función de talón del telar si la tiene) y tejé en vaivén las filas del talón.",
          "Volvé a montar los puntos del talón y continuá tejiendo la planta del pie.",
          "Para el remate, cortá el hilo dejando 20 cm. Pasá el hilo por todas las agujas del último punto con la aguja de lana, cerrandolas en un círculo. Tirá para ajustar y remata por dentro.",
        ],
        notas: [
          `Un calcetín adulto requiere unas ${vueltas} vueltas de manivela — calcuá entre 45 min y 2 horas según tu velocidad.`,
          "Si se cae un punto, el tejido se corre como en el tejido de aguja. Recogelo de inmediato con el ganchillo.",
          "La lana con nailon es imprescindible en el talón y la punta para que el calcetín no se rompa.",
        ],
      };
    },
  },
};

export default function CalculadorTelar({ telar }) {
  const datos = DATOS_TELAR[telar.nombre];
  const [abierto, setAbierto] = useState(false);
  const [ancho, setAncho] = useState(null);
  const [alto, setAlto] = useState(null);
  const [resultado, setResultado] = useState(null);

  if (!datos) return null;

  const handleSeleccionarTamaño = (t) => {
    setAncho(t.ancho);
    setAlto(t.alto);
    setResultado(datos.calcular(t.ancho, t.alto));
  };

  const handleCalcular = () => {
    if (ancho > 0 && alto > 0) {
      setResultado(datos.calcular(parseFloat(ancho), parseFloat(alto)));
    }
  };

  return (
    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-emerald-100 dark:hover:bg-emerald-950/30 transition-colors"
        aria-expanded={abierto}
      >
        <Calculator size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Calculador de materiales</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">Cantidades exactas según el tamaño que quieras</p>
        </div>
        <span className="text-emerald-500 text-base">{abierto ? "▲" : "▼"}</span>
      </button>

      {abierto && (
        <div className="px-4 pb-5 space-y-4 border-t border-emerald-200 dark:border-emerald-800">

          {/* Tamaños sugeridos */}
          <div className="pt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">Tamaños sugeridos</p>
            <div className="flex flex-wrap gap-2">
              {datos.tamaños.map((t, i) => (
                <button
                  key={i}
                  onClick={() => handleSeleccionarTamaño(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors
                    ${ancho === t.ancho && alto === t.alto
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100"}`}
                >
                  {t.label} ({t.ancho}×{t.alto} cm)
                </button>
              ))}
            </div>
          </div>

          {/* Inputs personalizados */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">O ingresá tus medidas</p>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-xs text-emerald-600 dark:text-emerald-400 mb-1 block capitalize">{datos.unidadAncho}</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={ancho ?? ""}
                  onChange={e => setAncho(e.target.value)}
                  className="w-full text-sm rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-emerald-950/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-foreground"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-emerald-600 dark:text-emerald-400 mb-1 block capitalize">{datos.unidadAlto}</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={alto ?? ""}
                  onChange={e => setAlto(e.target.value)}
                  className="w-full text-sm rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-emerald-950/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-foreground"
                />
              </div>
              <button
                onClick={handleCalcular}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0"
              >
                Calcular
              </button>
            </div>
          </div>

          {/* Resultados */}
          {resultado && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-emerald-950/40 rounded-xl p-4 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Lista exacta para {ancho} × {alto} cm
                </p>

                {/* Materiales */}
                <div>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    📦 Materiales
                  </p>
                  <ul className="space-y-1.5">
                    {resultado.materiales.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Herramientas */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    🔧 Herramientas
                  </p>
                  <ul className="space-y-1.5">
                    {resultado.herramientas.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-slate-400 font-bold mt-0.5 flex-shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pasos detallados */}
                {resultado.pasos_detallados?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      📋 Instrucciones paso a paso
                    </p>
                    <ol className="space-y-2">
                      {resultado.pasos_detallados.map((paso, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                          <span className="pt-0.5 leading-relaxed text-foreground">{paso}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Notas */}
                {resultado.notas?.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-3 space-y-1.5">
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">💡 Datos útiles</p>
                    {resultado.notas.map((nota, i) => (
                      <p key={i} className="text-xs text-foreground leading-relaxed">• {nota}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}