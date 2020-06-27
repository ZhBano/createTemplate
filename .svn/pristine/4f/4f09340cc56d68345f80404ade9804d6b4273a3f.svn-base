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

/**
 * 复制文件
 * @param src {String} 要复制的文件
 * @param dist {String} 复制到目标文件
 */
function copyFile(src, dist) {
    
    fs.writeFileSync(dist, fs.readFileSync(src));
  }



/**
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.access(dist, function(err){
      if(err){
        // 目录不存在时创建目录
        fs.mkdirSync(dist);
      }
      _copy(null, src, dist);
    });
  
    function _copy(err, src, dist) {
      if(err){
        callback(err);
      } else {
        fs.readdir(src, function(err, paths) {
          if(err){
            callback(err)
          } else {
            paths.forEach(function(path) {
              var _src = src + '/' +path;
              var _dist = dist + '/' +path;
              fs.stat(_src, function(err, stat) {
                if(err){
                  callback(err);
                } else {
                  // 判断是文件还是目录
                  if(stat.isFile()) {
                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                  } else if(stat.isDirectory()) {
                    // 当是目录是，递归复制
                    copyDir(_src, _dist, callback)
                  }
                }
              })
            })
          }
        })
      }
    }
  }




module.exports = {
    writeFile,
    deleteFile,
    delDir,
    copyDir,
    copyFile
}



