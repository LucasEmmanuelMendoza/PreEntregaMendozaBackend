const dotenv = require('dotenv').config()
const { Command } = require('commander')
const program = new Command()

program
    .option('--mode <mode>', 'Ambiente de trabajo', 'prod')
program.parse()

dotenv.config({
    path: program.opts().mode == 'dev' ? './environment/.env.dev': './environment/.env.prod'
})



