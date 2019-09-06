#!/usr/bin/env node

//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const chalk = require('chalk')

const Configstore = require('configstore')

const { octokit } = require('./lib/octokit')

const { join } = require('path')

// ########################################################################################

//= =======================================================================================
/*                                                                                      *
 *                                  require the modules                                 *
 *                                                                                      */
//= =======================================================================================

const { program, make_red } = require('./lib/showCli')

const { askToUsePrevCreds } = require('./lib/questions')

const createRemoteAndLocalRepo = require('./lib/createRemoteAndLocalRepo')

const addTemplate = require('./lib/addTemplate')

// ########################################################################################

// // we wether all the inputs were provided or not

if (!(program.name)) {
  program.help(make_red)
}

// get the directory from which command is executed from the terminal
var pathname = process.cwd()

// check whether a user wants to add a template

if (program.addTemplate) {
  (async function (templateName, path) {
    // check if template added
    var isTemplateAdded = await addTemplate(templateName, path)

    // output the statements
    if (isTemplateAdded === null) {
      console.log(chalk.red('A template with the same name already exists please choose a different name'))
    } else if (isTemplateAdded === false) {
      process.exit()
    } else {
      console.log(chalk.bold('Template created you can now use it in your repo!!'))
    }
  })(program.addTemplate, pathname)
}

// this try catch block will handle if a user only enter gitesy and not the commands
try {
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
      try {
      // ask to use use prev cred stored in config file
        var usePrevCreds = await askToUsePrevCreds()

        if (usePrevCreds) {
          // create repo
          var template = await createRemoteAndLocalRepo(program)

          if (!template) {
            throw new Error('')
          }

          // is template created
          var isContentsOfTemplateCopied = await require('./lib/copyTemplate')(template, join(pathname, program.name))

          if (!isContentsOfTemplateCopied) {
            throw new Error('')
          }

          console.log(chalk.bold('Repo created!! Now you can navigate and start working') + "\ndon't forget to rename your app in the package.json and make the necessary changes" + chalk.blue("\ndon't forget to npm i inside the directory to install dependencies"))
        } else {
          const { askRemoteCreds } = require('./lib/questions')
          // ask for creds username , pass
          const creds = await askRemoteCreds(program.remote)

          conf.set(`${program.remote}.creds`, creds)

          var template = await createRemoteAndLocalRepo(program, pathname)
          if (!template) {
            throw new Error('')
          }

          var isContentsOfTemplateCopied = await require('./lib/copyTemplate')(template, join(pathname, program.name))

          if (!isContentsOfTemplateCopied) {
            throw new Error('')
          }

          console.log(chalk.bold('Repo created!! Now you can navigate and start working') + "\ndon't forget to rename your app in the package.json and make the necessary changes" + chalk.blue("\ndon't forget to npm i inside the directory to install dependencies"))
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
    } else {
      const { askRemoteCreds } = require('./lib/questions')
      try {
      // ask for creds username , pass
        const creds = await askRemoteCreds(program.remote)

        // we set the new creds
        conf.set(`${remoteWebHosting}.creds`, creds)

        // create the local and remote repo
        var template = await createRemoteAndLocalRepo(program)

        if (!template) {
          throw new Error('')
        }

        var isContentsOfTemplateCopied = await require('./lib/copyTemplate')(template, join(pathname, program.name))

        if (!isContentsOfTemplateCopied) {
          throw new Error('')
        }

        console.log(chalk.bold('Repo created!! Now you can navigate and start working') + "\ndon't forget to rename your app in the package.json and make the necessary changes" + chalk.blue("\ndon't forget to npm i inside the directory to install dependencies"))
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
} catch (error) {
  if (!program.addTemplate) {
    console.log(chalk.red('Use gitesy -h for help'))
  }
}
