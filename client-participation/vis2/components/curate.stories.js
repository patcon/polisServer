import React from 'react'
import { action } from '@storybook/addon-actions'

import * as globals from './globals'
import { Curate } from './curate'

import participationData from '../../.storybook/data/3ntrtcehas-participation-init.json'
const pcaData = JSON.parse(participationData.pca)

export default {
  title: 'Visualization/Curate',
  component: Curate
}

const Template = (args) => <Curate {...args} />

export const Default = Template.bind({})
Default.args = {
  math: pcaData,
  handleCurateButtonClick: action('Clicked'),
  selectedTidCuration: null,
  Strings: {majorityOpinion: 'Majority Opinion', group_123: 'Group:'}
}

export const MajoritySelected = Template.bind({})
MajoritySelected.args = {
  ...Default.args,
  selectedTidCuration: globals.tidCuration.majority
}

export const GroupSelected = Template.bind({})
GroupSelected.args = {
  ...Default.args,
  selectedTidCuration: 1
}
