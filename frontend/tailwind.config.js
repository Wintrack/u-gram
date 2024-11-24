/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: "#ffffe7",
                    100: "#feffc1",
                    200: "#fffd86",
                    300: "#fff441",
                    400: "#ffe50d",
                    500: "#ffd600", // mine
                    600: "#d19d00",
                    700: "#a67102",
                    800: "#89570a",
                    900: "#74470f",
                    950: "#442504",
                },
                sorbus: {
                    50: "#fffaec",
                    100: "#fff3d3",
                    200: "#ffe3a5",
                    300: "#ffce6d",
                    400: "#ffad32",
                    500: "#ff920a",
                    600: "#ff7a00", // mine
                    700: "#cc5802",
                    800: "#a1440b",
                    900: "#823a0c",
                    950: "#461b04",
                },
                rose: {
                    50: "#ffeff3",
                    100: "#ffe0e9",
                    200: "#ffc6d9",
                    300: "#ff97b9",
                    400: "#ff5d95",
                    500: "#ff2476",
                    600: "#ff0069", // mine
                    700: "#d70058",
                    800: "#b40053",
                    900: "#99024d",
                    950: "#570025",
                },
                "fuchsia-pink": {
                    50: "#fff2fe",
                    100: "#ffe4fe",
                    200: "#ffc7fb",
                    300: "#ff9cf4",
                    400: "#ff61ec",
                    500: "#ff26eb",
                    600: "#f405e9",
                    700: "#d300c5", // mine
                    800: "#a50398",
                    900: "#86097a",
                    950: "#5c0053",
                },
                "electric-violet": {
                    50: "#f3f2ff",
                    100: "#ebe8ff",
                    200: "#d9d3ff",
                    300: "#bdb0ff",
                    400: "#9d83ff",
                    500: "#7e51ff",
                    600: "#7638fa", // mine
                    700: "#601be6",
                    800: "#5116c1",
                    900: "#43149e",
                    950: "#270a6b",
                },
                yellow: {
                  50: "#ffd600",
                  100: "#ffd600",
                  200: "#ffd600",
                  300: "#ffd600",
                  400: "#ffd600",
                  500: "#ffd600",
                  600: "#ffd600",
                  700: "#ffd600",
                  800: "#ffd600",
                  900: "#ffd600",
                  950: "#ffd600",
                },
                orange: {
                  50: "#ff7a00",
                  100: "#ff7a00",
                  200: "#ff7a00",
                  300: "#ff7a00",
                  400: "#ff7a00",
                  500: "#ff7a00",
                  600: "#ff7a00",
                  700: "#ff7a00",
                  800: "#ff7a00",
                  900: "#ff7a00",
                  950: "#ff7a00",
                },
                red: {
                  50: "#ff0069",
                  100: "#ff0069",
                  200: "#ff0069",
                  300: "#ff0069",
                  400: "#ff0069",
                  500: "#ff0069",
                  600: "#ff0069",
                  700: "#ff0069",
                  800: "#ff0069",
                  900: "#ff0069",
                  950: "#ff0069",
                },
                pink: {
                  50: "#d300c5",
                  100: "#d300c5",
                  200: "#d300c5",
                  300: "#d300c5",
                  400: "#d300c5",
                  500: "#d300c5",
                  600: "#d300c5",
                  700: "#d300c5",
                  800: "#d300c5",
                  900: "#d300c5",
                  950: "#d300c5",
                },
                purple: {
                  50: "#7638fa",
                  100: "#7638fa",
                  200: "#7638fa",
                  300: "#7638fa",
                  400: "#7638fa",
                  500: "#7638fa",
                  600: "#7638fa",
                  700: "#7638fa",
                  800: "#7638fa",
                  900: "#7638fa",
                  950: "#7638fa",
                },
            },
        },
    },
    plugins: [],
});
