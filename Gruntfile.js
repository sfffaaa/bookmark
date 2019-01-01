module.exports = (grunt) => {
    ['grunt-mocha-test', 'grunt-eslint',
    ].forEach((task) => {
        grunt.loadNpmTasks(task);
    });
    grunt.initConfig({
        mochaTest: {
            backend: {
                src: [
                    'test/*.test.js',
                ],
            },
            frontend: {
                options: {
                    require: '@babel/register',
                },
                src: [
                    'test/redux.test/*.test.js',
                ],
            },
        },
        eslint: {
            target: [
                '*.js',
                'server/*.js',
                'frontend/*.js',
                'frontend/myredux/*/*.js',
                'test/*.js',
            ],
        },
    });
    grunt.registerTask('default', ['eslint', 'mochaTest:backend', 'mochaTest:frontend']);
};
