const Octokit              =   require('@octokit/rest');

module.exports = {
  octokit:(username,password)=>{
    return new Octokit({auth: {
    username: username,
    password: password,
    async on2fa () {
      // example: ask the user
      return prompt('Two-factor authentication Code:')
    }
  }})
}
}

