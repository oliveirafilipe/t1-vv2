export default interface Delivery {
  id?: string;
  operatorId: string;
  date: string;
  description: string;
  houseNumber: string;
  alreadyCollected: boolean;
}
