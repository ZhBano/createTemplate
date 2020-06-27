var express = require('express');
var router = express.Router();
let Path = require('path');
let fs = require('fs');
let { writeFile, deleteFile, delDir,copyDir,copyFile } = require('../../public/javascripts/createPages')
let dataJSon = require('./data');


// 生成树结构
function readdirs(path) {
    var result = { //构造文件夹数据
        path: path,
        name: Path.basename(path),
        type: 'directory'
    }
    var files = fs.readdirSync(path) //拿到文件目录下的所有文件名 
    result.children = files.map(file => {
        var subPath = Path.resolve(path, file) //拼接为绝对路径
        var stats = fs.statSync(subPath) //拿到文件信息对象

        if (stats.isDirectory()) { //判断是否为文件夹类型
            return readdirs(subPath) //递归读取文件夹
        }

        return { //构造文件数据
            path: subPath,
            name: file,
            type: 'file'
        }
    })

    return result //返回数据
}

function createFilesBox(data) {
    return new Promise((resolve, reject) => {
        let newPath = data.path.replace(/\\/g, "/")

        if (data.addType * 1) {
            //文件夹
            fs.mkdir(`${newPath}/${data.fileName}`, err => {
                if (err) {
                    reject(err)
                } else {
                    writeFile(`${newPath}/${data.fileName}/index.vue`, dataJSon)
                    resolve()
                }
            })
        } else {
            //js
            writeFile(`${newPath}/${data.fileName}.vue`, dataJSon)
            resolve()
        }
    })

}

function ceatefliesBoxOut(data) {
    return new Promise((resolve, reject) => {
        if (data.addType * 1) {
            //文件夹
            fs.mkdir(process.env.fliesHost + '/views/' + data.fileName, err => {
                if (err) {
                    reject(err)
                } else {
                    writeFile(`${process.env.fliesHost}/views/${data.fileName}/index.vue`, dataJSon)
                    resolve()
                }
            })
        } else {
            //vue
            console.log(`${process.env.fliesHost}/views/${data.fileName}.vue`, 'vue')
            writeFile(`${process.env.fliesHost}/views/${data.fileName}.vue`, dataJSon).then(_ => {
                resolve()

            }).catch(err => {

                reject(err)
            })

        }
    })

}


/* POST users listing. */
//获取list
router.post('/list', async (req, res, next) => {
    console.log(req.body.userName, 'req')
    res.status(200).json({
        code: 200,
        data: await readdirs(process.env.fliesHost + '/views'),
        status: 'SUCCESS'
    });
});

//新增
router.post('/addFile', (req, res, next) => {
    console.log(req.body, 'req')


    if (req.body.path) {
        //文件夹里面
        createFilesBox(req.body).then(_ => {
            res.status(200).json({
                code: 200,
                data: null,
                status: 'SUCCESS'
            });
        }).catch(err => {
            res.status(500).json({
                code: 500,
                data: err,
                status: 'ERROR'
            });
        })
    } else {
        //最外层
        console.log(5555)
        ceatefliesBoxOut(req.body).then(_ => {

            res.json({
                code: 200,
                data: null,
                status: 'SUCCESS'
            });
        }).catch(err => {

            res.status(500).json({
                code: 500,
                data: err,
                status: 'ERROR'
            });
        })

    }


});


//删除
router.post('/delete', (req, res, next) => {
    console.log(req.body, 'req')
    if (req.body.type === 'file') {
        deleteFile(req.body.path).then(_ => {
            res.status(200).json({
                code: 200,
                data: null,
                status: 'SUCCESS'
            })
        }).catch(err => {
            res.status(500).json({
                code: 500,
                data: err,
                status: 'ERROR'
            });
        })

        return

    }

    delDir(req.body.path.replace(/\\/g, "/"))
    res.status(200).json({
        code: 200,
        data: null,
        status: 'SUCCESS'
    })


});




//复制文件
router.post('/copyFile', (req, res, next) => {
    console.log(req.body, 'req')
    if (req.body.type === 'file') {
        deleteFile(req.body.path).then(_ => {
            res.status(200).json({
                code: 200,
                data: null,
                status: 'SUCCESS'
            })
        }).catch(err => {
            res.status(500).json({
                code: 500,
                data: err,
                status: 'ERROR'
            });
        })

        return

    }

    delDir(req.body.path.replace(/\\/g, "/"))
    res.status(200).json({
        code: 200,
        data: null,
        status: 'SUCCESS'
    })


});


module.exports = router;
