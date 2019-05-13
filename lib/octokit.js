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

// const response = await octokit.oauthAuthorizations.createAuthorization({
//   scopes: ['user', 'public_repo', 'repo', 'repo:status'],
//   note:"autogit automate your git workflow",
//   auth:'secret123'
// })      
// const token = response.data.token;
// if(token){
//   countdown.message(spinnerMessage(3));
//   conf.set(`${remoteWebHosting}.token`,token);
//   return token;
// }else{
//   throw new Error("Missing Token","GitHub token was not found in the response");
// }
