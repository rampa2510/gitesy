//= =======================================================================================
/*                                                                                      *
 *                                 require node modules                                 *
 *                                                                                      */
//= =======================================================================================

const fs = require('fs')

var { exec } = require('child_process')

const { promisify } = require('util')

const { join } = require('path')

const chalk = require('chalk')

// ########################################################################################

exec = promisify(exec)

/**
 * @description       This function returns the name of all the template directory
 *
 * @returns           An array containing the name of the folders
 *
 * @author Ram Pandey
 */
module.exports = async () => {
  try {
    // we get the dir where the node modules exists using this
    var dir = await exec('npm root -g')

    // here the dir comes like /usr/local/lib/node_modules\n/gitesy/templates/express-server' with a extra
    // \n before gitesy therefore we need to remove it i dont know why exec outputs \n along with output
    dir = join(dir.stdout.replace(new RegExp('s\\n'), 's'), 'gitesy', 'templates')

    // find all the directory
    var files = fs.readdirSync(dir).filter(f => fs.statSync(join(dir, f)).isDirectory())
    return files
  } catch (err) {
    console.log(err)
    console.log(chalk.red('Cannot find templates'))
  }
}
