define(["helper/ConstantOutput", "Tone/signal/Multiply", "helper/Basic", 
	"Test", "Tone/source/Oscillator", "Tone/signal/Signal"], 
	function (ConstantOutput, Multiply, Basic, Test, Oscillator, Signal) {

	describe("Multiply", function(){

		Basic(Multiply);

		describe("Multiplication", function(){

			it("handles input and output connections", function(){
				var mult = new Multiply();
				Test.connect(mult, 0);
				Test.connect(mult, 1);
				mult.connect(Test);
				mult.dispose();
			});

			it("correctly multiplys a signal and a scalar", function(){
				return ConstantOutput(function(){
					var signal = new Signal(2);
					var mult = new Multiply(10);
					signal.connect(mult);
					mult.toMaster();
				}, 20);
			});

			it("can multiply two signals", function(){
				return ConstantOutput(function(){
					var sigA = new Signal(3);
					var sigB = new Signal(5);
					var mult = new Multiply();
					sigA.connect(mult, 0, 0);
					sigB.connect(mult, 0, 1);
					mult.toMaster();
				}, 15); 
			});
		});
	});
});