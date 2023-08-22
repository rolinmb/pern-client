import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';

const Synth = () => {
  const audioCtxRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [pressedKeyMap, setPressedKeyMap] = useState({});
  const [pressedNoteMap, setPressedNoteMap] = useState({});
  const [noteMap, setNoteMap] = useState({
    'Q': { "note": 'C0', "frequency": 261.63, "oscillator": null },
    '2': { "note": 'C#0/Db0', "frequency": 277.18, "oscillator": null },
    'W': { "note": 'D0', "frequency": 293.66, "oscillator": null },
    '3': { "note": 'D#0/Eb0', "frequency": 311.13, "oscillator": null },
    'E': { "note": 'E0', "frequency": 329.63, "oscillator": null },
    'R': { "note": 'F0', "frequency": 349.23, "oscillator": null },
    '5': { "note": 'F#0/Gb0', "frequency": 369.99, "oscillator": null },
    'T': { "note": 'G0', "frequency": 392.0, "oscillator": null },
    '6': { "note": 'G#0/Ab0', "frequency": 415.3, "oscillator": null },
    'Y': { "note": 'A0', "frequency": 440.0, "oscillator": null },
    '7': { "note": 'A#0/Bb0', "frequency": 466.16, "oscillator": null },
    'U': { "note": 'B0', "frequency": 493.88, "oscillator": null },
    'I': { "note": 'C1', "frequency": 523.25, "oscillator": null },
    '9': { "note": 'C#1/Db1', "frequency": 554.37, "oscillator": null },
    'O': { "note": 'D1', "frequency": 587.33, "oscillator": null },
    '0': { "note": 'D#1/Eb1', "frequency": 622.25, "oscillator": null },
    'P': { "note": 'E1', "frequency": 659.25, "oscillator": null }
  });

  const handleKeyDown = useCallback((e) => {
    const updatedNoteMap = {...noteMap};
    const updatedPressedKeyMap = {...pressedKeyMap};
    updatedPressedKeyMap[String(e.key).toUpperCase()] = true;
    setPressedKeyMap(updatedPressedKeyMap);
    if (String(e.key).toUpperCase() in noteMap) {
      const note = noteMap[String(e.key).toUpperCase()]["note"];
      const updatedPressedNoteMap = {...pressedNoteMap};
      if(!pressedNoteMap[String(note)]) {
        updatedPressedNoteMap[String(note)] = true;
        setPressedNoteMap(updatedPressedNoteMap);
        const osc = audioCtxRef.current.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(noteMap[String(e.key).toUpperCase()]["frequency"], audioCtxRef.current.currentTime);
        osc.connect(audioCtxRef.current.destination);
        if (!muted) {
          osc.start();
        }
        updatedNoteMap[String(e.key).toUpperCase()]["oscillator"] = osc;
        setNoteMap(updatedNoteMap);
      }
    }
  }, [noteMap, pressedNoteMap, pressedKeyMap, muted]);
  
  const handleKeyUp = useCallback((e) => {
    const updatedNoteMap = {...noteMap};
    const updatedPressedKeyMap = {...pressedKeyMap};
    updatedPressedKeyMap[String(e.key).toUpperCase()] = false;
    setPressedKeyMap(updatedPressedKeyMap);
    if (String(e.key).toUpperCase() in noteMap) {
      const note = noteMap[String(e.key).toUpperCase()]["note"];
      const updatedPressedNoteMap = {...pressedNoteMap};
      updatedPressedNoteMap[String(note)] = false;
      setPressedNoteMap(updatedPressedNoteMap);
      try {
        const osc = noteMap[String(e.key).toUpperCase()]["oscillator"];
        if (osc) {
          osc.stop();
          osc.disconnect();
        }
      } catch {}
      updatedNoteMap[String(e.key).toUpperCase()]["oscillator"] = null;
      setNoteMap(updatedNoteMap);
    }
  }, [noteMap, pressedNoteMap, pressedKeyMap]);
  
  const toggleSynth = () => {
    setMuted(prevMuted => {
      const actualMuted = !prevMuted;
      const updatedNoteMap = { ...noteMap };
      for (const key in updatedNoteMap) {
        if (updatedNoteMap[key]["oscillator"]) {
          try {
            updatedNoteMap[key]["oscillator"].stop();
          } catch {
            return;
          }
        }
        updatedNoteMap[key]["oscillator"] = null;
      }
      setNoteMap(updatedNoteMap);
      if (actualMuted) {
        return true;
      } else {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = audioContext;
        return false;
      }
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = audioContext;
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp)
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <Fragment>
      <h3 className='text-center mt-5 page-header-main'>In-Browser Synthesizer {muted ? '(CURRENTLY MUTED)' : '(UNMUTED)'}</h3>
      &nbsp;
      <p>Pressed Keys: {JSON.stringify(pressedKeyMap)}</p>
      <p>Pressed Notes: {JSON.stringify(pressedNoteMap)}</p>
      <button onClick={toggleSynth}>Press To {muted ? 'Unmute' : 'Mute'}</button>
    </Fragment>
  );
}

export default Synth;