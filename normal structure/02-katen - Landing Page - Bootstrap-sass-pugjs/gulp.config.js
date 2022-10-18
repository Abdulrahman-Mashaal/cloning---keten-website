let languages = {
    ar: {
        name: "ar",
        direction: "rtl"
    },
    en: {
        name: "en",
        direction: "ltr"
    }
}

module.exports = {
    lang: {
        default: {
            ...languages.en,
            baseUrl: ""
        },
        secondary: {
            ...languages.en,
            active: false,
            baseUrl: "../"
        }
    },
    paths: {
        srcs: {
            pug: "./src/*.pug",
            pugIncludes: "./src/include/**/*.pug",
            scssMain: "./src/assets/scss/style.scss",
            scssWatch: "./src/assets/scss/**/*.scss",
            scripts: "./src/assets/js/**/*.js",
            cImages:"./src/assets/images/**/*.*",
        },
        dists: {
            html: "./dist/",
            css: "./dist/assets/css/",
            js: "./dist/assets/js/",
            images: "./dist/assets/images/"
        }
    }
}