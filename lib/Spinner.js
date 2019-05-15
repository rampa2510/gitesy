
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

  switch (step) {
    case 1:
    return 'Connecting ....'
      break;
    case 2:
    return 'Authenticating you ....'
      break;
    case 3:
    return 'Getting Token ....'
      break;
    case 4:
      return 'Creating remote repo ....'
      break;
    default:
      break;
  }
}