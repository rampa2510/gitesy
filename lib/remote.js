//========================================================================================
/*                                                                                      *
 *                           reqire the node dependencies here                          *
 *                                                                                      */
//========================================================================================

// const Ocktokit               =   require('github-api'),
   const   ConfigStore          =   require('configstore'),
      CLI                  =   require('clui'),
      Spinner              =   CLI.Spinner,
      chalk                =   require('chalk'),
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                  require the modules                                  *
 *                                                                                      */
//========================================================================================

      spinnerMessage = require('./Spinner');



var conf = new ConfigStore('autogit');

module.exports = {

  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken : () => {
    return conf.get('github.token');
  },

  setGithubCredentials : async () => {
    // set github creds 

  },

  registerNewToken : async (remoteWebHosting,creds) => {
    // register token
    const countdown = new Spinner(`Connecting to ${remoteWebHosting}...  `,['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    countdown.start();
    
    // here we connect to the remote web hosting service

    try {
      countdown.message(spinnerMessage(2));
      const user = new Github(creds);
      // const token = response.data.token;
      // if(token){
      //   countdown.message(spinnerMessage(3));
      //   conf.set(`${remoteWebHosting}.token`,token);
      //   return token;
      // }else{
      //   throw new Error("Missing Token","GitHub token was not found in the response");
      // }
    } catch (error) {
      throw error
    }finally{
      countdown.stop()
    }
  }

}