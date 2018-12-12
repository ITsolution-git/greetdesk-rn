import Atom from 'kefir.atom';

export const account_list = Atom(0);
export function increment_account_list() {
  account_list.modify(x => x + 1);
}

export const session_account_id = Atom(0);
export function set_account_id(account_id) {
  session_account_id.modify(x => account_id);
}

export const account_list_id = Atom(0);
export function set_account_list_id(list_id) {
  account_list_id.modify(x => list_id);
}
