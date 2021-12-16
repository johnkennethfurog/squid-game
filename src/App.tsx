import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";

function App() {
  const playButtonRef = React.useRef<HTMLButtonElement>(null);
  const videoRef = React.useRef<any>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const videSource = React.useRef<HTMLSourceElement>(null);
  const [showScne2, setShowScne2] = React.useState(false);

  const [isIdle, setisIdle] = React.useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [startPlaying, setStartPlaying] = React.useState(false);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    const min = remainingTime / 60;
    const sec = remainingTime % 60;

    return (
      <div className="timer">
        <div className="value">{` 0${Math.trunc(min)}: ${
          sec < 10 ? `0${sec}` : sec
        }`}</div>
      </div>
    );
  };

  React.useEffect(() => {
    if (!startPlaying) return;

    let src = "";

    videoRef.current.pause();

    if (isIdle) {
      setIsVideoPlaying(true);
      src = "/assets/scene_3.mp4";
    } else {
      src = "/assets/scene_4.mp4";
    }

    videSource.current?.setAttribute("src", src);

    videoRef.current.load();
    videoRef.current.play();
  }, [isIdle, startPlaying]);

  const play = () => {
    setStartPlaying(true);

    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.2;
    }

    setTimeout(() => {
      playButtonRef.current?.focus();
    }, 1000);
  };

  const startStop = () => {
    if (!isIdle && isVideoPlaying) return;
    setisIdle((e) => !e);
  };

  const onVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  const onTimerTick = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!audioRef) return;

    const currentTime = e.currentTarget.currentTime;

    if (isIdle && currentTime > 1.13 && currentTime < 6) {
      audioRef.current!.volume = 0.05;
    } else if (audioRef.current!.volume !== 0.2) {
      audioRef.current!.volume = 0.2;
    }
  };

  return (
    <div
      className="App"
      onClick={() => {
        playButtonRef.current?.focus();
      }}
    >
      <audio ref={audioRef} autoPlay loop>
        <source src="/assets/bg_sound.mp3" type="audio/mp3" />
      </audio>

      {!startPlaying && !showScne2 && (
        <div
          style={{
            display: "flex",
            width: 1920,
            height: 1080,
            position: "relative",
          }}
        >
          <button
            onClick={() => setShowScne2(true)}
            style={{
              paddingLeft: 50,
              paddingRight: 50,
              borderRadius: 20,
              zIndex: 20,
              backgroundColor: "#e83e7e",
              fontWeight: "bold",
              color: "white",
              position: "absolute",
              bottom: 80,
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 150,
              width: 650,
              border: "none",
              outline: "none",
              cursor: "pointer",
              fontFamily: "Montserrat",
            }}
          >
            START!
          </button>
          <img
            style={{ width: "100%", height: "100%" }}
            src={"/assets/landing.png"}
            alt="go"
          ></img>
        </div>
      )}

      {!startPlaying && showScne2 && (
        <video
          preload="auto"
          width={1920}
          height={1080}
          autoPlay
          onEnded={play}
        >
          <source src="/assets/scene_2.mp4" type="video/mp4"></source>
        </video>
      )}

      {startPlaying && (
        <div
          // onKeyDown={onKeyDown}
          onClick={() => playButtonRef.current?.focus()}
          style={{
            position: "relative",
            width: 1920,
            height: 1080,
          }}
        >
          <video
            ref={videoRef}
            preload="auto"
            width={1920}
            height={1080}
            loop={isIdle}
            autoPlay
            onEnded={onVideoEnd}
            onTimeUpdate={onTimerTick}
          >
            <source
              ref={videSource}
              src="/assets/scene_3.mp4"
              type="video/mp4"
            ></source>
          </video>

          <button
            ref={playButtonRef}
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={startStop}
          >
            {isIdle && (
              <div className="stop-hand-circle">
                <img
                  src={"/assets/go.png"}
                  alt="go"
                  className="stop-hand"
                ></img>
              </div>
            )}

            {!isIdle && (
              <div className="stop-hand-circle">
                <img
                  src={"/assets/stop.png"}
                  alt="stop-hand"
                  className="stop-hand"
                ></img>
              </div>
            )}
          </button>

          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying={isIdle}
              strokeWidth={40}
              duration={90}
              size={320}
              colors={"#e83e7e"}
              trailColor={"#ffffff40"}
              onComplete={() => {
                setShowScne2(false);
                setStartPlaying(false);
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
