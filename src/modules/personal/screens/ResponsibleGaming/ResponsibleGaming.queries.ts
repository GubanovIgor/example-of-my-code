import { graphql } from 'react-relay';

export const ResponsibleGamingQuery = graphql`
  query ResponsibleGamingScreenQuery {
    userCurrency {
      symbol
    }
    userProfile {
      profile {
        firstName
      }
    }
    selfLimits {
      stakeLimits {
        perDay {
          currentLimit
          used
          nextPossibleIncreasing
        }
        perWeek {
          currentLimit
          used
          nextPossibleIncreasing
        }
        perMonth {
          currentLimit
          used
          nextPossibleIncreasing
        }
      }
      lossLimits {
        perDay {
          currentLimit
          used
          nextPossibleIncreasing
        }
        perWeek {
          currentLimit
          used
          nextPossibleIncreasing
        }
        perMonth {
          currentLimit
          used
          nextPossibleIncreasing
        }
      }
      depositLimits {
        perDay {
          currentLimit
          used
          nextPossibleIncreasing
        }
        perWeek {
          currentLimit
          used
          nextPossibleIncreasing
        }
        perMonth {
          currentLimit
          used
          nextPossibleIncreasing
        }
      }
      maxSessionTimeLimit {
        currentLimit
        used
        nextPossibleIncreasing
      }
    }
  }
`;

export const SaveTrioLimitsMutation = graphql`
  mutation ResponsibleGamingLimitsMutation(
    $trioLimits: TrioLimitsInput!
    $type: LimitType!
  ) {
    saveTrioLimits(trioLimits: $trioLimits, type: $type) {
      perDay {
        currentLimit
        used
        nextPossibleIncreasing
      }
      perWeek {
        currentLimit
        used
        nextPossibleIncreasing
      }
      perMonth {
        currentLimit
        used
        nextPossibleIncreasing
      }
    }
  }
`;

export const SaveMaxSessionLimitMutation = graphql`
  mutation ResponsibleGamingMaxLimitMutation($maxSessionTime: Int!) {
    saveMaxSessionTime(maxSessionTime: $maxSessionTime) {
      currentLimit
      used
      nextPossibleIncreasing
    }
  }
`;

export const LockMutation = graphql`
  mutation ResponsibleGamingLockMutation($lockDurationType: LockDurationType!) {
    lockUser(lockDurationType: $lockDurationType)
  }
`;
