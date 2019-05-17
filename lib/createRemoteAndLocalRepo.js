
//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const Configstore = require('configstore')



//########################################################################################


//= =======================================================================================
/*                                                                                      *
 *                                  require the modules                                 *
 *                                                                                      */
//= =======================================================================================

const { cloneRemoteRepo } = require('./local')

const { registerNewToken, createRemoteRep } = require('./remote')

//########################################################################################

const conf = new Configstore('autogit')
module.exports=async (program)=>{
  try {

    // we get the token for the github account acces
    var token = await registerNewToken(program.remote, conf.get(`${program.remote}.creds`))
  
    // we get the details of the remote repo or the program crashes
    var remoteRepoDetails = await createRemoteRep(token, program.app, program.name, program.remote)
  
    // we clone the remote repo here
    var isLocalDirCreated = await cloneRemoteRepo(pathname, conf.get(`${program.remote}.creds`), program.name)
  
    // check if the repo was cloned 
    if(!isLocalDirCreated){
      throw new Error('Error while creating the local repo')
    }

    return true
  
  } catch (error) {
    // this catch block will be executed if the user quits the program
    console.log(chalk.red(error))
    return false
  }

}
  