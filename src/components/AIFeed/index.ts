import { AIFeedEntry } from './ai-feed-entry';
import { AIFeedWrapper } from './ai-feed-wrapper';
import { AIFeed as AIFeedComponent, AIFeedProps as AIFeedComponentProps } from './ai-feed';

interface AIFeedProps extends React.ForwardRefExoticComponent<AIFeedComponentProps> {
  Entry: typeof AIFeedEntry;
  Wrapper: typeof AIFeedWrapper;
}

export const AIFeed = {
  ...AIFeedComponent,
  Entry: AIFeedEntry,
  Wrapper: AIFeedWrapper,
} as AIFeedProps;

export type { AIFeedProps };
