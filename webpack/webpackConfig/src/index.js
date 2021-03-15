import createHeading from './heading.js'
import './index.css'
const heading = createHeading()
document.body.append(heading)

import about from './about.md'
console.log(about)
document.body.append(about)