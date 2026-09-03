const button = document.getElementById("lightOrDarkButton");
const osPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeColor = { light: "#ffffff", dark: "#1d1d1d" };

/* data-theme is the override; absent it, the OS decides. */
const isDark = () => {
    const override = document.documentElement.dataset.theme;
    return override ? override === "dark" : osPrefersDark.matches;
};

/* Colors follow the tokens on their own; the rest of this doesn't. */
const render = () => {
    const dark = isDark();
    button.textContent = dark ? "☀️" : "🌙";
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");

    /* The metas key off the OS, so they only need pinning once the button
       has had a say. Pinning unconditionally would freeze them here, on the
       first render, and the OS could never move them again. */
    if (document.documentElement.dataset.theme) {
        document
            .querySelectorAll('meta[name="theme-color"]')
            .forEach((meta) => (meta.content = themeColor[dark ? "dark" : "light"]));
    }
};

button.addEventListener("click", () => {
    document.documentElement.dataset.theme = isDark() ? "light" : "dark";
    render();
});

/* Fires either way, but a no-op once an override is set: isDark() stops
   consulting the media query at that point. */
osPrefersDark.addEventListener("change", render);

render();
