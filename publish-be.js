var path, node_ssh, ssh, fs, folderSrc, localSrc

let sshUpload = (localSrc = './build', folderSrc = '/crdata/webProject/badeventManage') => {
  fs = require('fs')
  path = require('path')
  var chalk = require("chalk");
  var ora = require("ora");
  node_ssh = require('node-ssh')
  ssh = new node_ssh()
  if (['/', '', '\\', undefined, null].indexOf(folderSrc) > -1) {
    folderSrc = '/crdata/webProject/badeventManage'
  }

  if (process.env.npm_lifecycle_event.indexOf('nys-be') >= 0) {
    console.log('南医三不良事件管理系统')
    folderSrc = '/crdata/webProject/badeventManage/nys'
  }
  // localSrc = './build'

  let serverInfo = {
    host: '120.25.105.45',
    port: '50289',
    username: 'root',
    privateKey: path.resolve(__dirname, "./keys/cr_web_rsa") //fs.readFileSync('keys/cr_web_rsa')
  }


  var spinner = ora(`正在同步上传至${serverInfo.host}服务器...`);

  console.log(chalk.yellow('----项目上传至服务器----', serverInfo.host));
  spinner.start()

  let rsyncopy = () => {
    // Putting entire directories
    const failed = []
    const successful = []
    ssh.putDirectory(localSrc, folderSrc, {
      recursive: true,
      concurrency: 1,
      // validate: function (itemPath) {
      //   // const baseName = path.basename(itemPath)
      //   return true
      //   // return baseName.substr(0, 1) !== '.' && // do not allow dot files
      //   //   baseName !== 'node_modules' // do not allow node_modules
      // },
      tick: function (localPath, remotePath, error) {
        if (error) {
          failed.push(localPath)
        } else {
          // __dirname
          let p = "--> ." + localPath.replace(path.resolve(__dirname, "../"), '')
          successful.push(p)
        }
      }
    }).then(function (status) {
      spinner.stop()
      if (status) {
        console.log(chalk.green('\n目录传输状态:', status ? '成功' : '未成功'))
      } else {
        console.log(chalk.red('\n目录传输状态:', status ? '成功' : '未成功'))
      }
      if (failed && failed.length > 0) {
        console.log(chalk.red('传输失败文件:(', failed.length, ')', failed.join('\n')))
      }
      console.log(chalk.green('已完成传输文件:(', successful.length, ')\n', successful.join('\n')))
      console.log(chalk.yellow('----完成文件上传至服务器----', serverInfo.host));
      ssh.dispose()
      // process.exit()
    })
  }



  ssh.connect(serverInfo)
    .then(function () {
      //
      ssh.execCommand(`rm -rfv "${folderSrc}"`, {
        // ssh.execCommand(`ls -hasg "${folderSrc}" && pwd`, {
        cwd: folderSrc,
        onStdout(chunk) {
          console.log(chalk.yellow('\n---清空服务端旧文件夹---'))
          console.log(chalk.red(chunk.toString('utf8')))
          // spinner.stop()
          // ssh.dispose()
        },
        onStderr(chunk) {
          // console.log('stderrChunk', chunk.toString('utf8'))
          // spinner.stop()
          // ssh.dispose()
        },
      })
        .then(() => {
          rsyncopy()
        })

    })


  // ssh.disconnect().then(function () {
  //   console.log('关闭ssh连接')
  // })

}


sshUpload()

module.exports = {
  sshUpload
}
