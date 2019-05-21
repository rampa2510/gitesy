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
  .option('-a, --addTemplate <template>', 'Add a new template, provide name of the tempate')

program.on('--help', function () {
  console.log('')
  console.log('Examples:')
  console.log('$ gitesy -n repoName')
})

program.parse(process.argv)

function make_red (txt) {
  return chalk.red(txt)
}

module.exports = {
  program,
  make_red
}
