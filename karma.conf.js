module.exports = function (config) { 
    config.set({ 
        browsers: ['ChromeHeadless'],
        frameworks: ['jasmine'], 
        files: ['build/**/*.spec.js'], 
        plugins: ['karma-webpack', 'karma-jasmine', 'karma-chrome-launcher'],
        preprocessors: {
            'build/**/*.spec.js': ['webpack']
        }
    }) 
}   