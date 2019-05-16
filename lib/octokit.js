//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

const Octokit    =   require('@octokit/rest');

//########################################################################################


module.exports = {
  /**
   * @description             this  function returns auth token
   * 
   * @param {String} username the remote web hosting service username
   * 
   * @param {String} password the remote web hosting service password
   * 
   * @returns                 a auth object or for two factor authentication a prompt
   * 
   * @author Ram pandey
   */
  octokit:(username,password)=>{
    return new Octokit({auth: {
    username: username,
    password: password,
    async on2fa () {
      // example: ask the user
      return prompt('Two-factor authentication Code:')
    }
  }})
}
}

