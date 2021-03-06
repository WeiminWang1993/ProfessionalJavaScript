// 第六章  面向对象的程序设计
// 面向对象(Object-Oriented,oo)的语言有一个标志，那就是他们都有类的概念，而通过类可以
// 创建任意多个具有相同属性和方法的对象。前面提到过的，ECMAScript中没有类的概念，因此
// 它的对象也与基于类的语言中的对象有所不同。

// ECMA-262把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或函数。”严格来讲
// 这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字
// 都映射到一个值。正因为这样（以及其他将要讨论的原因）。我们可以把ECMAScript的对象想象
// 成散列表：无非就是一组名值对，其中值可以使数据或函数。

// 6.1  理解对象

// 上一章讲过，创建自定义对象的最简单方式就是创建一个Object的实例，然后再为他添加属性和方法。

// var person = new Object();
// person.name = "juju";
// person.age = 29;
// person.job = "Software Engineer";
// person.sayName = function(){
// 	alert(this.name);
// };
// person.sayName();

// 字面量创建方式
// var person = {
// 	name:"juju",
// 	age:20,
// 	job:"Software Engineer",

// 	sayName:function(){
// 		return 'name:'+this.name+'	'+'age:'+this.age+this.job;
// 	}
// };

// alert(person.sayName());

// 6.1.1  属性类型

// ECMA-262 第五版在定义只有内部采用的特性(attribute)时，描述了属性(perperty)的各种特征。ECMA-262定义了这些特征是为了实现Javascript引擎用的，
// 因此在Javascript中不能直接访问他们。为了表示内部值，该规范把他们放在俩对儿方括号中[[Configurable]]。

// ECMAScript中有两种属性：数据属性和访问属性。

// 1.数据属性
// 	数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。

// 	[[Configurable]]：表示能否通过delete删除属性从而重新定义属性,能否修改属性的特性，或者能否把属性修改为访问器属性。
//						像前面的例子，他们的默认属性值就是为true。
// 	[[Enumerable]]：表示能否通过for-in循环返回属性。像前面例子中那样直接在对象上定义的属性，他们的这个特性默认值为true。
// 	[[Writable]]：能否修改属性的值。像前面的例子这个特性默认，它们这个默认特性值为true。
// 	[[Value]]：包含这个属性的数据值

// 对于前面例子中那样直接在对象上定义的属性，他们的[[Configurable]]，[[Enumerable]]，[[Writable]]，[[Value]]
// 的特性都被设置为true。

// 要修改属性默认的特性，必须使用ECMAScript 5中的Object.defineProperty(Object, prop, descriptor)方法。
// 这个方法接受三个参数：属性所在的对象、属性所在的名字、和一个描述符对象。其中描述符对象必须是
// Configurable、Enumerable、Writable、Value中的一个或多个。例如：

// var person = {};
// Object.defineProperty(person, "name", {
// 	writable:false,
// 	value:"chengqiang"
// });
// alert(person.name);
// person.name = "juju";
// alert(person.name);

// var person = {};
// Object.defineProperty(person, "name", {
// 	configurable:false,
// 	value:"chengqiang"
// });

// 抛出错误
// Object.defineProperty(person, "name", {
// 	configurable:true,
// 	value:"chengqiang"
// });
// alert(person.name);
// delete person.name;
// alert(person.name);

// 在调用 Object.defineProperty(Object, prop, descriptor)方法时，如果不指定，Configurable、Enumerable、Writable特性默认值都是false。
//多数情况下，没有必要
// 利用 Object.defineProperty(Object, prop, descriptor)方法提供的这些高级功能。不过，理解这些概念对理解Javascript对象却非常有用。

// 2.访问属性
// 	访问器属性不包含数据值；他们包含一对儿getter和setter函数。在读取访问其属性是，会调用getter函数，这个函数会负责返回有效的值

// 	[[Configurable]]：表示能否通过delete删除属性从而重新定义属性,能否修改属性的特性，或者能否把属性修改为访问器属性。
//						像前面的例子，他们的默认属性值就是为true。
// 	[[Enumerable]]：表示能否通过for-in循环返回属性。默认为true。
// 	[[Get]]：在读取属性时调用的函数，默认值为undefinded。
// 	[[Set]]：在写入属性时调用的函数。默认值为undefinded。
// var book = {
// 	_year:2004,
// 	edition:1,
// };

// Object.defineProperty(book,"year",{
// 	get:function(){
// 		return this._year;
// 	},
// 	set:function(newValue){
// 		if (newValue > 2004) {
// 			this._year = newValue;
// 			this.edition += newValue -2004;
// 		}
// 	}
// });

// book.year = 2005;
// alert(book.edition);

// 以上代码创建了一个book对象，并给它定义了两个默认的属性：_year和edition。_year前面的下划线是一种常用的记号，用于表示只能通过对象方法访问的属性。
// 而访问器属性year则包含一个getter函数和一个setter函数。getter函数返回_year的值，setter函数通过计算来确定正确的版本。因此，把year函数修改为2005
// 会导致_year变成2005，而edition变为2。这是使用访问器属性的常见方式，即设置一个属性的值会导致其他属性的变化。

// 6.1.2  定义多个属性
// var book = {};

// Object.defineProperties(book,{
// 	_year: {
// 		value:2004
// 	},
// 	edition: {
// 		value:1
// 	},
// 	year: {
// 		get: function(){
// 			return this._year;
// 		},
// 		set: function(newValue){
// 			if(newValue > 2004){
// 				this._year = newValue;
// 				this._year += newValue -2004;
// 			}
// 		}
// 	}
// 	});
// book.year = 2005;
// alert(book._year);
// alert(book.year);
// alert(book.year);


// 6.1.2  读取属性的特性
// 使用ECMAScript 5的Object.getOwnPropertyDescriptor(Object, prop)方法，可以取得给定属性的描述符。
// 这个方法接受两个参数：属性所在的对象和要读取其描述符的属性名称。
// 返回值是一个对象，如果是访问器属性，这个对象的属性有configurable、enumerable、get、set；
// 如果是数据属性，这个对象的属性有configurable、enumerable、writable、value；例如：


// var book = {};

// Object.defineProperties(book,{
// 	_year: {
// 		value:2004
// 	},
// 	edition: {
// 		value:1
// 	},
// 	year: {
// 		get: function(){
// 			return this._year;
// 		},
// 		set: function(newValue){
// 			if(newValue > 2004){
// 				this._year = newValue;
// 				this._year += newValue -2004;
// 			}
// 		}
// 	}
// 	});
// var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
// alert(descriptor.value);			//2004
// alert(descriptor.configurable);		//false


// 6.2  创建对象

// 	虽然Object构造函数或对象字面量都可以用来创建的单个对象，但这些方式有个明显的缺点：使用同一接口创建很多对象，会产生大量的重复代码。

// 	6.2.1  工厂模式

	// function createPerson(name,age,job){    
	// 	var o = new Object();
	// 	o.name = name;
	// 	o.age = age;
	// 	o.job = job;
	// 	o.sayName = function(){
	// 		alert(this.name);
	// 	}
	// 	return o;
	// }

	// var person1 = createPerson('chengqiang',22,'software engineer');
	// var person2 = createPerson('pluto',22,'Front end');

	// person1.sayName();
	// person2.sayName();

	// 缺点：没有解决对象识别问题。

	// 6.2.2  构造函数模式

	// function Person(name,age,job){
	// 	this.name = name;
	// 	this.age = age;
	// 	this.job = job;
	// 	this.sayName = function(){
	// 		alert(this.name);
	// 	};
	// }

	// var person1 = new Person('chengqiang',22,'Software Engineer');
	// var person2 = new Person('pluto',22,'Front');

	// person1.sayName();
	// person2.sayName();

	// 注意：构造函数函数名第一个字母大写

	// 要创建Person的新实例，必须使用new操作符。以这种方式调用构造函数实际上会经历一下4个步骤：
	// （1）：创建一个新对象；
	// （2）：将构造函数的作用域赋给新对象（因此this就指向了这个对象）
	// （3）：执行构造函数中的代码（为这个新对象添加属性）
	// （4）：返回新对象

	// 前面的例子中，person1和person2分别保存着Person的一个不同的实例。这两个对象都有一个
	// constructor（构造函数）属性，该属性指向Person，提示如下

	// alert(person1.constructor == Person);	//true
	// alert(person2.constructor == Person);	//true

	// 对象的 constructor属性最初是用来表示对象类型的。但是提到检测对象类型，还是 instanceof 
	// 操作符更可靠一些。我们在这个例子中创建的所有对象既是 Object 的实例，同时也是 要创建Person的新实例

	// alert(person1 instanceof Object);		//true
	// alert(person1 instanceof Person);		//true
	// alert(person2 instanceof Object);		//true
	// alert(person2 instanceof Person);		//true

	// 1.将构造函数当函数使用  只需要不是new即可
	// 2.构造函数的问题

	// 	缺点：   
	// 		1：使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一个遍

	// 		alert(person1.sayName == person2.sayName)  //false

	// 	解决办法：

		// function Person(name,age,job){
		// 	this.name = name;
		// 	this.age = age;
		// 	this.job = job;
		// 	this.sayName = sayName;
		// }

		// function sayName(){
		// 	alert(this.name);
		// }

		// var person1 = new Person('chengqiang',22,'Software Engineer');
		// var person2 = new Person('pluto',22,'Front');

		// alert(person1.sayName == person2.sayName)  //false

		// 新的问题又来了：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域
		// 有点名不符其实。而更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多个全局函数，
		// 于是我们这个自定的引用类型就丝毫没有封装的意义了。

	// 6.2.3  原型模式

	// 我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象
	// 的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么
	// prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有
	// 对象实例共享他所包含的属性方法。

	// function Person(){
	// }

	// Person.prototype.name = 'chengqiang';
	// Person.prototype.age = 22;
	// Person.prototype.job = 'Software Engineer';
	// Person.prototype.sayName = function(){
	// 	alert(this.name);
	// }

	// var person1 = new Person();
	// person1.sayName();

	// var person2 = new Person();
	// person2.sayName();

	// alert(person1.sayName == person2.sayName);

	// 1.理解原型对象
	// 	无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，
	// 	这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor(构造函数)
	// 	属性，这个属性包含一个指向 prototype属性所在函数的指针，这个属性包含一个指向 prototype属性所在函数的指针。
	// 	就拿前面的例子来说。 Person.prototype.constructor指向 Person。而通过这个构造函数，我们还可以继续为原型对象
	// 	添加其他属性和方法。

	// 	创建了自定义的构造函数之后，其原型对象默认只会取得 constructor属性；至于其他方法，则都是从 Object继承而来的。当调用构造函数创建一个新实例
	// 后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。ECMA-262第五版中管这个指针叫做[[Prototype]]。虽然脚本中没有标准的方式访问
	// [[Prototype]]，但是在Firefox、Safari和Chrome在每个对象上都支持一个属性_proto_；存在其他实现中，这个属性对脚本是完全不可见的。
	// 图6-1展示了Person构造函数、Person的原型属性以及Person现有的两个实例之间的关系。在此，Person.prototype指向了原型对象，而 Person.prototype.constructor
	// 又指回了Person。原型对象中除了 constructor属性之外、还包括后来添加的其他属性。 Person的每个实例都包含一个内部属性，该属性仅仅指向了 Person.prototype。
	// 换句话说，他们与构造函数中之间并无直接关系。此外要格外注意的是，虽然这两个实例都不包含属性和方法，但我们可以调用 person1.sayName()。这是通过查找对象
	// 属性的过程来实现的。
	
	// 	当调用了构造函数创建了一个新示例，该实例的内部将包含一个指针(内部属性)，指向构造函数的
	// 	原型对象。ECMA-262第五版中管这个指针叫做[[Prototype]]。
	// 	虽然在所有实例中都无法访问到[[Prototype]],但是可以通过 isPrototypeOf(Object)方法来确定对象之间是否存在这种关系。

		// function Person(){
		// }

		// Person.prototype.name = 'chengqiang';
		// Person.prototype.age = 22;
		// Person.prototype.job = 'Software Engineer';
		// Person.prototype.sayName = function(){
		// 	alert(this.name);
		// }

		// var person1 = new Person();
		// person1.sayName();

		// var person2 = new Person();
		// person2.sayName();

		// alert(Person.prototype.isPrototypeOf(person1));
		// alert(Person.prototype.isPrototypeOf(person2));

		// 这里，我们用原型对象的 isPrototypeOf()方法测试了 person1和 person2。因为他们内部都有一个指向 Person.prototype的指针。

		// ECMAScript 5中增加了一个新方法，叫 Object.getPrototypeOf(Object),在所有支持的实现中，
		// 这个方法返回[[Prototype]]的值。

		// 通过使用 hasOwnProperty(property)方法，什么时候访问的是实力属性，什么时候访问的是原型属性。
		// function Person(){
		// }

		// Person.prototype.name = 'chengqiang';
		// Person.prototype.age = 22;
		// Person.prototype.job = 'Software Engineer';
		// Person.prototype.sayName = function(){
		// 	alert(this.name);
		// }

		// var person1 = new Person();
		// var person2 = new Person();

		// alert(person1.hasOwnProperty("name"));

		// person1.name = "Greg";
		// alert(person1.name);
		// alert(person1.hasOwnProperty("name"));

		// 2. 原型与in操作符

		// 有两种方式使用in操作符：单独使用和在for-in中使用。在单独使用时，in操作符会在通过对象能够访问给定属性是返回true，无论该属性是存在与原型还是实例。
		// function Person(){
		// }

		// Person.prototype.name = 'chengqiang';
		// Person.prototype.age = 22;
		// Person.prototype.job = 'Software Engineer';
		// Person.prototype.sayName = function(){
		// 	alert(this.name);
		// }

		// var person1 = new Person();
		// var person2 = new Person();

		// alert(person1.hasOwnProperty("name"));

		// person1.name = "Greg";
		// alert(person1.name);
		// alert(person1.hasOwnProperty("name"));
		// alert('name' in person1);

		// 3.  更简单的原型语法。

		// function Person(){
		// }

		// Person.prototype = {
		// 	name:'chengqiang',
		// 	age:22,
		// 	job:'Software Engineer',
		// 	sayName:function(){
		// 		alert(this.name);
		// 	}
		// };

		// 这种写法 constructor不再指向 Person函数。

		// function Person(){
		// }

		// Person.prototype = {
		// 	constructor:Person,
		// 	name:'chengqiang',
		// 	age:22,
		// 	job:'Software Engineer',
		// 	sayName:function(){
		// 		alert(this.name);
		// 	}
		// };

		// 这中方式重设 constructor属性会导致他的 [[Enumerable]]特性被设置为true。默认情况下，原生的 constructor是不可枚举的。
		// 因此，如果您使用兼容模式 ECMAScript 5中的JavaScript引擎，可以试一试 Object.defineProperty(Object, prop, descriptor).
		// function Person(){
		// }

		// Person.prototype = {
		// 	name:'chengqiang',
		// 	age:22,
		// 	job:'Software Engineer',
		// 	sayName:function(){
		// 		alert(this.name);
		// 	}
		// };

		// //重设构造函数，只是用于ECMAScript 5 兼容的JavaScript引擎
		// Object.defineProperty(Person.prototype,'constructor',{
		// 	enumerable:false,
		// 	value:Person
		// });

	// 	4. 原型的动态性
	// 	由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来——即使是先创建了实例后修改原型也照样如此。

	// 	var friend = new Person();
	// 	Person.prototype.sayHi = function(){
	// 		alert('Hi');
	// 	};

	// 	friend sayHi();

	// 	以上代码先创建了Person的一个实例，并将其保存在person。然后，下一条语句在Person.prototype中添加了一个方法sayHi()。即使person实例是在添加新方法
	// 	之前创建的，但它仍然可以访问这个新方法。其原因可以归结为实例与原型之间的松散连接关系。
	// 	尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但是如果重写个整个原型对象，那么情况就不一样了。

	// 	function Person(){
	// 	}
	// 	var friend = new Person();

	// 	Person.prototype = {
	// 		constructor:Person,
	// 		name:'chengqiang',
	// 		age:22,
	// 		job:'Software Engineer',
	// 		sayName:function(){
	// 			alert(this.name);
	// 		}
	// 	};
	// 	friend.sayName();


	// 	5.原生对象的原型
	// 	原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都采用这种模式创建。

	// 	6.  原型对象的问题
	// 	原型模式缺点：
	// 		首先，他忽略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。


	// 6.2.4  组合使用构造函数模式和原型模式

	// 	创建自定义类型的最常见方式，就是组合使用构造函数与原型模式。构造函数模式用于定义实例属性，儿原型模式用于定义方法和共享的属性。
	// 	结果，每个实例都会有自己的一份实力属性的副本，但同时又共享着对方法的引用，最大程度节约了内存。另外，这种模式还支持传递参数。

		// function Person(name,age,job){
		// 	this.name = name;
		// 	this.age = age;
		// 	this.job = job;
		// 	this.friend = ["zhansgan","lizi"];
		// }
		// Person.prototype = {
		// 	constructor:Person,
		// 	sayName:function(){
		// 		alert(this.name);
		// 	}
		// }

		// var person1 = new Person("chenqgiang",22,"Software Engineer");
		// var person2 = new Person("pluto",22,"Front Engineer");

		// person1.friend.push("wanger");
		// alert(person1.friend);
		// alert(person2.friend);
		// alert(person1.friend === person2.friend);
		// alert(person1.sayName === person2.sayName);

	// 6.2.5  动态原型模式

		// function Person(name,age,job){
		// 	//属性
		// 	this.name = name;
		// 	this.age = age;
		// 	this.job = job;

		// 	//方法
		// 	if(typeof this.sayName != 'function'){
		// 		Person.prototype.sayName = function(){
		// 			alert(this.name);
		// 		};
		// 	}
		// }

		// var friend = new Person("chenqgiang",22,"Software Engineer");
		// friend.sayName();
		// 6.2.6  寄生构造函数
		// 6.2.7  稳妥构造函数

	// 6.3  继承
			// ECMAScript只支持实现继承。

	// 	6.3.1  原型链
				// ECMAScript中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个类型继承另一个类型的属性和方法。简单回顾一下
				// 构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
				// 那么，加入我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象都将包含一个指向另一个原型的指针，相应地，另一个原型中
				// 包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。

			// function SuperType(){
			// 	this.prototype = true;
			// }
			// SuperType.prototype.getSuperVaule = function(){
			// 	return this.prototype;
			// }

			// function SubType(){
			// 	this.subproperty = false;
			// }

			// //继承了SuperType
			// SubType.prototype = new SuperType();
			// SubType.prototype.getSubVaule = function(){
			// 	return this.prototype;
			// }

			// var instance = new SubType();
			// alert(instance.getSuperVaule());
			// 以上定义了两个类型：SuperType和SubType。每个类型都分别有一个属性和一个方法。他们的主要区别是SubType继承了SuperType,
			// 而继承是通过创建SuperType的实例，并将该实例赋给SubType.prototype实现的。实现的本质是重写原型对象，代之以一个新类型的实例。
			// 换句话说，原来存在于。

			// 1.别忘记默认的原型。
			// 2.确认原型和实例的关系。
			// 3.谨慎地定义方法。

			// 原型链的问题：
			// 	首先，引用类型也被继承
			// 	其次，无法向父类传递参数


			// 6.3.2  借用构造函数
			// function SuperType(){
			// 	this.colors = ["red","blue","green"];
			// }
			// function SubType(){
			// 	//继承了SuperType
			// 	SuperType.call(this);
			// }

			// var instance1 = new SubType();
			// instance1.colors.push("black");
			// alert(instance1.colors);

			// var instance2 = new SubType();
			// alert(instance2.colors);
			// 1.传递参数
			// function SuperType(name){
			// 	this.name = name;
			// }
			// function SubType(){
			// 	//继承了SuperType,同时还传递了参数
			// 	SuperType.call(this,"Nicholas");
			// 	//实例属性
			// 	this.age = 29;
			// }

			// var instance = new SubType();
			// alert(instance.name);		//Nicholas
			// alert(instance.age);		//29

			// 6.3.3  组合继承
			// function SuperType(name){
			// 	this.name = name;
			// 	this.colors = ["red","blue","green"];
			// }

			// SuperType.prototype.sayName = function(){
			// 	alert(this.name);
			// };

			// function SubType(name,age){
			// 	//继承属性
			// 	SuperType.call(this,name);

			// 	this.age = age;
			// }

			// //继承方法
			// SubType.prototype = new SuperType();
			// SubType.prototype.sayAge = function(){
			// 	alert(this.age);
			// };

			// var instance = new SubType("Nicholas",29);
			// instance.colors.push("black");
			// alert(instance.colors);
			// instance.sayName();
			// instance.sayAge();





