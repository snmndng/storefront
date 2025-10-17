#!/usr/bin/env node

/**
 * Simple script to test Saleor API connectivity
 * Run with: node scripts/test-api.js
 */

import { config } from 'dotenv';
config();

const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL;

if (!SALEOR_API_URL) {
  console.error('❌ NEXT_PUBLIC_SALEOR_API_URL is not set in your .env file');
  process.exit(1);
}

console.log('🔍 Testing Saleor API connection...');
console.log('📍 API URL:', SALEOR_API_URL);

const testQuery = `
  query TestConnection {
    shop {
      name
      description
    }
  }
`;

async function testConnection() {
  try {
    const response = await fetch(SALEOR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: testQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      return false;
    }

    if (data.data?.shop) {
      console.log('✅ API Connection successful!');
      console.log('🏪 Shop Name:', data.data.shop.name || 'Not set');
      console.log('📝 Shop Description:', data.data.shop.description || 'Not set');
      return true;
    } else {
      console.error('❌ Unexpected response structure:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

testConnection().then(success => {
  if (success) {
    console.log('\n🎉 Your Saleor API is working correctly!');
    console.log('💡 You can now run: pnpm dev');
  } else {
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your .env file has the correct NEXT_PUBLIC_SALEOR_API_URL');
    console.log('2. Make sure your Saleor instance is running and accessible');
    console.log('3. Verify the URL ends with /graphql/');
    console.log('4. Check if you need authentication tokens');
  }
  process.exit(success ? 0 : 1);
});