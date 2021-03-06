//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const { statSync } = require('fs')

const { join } = require('path')

// ########################################################################################

/**
 * @description             helper function to check whether a directory exists or not
 *
 * @param {String} filepath The file path
 *
 * @returns                 true if file exists or false if it doesnt
 *
 * @author Ram pandey
 */

function isFileExists (filepath) {
  try {
    statSync(filepath)
    return true
  } catch (error) {
    return false
  }
}

/**
 * @description             helper function to check whether .git folder exists in the folder or not
 *
 * @param {String} name     the name of the directory where you want to check whether the file exists or not
 *
 * @param {String} pathname the current working directory
 *
 * @returns                 true if exists or false
 *
 * @author   Ram pandey
 */
module.exports = (name = '', pathname) => {
// check if the directory exists or not depending on the os

  var filename = isFileExists(join(pathname, name, 'git'))

  return filename
}
