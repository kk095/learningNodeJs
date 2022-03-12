const gulp = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const gulpRev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const gulpImg = require('gulp-imagemin');
const del = require('del');

gulp.task('css',function(done){
    console.log("minifying css");
    gulp.src("assets/scss/**/*.scss")
    .pipe(gulpSass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"))

    return gulp.src("assets/**/*.css")
    .pipe(gulpRev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(gulpRev.manifest({
        cwd:"public",
        merge:true
    }))
    .pipe(gulp.dest("public/assets"));
    done();
})

gulp.task('images',function(done){
    console.log("minifying images....");
    gulp.src("assets/img/**/*.+(png|jpg|gif|jpeg|svg)")
    .pipe(gulpImg())
    .pipe(gulpRev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(gulpRev.manifest({
        cwd:"public",
        merge:true
    }))
    .pipe(gulp.dest("./public/assets"));
    done();
})
gulp.task('js',function(done){
    console.log("minifying js....");
    gulp.src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(gulpRev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(gulpRev.manifest({
        cwd:"public",
        merge:true
    }))
    .pipe(gulp.dest("./public/assets"));
    done();
})

gulp.task("clean:assets",function(done){
    del.sync("./public/assets");
    done();
})

gulp.task("build",gulp.series("clean:assets","css","js","images"),function(done){
    console.log("building minifying....");
    done();
})