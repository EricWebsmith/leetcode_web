export type ProblemMetadata = {
  id: number;
  title: string;
};

function getDisplayTitle(meta?: ProblemMetadata) {
  if (meta == null) {
    return 'Title Missing';
  }
  return `${meta.id}. ${meta.title}`;
}

export { getDisplayTitle };
