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

dotenv.config({path: './App/Web/.env'})

const config = {
  src:  './App/Web/Containers/App.js', // Entry point for bundler
  dest: './App/Web/public/assets/js/' // Built Javascripts
}

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
