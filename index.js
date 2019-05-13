#!/usr/bin/env node

//========================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//========================================================================================

const chalk       =     require('chalk'),
      Configstore =     require('configstore'),
      

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                  require the modules                                 *
 *                                                                                      */
//========================================================================================

      { registerNewToken }    =   require('./lib/remote'),
      { program,make_red }                   =   require('./lib/showCli')

// // we wether all the inputs were provided or not

if(!(program.app && program.name)){
  program.help(make_red)
} 

// check wether the file exists or not

var isFileExists = require('./lib/files')(program.name);


if(isFileExists){
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}else{
  const run = async ()=>{

    // store the creds in the config file
    //  Tip: on macOS/Linux, you’ll find the file in /Users/[YOUR-USERNAME]/.config/configstore/autogit.json
    const conf = new Configstore('autogit');
    if(conf.get(`${program.remote}.token`)){
      console.log('hello')

    }else{
    const {askRemoteCreds} = require('./lib/questions');
    const creds = await askRemoteCreds(program.remote);
    console.log(conf.get("test"));
    let token = registerNewToken(program.remote,creds);
    console.log(token);
  }
  }
  run()
}

