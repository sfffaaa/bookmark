module.exports = (grunt) => {
    ['grunt-mocha-test'].forEach((task) => {
        grunt.loadNpmTasks(task);
    });
    grunt.initConfig({
        mochaTest: {
            test: {
                src: ['test/*.js'],
            },
        },
    });
    grunt.registerTask('default', ['mochaTest']);
};
