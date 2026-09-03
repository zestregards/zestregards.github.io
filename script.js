const root = document.documentElement;
const button = document.getElementById("lightOrDarkButton");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const glyphFor = (theme) => (theme === "dark" ? "☀️" : "🌙");
const themeColor = { light: "#ffffff", dark: "#1d1d1d" };

// No data-theme yet means the OS preference is still in charge.
const currentTheme = () =>
    root.dataset.theme || (prefersDark.matches ? "dark" : "light");

const switchLightOrDark = () => {
    const theme = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    button.textContent = glyphFor(theme);

    // The meta tags key off the OS, not our override, so pin both to the
    // chosen theme once the button has had a say.
    document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((meta) => (meta.content = themeColor[theme]));
};

button.addEventListener("click", switchLightOrDark);

// Start the button in sync with whatever the OS is showing, and keep it
// there if the OS flips before an explicit choice is made.
button.textContent = glyphFor(currentTheme());
prefersDark.addEventListener("change", () => {
    if (!root.dataset.theme) button.textContent = glyphFor(currentTheme());
});
