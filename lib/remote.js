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

  createRemoteRep : async (userObject,app) => {
    // set github creds 

      // ask for repo details
      let repoDetails = await askRemoteRep();

      // ask for repo type
      let isPublic = await askPrivateorPublic()

      // set up the repo
      let repo = await userObject.repos.createForAuthenticatedUser({
        name:repoDetails.repoName,
        description:repoDetails.repoDesc,
        private:isPublic,
        gitignore_template:app
      })
      return repoDetails
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