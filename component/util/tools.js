var tools = module.exports = {};
var fs = require('fs')
tools.getFileSize = function(_fullPath, _unit)
{
    return new Promise(resolve =>
    {
        fs.stat(_fullPath, (err, stats) =>
        {
            resolve(stats.size);
        });
    })

};

tools.getFileSizeAsync = async function(_fullPath, _unit)
{
    const v = await tools.getFileSize(_fullPath, _unit);
    return v
}

tools.mkdirsSync = function(dirname)
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
// 文件是否存在
tools.isNoSuch = function(_path)
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