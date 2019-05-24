Sale.decorators = {
	"fedtax": {
		getPrice(){
			let price = this.uber.getPrice();
			return price * 95 /100;
		}
	},
	"money": {
		getPrice(){
			let price = this.uber.getPrice();
			return price.toFixed(2);
		}
	}
}

function Sale (price = 100){
	this.price = price;
}

Sale.prototype.getPrice = function(){
	return this.price;
}

Sale.prototype.decorate = function(dname){
	let dec = this.constructor.decorators[dname];
	let F = function(){};
	var newObj = {};

	F.prototype = this;

	newObj = new F();
	newObj.uber = F.prototype;

	for(let i in dec){
		newObj[i] = dec[i];
	}

	return newObj;
}


var sale = new Sale(500);

sale = sale.decorate("fedtax");
sale = sale.decorate("money");

sale.getPrice();	//475.00







