import { Logger } from '@swann-stack/logger';
import { random } from 'lodash';

const logger = Logger();
export const transactionWrap = async (method: (...args) => any) => {
  const maxRetries = 100;
  const transactionStore = {};

  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await method(transactionStore);
    } catch (error) {
      const isConcurrencyError =
        error.name === 'SequelizeDatabaseError' &&
        (error.message === 'could not serialize access due to concurrent update' || error.message === 'could not serialize access due to concurrent delete');
      if (!isConcurrencyError || i === maxRetries) {
        // There are no retries left, just throw the error or this error is not a concurrency error, do not retry
        throw error;
      }

      if (isConcurrencyError) {
        let delay;
        if (i < 25) {
          delay = random(100, 200);
        } else if (i < 50) {
          delay = random(200, 500);
        } else if (i < 75) {
          delay = random(500, 1000);
        } else {
          delay = random(1000, 2000);
        }

        await new Promise((resolve) => setTimeout(resolve, delay));

        logger.info(`[sequelizeTransactionWrap] ${error.message}`);
        logger.info(`[sequelizeTransactionWrap] Attempt #${i + 1} starts in ${delay}ms...`);
      }
    }
  }
};
