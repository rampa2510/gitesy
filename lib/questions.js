//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const { prompt, Toggle, Select } = require('enquirer')

// ########################################################################################

/**
 * these function are the prompts used to interact with cli
 */
module.exports = {
  /**
   * @description                          This function ask for the creds of the remote web hosting service creds
   *
   * @param {String} remoteWebHostingName  the remote web hosting service name eg github,bitbucket
   *
   * @returns                              the prompt as a promise
   *
   * @author Ram pandey
   */
  askRemoteCreds: (remoteWebHostingName) => {
    const questionAnswer = [
      {
        type: 'input',
        name: 'username',
        message: `What is your ${remoteWebHostingName} username?`,
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return `Please enter your ${remoteWebHostingName} username`
          }
        }
      },
      {
        type: 'password',
        name: 'password',
        message: `What is your password for ${remoteWebHostingName} account ?`
      }
    ]
    return prompt(questionAnswer)
  },
  /**
   * @description                          This function ask for the description of the remote repo
   *
   * @returns                              the prompt as a promise
   *
   * @author Ram pandey
   */
  askRemoteRep: () => {
    const questionAnswer = [
      {
        type: 'input',
        name: 'repoDesc',
        message: "Describe the repo you want to create or leave empty if you don't want to"
      }
    ]
    return prompt(questionAnswer)
  },
  /**
   * @description                          This function ask for the type of repo private or public
   *
   * @returns                              the prompt
   *
   * @author Ram pandey
   */
  askPrivateorPublic: () => {
    var prompt = new Toggle({
      message: 'Do you want a private repo?',
      enabled: 'Yep',
      disabled: 'Nope'
    })
    return prompt.run()
      .then(answer => answer)
      .catch(err => {throw new Error('')})
  },
  /**
   * @description                          This function ask whether you would like to use the previous password or not
   *
   * @returns                              the prompt
   *
   * @author Ram pandey
   */
  askToUsePrevCreds: () => {
    var prompt = new Toggle({
      message: 'Do you want to use your previous credintials for authentication incase you did\'nt change it?',
      enabled: 'Yep',
      disabled: 'Nope'
    })
    return prompt.run()
      .then(answer => answer)
      .catch(console.error)
  },
  askForTemplate: () => {
    const prompt = new Select({
      name: 'template',
      message: 'Pick a template you want to use',
      choices: ['', 'grape', 'watermelon', 'cherry', 'orange']
    })

    return prompt.run()
      .then(answer => answer)
      .catch(console.error)
  }
}
