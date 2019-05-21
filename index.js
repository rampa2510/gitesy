#!/usr/bin/env node

//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const chalk = require('chalk')

const Configstore = require('configstore')

const { octokit } = require('./lib/octokit')

// ########################################################################################

//= =======================================================================================
/*                                                                                      *
 *                                  require the modules                                 *
 *                                                                                      */
//= =======================================================================================

const { program, make_red } = require('./lib/showCli')

const { askToUsePrevCreds } = require('./lib/questions')

const createRemoteAndLocalRepo = require('./lib/createRemoteAndLocalRepo')

// // we wether all the inputs were provided or not

if (!(program.app && program.name)) {
  program.help(make_red)
}

// get the directory from which command is executed from the terminal
var pathname = process.cwd()

// check wether the file exists or not

var isFileExists = require('./lib/files')(program.name, pathname)

if (isFileExists) {
  console.log(chalk.red('Already a git repository!'))
  process.exit()
}
(async () => {
  // store the creds in the config file
  //  Tip: on macOS/Linux, you’ll find the file in /Users/[YOUR-USERNAME]/.config/configstore/autogit.json
  const conf = new Configstore('autogit')

  if (conf.get(`${program.remote}.creds`)) {
    // ask to use use prev cred stored in config file
    var usePrevCreds = await askToUsePrevCreds()

    if (usePrevCreds) {
      var isRepoCreated = await createRemoteAndLocalRepo(program)


    } else {
      const { askRemoteCreds } = require('./lib/questions')
      try {
      // ask for creds username , pass
        const creds = await askRemoteCreds(program.remote)

        conf.set(`${program.remote}.creds`, creds)

        var isRepoCreated = await createRemoteAndLocalRepo(program, pathname)

        if (!isRepoCreated) {
          throw new Error('')
        }
      } catch (error) {
      // this catch block will be executed if the user quits the program
        console.log(chalk.red(error))
      }
    }
  } else {
    const { askRemoteCreds } = require('./lib/questions')
    try {
      // ask for creds username , pass
      const creds = await askRemoteCreds(program.remote)

      // we set the new creds
      conf.set(`${remoteWebHosting}.creds`, creds)

      // create the local and remote repo
      var isRepoCreated = await createRemoteAndLocalRepo(program)

      if (!isRepoCreated) {
        throw new Error('')
      }
    } catch (error) {
      // when a error occurs we want to delete the remote repo

      var repo = program.name
      var owner = conf.get(`${program.remote}.creds.username`)
      let userObject = await octokit(conf.get(`${program.remote}.creds.username`), conf.get(`${program.remote}.creds.password`))
      var deletedRemoteRepo = await userObject.repos.delete({
        owner,
        repo
      })
    }
  }
})()
