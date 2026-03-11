/**
 * Mongoose Models for Buydy Database
 *
 * This file exports all Mongoose models with proper schema validation
 * and business logic for better understanding of database documents.
 */

// Import all models
import { Exchange } from "./Exchange.js";
import { ExchangeSymbols } from "./ExchangeSymbols.js";
import { Fundamentals } from "./Fundamentals.js";
import { Jobs } from "./Jobs.js";
import { Dividends } from "./Dividends.js";
import { Technicals } from "./Technicals.js";
import { Metrics } from "./Metrics.js";
import { symbolSchema } from "./Symbol.js";
import { CachedResponseEodhd } from "./CachedResponseEodhd.js";
import { CycledListStatus } from "./CycledListStatus.js";
import DrinkLog from "./DrinkLog.js";

// Export all models
export {
  Exchange,
  ExchangeSymbols,
  Fundamentals,
  Jobs,
  Dividends,
  Technicals,
  Metrics,
  symbolSchema,
  CachedResponseEodhd,
  CycledListStatus,
  DrinkLog,
};

// Export as default object for convenience
export default {
  Exchange,
  ExchangeSymbols,
  Fundamentals,
  Jobs,
  Dividends,
  Technicals,
  Metrics,
  symbolSchema,
  CachedResponseEodhd,
  CycledListStatus,
  DrinkLog,
};

/**
 * Model Registry
 *
 * This object provides easy access to all models and their schemas
 * for better understanding of database structure.
 */
export const ModelRegistry = {
  // Collections
  collections: {
    exchanges: {
      model: Exchange,
      description: "Exchange information from EODHD API",
      fields: [
        "code",
        "Code",
        "Country",
        "CountryISO2",
        "CountryISO3",
        "Currency",
        "Name",
        "OperatingMIC",
        "fetchedAt",
        "updatedAt",
      ],
    },
    exchange_symbols: {
      model: ExchangeSymbols,
      description: "All symbols for each exchange from EODHD API",
      fields: ["exchangeCode", "symbols", "fetchedAt", "updatedAt"],
      embedded: {
        symbols: {
          schema: symbolSchema,
          description: "Individual symbol information",
          fields: ["Code", "Name", "Country", "Exchange", "Currency", "Type", "Isin"],
        },
      },
    },
    fundamentals: {
      model: Fundamentals,
      description: "Fundamental data for symbols from EODHD API",
      fields: ["symbol", "market", "fundamentals", "fetchedAt", "updatedAt"],
    },
    jobs: {
      model: Jobs,
      description: "Job execution tracking and logging",
      fields: [
        "name",
        "status",
        "scheduledAt",
        "startedAt",
        "endedAt",
        "progress",
        "result",
        "error",
        "retryCount",
        "maxRetries",
        "nextRetryAt",
        "metadata",
        "createdAt",
        "updatedAt",
      ],
    },
    dividends: {
      model: Dividends,
      description: "Dividend data for symbols from EODHD API",
      fields: ["symbol", "market", "dividends", "fetchedAt", "updatedAt"],
    },
    technicals: {
      model: Technicals,
      description: "Technical analysis data for symbols from EODHD API",
      fields: ["symbol", "market", "technicals", "fetchedAt", "updatedAt"],
    },
    metrics: {
      model: Metrics,
      description: "Calculated metrics for symbols",
      fields: ["symbol", "market", "metrics", "calculatedAt", "updatedAt"],
    },
    cached_responses_eodhd: {
      model: CachedResponseEodhd,
      description: "Cached API responses from EODHD",
      fields: ["endpoint", "params", "response", "fetchedAt", "expiresAt", "updatedAt"],
    },
    cycled_list_statuses: {
      model: CycledListStatus,
      description: "Status tracking for cycled list operations",
      fields: ["listName", "lastCycledAt", "status", "itemsProcessed", "updatedAt"],
    },
    drink_logs: {
      model: DrinkLog,
      description: "User drink consumption logs",
      fields: [
        "userId",
        "drinkId",
        "drinkName",
        "consumedAt",
        "quantity",
        "quantityUnit",
        "rating",
        "notes",
        "abv",
        "tasteTags",
        "location",
        "socialContext",
        "mood",
        "photoUrl",
        "isArchived",
        "createdAt",
        "updatedAt",
      ],
    },
  },

  // Indexes
  indexes: {
    exchanges: ["code"],
    exchange_symbols: ["exchangeCode"],
    fundamentals: ["symbol", "market"],
    jobs: ["name", "status", "scheduledAt"],
    dividends: ["symbol", "market"],
    technicals: ["symbol", "market"],
    metrics: ["symbol", "market"],
    cached_responses_eodhd: ["endpoint", "expiresAt"],
    cycled_list_statuses: ["listName"],
    drink_logs: ["userId", "consumedAt", "rating", "isArchived"],
  },

  // Relationships
  relationships: {
    drink_logs: {
      userId: {
        collection: "users",
        description: "Reference to the user who logged the drink",
      },
      drinkId: {
        collection: "drinks",
        description: "Optional reference to a drink in the drinks collection",
      },
    },
  },
};
