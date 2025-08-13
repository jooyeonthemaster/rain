export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
}
