import { observable, computed, action } from 'mobx'

class LoginViewModel {
  @observable public title = ''
  @observable public user: any = {}
  @observable public post: string = '护士长'

  @computed
  public get getTitle () {
    return this.title
  }
  @action
  public setTitle = (newTitle: any) => {
    this.title = newTitle
  }
}

const loginViewModel = new LoginViewModel()
export default loginViewModel
