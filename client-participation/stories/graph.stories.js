import React from 'react'

import * as globals from '../vis2/components/globals'
import Graph from '../vis2/components/graph'

import commentsData from '../.storybook/data/3ntrtcehas-comments.json'
import participationData from '../.storybook/data/3ntrtcehas-participation-init.json'
import { action } from '@storybook/addon-actions'
const pcaData = JSON.parse(participationData.pca)

export default {
  title: 'Visualization/Graph',
  component: Graph,
}

const Template = (args) => <Graph {...args} />

export const Default = Template.bind({})
Default.args = {
  jumpstartToggle: false,
  math: pcaData,
  comments: commentsData,
  Strings: {
    majorityOpinion: 'Majority Opinion',
    group_123: 'Group:',
    pctAgreedOfGroupLong: '{{pct}}% of those in group {{group}} who voted on statement {{comment_id}} agreed.',
    pctDisagreedOfGroupLong: '{{pct}}% of those in group {{group}} who voted on statement {{comment_id}} disagreed.'
  },
  badTids: pcaData['mod-out'],
  tidsToShow: pcaData.repness[1].map((c) => c.tid ),
    //...pcaData.consensus.agree.map((c) => c.tid ),
    //...pcaData.consensus.disagree.map((c) => c.tid ),
  //],
  ptptois: [],
  onCurationChange: action('Clicked'),
}

export const Other = Template.bind({})
Other.args = {
  ...Default.args,
}
