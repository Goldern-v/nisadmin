var path, node_ssh, ssh, fs

var moment = require("moment");

var chalk = require("chalk");
var ora = require("ora");
fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')
ssh = new node_ssh()

ssh.connect({
  host: '120.25.105.45',
  port: '50022',
  username: 'root',
  privateKey: 'keys/cr_web_rsa' //fs.readFileSync('keys/cr_web_rsa')
  //'/Users/wei/Data/OneDrive/Projects/·ChenRuiDevelopment/东莞市厚街医院项目/nisadmin/keys/cr_web_rsa'
})

  // ssh.connect({
  //     host: 'localhost',
  //     username: 'steel',
  //     privateKey: '/home/steel/.ssh/id_rsa'
  //   })
  /*
   Or
   ssh.connect({
     host: 'localhost',
     username: 'steel',
     privateKey: fs.readFileSync('/home/steel/.ssh/id_rsa')
   })
   if you want to use the raw string as private key
   */
  .then(function () {
    //   // Local, Remote
    //   ssh.putFile('/home/steel/Lab/localPath', '/home/steel/Lab/remotePath').then(function () {
    //     console.log("The File thing is done")
    //   }, function (error) {
    //     console.log("Something's wrong")
    //     console.log(error)
    //   })
    //   // Array<Shape('local' => string, 'remote' => string)>
    //   ssh.putFiles([{
    //     local: '/home/steel/Lab/localPath',
    //     remote: '/home/steel/Lab/remotePath'
    //   }]).then(function () {
    //     console.log("The File thing is done")
    //   }, function (error) {
    //     console.log("Something's wrong")
    //     console.log(error)
    //   })
    //   // Local, Remote
    // ssh.getFile('/Users/wei/Desktop/keys/1', '/home/crNursing-9401-show/webapps/crNursing/manage').then(function (Contents) {
    //   console.log("The File's contents were successfully downloaded")
    // }, function (error) {
    //   console.log("Something's wrong")
    //   console.log(error)
    // })

    // Command
    // ssh.exec('echo try typing something;', 'root').then(function (result) {
    //   console.log('STDOUT: ' + result.stdout)
    //   console.log('STDERR: ' + result.stderr)
    // })

    ssh.execCommand('rm -rf "/home/crNursing-9401-show/webapps/crNursing/manage"', {
      cwd: '/home/crNursing-9401-show/webapps/crNursing/manage',
      onStdout(chunk) {
        console.log('stdoutChunk', chunk.toString('utf8'))
      },
      onStderr(chunk) {
        // console.log('stderrChunk', chunk.toString('utf8'))
      },
    })


    // Putting entire directories
    const failed = []
    const successful = []
    //

    try { var createStream = fs.createWriteStream(`./build/${hospitalName}.宸瑞护理管理系统.${moment().format("YYYY-MM-DD_HH_mm")}`); createStream.end(); } catch (err) { }
    // try { var createStream = fs.createWriteStream(`./dist/${hospitalName}/${hospitalName}.宸瑞护理系统.${moment().format("YYYY-MM-DD_HH_mm")}`); createStream.end(); } catch (err) { }
    //
    ssh.putDirectory('./build', '/home/crNursing-9401-show/webapps/crNursing/manage', {
      recursive: true,
      concurrency: 1,
      validate: function (itemPath) {
        const baseName = path.basename(itemPath)
        return baseName.substr(0, 1) !== '.' && // do not allow dot files
          baseName !== 'node_modules' // do not allow node_modules
      },
      tick: function (localPath, remotePath, error) {
        if (error) {
          failed.push(localPath)
        } else {
          successful.push(localPath)
        }
      }
    }).then(function (status) {
      // console.log('目录传输状态', status ? '成功' : '未成功')
      // console.log('传输失败', failed.join(', '))
      // console.log('完成传输', successful.join(', '))
      if (status) {
        console.log(chalk.green('\n目录传输状态:', status ? '成功' : '未成功'))
      } else {
        console.log(chalk.red('\n目录传输状态:', status ? '成功' : '未成功'))
      }
      if (failed && failed.length > 0) {
        console.log(chalk.red('传输失败文件:(', failed.length, ')', failed.join('\n')))
      }
      console.log(chalk.green('已完成传输文件:(', successful.length, ')\n', successful.join('\n')))
      ssh.dispose()
      // process.exit()
    })


    // Command
    // ssh.execCommand('ll', {
    //   cwd: '/home/crNursing-9401-show/webapps/crNursing/manage'
    // }).then(function (result) {
    //   console.log('STDOUT: ' + result.stdout)
    //   console.log('STDERR: ' + result.stderr)
    // })


    // Command with escaped params
    // ssh.exec('hh_client', ['--json'], {
    //   cwd: '/var/www',
    //   stream: 'stdout',
    //   options: {
    //     pty: true
    //   }
    // }).then(function (result) {
    //   console.log('STDOUT: ' + result)
    // })


    // With streaming stdout/stderr callbacks
    // ssh.exec('hh_client', ['--json'], {
    //   cwd: '/var/www',
    //   onStdout(chunk) {
    //     console.log('stdoutChunk', chunk.toString('utf8'))
    //   },
    //   onStderr(chunk) {
    //     console.log('stderrChunk', chunk.toString('utf8'))
    //   },
    // })
  })

// ssh.disconnect().then(function () {
//   console.log('关闭ssh连接')
// })