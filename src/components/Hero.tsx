import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";

export default function Hero() {
  const [cycleStarted, setCycleStarted] = useState(false);
  const [lineKey, setLineKey] = useState(0);
  const [jumpTrigger, setJumpTrigger] = useState(false);
  const [waveTrigger, setWaveTrigger] = useState(false);
  const [swapHeadsTrigger, setSwapHeadsTrigger] = useState(false);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setCycleStarted(true);
    }, 5000);

    const jumpInterval = setInterval(() => {
      setJumpTrigger(prev => !prev);
    }, 5000);

    const waveInterval = setInterval(() => {
      setWaveTrigger(prev => !prev);
    }, 7000);

    const swapHeadsInterval = setInterval(() => {
      setSwapHeadsTrigger(prev => !prev);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(jumpInterval);
      clearInterval(waveInterval);
      clearInterval(swapHeadsInterval);
    };
  }, []);

  useEffect(() => {
    if (cycleStarted) {
      const interval = setInterval(() => {
        setLineKey(prevKey => prevKey + 1);
      }, 1900);

      return () => clearInterval(interval);
    }
  }, [cycleStarted]);

  const orangeHeadAnimation = {
    y: jumpTrigger ? [0, -30, 0] : 0,
    x: swapHeadsTrigger ? [0, 100, 0] : 0,
    transition: {
      y: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
      x: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
    }
  };

  const greenHeadAnimation = {
    y: jumpTrigger ? [0, -30, 0] : 0,
    x: swapHeadsTrigger ? [0, -100, 0] : 0,
    transition: {
      y: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
      x: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
    }
  };

  const waveAnimation = {
    d: [
      "M112,210 c27.015,45.65,42.86,101.17,42.86,161.055,0,19.575-1.69,38.685-4.915,57.135-10.825,2.02-22.145,2.795-33.76,2.155-3.475-.19-6.91-.505-10.305-.94,5.495-13.885,8.495-28.895,8.495-44.565,0-52.545-33.77-97.74-82.195-117.8l-.16-.06c-.04-.015-.075-.035-.115-.055-.375-.21-.59-.58-.485-.87.065-.19.255-.3.49-.32.16-.015.34.015.52.095.075.03.14.07.205.11,20.02,5.75,40,13.54,59.65,23.425,2.245,1.13,4.485,2.285,6.72,3.47,8.53,3.3,16.935,2.425,22.37-3.27,4.015-4.21,5.745-10.345,5.355-17.13-.305-2.2-.64-4.39-.99-6.57-3.105-19.09-8.025-37.485-14.565-54.965-.065-.1-.12-.215-.165-.345-.025-.085-.045-.165-.06-.25-.06-.405.05-.765.29-.86.195-.075.42.03.595.26.06.08.12.175.165.28Z",
      "M112,210 c27.015,45.65,42.86,101.17,42.86,161.055,0,19.575-1.69,38.685-4.915,57.135-10.825,2.02-22.145,2.795-33.76,2.155-3.475-.19-6.91-.505-10.305-.94,5.495-13.885,8.495-28.895,8.495-44.565,0-52.545-33.77-97.74-82.195-117.8l-.16-.06c-.04-.015-.075-.035-.115-.055-.375-.21-.59-.58-.485-.87.065-.19.255-.3.49-.32.16-.015.34.015.52.095.075.03.14.07.205.11,20.02,5.75,40,13.54,59.65,23.425,2.245,1.13,4.485,2.285,6.72,3.47,8.53,3.3,16.935,2.425,22.37-3.27,4.015-4.21,5.745-10.345,5.355-17.13-.305-2.2-.64-4.39-.99-6.57-3.105-19.09-8.025-37.485-14.565-54.965-.065-.1-.12-.215-.165-.345-.025-.085-.045-.165-.06-.25-.06-.405.05-.765.29-.86.195-.075.42.03.595.26.06.08.12.175.165.28 C115,205 120,200 125,205 C130,210 135,215 140,210Z"
    ],
    transition: {
      duration: 1,
      ease: "easeInOut",
      yoyo: Infinity,
    }
  };

  return (
    <section className="bg-six">
      <div className="container flex flex-col justify-center md:p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between ">
        {/* Texto del lado izquierdo */}
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left 2xl:ml-32">
          <motion.h1 className="text-5xl font-bold leading-none sm:text-6xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Importación de
            <span className="text-[#FF8C39]"> Dispositivos</span> Médicos
          </motion.h1>
          <motion.p className="mt-6 mb-8 text-lg sm:mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            Ofrecemos una amplia gama de productos farmacéuticos,
            <br className="hidden md:inline lg:hidden" />
            equipos médicos y pruebas rápidas de la más alta calidad.
          </motion.p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start z-10">
            <motion.a
              rel="noopener noreferrer"
              href="/productos"
              className="px-8 py-3 text-lg font-semibold rounded bg-[#FF8C39] text-white hover:bg-[#FF8C45]/90 "
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            >
              Ver Catálogo
            </motion.a>
            <motion.a
              rel="noopener noreferrer"
              href="/sobre-nosotros#contacto"
              className="px-8 py-3 text-lg font-semibold border rounded border-gray-800 hover:bg-gray-100 hover:scale-105"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            >
              Contactar
            </motion.a>
          </div>
        </div>

        {/* Animación del logo */}
        <div className="flex items-center justify-center mt-[-60px] ml-6 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 flex-1">
          <motion.svg
            viewBox="0 0 800 600"
            className="w-full "
            initial="hidden"
            animate="visible"
          >
            {/* Cuerpo naranja */}
            <motion.path
              d="M112,210 c27.015,45.65,42.86,101.17,42.86,161.055,0,19.575-1.69,38.685-4.915,57.135-10.825,2.02-22.145,2.795-33.76,2.155-3.475-.19-6.91-.505-10.305-.94,5.495-13.885,8.495-28.895,8.495-44.565,0-52.545-33.77-97.74-82.195-117.8l-.16-.06c-.04-.015-.075-.035-.115-.055-.375-.21-.59-.58-.485-.87.065-.19.255-.3.49-.32.16-.015.34.015.52.095.075.03.14.07.205.11,20.02,5.75,40,13.54,59.65,23.425,2.245,1.13,4.485,2.285,6.72,3.47,8.53,3.3,16.935,2.425,22.37-3.27,4.015-4.21,5.745-10.345,5.355-17.13-.305-2.2-.64-4.39-.99-6.57-3.105-19.09-8.025-37.485-14.565-54.965-.065-.1-.12-.215-.165-.345-.025-.085-.045-.165-.06-.25-.06-.405.05-.765.29-.86.195-.075.42.03.595.26.06.08.12.175.165.28Z"
              fill="#FF8C39"
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 1, ease: "easeOut" }
                }
              }}
              animate={waveTrigger ? waveAnimation : {}}
            />
            {/* Cabeza naranja */}
            <motion.path
              d="M105,240 c5.85,12.635,4.65,26.25-2.685,30.41-7.335,4.16-18.025-2.71-23.875-15.34-5.85-12.635-4.65-26.25,2.685-30.41,7.335-4.16,18.025,2.71,23.875,15.34Z"
              fill="#1D1D1B"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.5 }
                }
              }}
              animate={orangeHeadAnimation}
            />

            {/* Cuerpo verde */}
            <motion.path
              d="M200,210 c-27.015,45.65-42.86,101.17-42.86,161.055,0,19.575,1.69,38.685,4.915,57.135,10.825,2.02,22.145,2.795,33.76,2.155,3.475-.19,6.91-.505,10.305-.94-5.495-13.885-8.495-28.895-8.495-44.565,0-52.545,33.77-97.74,82.195-117.8l.16-.06c.04-.015.075-.035.115-.055.375-.21.59-.58.485-.87-.065-.19-.255-.3-.49-.32-.16-.015.34.015.52.095.075.03.14.07.205.11-20.02,5.75-40,13.54-59.65,23.425-2.245,1.13-4.485,2.285-6.72,3.47-8.53,3.3-16.935,2.425-22.37-3.27-4.015-4.21-5.745-10.345-5.355-17.13.305-2.2.64-4.39.99-6.57,3.105-19.09,8.025-37.485,14.565-54.965.065-.1.12-.215.165-.345.025-.085.045-.165.06-.25.06-.405-.05-.765-.29-.86-.195-.075.42.03.595.26.06.08.12.175.165.28Z"
              fill="#00B14B"
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 1, ease: "easeOut" }
                }
              }}
              animate={waveTrigger ? {
                d: [
                  "M200,210 c-27.015,45.65-42.86,101.17-42.86,161.055,0,19.575,1.69,38.685,4.915,57.135,10.825,2.02,22.145,2.795,33.76,2.155,3.475-.19,6.91-.505,10.305-.94-5.495-13.885-8.495-28.895-8.495-44.565,0-52.545,33.77-97.74,82.195-117.8l.16-.06c.04-.015.075-.035.115-.055.375-.21.59-.58.485-.87-.065-.19-.255-.3-.49-.32-.16-.015.34.015.52.095.075.03.14.07.205.11-20.02,5.75-40,13.54-59.65,23.425-2.245,1.13-4.485,2.285-6.72,3.47-8.53,3.3-16.935,2.425-22.37-3.27-4.015-4.21-5.745-10.345-5.355-17.13.305-2.2.64-4.39.99-6.57,3.105-19.09,8.025-37.485,14.565-54.965.065-.1.12-.215.165-.345.025-.085.045-.165.06-.25.06-.405-.05-.765-.29-.86-.195-.075.42.03.595.26.06.08.12.175.165.28Z",
                  "M200,210 c-27.015,45.65-42.86,101.17-42.86,161.055,0,19.575,1.69,38.685,4.915,57.135,10.825,2.02,22.145,2.795,33.76,2.155,3.475-.19,6.91-.505,10.305-.94-5.495-13.885-8.495-28.895-8.495-44.565,0-52.545,33.77-97.74,82.195-117.8l.16-.06c.04-.015.075-.035.115-.055.375-.21.59-.58.485-.87-.065-.19-.255-.3-.49-.32-.16-.015.34.015.52.095.075.03.14.07.205.11-20.02,5.75-40,13.54-59.65,23.425-2.245,1.13-4.485,2.285-6.72,3.47-8.53,3.3-16.935,2.425-22.37-3.27-4.015-4.21-5.745-10.345-5.355-17.13.305-2.2.64-4.39.99-6.57,3.105-19.09,8.025-37.485,14.565-54.965.065-.1.12-.215.165-.345.025-.085.045-.165.06-.25.06-.405-.05-.765-.29-.86-.195-.075.42.03.595.26-.06.08-.12.175-.165.28 C197,205 192,200 187,205 C182,210 177,215 172,210Z"
                ],
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  yoyo: Infinity,
                }
              } : {}}
            />
            {/* Cabeza verde */}
            <motion.path
              d="M205,240 c-5.85,12.635-4.65,26.25,2.685,30.41,7.335,4.16,18.025-2.71,23.875-15.34,5.85-12.635,4.65-26.25-2.685-30.41-7.335-4.16-18.025,2.71-23.875,15.34Z"
              fill="#1D1D1B"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.5 }
                }
              }}
              animate={greenHeadAnimation}
            />

            {/* Nombre de la empresa */}
            <motion.text
              x="230"
              y="370"
              className="text-5xl font-bold"
              fill="#FF8C39"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 1, duration: 1 }
                }
              }}
            >
              MEDICAL ISVIL SAC
            </motion.text>

            {/* Texto Droguería */}
            <motion.text
              x="230"
              y="426"
              className="text-5xl"
              fill="#000"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 1.2, duration: 1 }
                }
              }}
            >
              DROGUERÍA
            </motion.text>

            {/* Línea de latido */}
            <AnimatePresence>
              <motion.path
                key={cycleStarted ? lineKey : 'initial'}
                d="M50,440 L580,440 L585,470 L598,435 L605,480 L616,415 L630,485 L640,400 L650,440 L675,440"
                stroke="#000000"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { 
                    pathLength: { duration: 3, ease: "easeInOut" },
                    opacity: { duration: 2 }
                  }
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 2.3 }
                }}
              />
            </AnimatePresence>
          </motion.svg>
        </div>
      </div>
    </section>
  )
}

