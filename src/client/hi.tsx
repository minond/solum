import * as React from 'react'
import { Component } from 'react'
import { css } from 'aphrodite'
import { common } from './styles'

type State = {}
type Props = {}

export class HiComponent extends Component<Props, State> {
  render() {
    return <div className={css(common.text)}>hi</div>
  }
}
