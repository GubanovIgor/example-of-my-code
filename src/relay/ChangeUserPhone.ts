import { graphql } from 'react-relay';

export const ChangeUserPhoneMutation = graphql`
  mutation ChangeUserPhoneMutation($userId: Long!, $phoneNumber: String!) {
    changeUserPhone(userId: $userId, phoneNumber: $phoneNumber)
  }
`;
