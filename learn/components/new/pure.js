import { PureComponent } from 'react'

export default function WithPure(Comp) {
  return class extends PureComponent {
    render() {
      return <Comp {...this.props} />
    }
  }
}
