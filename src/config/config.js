const dotenv = require('dotenv').config()
const { Command } = require('commander')
const program = new Command()

program
    .option('--mode <mode>', 'Ambiente de trabajo', 'prod')
program.parse()

dotenv.config({
    path: program.opts().mode == 'dev' ? '.env.dev.MONGO': '.env.prod.FS'
})

module.exports = {
    persistence: process.env.PERSISTENCE
}