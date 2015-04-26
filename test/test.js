var expect = require("expect.js");
var extractjs = require('./../extractjs.js');

describe('extractjs', function(){
	describe('extractor using default template', function() {
		var extractor;
		beforeEach(function() {
			extractor = extractjs();
		});

		it('should extract input', function() {
			var captured = extractor('Hello {name}', "Hello Prince");
			expect(captured).to.eql({name:'Prince'});
		});

		it('should capture multiple variables from input', function() {
			var captured = extractor('This is {name}, I am {age} years old', "This is Prince John Wesley, I am 26 years old");
			expect(captured).to.eql({name:'Prince John Wesley', age: 26});
		});

		it('should build pattern and capture multiple variables from input', function() {
			var pattern = extractor('This is {name}, I am {age} years old');
			var captured = pattern.extract("This is Prince John Wesley, I am 26 years old");
			expect(captured).to.eql({name:'Prince John Wesley', age: 26});
		});
	});
	describe('extractor using custom template', function() {
		var extractor;
		beforeEach(function() {
			extractor = extractjs( { startExtract: '[', endExtract: ']' });
		});

		it('should extract input', function() {
			var captured = extractor('Hello [name]', "Hello Senthil Porunan");
			expect(captured).to.eql({name:'Senthil Porunan'});
		});

		it('should extract input using call-wise settings', function() {
			var captured = extractor('Hello {-name-}', "Hello Senthil Porunan",
				{ startExtract: '{-', endExtract: '-}'});
			expect(captured).to.eql({name:'Senthil Porunan'});
		});
	});
	describe('interpolate using template pattern', function() {
		var extractor;
		beforeEach(function() {
			extractor = extractjs();
		});

		it('should interpolate pattern', function() {
			var pattern = extractor('Hello {name}');
			expect(pattern.interpolate({name: 'Prince'})).to.eql('Hello Prince');
		});

		it('should interpolate pattern with multiple bindings', function() {
			var pattern = extractor('Hi {name}, Welcome to {country}');
			expect(pattern.interpolate({name: 'Prince', country: 'India'})).to.eql('Hi Prince, Welcome to India');
		});

	});

});