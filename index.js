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

      { registerNewToken }    =   require('./lib/remote')


// the yargs starting script to accept arguments
const argv =  require('yargs')
              .usage('Usage: e.g $0 -r github -n example -a node')
              .option('remote',{
                alias:'r',
                describe:"remote repo choice",
                // choices:['github', 'bitbucket', 'gitlab'],
                nargs:1,
                default:'github',
                type:'string'
              })
              .option('name',{
                alias:'n',
                describe:'The name of the repo',
                nargs:1,
                type:'string'
              })
              .option('app',{
                alias:'a',
                describe:'The app you want to make',
                nargs:1,
                type:'string',
                // choices:['node(n)', 'express(e)'],
              })
              .help("h")
              .demandOption(['name','app'],'Please provide name and app type to work with this tool')
              .argv

// we check here whether the directory exists or not

var isFileExists = require('./lib/files')(argv.name);

if(isFileExists){
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}else{
  const run = async ()=>{

    // store the creds in the config file
    //  Tip: on macOS/Linux, you’ll find the file in /Users/[YOUR-USERNAME]/.config/configstore/autogit.json
    const conf = new Configstore('autogit');
    if(conf.get(`${argv.remote}.token`)){
      console.log('hello')

    }else{
    const {askRemoteCreds} = require('./lib/questions');
    const creds = await askRemoteCreds(argv.remote);
    console.log(conf.get("test"));
    let token = registerNewToken(argv.remote,creds);
    console.log(token);
  }
  }
  run()
}

