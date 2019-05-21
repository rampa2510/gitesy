//= =======================================================================================
/*                                                                                      *
 *                               require the node modules                               *
 *                                                                                      */
//= =======================================================================================

var { exec } = require('child_process')

const { promisify } = require('util')

const chalk = require('chalk')

const { join } = require('path')

const getTemplates = require('./requestAllTemplates')

const fse = require('fs-extra')

const fs = require('fs')

// ########################################################################################

exec = promisify(exec)

/**
 * @description                 this function adds a new template folder in the templates directory
 *
 * @param {String} templateName the name of the template
 *
 * @param {String} pathname     the specified path where the template folder exists
 *
 * @returns  true if templates is added
 *           null if a templateName already exists
 *           false incase of error
 * @author Ram pandey
 */
module.exports = async (templateName, pathname) => {
  try {
  // we get the dir where the node modules exists using this
    var dir = await exec('npm root -g')

    // get the array containing all the template names
    var templateArray = await getTemplates()

    // check whether the template includes it or not
    if (!templateArray.includes(templateName)) {
      // here the dir comes like /usr/local/lib/node_modules\n/gitesy/templates/express-server' with a extra
      // \n before gitesy therefore we need to remove it i dont know why exec outputs \n along with output
      dir = join(dir.stdout.replace(new RegExp('s\\n'), 's'), 'gitesy', 'templates', templateName)

      // create the directory to store new template
      fs.mkdirSync(dir, { recursive: true })

      // copy contents
      fse.copySync(pathname, dir)
      return true
    } else {
      return null
    }
  } catch (error) {
    console.log(chalk.red("Could'nt detect the node_modules dir"))
    // console.log(error)
    return false
  }
}
