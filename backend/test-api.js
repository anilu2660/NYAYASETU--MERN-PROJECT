// Simple test script to verify API endpoints are working
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const baseURL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  // Test server health
  try {
    console.log('1. Testing server health...');
    const response = await fetch(`${baseURL}/`);
    const data = await response.text();
    console.log('✅ Server health:', data);
  } catch (error) {
    console.log('❌ Server health failed:', error.message);
    return;
  }

  // Test contact form
  try {
    console.log('\n2. Testing contact form...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Contact',
      category: 'technical',
      message: 'This is a test message'
    };
    
    const response = await fetch(`${baseURL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    
    const result = await response.json();
    console.log('✅ Contact form response:', result);
  } catch (error) {
    console.log('❌ Contact form failed:', error.message);
  }

  // Test newsletter subscription
  try {
    console.log('\n3. Testing newsletter subscription...');
    const newsletterData = {
      email: 'newsletter@example.com',
      source: 'footer'
    };
    
    const response = await fetch(`${baseURL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsletterData)
    });
    
    const result = await response.json();
    console.log('✅ Newsletter response:', result);
  } catch (error) {
    console.log('❌ Newsletter failed:', error.message);
  }

  console.log('\n🎉 API testing complete!');
}

testAPI();
