var gulp = require('gulp');//引入gulp插件
var html=require('gulp-minify-html');//引入html压缩插件
var sass=require('gulp-sass');//引入sass插件
var css=require('gulp-minify-css');
var connect=require('gulp-connect');
/*var jshint=require('gulp-jshint');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');//js压缩插件
var rename=require('gulp-rename');//重命名插件
var imagemin=require('gulp-imagemin');//图片压缩插件
*/
//构建一个任务，任务的名字是默认的。 gulp执行
//自己定义的其它名称，执行时： gulp 任务名
//gulp基本结构
/*gulp.task('default', function() {
  console.log('abc');
});*/

//1.复制文件。
gulp.task('copyhtml',function(){
	gulp.src('*.html')//引入文件的路径
	.pipe(gulp.dest('../dist/'));//管道(链式)输出  gulp.dest('输出目录'):输出
});


//2.压缩html文件---gulp-minify-html
gulp.task('uglifyhtml',function(){
	gulp.src('html/*.html')//引入文件
	.pipe(html())//应用压缩插件
	.pipe(gulp.dest('../dist/html/'));//输出
});

//监听压缩
gulp.task('watchhtml',function(){
	gulp.watch('html/*.html',function(){//监听
		gulp.run('uglifyhtml');
	})
});

//编译sass
gulp.task('sass',function(){
	gulp.src('scss/*.scss')
	.pipe(sass())//编译sass
	.pipe(gulp.dest('./css/'));//当前目录
});

gulp.task('watchsass',function(){
	gulp.watch('scss/*.scss',function(){
		gulp.run('sass');
	})
});

//压缩css文件
gulp.task('uglifycss',function(){
	gulp.src('css/index.css')//引入文件
	.pipe(css())//应用压缩插件
	.pipe(gulp.dest('../dist/css/'));//输出
});

//监听压缩
gulp.task('watchcss',function(){
	gulp.watch('css/index.css',function(){//监听
		gulp.run('uglifycss');
	})
});

//5.页面自刷新
gulp.task('connect',function(){
	connect.server({
		port:8080,
		livereload:true
	})
});

gulp.task('connecthtml',function(){
	gulp.src(['html/*.html','css/*.css'])
	.pipe(connect.reload())
});
gulp.task('connectwatch',function(){
	gulp.watch(['html/*.html','css/*.css'],['connecthtml']);
})

//压缩图片
/*gulp.task('imagemin',function(){
	gulp.src('img/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest('../dist/img'));
})*/
gulp.task('default',['watchhtml','watchsass','watchcss','connect','connectwatch']);


