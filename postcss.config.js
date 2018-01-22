module.exports = {
    "use": ["autoprefixer", "postcss-cachify"],
    "local-plugins": true,
    "autoprefixer": {
        "browsers": "> 5%"
    },
    "postcss-cachify": {
        "baseUrl": "/res"
    }
}
