const { Command } = require('commander');
const dotenv = require('dotenv');

const program = new Command();

program
    .option('--mode <mode>', 'modo de trabajo', 'dev')
program.parse();

dotenv.config({
    path: program.opts().mode == 'dev' ? '.env.dev' : '.env.prod'
});

module.exports = {
    persistence: process.env.PERSISTENCE
}
