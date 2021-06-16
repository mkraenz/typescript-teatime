export interface IEvent {
  type:
    | 'attack'
    | 'damage received'
    | 'join'
    | 'monster appeared'
    | 'monster died'
    | 'adventurer died'
    | 'party died';
}
