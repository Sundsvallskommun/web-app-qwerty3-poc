import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const AIFeedWrapper = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>((props, ref) => {
  const { className, ...rest } = props;

  return <ul ref={ref} role="log" aria-live="off" className={cx('sk-ai-feed', className)} {...rest} />;
});
