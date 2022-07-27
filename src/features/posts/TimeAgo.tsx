import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ timestamp }: { timestamp?: string }) => {
  let timeAgo = ''

  if (timestamp) {
    const date = parseISO(timestamp)
    timeAgo  = `${formatDistanceToNow(date)} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp;
      <i>{timeAgo}</i>
    </span>
  );
}

export default TimeAgo;
