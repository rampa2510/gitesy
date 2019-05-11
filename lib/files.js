//========================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//========================================================================================

const   path               = require('path'),
      { statSync }         =  require('fs'),
      { platform }         =  require('os')


//########################################################################################


/**
 * @description             helper function to check whether a directory exists or not
 * 
 * @param {String} filepath The file path
 * 
 * @returns                 true if file exists or false if it doesnt
 * 
 * @author Ram pandey
 */

function isFileExists(filepath){
  try {
    statSync(filepath)
    return true
  } catch (error) {
    return false
  }
}

module.exports=(name)=>{
// get the directory from which command is executed from the terminal
var pathname =  process.cwd();

// check if the directory exissts or not depending on the os
if(platform==='win32'){
  var filename =  isFileExists(pathname+`\\${name}`)
}else{
  var filename =  isFileExists(pathname+`/${name}`)
}
return filename
}
