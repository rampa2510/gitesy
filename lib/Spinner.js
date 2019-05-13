
/**
 * @description         This helper function will give spinner messages
 * 
 * @param {Number} step This is the step on which the api is and accordingly
 *                      we display the message
 * 
 * @returns             A string containing the spinner message
 * 
 * @author  Ram Pandey
 */
module.exports = (step)=>{
  if(step===1){
    return 'Connecting to ....'
  }else if(step===2){
    return 'Authenticating you ....'
  }else if(step===3){
    return 'Getting Token ....'
  }
}