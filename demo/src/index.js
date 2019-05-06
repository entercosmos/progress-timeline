import React, { Component } from 'react'
import { Canvas, Box, Heading, Paragraph } from '@cmds/demo-utils'
import { injectGlobal } from 'emotion'
import { render } from 'react-dom'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        margin: 0;
    }
`

import ProgressTimeline from '../../src'

class Demo extends Component {
  render() {
    return <Canvas>
      <Heading>
        Progress Timeline
      </Heading>
      <Paragraph>
        Default
      </Paragraph>
      <Box>
        <ProgressTimeline
          steps={[8, 9, 10, 20, 25, 29, 30, 31]}
          value={24}
        />
      </Box>
      <Paragraph>
        Without value
      </Paragraph>
      <Box>
        <ProgressTimeline
          steps={[8, 9, 10, 20, 25, 29, 30, 31]}
        />
      </Box>
      <Paragraph>
        Value set on the minimum value
      </Paragraph>
      <Box>
        <ProgressTimeline
          steps={[8, 9, 10, 20, 25, 29, 30, 31]}
          value={8}
        />
      </Box>
      <Paragraph>
        Value set on the maximum value
      </Paragraph>
      <Box>
        <ProgressTimeline
          steps={[8, 9, 10, 20, 25, 29, 30, 31]}
          value={31}
        />
      </Box>
    </Canvas>
  }
}

render(<Demo />, document.querySelector('#demo'))