var gulp = require('gulp');
var path = require('path');
var plugins = require("gulp-load-plugins")({
    lazy: false
});

gulp.task('scripts', function() {
    //combine all js files of the app
    gulp.src(['!./app/**/*_test.js', '!./app/assets/**/*.js', './app/**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('../server/public/scripts'));
});

gulp.task('templates', function() {
    //combine all template files of the app into a js file
    gulp.src(['!./app/index.html',
        './app/**/*.html'
    ])
        .pipe(plugins.angularTemplatecache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest('../server/public/scripts'));
});

gulp.task('vendorJS', function() {
    //concatenate vendor JS files
    gulp.src(['!./bower_components/**/*.min.js',
        './bower_components/**/*.js'
    ])
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest('../server/public/scripts'));
});

gulp.task('watch', function() {
    gulp.watch([
        '../server/public/**/*.html',
        '../server/public/**/*.js'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js', '!./app/**/*test.js'], ['scripts']);
    gulp.watch(['!./app/index.html', './app/**/*.html'], ['templates']);

});
gulp.task('connect', plugins.connect.server({
    root: ['../server/public'],
    port: 9000,
    livereload: true
}));

gulp.task('default', ['connect', 'scripts', 'templates', 'vendorJS', 'watch']);