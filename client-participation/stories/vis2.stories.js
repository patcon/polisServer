import React from 'react'

import * as globals from '../vis2/components/globals'
import { Root as Vis2 } from '../vis2/vis2'

import commentsData from '../.storybook/data/3ntrtcehas-comments.json'
import participationData from '../.storybook/data/3ntrtcehas-participation-init.json'
import { action } from '@storybook/addon-actions'
const pcaData = JSON.parse(participationData.pca)

export default {
  title: 'Visualization/Vis2',
  component: Vis2,
}

const Template = (args) => <Vis2 {...args} />

export const Default = Template.bind({})
Default.args = {
  jumpstartToggle: false,
  math_main: pcaData,
  comments: commentsData,
  Strings: {
    majorityOpinion: 'Majority Opinion',
    group_123: 'Group:',
    pctAgreedOfGroupLong: '{{pct}}% of those in group {{group}} who voted on statement {{comment_id}} agreed.',
    pctDisagreedOfGroupLong: '{{pct}}% of those in group {{group}} who voted on statement {{comment_id}} disagreed.'
  },
  badTids: pcaData['mod-out'],
  tidsToShow: [
    ...pcaData.consensus.agree.map((c) => c.tid ),
    ...pcaData.consensus.disagree.map((c) => c.tid ),
  ],
  ptptois: [],
  onCurationChange: action('Clicked'),
}

export const Other = Template.bind({})
Other.args = {
  ...Default.args,
}
