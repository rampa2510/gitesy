//= =======================================================================================
/*                                                                                      *
 *                               require the node modules                               *
 *                                                                                      */
//= =======================================================================================

var { exec } = require('child_process')

const { promisify } = require('util')

const chalk = require('chalk')

const { join } = require('path')

const { templateArray } = require('./templateArray')

const fs = require('fs-extra')

// ########################################################################################

exec = promisify(exec)
module.exports = async (template, pathname) => {
  try {
  // we get the dir where the node modules exists using this
    var dir = await exec('npm root -g')

    // check whether the template includes it or not
    if (templateArray.includes(template)) {
    // here the dir comes like /usr/local/lib/node_modules\n/gitesy/templates/express-server' with a extra
    // \n before gitesy therefore we need to remove it i dont know why exec outputs \n along with output
      dir = join(dir.stdout.replace(new RegExp('s\\n'), 's'), 'gitesy', 'templates', template)

      fs.copySync(dir, pathname)
      return true
    } else {
      return true
    }
  } catch (error) {
    console.log(chalk.red("Could'nt detect the node_modules dir"))
    // console.log(error)
    return false
  }
}
