//  Part I

// ----------------------------
// write your own forEach() function that takes an array and a function
// ----------------------------

function forEach(array, callback){
    for (var i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
}

// tests
// ---
var total = 1
forEach([1, 2, 3, 4], function(a){ total *= a; })
console.assert(total === 24)

// ----------------------------
// using forEach() from above, write your own reduce()
// that takes an array and a function
// ----------------------------

function reduce(array, callback, initialValue){
  // Create a variable that will hold the accumulator value
  // as it changes over time.
  var accumulator;

  // Loop through every item in the array
  forEach(array, function(value, i, originalArray) {
    // If we don't have an initial value, set the value to the first item
    if(typeof initialValue === 'undefined') {
      initialValue = value;
    }
    // If we're on the first item, use that value as the accumulator
    if( i === 0 ) {
      accumulator = initialValue;
    }
    // If we're on any other item, call the callback function
    // passing it the accumulator and value.
    accumulator = callback(accumulator, value);
  });

  // We're done looping, return the end value of the accumulator
  return accumulator;
}

// tests
// ---
var multiplyResult = reduce([1, 2, 3, 4], function(a, v) { return a*v }, 1);
console.assert(multiplyResult === 24);

var sumResult = reduce([1, 2, 3, 4, 5], function(a, v) { return a+v }, 0);
console.assert(sumResult === 15);

var subtractResults = reduce([10, 5, 2, 1], function(a, v) { return a-v; }, 20);
console.assert(subtractResults === 2);



// ----------------------------
// using forEach() from above, write your own map()
// that takes an array and a function
// ----------------------------

function map(array, callback){
  var finalArray = [];
  // YOUR CODE HERE
  forEach(array, function(value, i, originalArray) {
    finalArray.push(callback(value, i, originalArray));
  });
  return finalArray;
}

// tests
// ---
var squares = map([1, 2, 3, 4], function(v){ return v*v })
console.assert(squares[0] === 1)
console.assert(squares[1] === 4)
console.assert(squares[2] === 9)
console.assert(squares[3] === 16)

// ----------------------------
// using reduce() from above, write your own filter()
// that takes an array and a function
// ----------------------------

function filter(array, callback){
    // YOUR CODE HERE
    var finalArray = [];

    reduce(array, function(a, v) {
      var result = callback(v);
      if(result) {
        finalArray.push(v);
      }
    })

    return finalArray;
}

// tests
// ---
var evens = filter([1, 2, 3, 4], function(v){ return v%2 === 0 })

console.assert(evens[0] === 2)
console.assert(evens[1] === 4)


// ----------------------------
// using reduce() from above, write your own sum()
// that adds up all arguments to sum (note: variadic behavior)
// ----------------------------

function sum(){
    // YOUR CODE HERE
    // convert the arguments passed in into an array
    var items = Array.prototype.slice.call(arguments);
    var sum = reduce(items, function(a, v){
      return a+v;
    }, 0);
    return sum;
}

// tests
// ---
console.assert(sum(1, 2, 3) === 6)
console.assert(sum(1, 2, 3, 4) === 10)
console.assert(sum(1, 2, 3, 4, 5) === 15)

// ----------------------------
// using Array.sort(), sort the following array
// of people by name
// ----------------------------

var names = [
    {name:"Matt", alma_mater:"Univ of Texas - Austin"},
    {name:"Brian", alma_mater:"Texas A&M"},
    {name:"Jesse", alma_mater:"Univ of Texas - Austin"}
]

names.sort(function(a, b){
  // YOUR CODE HERE
  return a.name > b.name;
})

// tests
// ---
console.assert(names[0].name === "Brian")
console.assert(names[1].name === "Jesse")
console.assert(names[2].name === "Matt")

// ----------------------------
// Using Array.map(), Array.filter(), and Array.sort() on the
// array below:
// - filter for customers whose first-names start with 'J',
// - map to their fullnames,
// - and then sort the items alphabetically by fullname
// ----------------------------

var customers = [
    { first: 'Joe', last: 'Blogs'},
    { first: 'John', last: 'Smith'},
    { first: 'Dave', last: 'Jones'},
    { first: 'Jack', last: 'White'}
]

var results = customers
    .filter(function(customer){
        return customer.first[0] === 'J';
    })
    .map(function(customer){
      customer.fullname = customer.first + ' ' + customer.last
      return customer
    })
    .sort(function(a,b){
        return a.fullname > b.fullname
    })

// tests
// ---
console.assert(results[0].fullname === "Jack White")
console.assert(results[2].fullname === "John Smith")
