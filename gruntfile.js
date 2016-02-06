var grunt = require('grunt');

grunt.initConfig({
  // -----------------------------------------------------------------------------------------------
  //                                                                                           clean
  // -----------------------------------------------------------------------------------------------
  clean: {
    build: {
      src: ['dist/']
    }
  },
  // -----------------------------------------------------------------------------------------------
  //                                                                                              ts
  // -----------------------------------------------------------------------------------------------
  ts: {
    options: {
      compiler: './node_modules/typescript/bin/tsc',
      noImplicitAny: true,
      preserveConstEnums: true,
      experimentalDecorators: true,
      sourceMap: false,
      removeComments: false,
      target: 'es5',
    },
    system: {
      options: {
        module: 'system',
        declaration: true,
      },
      files: [{ src: ['src/**/*.ts'], dest: 'dist/system/decorators.js' }],
    },
    es6: {
      options: {
        target: 'es6',
        module: 'es6'
      },
      files: [{ src: ['src/**/*.ts'], dest: 'dist/es6/' }],
    },
    amd: {
      options: {
        module: 'amd'
      },
      files: [{ src: ['src/**/*.ts'], dest: 'dist/amd/decorators.js' }],
    },
    commonjs: {
      options: {
        module: 'commonjs',
      },
      files: [{ src: ['src/**/*.ts'], dest: 'dist/commonjs' }],
    }
  },
  // -----------------------------------------------------------------------------------------------
  //                                                                                          rename
  // -----------------------------------------------------------------------------------------------
  rename: {
    declarations: {
      src: 'dist/system/decorators.d.ts',
      dest: 'dist/decorators.d.ts',
    },
  },
  // -----------------------------------------------------------------------------------------------
  //                                                                                          uglify
  // -----------------------------------------------------------------------------------------------
  uglify: {
    system: {
      files: {
        'dist/system/decorators.min.js': ['dist/system/decorators.js']
      }
    },
    amd: {
      files: {
        'dist/amd/decorators.min.js': ['dist/amd/decorators.js']
      }
    },
    commonjs: {
      files: {
        'dist/commonjs/decorators.min.js': ['dist/commonjs/decorators.js']
      }
    }
  }
});

grunt.loadNpmTasks('grunt-ts');
grunt.loadNpmTasks('grunt-rename');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-clean');

grunt.registerTask('build', ['clean','ts', 'rename', 'uglify']);
