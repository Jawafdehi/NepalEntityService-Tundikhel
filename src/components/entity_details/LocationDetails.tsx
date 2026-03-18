import React from 'react';
import type { Location } from '../../common/nes-types';
import EntityName from './EntityName';
import EntityPicture from './EntityPicture';
import LangText from './LangText';
import MarkdownText from './MarkdownText';
import DetailField from './DetailField';
import SectionHeader from './SectionHeader';
import EntityLink from './EntityLink';
import AttributesDisplay from './AttributesDisplay';
import TagsDisplay from './TagsDisplay';
import CollapsibleSection from './CollapsibleSection';
import { formattedDate } from '../../utils/date';
import { getEntityGitHubUrl } from '../../utils/github';

interface LocationDetailsProps {
  entity: Location;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ entity }) => {
  const getLocationTypeNepali = (type: string) => {
    const translations: { [key: string]: string } = {
      'province': 'प्रदेश',
      'district': 'जिल्ला',
      'metropolitan_city': 'महानगरपालिका',
      'sub_metropolitan_city': 'उपमहानगरपालिका',
      'municipality': 'नगरपालिका',
      'rural_municipality': 'गाउँपालिका',
      'ward': 'वडा',
      'constituency': 'निर्वाचन क्षेत्र'
    };
    return translations[type] || type;
  };

  return (
    <div>
      <EntityPicture
        pictures={entity.pictures}
        alt={entity.names[0]?.en?.full || 'Location'}
        style={{ marginBottom: '20px' }}
      />

      {entity.tags && entity.tags.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <TagsDisplay tags={entity.tags} />
        </div>
      )}

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: `1px solid var(--border-color)`,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: `0 1px 3px var(--shadow)`,
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}>
        <tbody>
          <SectionHeader title="Location Details" titleNe="स्थान विवरण" />
          <DetailField label="ID" labelNe="आईडी">{entity.id}</DetailField>
          <DetailField label="Name" labelNe="नाम"><EntityName names={entity.names} /></DetailField>
          <DetailField label="Type" labelNe="प्रकार">
            {entity.location_type ? (
              <>
                {entity.location_type.replace('_', ' ')}<br />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                  {getLocationTypeNepali(entity.location_type)}
                </span>
              </>
            ) : 'Location'}
          </DetailField>
          <DetailField label="Administrative Level" labelNe="प्रशासनिक तह">{entity.administrative_level}</DetailField>
          <DetailField label="Parent Location" labelNe="मातृ स्थान">
            {entity.parent ? (
              entity.parent.startsWith('entity:') ? (
                <EntityLink entityId={entity.parent}>{entity.parent}</EntityLink>
              ) : (
                entity.parent
              )
            ) : null}
          </DetailField>
          <DetailField label="Area" labelNe="क्षेत्रफल">{entity.area ? `${entity.area} km²` : null}</DetailField>
          <DetailField label="Latitude" labelNe="अक्षांश">{entity.lat}</DetailField>
          <DetailField label="Longitude" labelNe="देशान्तर">{entity.lng}</DetailField>
          <DetailField label="Short Description" labelNe="छोटो विवरण">{entity.short_description ? <LangText text={entity.short_description} /> : null}</DetailField>
          <DetailField label="Description" labelNe="विवरण">{entity.description ? <MarkdownText text={entity.description} /> : null}</DetailField>

          {entity.attributes && Object.keys(entity.attributes).length > 0 && (
            <>
              <SectionHeader title="Attributes" titleNe="विशेषताहरू" />
              <tr>
                <td colSpan={2} style={{ padding: '16px 20px', backgroundColor: 'var(--bg-primary)' }}>
                  <AttributesDisplay attributes={entity.attributes} />
                </td>
              </tr>
            </>
          )}

          {entity.attributions && entity.attributions.length > 0 && (
            <>
              <SectionHeader title="Attributions" titleNe="स्रोतहरू" />
              <tr>
                <td colSpan={2} style={{ padding: '16px 20px', backgroundColor: 'var(--bg-primary)' }}>
                  <div>
                    {entity.attributions.map((attr, index) => (
                      <div key={index} style={{ marginBottom: '8px' }}>
                        <strong>
                          {attr.title.en?.value || attr.title.ne?.value}
                          {attr.title.en?.value && attr.title.ne?.value && (
                            <><br /><span style={{ color: 'var(--text-secondary)', fontSize: '0.9em', fontWeight: 'normal' }}>{attr.title.ne.value}</span></>
                          )}
                        </strong>
                        {attr.details && (
                          <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                            {attr.details.en?.value || attr.details.ne?.value}
                            {attr.details.en?.value && attr.details.ne?.value && (
                              <><br /><span style={{ fontSize: '0.85em' }}>{attr.details.ne.value}</span></>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </>
          )}

          <CollapsibleSection title="View Version & Audit Details" titleNe="संस्करण र लेखापरीक्षण विवरण हेर्नुहोस्" defaultOpen={false}>
            <DetailField label="Slug" labelNe="स्लग">{entity.slug}</DetailField>
            <DetailField label="Version Number" labelNe="संस्करण नम्बर">{entity.version_summary.version_number}</DetailField>
            <DetailField label="Version Author" labelNe="संस्करण लेखक">{entity.version_summary.author.name || entity.version_summary.author.slug}</DetailField>
            <DetailField label="Change Description" labelNe="परिवर्तन विवरण">{entity.version_summary.change_description}</DetailField>
            <DetailField label="Last Modified" labelNe="अन्तिम परिमार्जन">{formattedDate(new Date(entity.version_summary.created_at))}</DetailField>
            <DetailField label="Created At" labelNe="सिर्जना मिति">{formattedDate(new Date(entity.created_at))}</DetailField>
            <DetailField label="Source Data" labelNe="स्रोत डाटा">
              <a 
                href={getEntityGitHubUrl(entity.id)} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#24292e',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9em',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1e22'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#24292e'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                View JSON on GitHub
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </DetailField>
          </CollapsibleSection>
        </tbody>
      </table>
    </div>
  );
};

export default LocationDetails;