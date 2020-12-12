import React from 'react'
import { action } from '@storybook/addon-actions'

import * as globals from './globals'
import { Button as CurateButton } from './curate'

export default {
  title: 'Visualization/CurateButton',
  component: CurateButton
}

const Template = (args) => <CurateButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Some Button',
  handleCurateButtonClick: action('Clicked'),
  identifier: 'some-id',
  selectedTidCuration: null
}

export const MajorityOpinion = Template.bind({})
MajorityOpinion.args = {
  ...Default.args,
  children: 'Majority Opinion',
  identifier: globals.tidCuration.majority
}

export const IsSelected = Template.bind({})
IsSelected.args = {
  ...MajorityOpinion.args,
  selectedTidCuration: globals.tidCuration.majority,
}
