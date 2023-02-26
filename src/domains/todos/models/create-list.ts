import { List } from '../entities/list'

export interface CreateListModel extends Omit<List, 'id'> {
  userId: string
}
