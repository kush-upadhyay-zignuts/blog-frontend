import React, { useState } from "react";

const SpeechDial = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const toggleDial = () => setIsOpen(!isOpen);

  const speakText = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel(); // Clear any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setIsOpen(false);
      };
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    speechSynthesis.resume();
    setIsPaused(false);
  };

  const handleCancel = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setIsOpen(false);
  };

  return (
    <div
      className="position-fixed"
      style={{ bottom: "20px", right: "40px", zIndex: 999 }}
    >
      {isOpen && isSpeaking && (
        <div className="d-flex flex-column align-items-center mb-2">
          {isPaused ? (
            <button
              className="btn btn-outline-info mb-2"
              onClick={handleResume}
              style={{width:"5rem"}}
            >
               Play
            </button>
          ) : (
            <button
              className="btn btn-outline-info mb-2"
              onClick={handlePause}
              style={{width:"5rem"}}
            >
               Pause
            </button>
          )}
          <button className="btn btn-outline-danger"  style={{width:"5rem"}} onClick={handleCancel}>
             Cancel
          </button>
        </div>
      )}
      <button
        className="btn btn-info rounded-circle shadow"
        style={{ width: "60px", height: "60px", fontSize: "24px" }}
        onClick={() => {
          if (!isSpeaking) speakText();
          toggleDial();
        }}
        title="Listen"
      >
       🔊
      </button>
    </div>
  );
};

export default SpeechDial;
