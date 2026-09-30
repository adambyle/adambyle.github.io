// Light/dark theme. Follows the system setting unless the visitor picks one
// with the toggle, in which case that choice is remembered.
//
// Loaded in <head> (not deferred) so the theme is set before the page paints.
(function () {
    var KEY = "theme";
    var root = document.documentElement;
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    function saved() {
        try {
            return localStorage.getItem(KEY);
        } catch (e) {
            return null;
        }
    }

    function save(theme) {
        try {
            // Matching the system again means "follow the system" from now on.
            if (theme === systemTheme()) localStorage.removeItem(KEY);
            else localStorage.setItem(KEY, theme);
        } catch (e) {}
    }

    function systemTheme() {
        return systemDark.matches ? "dark" : "light";
    }

    function apply() {
        root.setAttribute("data-theme", saved() || systemTheme());
    }

    apply();
    systemDark.addEventListener("change", function () {
        apply();
        updateToggle();
    });

    function updateToggle() {
        var button = document.querySelector(".theme-toggle");
        if (!button) return;
        var dark = root.getAttribute("data-theme") === "dark";
        button.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode",
        );
        button.setAttribute("aria-pressed", dark ? "true" : "false");
    }

    document.addEventListener("DOMContentLoaded", function () {
        var button = document.querySelector(".theme-toggle");
        if (!button) return;
        button.hidden = false;
        updateToggle();
        button.addEventListener("click", function () {
            var next =
                root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            save(next);
            root.setAttribute("data-theme", next);
            updateToggle();
        });
    });
})();
