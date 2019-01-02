module.exports = (grunt) => {
    ['grunt-run', 'grunt-eslint',
    ].forEach((task) => {
        grunt.loadNpmTasks(task);
    });
    grunt.initConfig({
        run: {
            test: {
                cmd: './node_modules/jest/bin/jest.js',
                args: ['--runInBand', '--coverage'],
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
    grunt.registerTask('default', ['eslint', 'run:test']);
};
