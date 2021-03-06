let fs = require('fs')

//写入
function writeFile(path, content, flag) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, { flag }, err => {
            if (err) {
                reject(err)
                return 
            }
            resolve()
            console.log('已保存')
        })
    })

}


/**
 * 删除文件
 * @param {String} url 
 */
function deleteFile(url) {
    return new Promise((resolve, reject) => {
        fs.unlink(url.replace(/\\/g, "/"), err => {
            if (err) {

                reject(err)
            } else {

                resolve()
            }

        })
    })
}


/**
 * 删除文件夹
 * @param {String} url 
 */

function delDir(path) {
    let files = [];
    //判断路径是否存在
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        console.log(path, 'path')
        fs.rmdirSync(path);
    }
}







module.exports = {
    writeFile,
    deleteFile,
    delDir
}



