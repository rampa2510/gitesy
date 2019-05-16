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
      var isPublic = await askPrivateorPublic();

      // create teh instance of the spinner
      var countdown = new Spinner(`Connecting to ${remoteWebHosting}...  `,['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
      countdown.start();
      } catch (error) {
        // nothing to show when the user quits the cli
        console.log(error);
      }
      // set up the repo
      try {

        let repo = await userObject.repos.createForAuthenticatedUser({
          name:repoName,
          description:repoDetails.repoDesc,
          private:isPublic,
          gitignore_template:app
        })

        countdown.message(spinnerMessage(4))
        return repoDetails

      } catch (error) {
        countdown.stop();
        if(!(process.env.ENV==='test')){
          switch (error.status) {
            case 401:
              console.log(chalk.red(`Bad ${remoteWebHosting} credentials please enter correct details`))
              break;
            case 500:
              console.log((chalk.red(`${remoteWebHosting} Servers are experincing issues please try again later`)));
              break;
            default:
            console.log((chalk.red('Something went wrong please try again later')));
              break;
          }  
          process.exit();
        }
      }finally{
        countdown.stop();
      }
      
  },

  registerNewToken : async (remoteWebHosting,creds) => {
    // register token
    var countdown = new Spinner(`Connecting to ${remoteWebHosting}...  `,['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    countdown.start();
    
    // here we connect to the remote web hosting service

    try {
      countdown.message(spinnerMessage(2));

      // this will retuen the authenticated user object
      let userObject = await octokit(creds.username,creds.password);
      return userObject;

    } catch (error) {
      console.log(chalk.red('Invalid Creds'));
      countdown.stop()

    }finally{
      countdown.stop();
    }
  }
}