//========================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//========================================================================================

const { prompt   } = require('enquirer');

//########################################################################################

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
  }
}