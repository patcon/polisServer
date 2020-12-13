import React from 'react'

import { DataSentence } from './exploreTid'

import participationData from '../../.storybook/data/3ntrtcehas-participation-init.json'
const pcaData = JSON.parse(participationData.pca)

export default {
  title: 'Visualization/DataSentence',
  component: DataSentence,
  decorators: [
    (Story) => (
      <div>
        <style>{`
        p {
          margin-top: 0;
        }
        `}</style>
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <DataSentence {...args} />

export const Default = Template.bind({})
Default.args = {
  selectedTidCuration: 0,
  selectedComment: { tid: 49 },
  math: pcaData,
  Strings: {
    pctAgreedOfGroupLong: '{{pct}}% of those in group {{group}} who voted on statement {{comment_id}} agreed.',
    pctDisagreedOfGroupLong: '{{pct}}% of those in group {{group}} who voted on statement {{comment_id}} disagreed.'
  }
}

export const Agree = Template.bind({})
Agree.args = {
  ...Default.args,
  selectedTidCuration: 1,
  selectedComment: { tid: 5 }
}

export const Disagree = Template.bind({})
Disagree.args = {
  ...Agree.args,
  selectedTidCuration: 0,
}
