module.exports = {
    presets: [
        [
            "@babel/preset-env", {
                targets: "> 0.25%, not dead",
                useBuiltIns: "usage",
                corejs: 3,
            }
        ],
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-private-methods",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
    ]
};
