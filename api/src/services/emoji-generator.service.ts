import { Injectable } from '@nestjs/common';

@Injectable()
export class EmojiGeneratorService {
  private readonly emojis = ['🦈', '🦭', '🦖', '🐢', '🦅', '🐪', '🦬'];

  generate = () => {
    const index = Math.floor(Math.random() * this.emojis.length);
    return this.emojis[index];
  };
}
