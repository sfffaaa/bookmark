module.exports = (grunt) => {
    ['grunt-mocha-test', 'grunt-eslint',
    ].forEach((task) => {
        grunt.loadNpmTasks(task);
    });
    grunt.initConfig({
        mochaTest: {
            test: {
                src: ['test/*.test.js'],
            },
        },
        eslint: {
            target: ['*.js', 'server/*.js', 'app/*.js', 'test/*.js'],
        },
    });
    grunt.registerTask('default', ['eslint', 'mochaTest']);
};
