import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import teto from "./assets/teto-baner.jpg"
import avatar from './assets/avatar.jpg'
import './App.css'
import PixelBlast from './assets/components/background'
import { Marquee } from './assets/components/Marquee'
import { Modal } from './assets/components/Modal/Modal'

function App() {

  const arrMarquee = ['uwu', 'i love teto <3', '44$btc', 'no money 😂', 'minecraft <3', 'roblox <3', 'space-station 14 </3'];

  const [modalDiscordActive, setModalDiscordActive] = useState(false);
  const [modalDonateActive, setModalDonateActive] = useState(false);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
      <div className="page">
        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#edb0cd"
          patternScale={2.5}
          patternDensity={1.35}
          pixelSizeJitter={0.45}
          enableRipples={false}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.95}
          edgeFade={0.16}
          transparent
        >
          <div className="layout">
            <div className="content">
              <div className="baner">
                <img src={teto} alt="teto" className="baner-img"/>
              </div>
              <div className='marquee'>
                <Marquee text={shuffle(arrMarquee).join(' '.repeat(20))}/>
              </div>

              <div className="nav">
              <nav>
                <ul>
                  <li><a href="https://github.com/MinokaaUWU">github</a></li>
                  <li><a onClick={() => setModalDiscordActive(true)}>discord</a></li>
                  <li><a onClick={() => setModalDonateActive(true)}>donate</a></li>
                </ul>
              </nav>
            </div>

              <div className="box-row">
                <div className="box box-large">
                  <p>
                    Hiii, Im Mia. Im a full-stack developer proficient in C#, Java, Python, and JS. My tech stack React and Next.js.
                    <br /><br />
                    I love playing Minecraft, Roblox, Deltarune, PZ, and a bunch of other stuff. I adore Teto, Miku, and the rest of the Vocaloid gang (Teto my beloved).
                    <br />
                    :3
                    <br />
                    My goal for this year is to earn €5000.
                  </p>
                </div>
                <div className="box box-small">
                  <img src={avatar} alt="avatar" />
                  <h2>Minokaa</h2>
                  <p>She/her</p>
                </div>
              </div>
              <div className="box box-full">
                <iframe
                  className="youtube-player"
                  src="https://www.youtube.com/embed/kuNixp-wvWM?list=RDaTK72cR-GOY&index=27&autoplay=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <Modal active={modalDonateActive} setActive={setModalDonateActive}>
              <p>USDT TRC20: TEBEBkeKp3k6eMkHurFvn2s1j9MCYxBpvb</p>
            </Modal>
            <Modal active={modalDiscordActive} setActive={setModalDiscordActive}>
              <p>my discord id: minokaa</p>
            </Modal>
          </div>
        </PixelBlast>

        <img
          className="corner-gif corner-gif-left"
          src="https://static2.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/f3/c7/9nhTBouV.gif"
          alt="teto"
        />
        <img
          className="corner-gif corner-gif-right"
          src="https://media1.tenor.com/m/ISUJN_6fPqIAAAAd/kasane-teto-hatsune-miku.gif"
          alt="teto"
        />
      </div>
  )
}

export default App
