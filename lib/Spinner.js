
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
module.exports = (step) => {
  switch (step) {
    case 1:
      return 'Connecting ....'
    case 2:
      return 'Authenticating you ....'
    case 3:
      return 'Getting Token ....'
    case 4:
      return 'Creating remote repo ....'
    default:
      break
  }
}
