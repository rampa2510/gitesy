//========================================================================================
/*                                                                                      *
 *                           reqire the node dependencies here                          *
 *                                                                                      */
//========================================================================================

   const  { octokit }          =    require('./octokit')
          ConfigStore          =   require('configstore'),
          CLI                  =   require('clui'),
          Spinner              =   CLI.Spinner,
          chalk                =   require('chalk'),
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                  require the modules                                  *
 *                                                                                      */
//========================================================================================

      spinnerMessage                      = require('./Spinner'),
      { askRemoteRep,askPrivateorPublic } =  require('./questions')



var conf = new ConfigStore('autogit');



module.exports = {
  
  getInstance: (creds) => {
    return octokit(creds.username,creds.password);
  },

  getStoredGithubToken : () => {
    return conf.get('github.token');
  },

  createRemoteRep : async (userObject,app,repoName,remoteWebHosting) => {
    // set github creds 
      try {
        // ask for repo details
      var repoDetails = await askRemoteRep();

      // ask for repo type private or public
      var isPublic = await askPrivateorPublic()
      countdown.start();
      } catch (error) {
        // nothing to show when the user quits the cli
      }
      // set up the repo
      try {
        let repo = await userObject.repos.createForAuthenticatedUser({
          name:~repoName,
          description:repoDetails.repoDesc,
          private:isPublic,
          gitignore_template:app
        })
        countdown.message(spinnerMessage(4))
        return repoDetails
      } catch (error) {
        if(error.status){
          chalk.red(`Bad ${remoteWebHosting} credentials please enter correct credentials`);
        }else if(error.status){
          chalk.red(`${remoteWebHosting} creds are experencing a issue please try again later`);
        }
      }
      
  },

  registerNewToken : async (remoteWebHosting,creds) => {
    // register token
    const countdown = new Spinner(`Connecting to ${remoteWebHosting}...  `,['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    countdown.start();
    
    // here we connect to the remote web hosting service

    try {
      countdown.message(spinnerMessage(2));

      // this will retuen the authenticated user object
      let userObject = await octokit(creds.username,creds.password);
      
      return userObject;

    } catch (error) {
      throw error
    }finally{
      countdown.stop()
    }
  }

}