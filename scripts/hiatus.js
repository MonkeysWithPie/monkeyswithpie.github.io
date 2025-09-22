const endTime = 1
const startTime = 0

const updateInterval = 100;

function loaded() {
    const now = new Date()
    if (now > endTime || now - startTime < 0) {
        const content = document.getElementById("content");
        content.style.display = "none";
    }

    updateBar(true);
    setInterval(updateBar, updateInterval);
}

function formatTime(millis) {
    const totalSeconds = Math.floor(millis / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let text = "";
    if (days > 0) text += days + ":";
    if (hours > 0 || days > 0) {
        if (hours > 9 || days > 0) text += String(hours).padStart(2, '0') + ":";
        else text += hours + ":";
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        if (minutes > 9 || hours > 0 || days > 0) text += String(minutes).padStart(2, '0') + ":";
        else text += minutes + ":";
    }
    if (totalSeconds > 9) {
        text += String(seconds).padStart(2, '0');
    } else {
        text += seconds;
    }
    return text;
} 

function makeSplitText() {
    const div = document.getElementById("countdown-div");
    const maxTimeText = formatTime(endTime - Date.now()).split("");

    
    for (let i = 0; i < maxTimeText.length; i++) {
        let newDiv = document.createElement("div")
        const waveKeyframes = new KeyframeEffect(
            newDiv,
            [
                { transform: "translateY(6px)" },
                { transform: "translateY(-6px)", }
            ],
            {
                duration: 2000,
                direction: "alternate",
                easing: "ease-in-out",
                iterations: Infinity,
            }
        );
        const waveAnimation = new Animation(waveKeyframes, document.timeline);
        waveAnimation.play();
        waveAnimation.currentTime = (i / maxTimeText.length) * 2000;

        let newHeader = document.createElement("h1")
        newHeader.textContent = maxTimeText[i];
        newDiv.appendChild(newHeader);
        newDiv.setAttribute("class", "item")
        div.appendChild(newDiv);
    }
}

function removeText(element) {
    if (element.getAttribute("removing")) return;
    const duration = 1500;
    const fullDiv = element.parentNode;

    element.setAttribute("removing", true);

    element.style.transition = `opacity ${duration}ms linear, transform ${duration}ms ease-in-out, rotate ${duration}ms ease-in-out`;
    element.style.opacity = 0;
    element.style.transform = "translateY(-100px)";
    element.style.rotate = "-20deg";
    
    setTimeout(() => { 
        let pixels = element.offsetWidth / 2;
        if (fullDiv.style.marginLeft) {
            pixels += (parseFloat(fullDiv.style.marginLeft));
        }
        fullDiv.style.marginLeft = `${pixels}px`;
        fullDiv.style.transition = `margin-left 0ms linear`;

        element.remove();
        setTimeout(() => {
            fullDiv.style.transition = `margin-left ${duration}ms ease-in-out`;
            fullDiv.style.marginLeft = "0px"
        }, 20);
    }, duration);
}

function updateBar(firstLoad = false) {
    const now = new Date();
    const total = endTime - startTime;
    const elapsed = now - startTime;
    const remaining = (endTime - now) > 0 ? (endTime - now) : 0;
    const percent = Math.min(Math.max(elapsed / total, 0), 1) * 100;
    const bar = document.getElementById("bar-filled");

    if (!firstLoad) {
        bar.style.transition = `width ${updateInterval}ms linear`;
    }
    bar.style.width = percent + "%";

    const countdownDiv = document.getElementById("countdown-div");

    if ((percent >= 100 || percent <= 0) && firstLoad) {
        let newHeader = document.createElement("h1");
        newHeader.textContent = "no hiatus";
        newHeader.style.color = "rgba(73, 73, 73, 1)";
        countdownDiv.appendChild(newHeader);
    }
    else if (countdownDiv.childNodes[0]?.textContent !== "no hiatus" && percent > 0) {
        if (firstLoad) makeSplitText();

        if (countdownDiv.childNodes.length > formatTime(remaining).length) {
            const nodesToRemove = Array.from(countdownDiv.childNodes).slice(0, countdownDiv.childNodes.length - formatTime(remaining).length);
            nodesToRemove.forEach(node => {
                const currContent = node.childNodes[0].textContent
                if (currContent !== ':') node.childNodes[0].textContent = '0';
                removeText(node)
            });
        }

        let letterIndex = 0;
        for (let i = 0; i < countdownDiv.childNodes.length; i++) {
            const elementDiv = countdownDiv.childNodes[i];
            if (elementDiv.getAttribute("removing")) continue;
            const element = elementDiv.childNodes[0];

            const char = formatTime(remaining).split("")[letterIndex];
            if (element.textContent !== char && char) {
                element.textContent = char;
                const strength = (countdownDiv.childNodes.length - i)
                const whiteStrength = 103 + (strength*8);
                element.style.color = `rgb(${whiteStrength}, ${whiteStrength}, ${whiteStrength})`;
                element.style.transition = "none";
                setTimeout(() => {
                    element.style.transition = `color ${500 + strength*200}ms linear`;
                    element.style.color = "rgb(99, 99, 99)";
                }, 100);
            }
            letterIndex++;
        }
    }
}

window.onload = loaded