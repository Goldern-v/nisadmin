var path, node_ssh, ssh, fs, folderSrc, localSrc

let sshUpload = (localSrc = './build', folderSrc = '/crdata/webProject/manage') => {
  fs = require('fs')
  path = require('path')
  var chalk = require("chalk");
  var ora = require("ora");
  node_ssh = require('node-ssh')
  ssh = new node_ssh()
  if (['/', '', '\\', undefined, null].indexOf(folderSrc) > -1) {
    folderSrc = '/crdata/webProject/manage'
  }

  //花都测试环境
  if (process.env.npm_lifecycle_event.indexOf('9868') >= 0) {
    folderSrc = '/crdata/webProject/manage-huadu'
  }

  //南医三护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('8062') >= 0) {
    folderSrc = '/crdata/webProject/nanyisanmanage'
  }

  //江门妇幼护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('9872') >= 0) {
    folderSrc = '/crdata/webProject/manage-fuyou'
  }

  //东莞横沥护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('9874') >= 0) {
    folderSrc = '/crdata/webProject/manage-dongguanhengli'
  }

  //贵州省人医护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('9875') >= 0) {
    folderSrc = '/crdata/webProject/manage-guizhourenyi'
  }

  //武汉护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('9964') >= 0) {
    folderSrc = '/crdata/webProject/manage-wuhan'
  }

  //聊城二院护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('9871') >= 0) {
    folderSrc = '/crdata/webProject/manage-liaochengeryuan'
  }


  //武警广东省总队医院护理管理测试环境
  if (process.env.npm_lifecycle_event.indexOf('9869') >= 0) {
    folderSrc = '/crdata/webProject/manage-wujing'
  }

  //护理管理文档
  if (process.env.npm_lifecycle_event.indexOf('docs') >= 0) {
    localSrc = './docs/.vuepress/dist'
    folderSrc = '/crdata/webProject/front-end-doc/manage'
  }
  // localSrc = './build'

  let serverInfo = {
    host: '192.168.1.54',
    port: '22',
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
