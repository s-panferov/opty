module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: ['dist'],
        ts: {
            default : {
                options: {
                    module: "commonjs",
                    noImplicitAny: true,
                },
                src: 'index.ts',
                outDir: 'dist'
            }
        },
    });

    grunt.registerTask('default', ['ts']);
};