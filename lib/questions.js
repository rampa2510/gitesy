//========================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//========================================================================================

const { prompt,Toggle } = require('enquirer');

//########################################################################################

/**
 * these function are the prompts used to interact with cli
 */

module.exports={

  askRemoteCreds : (remoteWebHostingName)=>{
    const questionAnswer = [
      {
        type: 'input',
        name: 'username',
        message: `What is your ${remoteWebHostingName} username?`,
        validate:function(value){
          if(value.length){
            return true
          }else{
            return `Please enter your ${remoteWebHostingName} username`
          }
        }
      },
      {
        type: 'password',
        name: 'password',
        message: `What is your password for ${remoteWebHostingName} account ?`
      }
    ];
  return prompt(questionAnswer)    
  },
  askRemoteRep:()=>{
    const questionAnswer=[
      {
        type:'input',
        name:'repoDesc',
        message:"Describe the repo you want to create or leave empty if you don't want to",
      },
    ];
    return prompt(questionAnswer)    

  },
  askPrivateorPublic:()=>{
    var prompt = new Toggle({
      message: 'Do you want a private repo?',
      enabled: 'Yep',
      disabled: 'Nope'
    })
    return prompt.run()
          .then(answer => answer)
          .catch(console.error);
  }
}