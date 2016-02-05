var grunt = require('grunt');

grunt.initConfig({
  // -----------------------------------------------------------------------------------------------
  //                                                                                             ts
  // -----------------------------------------------------------------------------------------------
  ts: {
    options: {
      compiler: './node_modules/typescript/bin/tsc'
    },
    default: {
      tsconfig: {
        updateFiles: true,
        passThrough: true
      }
    }
  },
});

grunt.loadNpmTasks('grunt-ts');

grunt.registerTask('build', ['ts']);
