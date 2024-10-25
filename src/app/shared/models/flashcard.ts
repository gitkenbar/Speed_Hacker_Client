export class FlashCard{
  id: number;
  name: string;
  definition_id: number;
  content_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;

  constructor(flashcard:any){
    this.id = flashcard.id || 0;
    this.name = flashcard.name || '';
    this.definition_id = flashcard.definition_id || "";
    this.content_id = flashcard.content_id || "";
    this.created_at = flashcard.created_at || "";
    this.updated_at = flashcard.updated_at || "";
    this.user_id = flashcard.user_id || null;
  }
}
