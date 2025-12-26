const switchLightOrDark = () => {
    let theme = document.getElementById("theme");
    let el = document.getElementById("lightOrDarkButton");
    if (theme.getAttribute("href") == "styles/main.light.css") {
        theme.href = "styles/main.dark.css";
        el.firstChild.data = "☀️";
    } else {
        theme.href = "styles/main.light.css";
        el.firstChild.data = "🌙";
    };
};

document.getElementById("lightOrDarkButton").addEventListener("click", switchLightOrDark);
