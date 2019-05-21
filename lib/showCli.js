//= =======================================================================================
/*                                                                                      *
 *                               Require node dependencies                              *
 *                                                                                      */
//= =======================================================================================

const program = require('commander')

// ########################################################################################

// the main gui

program
  .version('1.0.0', '-v,--version')
  .option('-r, --remote <hostingName>', 'remote web hosting service [github]', 'github')
  .option('-n, --name <repoName>', 'Name of the repo')

program.on('--help', function () {
  console.log('')
  console.log('Examples:')
  console.log('$ autogit -r github -n repoName')
})

program.parse(process.argv)

function make_red (txt) {
  return chalk.red(txt)
}

module.exports = {
  program,
  make_red
}
