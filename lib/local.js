//= =======================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//= =======================================================================================

const git = require('simple-git/promise')

const CLI = require('clui')

const Spinner = CLI.Spinner

const chalk = require('chalk')

// ########################################################################################

module.exports = {
  /**
   * @description             this function clone the repo locally
   *
   * @param {String} pathname the local path where we want to clone the repo
   *
   * @param {String} creds    the creds for the remote web hosting service
   *
   * @param {String} repoName the remote repoName
   *
   * @author Ram Pandey
   */
  cloneRemoteRepo: async (pathname, creds, repoName) => {
    var countdown = new Spinner(`Cloning from remote repo...  `, ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])
    countdown.start()
    // the remote url
    var remote = `https://${creds.username}:${creds.password}@github.com/${creds.username}/${repoName}`

    try {
      var localFileCreate = await git(pathname).silent(true).clone(remote)
      countdown.stop()
      return true
    } catch (error) {
      countdown.stop()
      console.log(chalk.red('Something went wrong while cloning repo please try again'))
      console.log(error);
      return false
    }
  }
}
