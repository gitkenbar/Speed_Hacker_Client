export class FlashCard{
  id: number;
  name: string;
  flashcard_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;

  constructor(flashcard:any){
    this.id = flashcard.id || 0;
    this.name = flashcard.name || '';
    this.flashcard_id = flashcard.flashcard_id || "";
    this.created_at = flashcard.created_at || "";
    this.updated_at = flashcard.updated_at || "";
    this.user_id = flashcard.user_id || null;
  }
}
