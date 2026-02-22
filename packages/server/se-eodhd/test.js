/**
 * Simple test to verify package structure and imports
 */

import { EODHDClient, StocksAPI, DividendsAPI, SearchAPI, OptionsAPI, NewsAPI, ForexAPI, IndicesAPI } from './src/index.js';

console.log('🧪 Testing @r-f-booze/se-eodhd package...\n');

// Test that all exports are available
console.log('✅ EODHDClient:', typeof EODHDClient);
console.log('✅ StocksAPI:', typeof StocksAPI);
console.log('✅ DividendsAPI:', typeof DividendsAPI);
console.log('✅ SearchAPI:', typeof SearchAPI);
console.log('✅ OptionsAPI:', typeof OptionsAPI);
console.log('✅ NewsAPI:', typeof NewsAPI);
console.log('✅ ForexAPI:', typeof ForexAPI);
console.log('✅ IndicesAPI:', typeof IndicesAPI);

// Test client instantiation (without API key for structure test)
try {
  const client = new EODHDClient({ apiKey: 'test-key' });
  console.log('✅ Client instantiation: Success');
  console.log('✅ Client has stocks API:', typeof client.stocks);
  console.log('✅ Client has dividends API:', typeof client.dividends);
  console.log('✅ Client has search API:', typeof client.search);
  console.log('✅ Client has options API:', typeof client.options);
  console.log('✅ Client has news API:', typeof client.news);
  console.log('✅ Client has forex API:', typeof client.forex);
  console.log('✅ Client has indices API:', typeof client.indices);
} catch (error) {
  console.log('❌ Client instantiation failed:', error.message);
}

console.log('\n🎉 Package structure test completed!');
