import React from 'react'

import Gear from '../vis2/components/gear'

export default {
  title: 'Visualization/Gear',
  component: Gear,
}

const Template = (args) => <Gear {...args} />

export const Default = Template.bind({})
Default.args = {
  conversation_id: '123456',
}
