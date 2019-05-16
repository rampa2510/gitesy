//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

const git   =   require('simple-git/promise'),
      CLI                  =   require('clui'),
      Spinner              =   CLI.Spinner;

//########################################################################################

module.exports={
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
  cloneRemoteRepo:(pathname,creds,repoName)=>{
    var countdown = new Spinner(`Cloning from remote repo...  `,['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    countdown.start()
    // the remote url
    var remote = `https://${creds.username}:${creds.password}@github.com/${creds.username}/${repoName}`;
    //
    git(pathname).silent(true)
    .clone(remote)
    .then(() => console.log('finished'))
    .catch((err) => console.error('failed: ', err));
    countdown.stop()
  }
}