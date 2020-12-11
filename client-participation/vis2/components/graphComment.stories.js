import React from 'react'
import { action } from '@storybook/addon-actions'

import { GraphComment } from './graphComments'

export default {
  title: 'Visualization/GraphComment',
  component: GraphComment,
  decorators: [
    (Story) => (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" heigh="100">
        <Story />
      </svg>
    )
  ]
}

const Template = (args) => <GraphComment {...args} />

export const Default = Template.bind({})
Default.args = {
  pt: {
    tid: 9,
    x: 50,
    y: 50
  },
  isSelected: false,
  handleCommentHover: action('Hovered')
}

export const IsSelected = Template.bind({})
IsSelected.args = {
  ...Default.args,
  isSelected: true
}

export const NewPosition = Template.bind({})
NewPosition.args = {
  ...IsSelected.args,
  pt: { tid: 9, x: 70, y: 30 },
}

export const TensOfComments = Template.bind({})
TensOfComments.args = {
  ...IsSelected.args,
  pt: { tid: 99, x: 50, y: 50 }
}

export const HundredsOfComments = Template.bind({})
HundredsOfComments.args = {
  ...IsSelected.args,
  pt: { tid: 999, x: 50, y: 50 }
}

export const ThousandsOfComments = Template.bind({})
ThousandsOfComments.args = {
  ...IsSelected.args,
  pt: { tid: 9999, x: 50, y: 50 }
}
