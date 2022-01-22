const { watch } =       require('gulp');
const gulp =            require('gulp');
const browserSync =     require('browser-sync').create();
const sass =            require('gulp-sass')(require('sass'));
const cleanCSS =        require('gulp-clean-css');
const concat =          require('gulp-concat');
const rename =          require('gulp-rename');
const autoprefixer =    require('gulp-autoprefixer');
const fileInclude =     require('gulp-file-include');
const del =             require('del');
const imgmin =          require('gulp-imagemin');
const uglify =          require('gulp-uglify-es').default;

const ASSETS = "src/assets/";
const ASSETS_DIST = "dist/assets/";

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch(ASSETS+"js/**/*.js", gulp.series('prepare-js', 'move-js'));
    gulp.watch(ASSETS+"scss/**/*.scss", gulp.series('sass', 'minify-css', 'move-css'));
    gulp.watch("src/**/*.html", gulp.series('build-html'));
});

gulp.task('sass', function(){
    return gulp
        .src(ASSETS+"scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(ASSETS+".tmp/css"));
});

gulp.task('minify-css', () => {
    return gulp
        .src(ASSETS+'.tmp/css/*.css')
        .pipe(autoprefixer({
            grid:true,
            flex:true,
            overrideBrowserslist:["last 5 versions"],
            cascade: true
        }))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(ASSETS+'css'));
});

gulp.task('build-html', ()=>{
    return gulp
        .src("src/*.html")
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});

gulp.task('clear', (done)=>{
    del(['./dist/*']);
    done();
});

gulp.task('cleartmp', (done)=>{
    del([ASSETS+'.tmp/*']);
    done();
});

gulp.task('move-css', (done)=>{
    gulp
        .src(ASSETS+'css/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'css/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('imgmin', (done)=>{
    gulp
        .src(ASSETS+'images/**/*')
        .pipe(imgmin())
        .pipe(gulp.dest(ASSETS_DIST+'images/'));
    done();
});

gulp.task('prepare-js', ()=>{
    return gulp
        .src(ASSETS+'js/**/*.js')
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(rename("all.min.js"))
        .pipe(gulp.dest(ASSETS+'.tmp/js'));
});

gulp.task('move-js', ()=>{
    return gulp
        .src(ASSETS+'.tmp/js/all.min.js')
        .pipe(gulp.dest(ASSETS_DIST+'js/'))
        .pipe(browserSync.stream());
});

gulp.task('move-plugins', ()=>{
    return gulp
        .src(ASSETS+'plugins/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'plugins/'));
});

gulp.task('move-json', ()=>{
    return gulp
        .src(ASSETS+'common/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'common/'));
});

gulp.task('move-svg', ()=>{
    return gulp
        .src(ASSETS+'images/icons/*')
        .pipe(gulp.dest(ASSETS_DIST+'images/icons/'));
});

gulp.task('move-favicon', ()=>{
    return gulp
        .src(ASSETS+'favicon/*')
        .pipe(gulp.dest(ASSETS_DIST + 'favicon/'));
});

gulp.task('move-fonts', ()=>{
    return gulp
        .src(ASSETS+'fonts/**/*')
        .pipe(gulp.dest(ASSETS_DIST+'fonts/'));
});

gulp.task('move', gulp.parallel('move-css', 'move-js', 'move-plugins', 'move-json', 'move-favicon', 'move-fonts'));

gulp.task('build', gulp.series('cleartmp', 'clear', 'sass', gulp.parallel('build-html',  'minify-css', 'prepare-js'), 'imgmin', 'move'));