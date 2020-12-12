import React from 'react'

import BarChartCompact from './barChartCompact'

import participationData from '../../.storybook/data/3ntrtcehas-participation-init.json'
const pcaData = JSON.parse(participationData.pca)

export default {
  title: 'Visualization/BarChartCompact',
  component: BarChartCompact,
  decorators: [
    (Story) => (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="100">
        <Story />
      </svg>
    )
  ]
}

const Template = (args) => <BarChartCompact {...args} />

export const Default = Template.bind({})
Default.args = {
  selectedComment: { tid: 4 },
  groupVotes: pcaData['group-votes'][0],
  translate: [20, 50]
}

export const SomeOtherComment = Template.bind({})
SomeOtherComment.args = {
  ...Default.args,
  selectedComment: { tid: 15 }
}

export const SomeOtherGroup = Template.bind({})
SomeOtherGroup.args = {
  ...Default.args,
  groupVotes: pcaData['group-votes'][2]
}

export const NewPosition = Template.bind({})
NewPosition.args = {
  ...Default.args,
  translate: [40, 70]
}
