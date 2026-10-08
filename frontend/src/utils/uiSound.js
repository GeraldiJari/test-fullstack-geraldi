const audioContext =
    new (window.AudioContext || window.webkitAudioContext)();

export const playSelectSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
        520,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        760,
        audioContext.currentTime + 0.06
    );

    gainNode.gain.setValueAtTime(
        0.06,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
};

export const playCloseSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
        700,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        350,
        audioContext.currentTime + 0.08
    );

    gainNode.gain.setValueAtTime(
        0.04,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
};