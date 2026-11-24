const tooltips = document.getElementsByClassName("tooltip")
const badges = document.getElementsByClassName("badge")

function addPopoverListeners(tooltip, source) {
    const open = () => {
        tooltip.showPopover({ source })
    }

    const close = () => {
        tooltip.hidePopover()
    }

    source.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            open()
        }
    })
    source.addEventListener("mouseover", open)
    source.addEventListener("mouseout", close)
    source.addEventListener("focus", open)
    source.addEventListener("blur", close)
}

for (const badge of badges) {
    const tooltip = badge.getElementsByClassName("tooltip-container")[0]
    addPopoverListeners(tooltip, badge)
}

const headers = document.getElementsByClassName("for-header")
const barSvg = `<svg width="27.5" height="32" viewBox="0 0 27.5 32" xmlns="http://www.w3.org/2000/svg" class="bar-svg">
<path style="fill:#000000;fill-opacity:1;stroke:var(--c);stroke-width:8;stroke-dasharray:none;stroke-opacity:1"
d="M 26.760878,-7.6962025 0.97184841,38.413502"/>
</svg>`

const timePerBar = 2500;
let exOffset = 0;
for (const header of headers) {
    const headerBar = header.getElementsByClassName("header-bars")[0]
    exOffset += (Math.random() * timePerBar * 0.4) + 300
    for (let i = 0; i < 4; i++) {
        const barSvgContainer = document.createElement("div")
        barSvgContainer.innerHTML = barSvg
        headerBar.appendChild(barSvgContainer)
        const svg = barSvgContainer.getElementsByClassName("bar-svg")[0]

        svg.getAnimations().forEach((animation) => {
            animation.currentTime = i * timePerBar + exOffset
        })
        svg.style.setProperty("--offset", `-${svg.clientWidth * i}px`)
        barSvgContainer.getElementsByTagName("path")[0].getAnimations().forEach((animation) => {
            animation.currentTime = i * timePerBar + exOffset
        })
    }
}

function updateCurrentTime() {
    const time = new Intl.DateTimeFormat('en-US', 
        { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Chicago' }
    ).format(new Date())
    document.getElementById("current-time").textContent = time
    const day = new Intl.DateTimeFormat('en-US', 
        { month: 'short', day: 'numeric', timeZone: 'America/Chicago' }
    ).format(new Date())
    document.getElementById("current-date").textContent = `(${day.toLowerCase()})`
}

setInterval(updateCurrentTime, 200)
updateCurrentTime()

const goodPrefs = document.querySelectorAll(".pref.good")
const okPrefs = document.querySelectorAll(".pref.ok")
const badPrefs = document.querySelectorAll(".pref.bad")

const infos = document.getElementsByClassName("pref-info")
const helpIcon = document.createElement("iconify-icon")
helpIcon.setAttribute("icon", "material-symbols:help-rounded")
helpIcon.setAttribute("inline", "")
helpIcon.classList.add("help-icon")
const helpContainer = document.createElement("div")
helpContainer.classList.add("help-container")
helpContainer.setAttribute("tabindex", "0")
for (const inf of infos) {
    const clonedHelp = helpIcon.cloneNode(true)
    const anchorName = `--anc-${inf.getAttribute("data-info")}`
    clonedHelp.style.anchorName = anchorName
    inf.style.setProperty("--anchor", `${anchorName}`)

    const clonedContainer = helpContainer.cloneNode(true)
    inf.parentElement.appendChild(clonedContainer)

    clonedContainer.appendChild(inf)


    addPopoverListeners(inf, clonedContainer)

    clonedContainer.append(clonedHelp)
}

const doubleCheck = document.createElement("iconify-icon")
doubleCheck.setAttribute("icon", "ri:check-double-fill")
doubleCheck.setAttribute("inline", "")
for (const goodPref of goodPrefs) {
    goodPref.prepend(doubleCheck.cloneNode(true))
}

const midBox = document.createElement("iconify-icon")
midBox.setAttribute("icon", "ic:sharp-indeterminate-check-box")
midBox.setAttribute("inline", "")
for (const okPref of okPrefs) {
    okPref.prepend(midBox.cloneNode(true))
}

const errorIcon = document.createElement("iconify-icon")
errorIcon.setAttribute("icon", "bx:error-alt")
errorIcon.setAttribute("inline", "")
for (const badPref of badPrefs) {
    badPref.prepend(errorIcon.cloneNode(true))
}


const tetrTime = {
    "40l": new Date("2026-09-16T12:48:54.797Z"),
    "qp": new Date("2026-11-20T14:58:57.868Z"),
    "qpe": new Date("2026-07-01T23:09:29.700Z"),
}
for (const [key, date] of Object.entries(tetrTime)) {
    const timePassed = new Date() - date
    const daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24))
    const monthsPassed = Math.floor(daysPassed / 30)
    const yearsPassed = Math.floor(monthsPassed / 12)

    let content = `${daysPassed} DAYS`
    if (monthsPassed > 1) {
        content = `${monthsPassed} MONTHS`
    }
    if (yearsPassed > 0) {
        content = `${yearsPassed} YEAR${yearsPassed > 1 ? "S" : ""}`
    }
    
    const tetrTimeElement = document.getElementById(`tetr-${key}-age`)
    tetrTimeElement.textContent = content
}