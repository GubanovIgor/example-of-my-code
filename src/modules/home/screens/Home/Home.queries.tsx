import { graphql } from 'react-relay';

export const GameFragment = graphql`
  fragment HomeGameCard_fragment on Game {
    categoryId
    name
    simpleImageUrl
    emphasedImageUrl
    rectangularImageUrl
    providerName
    id
    hasDemoMode
  }
`;
