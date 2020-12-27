import React from 'react'

import { Participant as GraphParticipant } from './graphParticipants'

import socialAvatar from '../../.storybook/assets/avatar-sample.jpg'
import defaultAvatar from '../../.storybook/assets/avatar-default.png'

export default {
  title: 'Visualization/GraphParticipant',
  component: GraphParticipant,
  parameters: {
    backgrounds: {
      // Helps show contrast.
      default: 'light'
    }
  },
  decorators: [
    // Adds filter that normally exists in large SVG.
    (Story) => (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">
        <filter id="grayscale">
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <Story />
      </svg>
    )
  ]
}

const Template = (args) => <GraphParticipant {...args} />

export const Default = Template.bind({})
Default.args = {
  ptpt: {
    picture_size: 36,
    isSelf: false,
    picture: defaultAvatar,
  },
  tweenX: 50,
  tweenY: 50,
}

export const IsSelf = Template.bind({})
IsSelf.args = {
  ...Default.args,
  ptpt: {
    ...Default.args.ptpt,
    isSelf: true
  }
}

export const HasSocialAvatar = Template.bind({})
HasSocialAvatar.args = {
  ...Default.args,
  ptpt: {
    ...Default.args.ptpt,
    picture: socialAvatar
  }
}
