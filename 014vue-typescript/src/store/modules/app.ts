import { VuexModule, Module, getModule } from 'vuex-module-decorators'

export interface Todo {
  content: string;
  dateTime: number;
  isComplete: boolean;
}

export interface TodoState {
  todoList: Todo[];
}

@Module
class StoreApp extends VuexModule implements TodoState {
  public todoList = []
}
