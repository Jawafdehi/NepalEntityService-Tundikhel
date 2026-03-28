/**
 * Generate GitHub URL for entity JSON file
 * @param entityId - Full entity ID (e.g., "entity:person/pushpa-kamal-dahal-prachanda")
 * @returns GitHub URL to the JSON file
 */
export function getEntityGitHubUrl(entityId: string): string {
  // Remove "entity:" prefix if present
  const path = entityId.replace(/^entity:/, '');
  
  return `https://github.com/Jawafdehi/NepalEntityService-database/blob/main/v2/entity/${path}.json`;
}
