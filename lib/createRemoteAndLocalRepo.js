
//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const Configstore = require('configstore')

const chalk = require('chalk')

// ########################################################################################

//= =======================================================================================
/*                                                                                      *
 *                                  require the modules                                 *
 *                                                                                      */
//= =======================================================================================

const { cloneRemoteRepo } = require('./local')

const { registerNewToken, createRemoteRep } = require('./remote')

// ########################################################################################

const conf = new Configstore('autogit')

/**
 * @description             this functions creates the local as well as remote repo
 *
 * @param {Object} program  this is the object that contains the data obtained from the terminal
 *
 * @param {String} pathname the directory where the local repo has to be cloned
 *
 * @returns                 true if all is done or false incase of error
 *
 * @author Ram pandey
 */
module.exports = async (program, pathname) => {
  try {
    // we get the token for the github account acces
    var token = await registerNewToken(program.remote, conf.get(`${program.remote}.creds`))

    if (!token) {
      throw new Error(`Error while registring token ${program.remote}`)
    }

    // we get the details of the remote repo or the program crashes
    var remoteRepoDetails = await createRemoteRep(token, program.app, program.name, program.remote)

    if (!remoteRepoDetails) {
      throw new Error(`Error while While creating repo on ${program.remote}`)
    }

    // we clone the remote repo here
    var isLocalDirCreated = await cloneRemoteRepo(pathname, conf.get(`${program.remote}.creds`), program.name)

    // check if the repo was cloned
    if (!isLocalDirCreated) {
      throw new Error('Error while creating the local repo')
    }

    return true
  } catch (error) {
    // this catch block will be executed if the user quits the program
    console.log(chalk.red(error))

    return false
  }
}
