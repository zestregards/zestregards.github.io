const root = document.documentElement;
const button = document.getElementById("lightOrDarkButton");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const glyphFor = (theme) => (theme === "dark" ? "☀️" : "🌙");

// No data-theme yet means the OS preference is still in charge.
const currentTheme = () =>
    root.dataset.theme || (prefersDark.matches ? "dark" : "light");

const switchLightOrDark = () => {
    const theme = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    button.textContent = glyphFor(theme);
};

button.addEventListener("click", switchLightOrDark);

// Start the button in sync with whatever the OS is showing, and keep it
// there if the OS flips before an explicit choice is made.
button.textContent = glyphFor(currentTheme());
prefersDark.addEventListener("change", () => {
    if (!root.dataset.theme) button.textContent = glyphFor(currentTheme());
});
