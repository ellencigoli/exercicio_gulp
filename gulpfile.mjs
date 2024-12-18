import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import dartSass from 'sass';
import uglify from 'gulp-uglify';
import browserSyncPkg from 'browser-sync';

// Configuração do SASS
const browserSync = browserSyncPkg.create();
const sassCompiler = sass(dartSass);

// Tarefa: Compilar SASS
gulp.task('styles', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sassCompiler({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Tarefa: Otimizar Imagens
gulp.task('images', () => {
    return gulp.src('src/images/**/*.{jpg,jpeg,png,gif,svg}') // Seleciona todos os formatos de imagem
        .pipe(gulp.dest('dist/images')); // Copia as imagens sem otimizar
});

// Tarefa: Minificar JS
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Servidor com Live Reload
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './' // Servindo a pasta raiz do projeto
        }
    });    
    gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
    gulp.watch('src/images/**/*', gulp.series('images'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
    gulp.watch('*.html').on('change', browserSync.reload);
});

// Tarefa padrão
gulp.task('default', gulp.parallel('styles', 'images', 'scripts', 'serve'));