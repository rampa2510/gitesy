#!/usr/bin/env node

//========================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//========================================================================================

const chalk       =     require('chalk'),
      clear       =     require('clear'),
      figlet      =     require('figlet');

//########################################################################################

// console.log(require('./lib/files')('autogi'));

// the yargs starting script to accept arguments
const argv =  require('yargs')
              .usage('Usage: e.g $0 -r github -n example -a node')
              .option('remote',{
                alias:'r',
                describe:"remote repo choice",
                choices:['github', 'bitbucket', 'gitlab'],
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
                choices:['node(n)', 'express(e)'],
              })
              .help("h")
              .alias('h', 'help')
              .demandOption(['name'],'Please provide name to work with this tool')
              .argv

// we check here whether the directory exists or not

var isFileExists = require('./lib/files')(argv.name);

if(isFileExists){
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}else{
  const run = async ()=>{
    const {askRemoteCreds} = require('./lib/questions');
    const creds = await askRemoteCreds(argv.remote);
    console.log(creds);
  }
  run()
}