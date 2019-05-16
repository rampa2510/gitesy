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
  
  /**
   * @description                     this function creates a remote repo on the web hosting service 
   * 
   * @param {Class} userObject       the userobject which contins the instance of the connection the service
   * 
   * @param {String} app              the stack to be used eg Node as this will help in creation of .gitignore file using template
   * 
   * @param {String} repoName         the name of the repo that the user wish to create
   * 
   * @param {String} remoteWebHosting the web hosting service like github
   * 
   * @returns                         the object with repo details 
   * 
   * @author Ram Pandey
   */

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
            case 422:
              console.log((chalk.red(`A repo with this name already exist please try other name or delete the previous repo`)));
              break;
            default:
            console.log((chalk.red('Something went wrong please try again later')));
            console.log(error)
              break;
          }  
          process.exit();
        }
      }
      
  },
  /**
   * @description                     this function authenticates the user with the remote web hosting service
   * 
   * @param {String} remoteWebHosting the web hosting service like github
   * 
   * @param {Object} creds            the creds object which consist of the username and the password
   * 
   * @returns                         A new instance with authorised user
   * 
   * @author Ram Pandey 
   */
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
      if(!(process.env.ENV==='test')){
      countdown.stop()
      console.log(chalk.red('Invalid Creds'));
      process.exit();
    }
    }
  }
}