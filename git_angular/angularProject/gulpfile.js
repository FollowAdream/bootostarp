/**
 * Created by Administrator on 2017/8/2.
 */
var gulp=require('gulp'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    concat=require('gulp-concat'),
    cssmin=require('gulp-clean-css'),
    htmlmin=require('gulp-htmlmin');

//js文件压缩，合并，改名任务
gulp.task('jsmin',function(){
   return gulp.src(['src/js/*.js','src/js/controller/*.js','src/js/service'])
       .pipe(concat('all.js'))
       .pipe(gulp.dest('dist/js'))   //将未压缩版也生成一份到目标目录
       .pipe(uglify())
       .pipe(rename({
          suffix:'.min'
       }))
       .pipe(gulp.dest('dist/js'));
});

//css文件压缩，合并，改名任务
gulp.task('cssmin',function(){
    return gulp.src('src/css/*.css')
       .pipe(concat('all.css'))
       .pipe(gulp.dest('dist/css'))
       .pipe(cssmin())
       .pipe(rename({
           suffix:'.min'
       }))
       .pipe(gulp.dest('dist/css'));
});

//img文件夹
gulp.task('imgmin',function(){
   return gulp.src('src/img/*.png')
       .pipe(gulp.dest('dist/img'));
});

//src下的html文件压缩
gulp.task('htmlmin',function(){
    return gulp.src('src/*.html')
       .pipe(htmlmin({
           collapseWhitespace:true
       }))
       .pipe(gulp.dest('dist'));
});

//src/view目录下的html文件压缩
gulp.task('htmlViewsmin',function(){
   return gulp.src('src/views/*.html')
       .pipe(htmlmin({
           collapseWhitespace:true
       }))
       .pipe(gulp.dest('dist/views'));
});

//复制lib下的第三方库到dist/src/lib下
gulp.task('lib',function(){
   return gulp.src('src/lib/**')
       .pipe(gulp.dest('dist/lib'));
});


//定义default任务
//当执行gulp时，会自动执行的任务
gulp.task('default',function(){
    gulp.start('jsmin','cssmin','htmlmin','htmlViewsmin','lib','imgmin');

});
