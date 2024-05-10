const { Command } = require('commander');
const dotenv = require('dotenv');

const program = new Command();

program
    .option('--mode <mode>', 'modo de trabajo', 'dev')
program.parse();

const environment = program.opts().mode;

dotenv.config({
    path: environment === 'dev' ? '.env.dev.MONGO' : '.env.prod.FS'
});

module.exports = {
    persistence: process.env.PERSISTENCE,
    environment
}
