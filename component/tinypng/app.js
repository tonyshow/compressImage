var walk = require("walkdo");
var tinify = require("tinify");
require("shelljs/global");
var fs = require('fs');
var path = require('path')
var app = module.exports = {};
var inPath = process.argv[2];
tinify.key = "xxxx"; //设置你的api_k

app.doMain = function()
{
    exec(`rm -r -f output`);
    exec(`mkdir output`)
    app.run();
};
var totalCompressSize = 0;
var totalSize = 0;
app.mkdirsSync = function(dirname)
{
    if (fs.existsSync(dirname))
    {
        return true;
    }
    else
    {
        if (this.mkdirsSync(path.dirname(dirname)))
        {
            fs.mkdirSync(dirname);
            return true;
        }
    }
};
app.isNoSuch = function(_path)
{
    try
    {
        fs.statSync(_path);
        return true;
    }
    catch (error)
    {
        return false;
    }
};
app.run = function()
{
    //源文件
    var source = path.resolve(inPath);

    if (!app.isNoSuch(source))
    {
        console.error("路径错误:", source)
    }
    //同步深度遍历文件夹
    walk(source, (fileFullPath, next, context) =>
    {
        next.call(context)
        let pos = fileFullPath.lastIndexOf("/")
        if (-1 != fileFullPath.indexOf(".png") || -1 != fileFullPath.indexOf(".jpg"))
        {
            fs.stat(fileFullPath, (err, stats) =>
            {
                let outAfPart = fileFullPath.replace(source, '');
                let outputFileFullPath = path.resolve("./output/" + outAfPart);
                let outputPos = outputFileFullPath.lastIndexOf("/")
                app.mkdirsSync(outputFileFullPath.substr(0, outputPos));
                totalSize += stats.size;
                const source_tmp = tinify.fromFile(fileFullPath); //遍历上传图像文件
                source_tmp.toFile(outputFileFullPath); //压缩后文件
                app.getFileSize(outputFileFullPath, stats.size);
            })

        }
    }, () =>
    {
        //  console.log("all finish!")
    })
};
app.getFileSize = function(_fullPath, bfSize)
{
    if (!!app.isNoSuch(_fullPath))
    {
        fs.stat(_fullPath, (err, stats) =>
        {
            let pos = _fullPath.lastIndexOf("/")
            let fileName = _fullPath.substr(pos + 1, _fullPath.length);
            let compressSize = (bfSize - stats.size) / 1024;
            if (compressSize < 0)
            {
                console.error(fileName + ":优化不成功 size变大了");
            }
            else if (compressSize == 0)
            {
                //  console.error(fileName + ":无任何压缩");
            }
            else
            {
                totalCompressSize += compressSize;
                console.log(`${fileName} 前${bfSize/1024}kb-后${stats.size/1024}kb 差值= ${compressSize}kb 累计优化:${Math.floor(totalCompressSize)}kb (${Math.floor(totalCompressSize/1024)}mb) ${Math.floor(totalSize/1024/1024)}MB`);
            }
        });
        return;
    }
    setTimeout(() =>
    {
        // console.log("文件还未生产出来等待...", _fullPath)
        app.getFileSize(_fullPath, bfSize)
    }, 1000);
};
app.doMain();