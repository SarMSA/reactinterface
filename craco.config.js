module.exports = {
    stryle: {
        postcss: {
            plugin: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
}