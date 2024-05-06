const { Command } = require('commander');
const dotenv = require('dotenv');

const program = new Command();

dotenv.config({
    path: program.opts().mode == 'dev' ? '.env.dev' : '.env.prod'
});

program
    .option('--mode <mode>', 'modo de trabajo', 'dev')
    .parse();

console.log(program.opts());


module.exports = {
    persistence: process.env.PERSISTENCE
}
