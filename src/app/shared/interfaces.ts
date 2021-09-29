export interface WordEntry {
  creoleText: string;
  engText: string;
}

export interface Category {
  name: WordEntry;
  details: WordEntry;
  dataArray: WordEntry[];
}

export interface ResultObject {
  resultEntry: WordEntry;
  isCorrect: boolean;
}
