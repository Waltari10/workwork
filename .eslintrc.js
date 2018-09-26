module.exports = {
    extends: "airbnb-base",
    rules: {
        semi: ["error", "never"],
        "arrow-parens": 0,
        "consistent-return": 0,
        "class-methods-use-this": 0,
        "no-plusplus": 0,
        "operator-linebreak": 0
    },
    globals: {
        THREE: true,
        scene: true,
        instantiate: true,
        window: true,
        camera: true,
        gameObjects: true,
        document: true,
        findTag: true,
        Vector3: true
    }
};