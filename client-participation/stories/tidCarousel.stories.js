import React from 'react'
import { action } from '@storybook/addon-actions'

import * as globals from '../vis2/components/globals'
import TidCarousel from '../vis2/components/tidCarousel'

import commentsData from '../.storybook/data/3ntrtcehas-comments.json'

const pluckNBetweenLowerUpper = (n, lower, upper) => {
  let numbers = []
  while (numbers.length < n) {
    let candidate = Math.floor(Math.random() * (upper - lower)) + (lower + 1)
    if (!numbers.includes(candidate)) {
      numbers.push(candidate)
    }
  }
  // Ascending integer sort.
  return numbers.sort((a, b) => a - b)
}

export default {
  title: 'Visualization/TidCarousel',
  component: TidCarousel
}

const Template = (args) => <TidCarousel {...args} />

export const Default = Template.bind({})
Default.args = {
  selectedTidCuration: 1,
  commentsToShow: commentsData.slice(10,20),
  Strings: { comment_123: 'Statement:' },
  handleCommentClick: action('Clicked'),
  selectedComment: null
}

// TODO: Load dataset with hundreds/thousands of comments.
//export const DoubleToTripleDigits = Template.bind({})
//DoubleToTripleDigits.args = {
//  ...Default.args,
//  commentsToShow: commentsData.slice(95,105),
//}

export const StatementSelected = Template.bind({})
StatementSelected.args = {
  ...Default.args,
  selectedComment: { tid: 14 }
}

export const FewStatements = Template.bind({})
FewStatements.args = {
  ...Default.args,
  commentsToShow: commentsData.slice(10,15),
}

export const Pagination = Template.bind({})
Pagination.args = {
  ...Default.args,
  commentsToShow: commentsData.slice(10,40),
}

export const SingleAndDoubleDigits = Template.bind({})
SingleAndDoubleDigits.args = {
  ...Default.args,
  commentsToShow: [
    ...pluckNBetweenLowerUpper(3, 0, 9).map(i => commentsData[i]),
    ...pluckNBetweenLowerUpper(7, 10, commentsData.length-1).map(i => commentsData[i])
  ]
}

export const NoGroupSelectedSoHidden = Template.bind({})
NoGroupSelectedSoHidden.args = {
  ...Default.args,
  selectedTidCuration: null
}
