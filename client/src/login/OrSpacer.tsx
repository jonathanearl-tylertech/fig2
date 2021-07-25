import react from 'react';
import { HorizontalLine } from './HorizontalLine';

export const OrSpacer = () => {
  return (
    <div className="flex flex-row" style={{ margin: '10px 0 18px 0' }}>
      <HorizontalLine></HorizontalLine>
      <div style={{ margin: '0 18px', color: 'rgb(142, 142, 142)', fontSize: '13px' }}>OR</div>
      <HorizontalLine></HorizontalLine>
    </div>
  )
}