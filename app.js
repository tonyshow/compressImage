var images = require("images");
// const tinify = require('tinify');


var img = images('./in/example-orig.png');

img.save("./out/example-orig.png",
{
    quality: 0.1 //保存图片到文件,图片质量为50
});


// tinify.key = 'VzjzXnvLyZncGtY4HzQFKlXst26mP68G';
// tinify.fromFile('./in/abce.png').toFile("./out/abce.png");


// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');

// (async() =>
// {
//     const files = await imagemin(['images/*.{jpg,png}'],
//     {
//         destination: 'build/images',
//         plugins: [
//             imageminJpegtran(),
//             imageminPngquant(
//             {
//                 quality: [0.6, 0.8]
//             })
//         ]
//     });

//     console.log(files);
//     //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();