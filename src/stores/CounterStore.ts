import { action, observable } from 'mobx'

export default class CounterStore {
  @observable public count: number = 0

  @action
  public add () {
    this.count += 1
  }
}
