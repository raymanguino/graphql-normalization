import { normalizeSchemaSDL } from './src';
import './style.css';

const sourceId = 'mySourceId';

const normalizationPrefix = 'MyCMSSource';

const schemaSDL = ` 
interface Node {
  entryId: ID!
}

union TypedFields = ContentArticle | ProductArticle # ...other Types

type ContentPage {
  handle: String!
  title: String!
  pageNum: Int
  relatedArticles: [ContentArticle] 
  typedFields: TypedFields!
}

type ContentArticle implements Node {
  entryId: ID!
  handle: String!
  title: String!
  # ...other properties
}

type ProductArticle implements Node {
  entryId: ID!
  handle: String!
  title: String!
  # ...other properties
}
`;

const normalizedSchema = normalizeSchemaSDL(sourceId, normalizationPrefix, schemaSDL)

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<pre>${normalizedSchema}</pre>`;