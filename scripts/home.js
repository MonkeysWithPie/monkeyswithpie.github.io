const headerText = document.querySelector("h1#header-text")
const headerDiv = document.querySelector("div#header");

const WAVE_DURATION = 3000;
const COLOR_DURATION = 2000;

function startAni(element, progress) {
    const waveKeyframes = new KeyframeEffect(
        element,
        [
            { transform: "translateY(10px)" },
            { transform: "translateY(-10px)", }
        ],
        {
            duration: WAVE_DURATION,
            direction: "alternate",
            easing: "ease-in-out",
            iterations: Infinity,
        }
    );
    const waveAnimation = new Animation(waveKeyframes, document.timeline);

    waveAnimation.play();
    waveAnimation.currentTime = WAVE_DURATION - (progress * WAVE_DURATION);

    const colorKeyframes = new KeyframeEffect(
        element,
        [
            { color: "#e3c852" },
            { color: "#f1d767" },
        ],
        {
            duration: COLOR_DURATION,
            direction: "alternate",
            easing: "linear",
            iterations: Infinity,
        }
    )
    const colorAnimation = new Animation(colorKeyframes, document.timeline)
    colorAnimation.play();
    colorAnimation.currentTime = COLOR_DURATION - (progress * COLOR_DURATION);
}

if (headerText && headerDiv) {
    const letters = (headerText.textContent || "").split("")

    for (let i = 0; i < letters.length; i++) {
        let newElement = document.createElement("h1")
        newElement.textContent = letters[i];
        newElement.setAttribute("class", "item")

        headerDiv.appendChild(newElement);
        startAni(newElement, i/letters.length)
    };
    headerText.remove()
}