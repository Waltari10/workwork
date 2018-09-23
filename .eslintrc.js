module.exports = {
    extends: "airbnb-base",
    rules: {
        semi: ["error", "never"],
        "arrow-parens": 0,
    },
    globals: {
        THREE: true,
        scene: true,
        instantiate: true,
        window: true,
        camera: true,
        gameObjects: true,
        document: true
    }
};