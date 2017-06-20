import * as RateLimit from 'express-rate-limit'

import { config, application, csrf } from '../application'
import { logger } from '../log'

const port = config('port')
const log = logger(__filename)
const server = application(config)
const limit = new RateLimit(config('ratelimit.default'))

server.get('*', limit, csrf(), (req, res) => {
  let manifest = server.get('manifest')
  res.render('index', { manifest })
})

server.listen(port, () =>
  log.info('ready for http calls on port', port))
