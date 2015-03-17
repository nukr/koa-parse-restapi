var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", ["babel", "watch"]);

gulp.task("watch", function () {
  gulp.watch("src/*.js", ["babel"]);
});

gulp.task("babel", function () {
  gulp.src("src/*")
    .pipe(babel())
    .pipe(gulp.dest("lib"));
});
