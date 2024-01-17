import {fileUrlToPath} from 'url'
import { dirname } from 'path'

export const __filename = fileUrlToPath(import.meta.url)
export const __dirname = dirname(__filename)//retorna la ruta donde se encuentra ESTE archivo