import React from 'react';
import type { Name } from '../../common/nes-types';

interface EntityNameProps {
  names: Name[];
  showPrimary?: boolean;
  style?: React.CSSProperties;
}

const EntityName: React.FC<EntityNameProps> = ({ names, style }) => {
  if (!names || names.length === 0) return <span>Unknown</span>;
  
  const primaryName = names.find(name => name.kind === 'PRIMARY');
  const otherNames = names.filter(name => name.kind !== 'PRIMARY');
  
  const renderName = (name: Name, isPrimary: boolean = false) => {
    const english = name.en?.full;
    const nepali = name.ne?.full;
    
    return (
      <div key={`${name.kind}-${english || nepali}`} style={{ marginBottom: isPrimary && otherNames.length > 0 ? '8px' : '0' }}>
        {english && nepali ? (
          <>
            {english}
            {!isPrimary && <span style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginLeft: '6px' }}>({name.kind})</span>}
            <br />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>{nepali}</span>
          </>
        ) : (
          <>
            {english || nepali || 'Unknown'}
            {!isPrimary && <span style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginLeft: '6px' }}>({name.kind})</span>}
          </>
        )}
      </div>
    );
  };
  
  return (
    <span style={style}>
      {primaryName && renderName(primaryName, true)}
      {otherNames.map(name => renderName(name, false))}
    </span>
  );
};

export default EntityName;