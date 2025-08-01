// Test script to verify Azure Functions are working correctly
// This can be run locally before deployment

const fs = require('fs').promises;
const path = require('path');

// Mock Azure Functions context
const mockContext = {
    log: console.log,
    res: null
};

// Mock request objects
const mockStatsRequest = {
    method: 'GET'
};

const mockIncrementRequest = {
    method: 'POST',
    body: { type: 'created' }
};

async function testStatsFunction() {
    console.log('\n🧪 Testing Stats Function...');
    
    try {
        const statsFunction = require('./stats/index.js');
        await statsFunction(mockContext, mockStatsRequest);
        
        console.log('✅ Stats Response:', mockContext.res);
        return mockContext.res.status === 200;
    } catch (error) {
        console.error('❌ Stats Function Error:', error);
        return false;
    }
}

async function testIncrementFunction() {
    console.log('\n🧪 Testing Increment Function...');
    
    try {
        const incrementFunction = require('./increment/index.js');
        await incrementFunction(mockContext, mockIncrementRequest);
        
        console.log('✅ Increment Response:', mockContext.res);
        return mockContext.res.status === 200;
    } catch (error) {
        console.error('❌ Increment Function Error:', error);
        return false;
    }
}

async function runTests() {
    console.log('🚀 Running Azure Functions Tests...');
    
    const statsTest = await testStatsFunction();
    const incrementTest = await testIncrementFunction();
    
    console.log('\n📊 Test Results:');
    console.log(`Stats Function: ${statsTest ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Increment Function: ${incrementTest ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (statsTest && incrementTest) {
        console.log('\n🎉 All tests passed! Your Azure Functions are ready for deployment.');
    } else {
        console.log('\n⚠️  Some tests failed. Please check the errors above.');
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { runTests, testStatsFunction, testIncrementFunction };
