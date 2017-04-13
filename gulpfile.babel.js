import babelify from 'babelify'
import browserify from 'browserify'
import gulp from 'gulp'
import gutil from 'gulp-util'
import gwatch from 'gulp-watch'
import reactify from 'reactify'
import source from 'vinyl-source-stream'
import watchify from 'watchify'
import dotenv from 'dotenv'
import file from 'gulp-file'

dotenv.config({path: '../.env'})

const config = {
  src:  './App/Web/Containers/App.js', // Entry point for bundler
  dest: './App/Web/public/assets/js/' // Built Javascripts
}

gulp.task('fastwatch', () => {
  let bundler = watchify(browserify({
    entries:      [config.src],
    extensions:   ['.js'],
    debug:        true,
    cache:        {},
    packageCache: {},
    fullPaths:    true
  }))

  function build(file) {
    if (file) gutil.log('Recompiling ' + file)
    return bundler
      .transform('babelify', {presets: ['react', 'es2015']})
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest(config.dest))
      .on('end', () => {
        gutil.log(gutil.colors.green('Success, files built to'), config.dest + 'app.js')
      })
  }

  build()
  bundler.on('update', build)
})

gulp.task('default', ['set_env'], () => {

  let bundler = browserify({
    entries: config.src,
    debug:   true
  })

  gwatch(['./src/*.js', './src/**/*.jsx', './src/**/*.js', './src/**/**/*.js'], () => {
    gutil.log(gutil.colors.magenta('Building files...'))
    bundler
      .transform('babelify', {presets: ['react', 'es2015']})
      .bundle()
      .on('error', gutil.log)
      .pipe(source('./catapult-build.js'))
      .pipe(gulp.dest(config.dest))
      .on('end', () => {
        gutil.log(gutil.colors.green('Success, files built to'), config.dest + 'catapult-build.js')
      })
  })
})

gulp.task('watch', function() {
  return scripts(true)
})

function scripts(watch) {
  let bundler, rebundle
  gutil.log('STARTED')
  gutil.log('watching' + __dirname)
  bundler = browserify({
    entries:      config.src,
    basedir:      __dirname,
    extensions:   ['js'],
    debug:        true,
    cache:        {},
    packageCache: {},
    fullPaths:    watch
  })
  if (watch)
    bundler = watchify(bundler)

  bundler.transform('babelify', {
    plugins: [
      'transform-runtime'
    ]
  })

  rebundle = function() {
    gutil.log('rebundling started')
    let stream = bundler.bundle()
    stream.on('error', gutil.log)
    stream = stream.pipe(source('./app.js'))
    return stream.pipe(gulp.dest(config.dest))
  }

  bundler.on('update', rebundle)
  bundler.on('time', (time) => {gutil.log('Recompiled in: ', time, ' ms.')})
  return rebundle()
}


gulp.task('build', ['set_env'], () => {

  let bundler = browserify({
    entries: config.src,
    debug:   true
  })

  gulp.src(['./src/*.js', './src/**/*.jsx', './src/**/*.js', './src/**/**/*.js'], () => {
    gutil.log(gutil.colors.magenta('Building files...'))
    bundler
      .transform('babelify', {presets: ['react', 'es2015']})
      .bundle()
      .on('error', gutil.log)
      .pipe(source('./catapult-build.js'))
      .pipe(gulp.dest(config.dest))
      .on('end', () => {
        gutil.log(gutil.colors.green('Success, files built to'), config.dest + 'catapult-build.js')
      })
  })
})

gulp.task('set_env', () => {
  gulp.src('./app/**.js')
    .pipe(file('env.js', 'export const CANDIDATE_POLL_INTERVAL = ' + process.env.CANDIDATE_POLL_INTERVAL + `\nexport const ENV = '${process.env.NODE_ENV}'`))
    .pipe(gulp.dest('./src/env'))
})
