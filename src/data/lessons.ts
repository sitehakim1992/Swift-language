// Swift Programming Lessons Data - EXPANED VERSION
import { Lesson, QuizQuestion, Challenge, MotivationalQuote } from '../types';

export const swiftLessons: Lesson[] = [
  // ================= BEGINNER LEVEL (Expanded) =================
  {
    id: 'beginner-1',
    title: 'Hello Swift',
    description: 'Learn to print your first message in Swift',
    content: `Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch. It's designed to give developers the maximum power and control.
Swift uses safe programming patterns and adds modern features to make programming easier, more flexible, and more fun.
The print() function is one of the most basic functions in Swift. It allows you to output text to the console.`,
    codeExample: `// Your first Swift program
print("Hello, Swift!")
// Printing multiple values
print("Welcome to", "Swift Programming!")
// Using string interpolation
let name = "Developer"
print("Hello, \\(name)!")`,
    explanation: 'String interpolation allows you to insert variables and expressions into strings using \\(...) syntax. This is one of Swift\'s most useful features!',
    tips: [
      'Strings in Swift are wrapped in double quotes',
      'Use \\(*) for string interpolation to embed values',
      'Print statements end with a newline automatically',
      'Swift is case-sensitive: print and Print are different',
    ],
    level: 'beginner',
    order: 1,
  },
  {
    id: 'beginner-2',
    title: 'Variables & Constants',
    description: 'Understanding var, let, and data types',
    content: `In Swift, you use variables (var) to store values that can change, and constants (let) for values that should never change.
Constants are great for values you know won't change, like mathematical constants or configuration values. Using let makes your code safer and more efficient.
Swift is a type-safe language, meaning it helps you catch type errors during development. However, Swift can often infer types automatically, so you don't always need to specify them explicitly.`,
    codeExample: `// Variables (can be changed)
var greeting = "Hello"
greeting = "Welcome"  // This works!
// Constants (cannot be changed)
let pi = 3.14159
// pi = 3.14  // Error! Cannot modify constant
// Type annotations
var age: Int = 25
var temperature: Double = 98.6
var isActive: Bool = true
var initials: String = "AS"
print("Age: \\(age)")
print("Pi is approximately: \\(pi)")`,
    explanation: 'Use let for values that won\'t change to make your code safer and help the compiler optimize. Use var for values that need to be modified.',
    tips: [
      'Prefer let over var when possible',
      'Swift infers types from context',
      'Use descriptive variable names',
      'Constants cannot be reassigned after declaration',
    ],
    level: 'beginner',
    order: 2,
  },
  {
    id: 'beginner-3',
    title: 'Basic Data Types',
    description: 'Explore Int, Double, String, and Bool',
    content: `Swift provides several basic data types for storing different kinds of data:
• Int - Integer numbers (whole numbers)
• Double - Floating-point numbers (decimal numbers)
• String - Textual data
• Bool - Boolean values (true/false)
• Character - Single characters
Understanding these types is fundamental to programming in Swift. Each type has specific capabilities and use cases.`,
    codeExample: `// Integer types
var integerCount: Int = 42
let negativeNumber: Int = -17
// Floating-point types
var price: Double = 19.99
let pi: Double = 3.14159265359
// String types
var welcomeMessage: String = "Hello, World!"
let singleChar: Character = "A"
// Boolean types
var isLoggedIn: Bool = false
let hasPermission: Bool = true
// Type conversion
let explicitDouble: Double = Double(integerCount)
let stringNumber: String = String(123)
print("Count: \\(integerCount)")
print("Price: $\\(price)")
print("Logged in: \\(isLoggedIn)")`,
    explanation: 'Swift requires explicit type conversion between different types. You cannot automatically convert Int to Double, for example.',
    tips: [
      'Int can store very large numbers',
      'Double provides about 15 decimal digits of precision',
      'Use String interpolation instead of string concatenation',
      'Bool values are strictly true or false',
    ],
    level: 'beginner',
    order: 3,
  },
  {
    id: 'beginner-4',
    title: 'Operators',
    description: 'Arithmetic, comparison, and logical operators',
    content: `Operators are special symbols used to perform operations on values and variables. Swift supports several types of operators.
Arithmetic operators: +, -, *, /, %
Comparison operators: ==, !=, <, >, <=, >=
Logical operators: &&, ||, !
Assignment operators: =, +=, -=, *=, /=`,
    codeExample: `// Arithmetic operators
let sum = 10 + 5        // 15
let difference = 10 - 3 // 7
let product = 4 * 3     // 12
let quotient = 15 / 4   // 3 (integer division)
let remainder = 15 % 4 // 3
// Comparison operators
let isEqual = (5 == 5)      // true
let isGreater = (10 > 5)    // true
let isNotEqual = (3 != 4)   // true
// Logical operators
let andResult = true && false  // false
let orResult = true || false   // true
let notResult = !true           // false
// Combined operations
var counter = 10
counter += 5    // counter is now 15
counter *= 2    // counter is now 30
print("Sum: \\(sum)")
print("Is 5 equal to 5? \\(isEqual)")`,
    explanation: 'The remainder operator (%) returns the remainder after division. For example, 15 % 4 equals 3 because 4 goes into 15 three times with a remainder of 3.',
    tips: [
      'Integer division truncates the decimal part',
      'Use parentheses to control order of operations',
      'Avoid floating-point equality comparisons',
      'Logical operators short-circuit when possible',
    ],
    level: 'beginner',
    order: 4,
  },
  {
    id: 'beginner-5',
    title: 'Conditionals',
    description: 'If statements, else clauses, and else if',
    content: `Conditional statements allow your code to make decisions based on conditions. The if statement is the most common conditional in programming.
You can chain multiple conditions using else if, and provide a fallback using else. Swift also supports the ternary operator for simple conditions.`,
    codeExample: `// Basic if statement
let temperature = 25
if temperature > 30 {
    print("It's very hot!")
}
// If-else statement
let age = 16
if age >= 18 {
    print("You are an adult")
} else {
    print("You are a minor")
}
// Else-if chain
let score = 85
if score >= 90 {
    print("Grade: A")
} else if score >= 80 {
    print("Grade: B")
} else if score >= 70 {
    print("Grade: C")
} else {
    print("Grade: F")
}
// Ternary operator
let status = age >= 18 ? "Adult" : "Minor"
print("Status: \\(status)")
// Multiple conditions
let hasID = true
let hasTicket = true
if hasID && hasTicket {
    print("Welcome to the event!")
}`,
    explanation: 'The ternary operator (? : ) is a shorthand for simple if-else statements. It returns one of two values based on a condition.',
    tips: [
      'Keep if conditions simple and readable',
      'Use else-if for multiple mutually exclusive conditions',
      'Avoid deeply nested if statements',
      'The ternary operator is useful for simple conditions',
    ],
    level: 'beginner',
    order: 5,
  },
  {
    id: 'beginner-6',
    title: 'Loops',
    description: 'For-in loops and while loops',
    content: `Loops allow you to repeat code multiple times. Swift provides two main types of loops:
For-in loops: Iterate over sequences (arrays, ranges, strings)
While loops: Repeat until a condition becomes false
Repeat-while loops: Execute at least once before checking the condition
Loops are essential for automating repetitive tasks in your code.`,
    codeExample: `// For-in loop with range
for i in 1...5 {
    print("Count: \\(i)")
}
// Output: 1, 2, 3, 4, 5
// For-in loop with array
let fruits = ["Apple", "Banana", "Orange"]
for fruit in fruits {
    print("I like \\(fruit)")
}
// For-in loop with index
for (index, fruit) in fruits.enumerated() {
    print("\\(index + 1). \\(fruit)")
}
// While loop
var count = 0
while count < 3 {
    print("While count: \\(count)")
    count += 1
}
// Repeat-while loop
var repeatCount = 0
repeat {
    print("Repeat count: \\(repeatCount)")
    repeatCount += 1
} while repeatCount < 3
// Breaking out of loops
for i in 1...10 {
    if i == 6 {
        break
    }
    print("Breaking at: \\(i)")
}`,
    explanation: 'The ... operator creates a closed range including both endpoints (1...5 means 1, 2, 3, 4, 5). Use ..< for half-open ranges (1..<5 means 1, 2, 3, 4).',
    tips: [
      'Use for-in loops when you know the number of iterations',
      'Use while loops when the number of iterations is unknown',
      'Use break to exit a loop early',
      'Use continue to skip to the next iteration',
    ],
    level: 'beginner',
    order: 6,
  },
  // --- NEW BEGINNER LESSONS ---
  {
    id: 'beginner-7',
    title: 'Tuples',
    description: 'Grouping multiple values into a single compound value',
    content: `Tuples group multiple values into a single compound value. The values within a tuple can be of any type and do not have to be of the same type as each other.
Tuples are useful for temporary groups of related values. They are not suitable for creating complex data structures; for that, use structs or classes.`,
    codeExample: `// Defining a tuple
let http404Error = (404, "Not Found")
// http404Error is of type (Int, String), and equals (404, "Not Found")

// Decomposing a tuple
let (statusCode, statusMessage) = http404Error
print("The status code is \\(statusCode)")
// Prints "The status code is 404"
print("The status message is \\(statusMessage)")
// Prints "The status message is Not Found"

// Accessing individual elements
print("The status code is \\(http404Error.0)")
print("The status message is \\(http404Error.1)")

// Naming tuple elements
let http200Status = (statusCode: 200, description: "OK")
print("The status code is \\(http200Status.statusCode)")
// Prints "The status code is 200"`,
    explanation: 'Tuples are great for returning multiple values from a function without creating a formal struct. However, if the data structure is likely to persist beyond a temporary scope, prefer a struct or class.',
    tips: [
      'Tuples are value types',
      'You can name elements in a tuple for clarity',
      'Use tuples for temporary data grouping',
      'Tuples cannot contain more than ~20 elements practically',
    ],
    level: 'beginner',
    order: 7,
  },
  {
    id: 'beginner-8',
    title: 'Type Casting & Aliases',
    description: 'Understanding Typealias and basic casting',
    content: `A type alias defines an alternative name for an existing type. You define type aliases with the typealias keyword.
Type aliases are useful when you want to refer to an existing type by a name that is more appropriate for the context in which it’s being used.`,
    codeExample: `// Type Alias
typealias AudioSample = UInt16
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound is now 0, of type UInt16

// Why use it?
// Instead of writing UInt16 everywhere, you use AudioSample
// which makes the code more readable in an audio processing app.

// Basic Casting (Introduction)
let myInt: Int = 42
let myDouble: Double = Double(myInt) // Explicit cast

// Force Cast (Avoid unless necessary)
let someAny: Any = "Hello"
let someString = someAny as! String`,
    explanation: 'Type aliases do not create new types; they simply provide a new name for an existing type. This improves code readability.',
    tips: [
      'Use typealias to simplify complex generic types',
      'Use typealias to give domain-specific names to primitive types',
      'Casting converts one type to another compatible type',
    ],
    level: 'beginner',
    order: 8,
  },
  {
    id: 'beginner-9',
    title: 'Comments & Documentation',
    description: 'Writing readable code and documentation comments',
    content: `Comments help you organize your code and provide notes for yourself and others. Swift ignores everything in a comment when compiling your code.
Swift also supports documentation comments that can be rendered by Xcode Quick Help.`,
    codeExample: `// This is a single-line comment

/* This is a multi-line comment
   It can span multiple lines */

/// This is a documentation comment for a function
/// - Parameter name: The name of the person
/// - Returns: A greeting string
func greet(name: String) -> String {
    return "Hello, \\(name)"
}

// MARK: - Section Breaks
// TODO: Fix this later
// FIXME: This is a bug`,
    explanation: 'Using /// creates documentation that appears in Xcode when you Option-Click on a symbol. MARK, TODO, and FIXME help organize the jump bar in Xcode.',
    tips: [
      'Use /// for API documentation',
      'Use // MARK: to separate code sections in Xcode',
      'Comment WHY you did something, not just WHAT',
    ],
    level: 'beginner',
    order: 9,
  },
  {
    id: 'beginner-10',
    title: 'Nil Coalescing & Guard',
    description: 'Safe unwrapping techniques',
    content: `While 'if let' is common, 'guard' statements are preferred for early exits. The nil coalescing operator (??) provides a default value if an optional is nil.`,
    codeExample: `func checkUser(name: String?) {
    // Guard statement: Exit early if name is nil
    guard let userName = name else {
        print("No name provided")
        return
    }
    
    // Name is safely unwrapped here
    print("Hello, \\(userName)")
}

// Nil Coalescing
let defaultName = name ?? "Guest"
// If name is nil, defaultName becomes "Guest"`,
    explanation: 'Guard statements keep your code flat and readable by avoiding deep nesting of if-else blocks.',
    tips: [
      'Use guard for preconditions',
      'Use ?? for providing fallback values',
      'Unwrapped variables in guard are available in the rest of the scope',
    ],
    level: 'beginner',
    order: 10,
  },

  // ================= INTERMEDIATE LEVEL (Expanded) =================
  {
    id: 'intermediate-1',
    title: 'Functions',
    description: 'Creating and calling functions in Swift',
    content: `Functions are self-contained chunks of code that perform a specific task. They help you organize your code, make it reusable, and easier to read.
In Swift, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.`,
    codeExample: `// Basic function
func greet() {
    print("Hello, World!")
}
greet()  // Calls the function
// Function with parameter
func greetPerson(name: String) {
    print("Hello, \\(name)!")
}
greetPerson(name: "Alice")
// Function with return value
func add(a: Int, b: Int) -> Int {
    return a + b
}
let sum = add(a: 5, b: 3)
print("Sum: \\(sum)")
// Function with multiple return values
func minMax(numbers: [Int]) -> (min: Int, max: Int) {
    var min = numbers[0]
    var max = numbers[0]
    for number in numbers {
        if number < min { min = number }
        if number > max { max = number }
    }
    return (min, max)
}
let result = minMax(numbers: [3, 1, 4, 1, 5])
print("Min: \\(result.min), Max: \\(result.max)")`,
    explanation: 'Functions can return tuples, which allow you to return multiple values from a single function. Tuples are created with parentheses and can have named elements.',
    tips: [
      'Name functions with verbs that describe their action',
      'Use external parameter names for clarity',
      'Functions can have default parameter values',
      'You can use _ to omit external parameter names',
    ],
    level: 'intermediate',
    order: 1,
  },
  {
    id: 'intermediate-2',
    title: 'Arrays',
    description: 'Working with collections in Swift',
    content: `Arrays are ordered collections of values of the same type. Swift arrays are type-safe, meaning they can only contain elements of a specific type.
You can create arrays using brackets [] and access elements using subscript notation starting from index 0.`,
    codeExample: `// Creating arrays
var numbers: [Int] = [1, 2, 3, 4, 5]
let names = ["Alice", "Bob", "Charlie"]
var mixed: [Any] = [1, "two", 3.0]
// Accessing elements
let firstNumber = numbers[0]  // 1
let lastName = names[2]        // "Charlie"
// Modifying arrays
numbers.append(6)         // Add to end
numbers.insert(0, at: 0)  // Insert at index
numbers.remove(at: 2)      // Remove at index
numbers.removeLast()       // Remove last element
// Array properties
let count = numbers.count   // Number of elements
let isEmpty = numbers.isEmpty // Boolean check
// Iterating over arrays
for number in numbers {
    print("Number: \\(number)")
}
// Using enumerated
for (index, number) in numbers.enumerated() {
    print("Index \\(index): \\(number)")
}
// Array methods
let doubled = numbers.map { $0 * 2 }
let filtered = numbers.filter { $0 > 3 }
let summed = numbers.reduce(0) { $0 + $1 }
print("Doubled: \\(doubled)")
print("Filtered (>3): \\(filtered)")
print("Sum: \\(summed)")`,
    explanation: 'Swift arrays have powerful methods like map, filter, and reduce. These functional programming methods help you transform and analyze collections elegantly.',
    tips: [
      'Use map to transform each element',
      'Use filter to select elements meeting a condition',
      'Use reduce to combine all elements into one value',
      'Arrays are zero-indexed in Swift',
    ],
    level: 'intermediate',
    order: 2,
  },
  {
    id: 'intermediate-3',
    title: 'Dictionaries',
    description: 'Key-value pairs and data organization',
    content: `Dictionaries store associations between keys and values, where each key uniquely identifies a value. Unlike arrays, dictionaries are unordered collections.
Swift dictionaries are type-safe, requiring you to specify the types for both keys and values.`,
    codeExample: `// Creating dictionaries
var capitals: [String: String] = [
    "USA": "Washington D.C.",
    "France": "Paris",
    "Japan": "Tokyo"
]
var scores: [String: Int] = [:]
scores["Alice"] = 95
scores["Bob"] = 87
scores["Charlie"] = 92
// Accessing values
let capital = capitals["France"]  // Optional
let capitalUSA = capitals["USA", default: "Unknown"]
// Modifying dictionaries
capitals["Germany"] = "Berlin"   // Add new entry
capitals["Japan"] = "Tokyo"      // Update existing
capitals.removeValue(forKey: "France")
// Iterating over dictionaries
for (country, capital) in capitals {
    print("\\(country): \\(capital)")
}
// Dictionary properties
let count = capitals.count
let isEmpty = capitals.isEmpty
let allCountries = Array(capitals.keys)
let allCapitals = Array(capitals.values)
// Useful dictionary methods
let countries = ["USA", "France", "Japan"]
let foundCapital = capitals["USA"]  // Optional
// Merging dictionaries
var defaults: [String: Any] = ["Theme": "Light"]
let userPrefs: [String: Any] = ["Theme": "Dark", "FontSize": 14]
defaults.merge(userPrefs) { (_, new) in new }
print("Countries: \\(countries)")`,
    explanation: 'Accessing a dictionary returns an Optional because the key might not exist. Use optional binding or provide a default value to handle this safely.',
    tips: [
      'Keys must be Hashable (basic types are by default)',
      'Values can be any type',
      'Use updateValue to get the old value when updating',
      'Dictionaries are unordered - use arrays if order matters',
    ],
    level: 'intermediate',
    order: 3,
  },
  {
    id: 'intermediate-4',
    title: 'Optionals',
    description: 'Handling nil values safely',
    content: `Optionals are Swift's way of handling values that might be nil (no value). This is one of Swift's most powerful features for writing safe code.
An optional can contain a value, or it can be nil. You must unwrap optionals before using them.`,
    codeExample: `// Declaring optionals
var name: String? = "Alice"
var age: Int? = nil
let result: String? = nil
// Force unwrapping (use carefully!)
let unwrappedName = name!  // "Alice"
// let crash = age!         // Runtime crash!
// Optional binding (if-let)
if let actualName = name {
    print("Name is \\(actualName)")
} else {
    print("Name is nil")
}
// Guard statement
func processName(_ name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \\(name)!")
}
// Nil coalescing operator
let displayName = name ?? "Anonymous"
let displayAge = age ?? 0
// Optional chaining
var user: [String: String?] = [
    "name": "Alice",
    "email": nil
]
let email = user["email"] ?? "No email"
let city = user["city"]?.uppercased() ?? "Unknown"
// Multiple optional binding
let optional1: Int? = 5
let optional2: Int? = 10
if let val1 = optional1, let val2 = optional2 {
    print("Sum: \\(val1 + val2)")
}
processName(name)`,
    explanation: 'The guard statement is used to exit early if a condition isn\'t met. It\'s particularly useful for unwrapping optionals in functions, ensuring you only proceed with valid values.',
    tips: [
      'Prefer optional binding over force unwrapping',
      'Use guard for early exit patterns',
      'Use nil coalescing (??) for default values',
      'Optional chaining (?.) safely accesses nested optionals',
    ],
    level: 'intermediate',
    order: 4,
  },
  {
    id: 'intermediate-5',
    title: 'Closures',
    description: 'Anonymous functions and closure expressions',
    content: `Closures are self-contained blocks of functionality that can be passed around and used in your code. They are similar to lambdas in other languages.
Swift closures can capture and store references to variables from the surrounding context.`,
    codeExample: `// Basic closure syntax
let greet = { (name: String) in
    print("Hello, \\(name)!")
}
greet("World")
// Closure as function parameter
func performOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}
let add = performOperation(5, 3) { $0 + $1 }
let multiply = performOperation(5, 3) { $0 * $1 }
print("Add: \\(add), Multiply: \\(multiply)")
// Sorted closure
let names = ["Charlie", "Alice", "Bob"]
let sorted = names.sorted { $0 > $1 }
print("Sorted: \\(sorted)")
// Trailing closure syntax
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }
let evens = numbers.filter { $0 % 2 == 0 }
let sum = numbers.reduce(0) { $0 + $1 }
// Escaping closures
var completionHandlers: [() -> Void] = []
func withEscapingClosure(completion: @escaping () -> Void) {
    completionHandlers.append(completion)
}
// Autoclosures
var customersInLine = ["Alice", "Bob", "Charlie"]
let customerProvider = { customersInLine.remove(at: 0) }
print("Now serving: \\(customerProvider())")
// Closure capture values
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}
let counter = makeCounter()
print(counter())  // 1
print(counter())  // 2
print(counter())  // 3`,
    explanation: 'Closures capture values from their surrounding context, which allows them to maintain state. This is useful for creating function factories and callbacks.',
    tips: [
      'Use $0, $1, etc. for shorthand argument names',
      'Trailing closures improve readability',
      'Closures are reference types',
      'Use @escaping for closures stored for later execution',
    ],
    level: 'intermediate',
    order: 5,
  },
  {
    id: 'intermediate-6',
    title: 'Enumerations',
    description: 'Creating custom types with enum',
    content: `Enumerations (enums) define a common type for a group of related values. They make your code more type-safe and easier to read.
Swift enums can have associated values and computed properties, making them more powerful than enums in many other languages.`,
    codeExample: `// Basic enum
enum Direction {
    case north
    case south
    case east
    case west
}
var direction = Direction.north
direction = .east  // Type inference
// Switch with enums
switch direction {
case .north:
    print("Going north")
case .south:
    print("Going south")
case .east:
    print("Going east")
case .west:
    print("Going west")
}
// Enum with raw values
enum Planet: Int {
    case mercury = 1
    case venus = 2
    case earth = 3
    case mars = 4
}
let earth = Planet(rawValue: 3)  // Optional
// Enum with associated values
enum Result {
    case success(Int)
    case failure(String)
}
let successResult = Result.success(200)
let failureResult = Result.failure("Not found")
switch successResult {
case .success(let code):
    print("Success with code: \\(code)")
case .failure(let message):
    print("Failed: \\(message)")
}
// Enum with multiple associated values
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
var productCode = Barcode.upc(1, 23, 45, 6)
productCode = .qrCode("ABC123")
// Enum methods
enum TrafficLight {
    case red, yellow, green
    func next() -> TrafficLight {
        switch self {
        case .red: return .green
        case .yellow: return .red
        case .green: return .yellow
        }
    }
}`,
    explanation: 'Enums with associated values allow you to attach additional data to each case. This makes enums perfect for modeling states that have related data.',
    tips: [
      'Use enums when you have a fixed set of related values',
      'Raw values must be unique; associated values can repeat',
      'Enums can have methods and computed properties',
      'Use OptionSet for combinations of enum values',
    ],
    level: 'intermediate',
    order: 6,
  },
  // --- NEW INTERMEDIATE LESSONS ---
  {
    id: 'intermediate-7',
    title: 'Sets',
    description: 'Unique collections of hashable values',
    content: `A set stores distinct values of the same type in a collection with no defined ordering. You can use a set instead of an array when the order of items isn’t important, or when you need to ensure that an item only appears once.`,
    codeExample: `// Creating a Set
var letters = Set<Character>()
letters.insert("a")
letters = ["a", "b", "c"]

// Set Operations
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

oddDigits.union(evenDigits).sorted()
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

oddDigits.intersection(evenDigits).sorted()
// []

oddDigits.subtracting(singleDigitPrimeNumbers).sorted()
// [1, 9]

oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()
// [1, 2, 9]`,
    explanation: 'Sets are highly optimized for membership tests (checking if an item exists). They are faster than arrays for this purpose.',
    tips: [
      'Elements in a Set must be Hashable',
      'Use Sets for uniqueness constraints',
      'Set operations (union, intersection) are powerful for logic',
    ],
    level: 'intermediate',
    order: 7,
  },
  {
    id: 'intermediate-8',
    title: 'Subscripts',
    description: 'Shortcuts for accessing member elements',
    content: `Classes, structures, and enumerations can define subscripts, which are shortcuts for accessing the member elements of a collection, list, or sequence. You use subscripts to set and retrieve values by index without needing separate methods for storage and retrieval.`,
    codeExample: `struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        return multiplier * index
    }
}
let threeTimesTable = TimesTable(multiplier: 3)
print("six times three is \\(threeTimesTable[6])")
// Prints "six times three is 18"

// Subscript on Dictionary extension
extension Dictionary {
    subscript(key: Key, default defaultValue: Value) -> Value {
        get {
            return self[key] ?? defaultValue
        }
    }
}`,
    explanation: 'Subscripts can take any number of input parameters, and these input parameters can be of any type. Subscripts can also use variadic parameters.',
    tips: [
      'Subscripts look like instance methods but use square brackets',
      'You can define multiple subscripts for a single type',
      'Commonly used in Collections',
    ],
    level: 'intermediate',
    order: 8,
  },
  {
    id: 'intermediate-9',
    title: 'Nested Types',
    description: 'Supporting enumerations within classes/structs',
    content: `Swift allows you to define nested types, whereby you nest supporting enumerations, classes, and structures within the definition of the type they support.`,
    codeExample: `struct BlackjackCard {
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }

    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }

    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \\(suit.rawValue),"
        output += " value is \\(rank.values.first)"
        if let second = rank.values.second {
            output += " or \\(second)"
        }
        return output
    }
}

let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
print("theAceOfSpades: \\(theAceOfSpades.description)")`,
    explanation: 'To refer to nested types outside of their definition context, prefix their names with the name of the type they are nested within.',
    tips: [
      'Use nested types to organize code logically',
      'Nested types are not accessible outside the parent unless marked public/internal appropriately',
    ],
    level: 'intermediate',
    order: 9,
  },
  {
    id: 'intermediate-10',
    title: 'Access Control',
    description: 'Restricting access to parts of your code',
    content: `Access control restricts access to parts of your code from code in other source files and modules. This feature enables you to hide the implementation details of your code, and to specify a preferred interface through which that code can be accessed and used.`,
    codeExample: `public class SomePublicClass {}
internal class SomeInternalClass {}
fileprivate class SomeFilePrivateClass {}
private class SomePrivateClass {}

public var somePublicVariable = 0
internal let someInternalConstant = 0
fileprivate func someFilePrivateFunction() {}
private func somePrivateFunction() {}

// Default is internal if not specified`,
    explanation: 'Understanding access control is crucial for building frameworks and modular apps. It prevents unintended usage of internal APIs.',
    tips: [
      'open/public: Accessible from any module',
      'internal: Accessible within the same module (default)',
      'fileprivate: Accessible within the same file',
      'private: Accessible within the enclosing declaration',
    ],
    level: 'intermediate',
    order: 10,
  },

  // ================= ADVANCED LEVEL (Expanded) =================
  {
    id: 'advanced-1',
    title: 'Structs & Classes',
    description: 'Building custom types and understanding differences',
    content: `Structs and classes are both used to create custom types in Swift. While they share many features, they have important differences.
Structs are value types (copied when assigned), while classes are reference types (shared references). This fundamental difference affects how you should use them.`,
    codeExample: `// Struct definition
struct Point {
    var x: Double
    var y: Double
    func distance(to other: Point) -> Double {
        let dx = other.x - x
        let dy = other.y - y
        return sqrt(dx * dx + dy * dy)
    }
}
// Class definition
class Person {
    var name: String
    var age: Int
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func introduce() {
        print("Hi, I'm \\(name) and I'm \\(age)")
    }
}
// Creating instances
let point1 = Point(x: 0, y: 0)
let point2 = Point(x: 3, y: 4)
print("Distance: \\(point1.distance(to: point2))")
let person = Person(name: "Alice", age: 25)
person.introduce()
// Structs: Value type (copy)
var p1 = Point(x: 1, y: 2)
var p2 = p1  // Creates a copy
p2.x = 10    // p1.x is still 1
// Classes: Reference type
let alice = Person(name: "Alice", age: 25)
let bob = alice  // Shares the same reference
bob.age = 26     // alice.age is also 26!
// Struct with initializer
struct Rectangle {
    var width: Double
    var height: Double
    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }

    var area: Double {
        return width * height
    }
}`,
    explanation: 'Swift provides automatic memberwise initializers for structs. Classes require you to define your own init() method. Choose structs for simple data types and classes for more complex objects with inheritance.',
    tips: [
      'Prefer structs over classes for data storage',
      'Use classes when you need reference semantics or inheritance',
      'Structs get automatic memberwise initializers',
      'Classes require explicit initialization',
    ],
    level: 'advanced',
    order: 1,
  },
  {
    id: 'advanced-2',
    title: 'Protocols',
    description: 'Defining blueprints for types',
    content: `Protocols define a blueprint of methods, properties, and other requirements that a type must implement. They are similar to interfaces in other languages.
Protocols enable polymorphism and help you write flexible, reusable code through protocol-oriented programming.`,
    codeExample: `// Basic protocol
protocol Describable {
    var description: String { get }
    func describe() -> String
}
// Protocol implementation
struct Book: Describable {
    let title: String
    let author: String
    var description: String {
        return "\\(title) by \\(author)"
    }

    func describe() -> String {
        return "Book: \\(description)"
    }
}
let book = Book(title: "1984", author: "George Orwell")
print(book.describe())
// Protocol inheritance
protocol Printable: Describable {
    func printInfo()
}
protocol Countable {
    var count: Int { get }
}
// Class conforming to multiple protocols
class Inventory: Printable, Countable {
    var items: [String]
    init(items: [String]) {
        self.items = items
    }

    var description: String {
        return "Inventory with \\(items.count) items"
    }

    var count: Int {
        return items.count
    }

    func describe() -> String {
        return description
    }

    func printInfo() {
        print("Items: \\(items.joined(separator: ", "))")
    }
}
// Protocol extensions
extension String {
    var isCapitalized: Bool {
        return first?.isUppercase == true
    }
}
print("hello".isCapitalized)  // false
print("Hello".isCapitalized)   // true
// Default implementations
protocol Greeting {
    func sayHello()
}
extension Greeting {
    func sayHello() {
        print("Hello!")
    }
}`,
    explanation: 'Protocol extensions allow you to provide default implementations for protocol methods. This is powerful for adding functionality to existing types without modifying their source code.',
    tips: [
      'Protocols enable type-safe polymorphism',
      'Use protocol inheritance for combining protocols',
      'Extensions can add protocol conformance',
      'Protocol compositions allow multiple protocol conformance',
    ],
    level: 'advanced',
    order: 2,
  },
  {
    id: 'advanced-3',
    title: 'Generics',
    description: 'Writing flexible, reusable code',
    content: `Generics enable you to write flexible, reusable functions and types that can work with any type while maintaining type safety.
Generics eliminate code duplication by allowing you to write a single implementation that works with multiple types.`,
    codeExample: `// Generic function
func swap<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}
var x = 5
var y = 10
swap(&x, &y)
print("x: \\(x), y: \\(y)")  // x: 10, y: 5
// Generic struct
struct Stack<Element> {
    private var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }

    mutating func pop() -> Element? {
        return items.popLast()
    }

    var isEmpty: Bool {
        return items.isEmpty
    }

    var count: Int {
        return items.count
    }
}
var intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
intStack.push(3)
print("Stack count: \\(intStack.count)")
var stringStack = Stack<String>()
stringStack.push("Hello")
stringStack.push("World")
// Generic protocol
protocol Container {
    associatedtype Item
    var items: [Item] { get }
    var count: Int { get }
}
// Generic with constraints
func findMax<T: Comparable>(_ items: [T]) -> T? {
    guard !items.isEmpty else { return nil }
    var max = items[0]
    for item in items {
        if item > max {
            max = item
        }
    }
    return max
}
let numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print("Max: \\(findMax(numbers) ?? 0)")
// Where clauses
func allEqual<T: Equatable>(_ items: [T]) -> Bool {
    guard let first = items.first else { return true }
    return items.allSatisfy { $0 == first }
}`,
    explanation: 'Generic constraints (using : or where) allow you to restrict the types that can be used with your generic code. This enables you to require certain capabilities like Comparable or Equatable.',
    tips: [
      'Use generics to reduce code duplication',
      'Constraints restrict what types can be used',
      'associatedtype defines a placeholder type in protocols',
      'Where clauses provide additional type constraints',
    ],
    level: 'advanced',
    order: 3,
  },
  {
    id: 'advanced-4',
    title: 'Error Handling',
    description: 'Handling errors gracefully with do-try-catch',
    content: `Swift provides a powerful error handling mechanism that uses the throws, try, and catch keywords. This allows you to handle errors in a way that's both safe and readable.
Errors in Swift are represented by types that conform to the Error protocol.`,
    codeExample: `// Defining custom errors
enum ValidationError: Error {
    case emptyField
    case invalidEmail
    case tooShort(minLength: Int)
    case tooLong(maxLength: Int)
}
enum NetworkError: Error {
    case noConnection
    case serverError(Int)
    case timeout
}
// Functions that can throw
func validateEmail(_ email: String) throws {
    if email.isEmpty {
        throw ValidationError.emptyField
    }
    if !email.contains("@") {
        throw ValidationError.invalidEmail
    }
}
// Handling errors with do-catch
func processEmail(_ email: String) {
    do {
        try validateEmail(email)
        print("Valid email: \\(email)")
    } catch ValidationError.emptyField {
        print("Email cannot be empty")
    } catch ValidationError.invalidEmail {
        print("Invalid email format")
    } catch ValidationError.tooShort(let min) {
        print("Email too short, minimum \\(min) characters")
    } catch {
        print("Unknown error: \\(error)")
    }
}
// Try? for optional results
let result = try? validateEmail("invalid")
// Try! for force unwrapping (use carefully)
func guaranteedValidation() throws {
    // Only use try! if you're certain it won't throw
}
// Propagating errors
func validateUser(_ email: String, _ password: String) throws {
    try validateEmail(email)
    if password.count < 8 {
        throw ValidationError.tooShort(minLength: 8)
    }
}
// Result type alternative
func fetchUser(id: Int, completion: (Result<String, Error>) -> Void) {
    if id > 0 {
        completion(.success("User\\(id)"))
    } else {
        completion(.failure(ValidationError.invalidEmail))
    }
}
processEmail("test@example.com")`,
    explanation: 'The Result type provides an alternative to try-catch for asynchronous operations or when you want to handle errors explicitly without cascading them through the call stack.',
    tips: [
      'Prefer throwing over force unwrapping',
      'Use specific error types for better error handling',
      'Try? converts throwing functions to Optional',
      'Errors can carry associated values for details',
    ],
    level: 'advanced',
    order: 4,
  },
  {
    id: 'advanced-5',
    title: 'Extensions',
    description: 'Adding functionality to existing types',
    content: 'Extensions allow you to add new functionality to existing types without modifying their original source code. This is one of Swift most powerful features. You can add computed properties, methods, initializers, and protocol conformances to any type using extensions.',
    codeExample: `// Extension on built-in types
extension Int {
    var isEven: Bool {
        return self % 2 == 0
    }
    var isOdd: Bool {
        return !isEven
    }

    func factorial() -> Int {
        if self <= 1 { return 1 }
        return self * (self - 1).factorial()
    }

    func squared() -> Int {
        return self * self
    }
}
print("5! = \\(5.factorial())")  // 120
print("4 is even: \\(4.isEven)")  // true
// Extension on String
extension String {
    var isEmail: Bool {
        return self.contains("@") && self.contains(".")
    }
    var wordCount: Int {
        return self.split(separator: " ").count
    }

    func truncated(to length: Int, trailing: String = "...") -> String {
        if self.count > length {
            return String(self.prefix(length)) + trailing
        }
        return self
    }
}
let text = "Hello, Swift programming!"
print("Word count: \\(text.wordCount)")
// Extension with init
extension Date {
    init(year: Int, month: Int, day: Int) {
        var components = DateComponents()
        components.year = year
        components.month = month
        components.day = day
        self = Calendar.current.date(from: components) ?? Date()
    }
}
let birthday = Date(year: 1990, month: 1, day: 15)
// Protocol extension with default implementation
protocol RandomValue {
    var randomValue: String { get }
}
extension RandomValue where Self == Int {
    var randomValue: String {
        return "Int: \\(Int.random(in: 0...100))"
    }
}
// Adding protocol conformance via extension
protocol PrettyPrintable {
    func prettyPrint() -> String
}
struct User: PrettyPrintable {
    let name: String
    let age: Int
    func prettyPrint() -> String {
        return "User(name: \\(name), age: \\(age))"
    }
}`,
    explanation: 'Extensions cannot add stored properties, but they can add computed properties. They\'re perfect for adding utility methods to existing types without subclassing.',
    tips: [
      'Extensions cannot add stored properties',
      'Use extensions to organize code by feature',
      'Extensions can conform types to protocols',
      'Keep extensions focused and well-organized',
    ],
    level: 'advanced',
    order: 5,
  },
  {
    id: 'advanced-6',
    title: 'Memory Management',
    description: 'Understanding ARC and preventing memory leaks',
    content: `Swift uses Automatic Reference Counting (ARC) to manage memory. Understanding how ARC works is essential for preventing memory leaks and writing efficient code.
Strong reference cycles occur when two objects hold strong references to each other, preventing ARC from deallocating them.`,
    codeExample: `// Strong reference cycle example (DO NOT DO THIS)
class Person {
    let name: String
    var apartment: Apartment?  // Strong reference
    init(name: String) {
        self.name = name
    }

    deinit {
        print("\\(name) is being deallocated")
    }
}
class Apartment {
    let unit: String
    var tenant: Person?  // Strong reference - causes cycle!
    init(unit: String) {
        self.unit = unit
    }

    deinit {
        print("Apartment \\(unit) is being deallocated")
    }
}
// Solution 1: weak references
class PersonWeak {
    let name: String
    var apartment: ApartmentWeak?
    init(name: String) {
        self.name = name
    }
}
class ApartmentWeak {
    let unit: String
    weak var tenant: PersonWeak?  // weak breaks the cycle!
    init(unit: String) {
        self.unit = unit
    }
}
// Solution 2: unowned references
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
}
class CreditCard {
    let number: String
    unowned let customer: Customer  // unowned for guaranteed non-nil
    init(number: String, customer: Customer) {
        self.number = number
        self.customer = customer
    }
}
// Weak vs Unowned
class Employee {
    let name: String
    weak var company: Company? // weak: Optional, becomes nil when deallocated
}
class Company {
    let name: String
    // unowned: Non-optional, assumes always has a value
    unowned let ceo: Employee
}
// Closure strong reference cycles
class ViewController {
    var name = "ViewController"
    var onComplete: (() -> Void)?
    deinit {
        print("\\(name) deallocated")
    }
}
// Capture list to break cycles
extension ViewController {
    func setupCallback() {
        onComplete = { [weak self] in  // weak self breaks cycle
            guard let self = self else { return }
            print("Callback in \\(self.name)")
        }
    }
}`,
    explanation: 'Use weak when the referenced object might become nil (two-way relationships). Use unowned when the referenced object will never become nil (parent-child relationships where the parent outlives the child).',
    tips: [
      'Use weak for optional references that might become nil',
      'Use unowned for non-optional references that won\'t become nil',
      'Always use [weak self] in closure callbacks',
      'Profile your app with Instruments to detect leaks',
    ],
    level: 'advanced',
    order: 6,
  },
  // --- NEW ADVANCED LESSONS ---
  {
    id: 'advanced-7',
    title: 'Concurrency (Async/Await)',
    description: 'Modern asynchronous programming in Swift',
    content: `Swift's concurrency model is built around async/await. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.`,
    codeExample: `// Defining an async function
func fetchUserData() async -> String {
    // Simulate network delay
    try? await Task.sleep(nanoseconds: 1_000_000_000)
    return "User Data"
}

// Calling an async function
Task {
    let data = await fetchUserData()
    print(data)
}

// Async Let (Parallel execution)
func fetchImages() async -> [String] {
    async let img1 = fetchImage(id: 1)
    async let img2 = fetchImage(id: 2)
    
    let images = await [img1, img2]
    return images
}

// Actors (Thread safety)
actor BankAccount {
    let accountNumber: Int
    var balance: Double

    init(accountNumber: Int, balance: Double) {
        self.accountNumber = accountNumber
        self.balance = balance
    }

    func deposit(amount: Double) {
        balance += amount
    }

    func withdraw(amount: Double) -> Bool {
        if amount > balance {
            return false
        }
        balance -= amount
        return true
    }
}`,
    explanation: 'Actors protect mutable state by ensuring that only one task can access their mutable state at a time, preventing data races.',
    tips: [
      'Use async/await instead of completion handlers',
      'Use Task.detached for background work not tied to UI',
      'Actors replace locks and semaphores for thread safety',
      'MainActor ensures code runs on the main thread',
    ],
    level: 'advanced',
    order: 7,
  },
  {
    id: 'advanced-8',
    title: 'Property Wrappers',
    description: 'Managing property access logic',
    content: `A property wrapper adds a layer of separation between code that manages how a property is stored and the code that defines a property. You define a property wrapper by creating a structure, enumeration, or class that defines a wrappedValue property.`,
    codeExample: `@propertyWrapper
struct SmallNumber {
    private var number: Int
    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, 12) }
    }

    init() {
        self.number = 0
    }

    init(wrappedValue: Int) {
        self.number = wrappedValue
    }
}

struct Size {
    @SmallNumber var height: Int
    @SmallNumber var width: Int
}

var size = Size(height: 10, width: 20)
print(size.height) // 10
size.height = 15
print(size.height) // 12 (capped at 12)`,
    explanation: 'Property wrappers are widely used in SwiftUI (@State, @Binding, @ObservedObject) and Combine.',
    tips: [
      'Wrappers encapsulate getter/setter logic',
      'Can have initializers with custom arguments',
      'Essential for SwiftUI state management',
    ],
    level: 'advanced',
    order: 8,
  },
  {
    id: 'advanced-9',
    title: 'Codable (JSON)',
    description: 'Encoding and Decoding data',
    content: `Codable is a type alias for the Encodable and Decodable protocols. When you use Codable as a conformance requirement for a generic type or an instance type, you’re specifying that the type must conform to both Encodable and Decodable.`,
    codeExample: `struct User: Codable {
    var name: String
    var age: Int
    var email: String?
}

// JSON String
let jsonString = """
{
    "name": "John",
    "age": 30,
    "email": "john@example.com"
}
"""

// Decoding
let data = Data(jsonString.utf8)
let decoder = JSONDecoder()
do {
    let user = try decoder.decode(User.self, from: data)
    print(user.name)
} catch {
    print("Decoding failed: \\(error)")
}

// Encoding
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
do {
    let encodedData = try encoder.encode(user)
    if let json = String(data: encodedData, encoding: .utf8) {
        print(json)
    }
} catch {
    print("Encoding failed")
}`,
    explanation: 'Codable automatically synthesizes implementation for structs/classes with standard types. Custom coding keys can be used for different JSON field names.',
    tips: [
      'Conform to Codable to enable JSON serialization',
      'Use CodingKeys enum to map different field names',
      'DateStrategy can be configured on JSONDecoder',
    ],
    level: 'advanced',
    order: 9,
  },
  {
    id: 'advanced-10',
    title: 'Result Builders',
    description: 'Creating DSLs and declarative syntax',
    content: `Result builders transform a sequence of components into a result value. They are the magic behind SwiftUI's view hierarchy syntax.`,
    codeExample: `@resultBuilder
struct ViewBuilder {
    static func buildBlock(_ components: String...) -> String {
        return components.joined(separator: "\\n")
    }
    
    static func buildEither(first component: String) -> String {
        return component
    }
    
    static func buildEither(second component: String) -> String {
        return component
    }
}

func createView(@ViewBuilder builder: () -> String) -> String {
    return builder()
}

let view = createView {
    "Header"
    if true {
        "Content A"
    } else {
        "Content B"
    }
    "Footer"
}
print(view)`,
    explanation: 'Result builders allow you to create domain-specific languages (DSLs) in Swift by transforming block syntax into a structured result.',
    tips: [
      'Used heavily in SwiftUI',
      'Requires implementing static build methods',
      'Enables clean, declarative code structures',
    ],
    level: 'advanced',
    order: 10,
  },
];

export const quizQuestions: QuizQuestion[] = [
  // Beginner Quiz Questions
  {
    id: 'quiz-b1',
    lessonId: 'beginner-1',
    question: 'What function is used to print output in Swift?',
    options: ['echo()', 'print()', 'console.log()', 'printf()'],
    correctAnswer: 1,
    explanation: 'The print() function is used to output text to the console in Swift.',
  },
  {
    id: 'quiz-b2',
    lessonId: 'beginner-2',
    question: 'Which keyword declares a constant in Swift?',
    options: ['var', 'let', 'const', 'final'],
    correctAnswer: 1,
    explanation: 'The "let" keyword declares a constant that cannot be modified after initialization.',
  },
  {
    id: 'quiz-b3',
    lessonId: 'beginner-3',
    question: 'What type would you use to store a decimal number?',
    options: ['Int', 'Double', 'String', 'Bool'],
    correctAnswer: 1,
    explanation: 'Double is used for floating-point (decimal) numbers in Swift.',
  },
  {
    id: 'quiz-b4',
    lessonId: 'beginner-4',
    question: 'What is the result of 17 % 5 in Swift?',
    options: ['3', '2', '3.4', '0'],
    correctAnswer: 1,
    explanation: 'The remainder operator (%) returns 2 because 17 divided by 5 is 3 with remainder 2.',
  },
  {
    id: 'quiz-b5',
    lessonId: 'beginner-5',
    question: 'Which syntax is correct for string interpolation in Swift?',
    options: ['"Hello, $name"', '"Hello, (name)"', '"Hello, \\(name)"', '"Hello, #name#"'],
    correctAnswer: 2,
    explanation: 'String interpolation uses \\(...) syntax: "Hello, \\(name)" embeds the variable value.',
  },
  {
    id: 'quiz-b6',
    lessonId: 'beginner-6',
    question: 'What does the ... operator create in Swift?',
    options: ['Half-open range', 'Closed range', 'Array', 'Optional'],
    correctAnswer: 1,
    explanation: 'The ... operator creates a closed range that includes both endpoints.',
  },
  // New Beginner Quizzes
  {
    id: 'quiz-b7',
    lessonId: 'beginner-7',
    question: 'What is a Tuple?',
    options: ['A loop structure', 'A group of multiple values', 'A function type', 'A class'],
    correctAnswer: 1,
    explanation: 'A tuple groups multiple values into a single compound value.',
  },
  {
    id: 'quiz-b8',
    lessonId: 'beginner-8',
    question: 'What is the purpose of typealias?',
    options: ['To create a new type', 'To rename an existing type', 'To cast variables', 'To delete types'],
    correctAnswer: 1,
    explanation: 'Typealias provides an alternative name for an existing type to improve readability.',
  },
  
  // Intermediate Quiz Questions
  {
    id: 'quiz-i1',
    lessonId: 'intermediate-1',
    question: 'What keyword is used for early return in a guard statement?',
    options: ['exit', 'break', 'return', 'continue'],
    correctAnswer: 2,
    explanation: 'The guard statement uses "return" to exit early when a condition is not met.',
  },
  {
    id: 'quiz-i2',
    lessonId: 'intermediate-2',
    question: 'What does the map function do?',
    options: ['Filters elements', 'Transforms each element', 'Combines elements', 'Sorts elements'],
    correctAnswer: 1,
    explanation: 'The map function transforms each element in a collection and returns a new collection.',
  },
  {
    id: 'quiz-i3',
    lessonId: 'intermediate-3',
    question: 'How do you access a dictionary value that might not exist?',
    options: ['dict["key"]!', 'dict["key"]', 'Both A and B', 'Neither'],
    correctAnswer: 2,
    explanation: 'Accessing dictionary values returns an Optional. You can force unwrap (!) or handle safely.',
  },
  {
    id: 'quiz-i4',
    lessonId: 'intermediate-4',
    question: 'What operator provides a default value for nil optionals?',
    options: ['??', '?:', '&&', '||'],
    correctAnswer: 0,
    explanation: 'The nil coalescing operator (??) returns the right-hand value if the left is nil.',
  },
  {
    id: 'quiz-i5',
    lessonId: 'intermediate-5',
    question: 'What is the shorthand for closure parameter $0?',
    options: ['First parameter', 'Last parameter', 'All parameters', 'Return value'],
    correctAnswer: 0,
    explanation: '$0 refers to the first closure parameter, $1 to the second, and so on.',
  },
  {
    id: 'quiz-i6',
    lessonId: 'intermediate-6',
    question: 'What makes enums more powerful than in other languages?',
    options: ['Case names', 'Raw values', 'Associated values', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Swift enums can have raw values, associated values, methods, and computed properties.',
  },
  // New Intermediate Quizzes
  {
    id: 'quiz-i7',
    lessonId: 'intermediate-7',
    question: 'What is a key characteristic of a Set?',
    options: ['Ordered collection', 'Contains duplicates', 'Unordered and unique', 'Key-Value pairs'],
    correctAnswer: 2,
    explanation: 'Sets are unordered collections of unique values.',
  },
  {
    id: 'quiz-i8',
    lessonId: 'intermediate-10',
    question: 'What is the default access level in Swift?',
    options: ['private', 'public', 'internal', 'open'],
    correctAnswer: 2,
    explanation: 'If not specified, the default access level is internal (accessible within the same module).',
  },

  // Advanced Quiz Questions
  {
    id: 'quiz-a1',
    lessonId: 'advanced-1',
    question: 'What is the key difference between struct and class?',
    options: ['Performance', 'Syntax', 'Value vs Reference type', 'Memory'],
    correctAnswer: 2,
    explanation: 'Structs are value types (copied), classes are reference types (shared references).',
  },
  {
    id: 'quiz-a2',
    lessonId: 'advanced-2',
    question: 'What keyword defines a placeholder type in protocols?',
    options: ['T', 'Any', 'associatedtype', 'Generic'],
    correctAnswer: 2,
    explanation: 'associatedtype declares a placeholder type that must be specified when conforming.',
  },
  {
    id: 'quiz-a3',
    lessonId: 'advanced-3',
    question: 'When should you use generics?',
    options: ['For type safety', 'To reduce code duplication', 'For flexibility', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Generics provide type safety, reduce code duplication, and enable flexible reusable code.',
  },
  {
    id: 'quiz-a4',
    lessonId: 'advanced-4',
    question: 'How do you mark a function that can throw an error?',
    options: ['@throws', 'throws', 'throw', 'error'],
    correctAnswer: 1,
    explanation: 'The "throws" keyword marks a function that can throw errors.',
  },
  {
    id: 'quiz-a5',
    lessonId: 'advanced-5',
    question: 'What cannot be added to types via extension?',
    options: ['Computed properties', 'Methods', 'Stored properties', 'Protocol conformance'],
    correctAnswer: 2,
    explanation: 'Extensions cannot add stored properties, only computed properties and methods.',
  },
  {
    id: 'quiz-a6',
    lessonId: 'advanced-6',
    question: 'When should you use "weak" instead of "unowned"?',
    options: ['For non-optional references', 'When reference might become nil', 'For parent references', 'Never'],
    correctAnswer: 1,
    explanation: 'Use weak when the reference might become nil (deallocated), unowned when it won\'t.',
  },
  // New Advanced Quizzes
  {
    id: 'quiz-a7',
    lessonId: 'advanced-7',
    question: 'What keyword is used to define an asynchronous function?',
    options: ['sync', 'async', 'await', 'thread'],
    correctAnswer: 1,
    explanation: 'The async keyword marks a function as asynchronous.',
  },
  {
    id: 'quiz-a8',
    lessonId: 'advanced-9',
    question: 'Which protocol is used for JSON encoding/decoding?',
    options: ['Serializable', 'JSONable', 'Codable', 'Parseable'],
    correctAnswer: 2,
    explanation: 'Codable is a typealias for Encodable and Decodable, used for JSON serialization.',
  },
];

export const challenges: Challenge[] = [
  {
    id: 'daily-1',
    title: 'Daily Challenge: Hello World',
    description: 'Complete 3 lessons from the Beginner level',
    type: 'daily',
    points: 50,
    completed: false,
  },
  {
    id: 'daily-2',
    title: 'Function Master',
    description: 'Complete all lessons in the Intermediate level',
    type: 'daily',
    points: 100,
    completed: false,
  },
  {
    id: 'weekly-1',
    title: 'Swift Scholar',
    description: 'Complete all lessons and pass all quizzes',
    type: 'weekly',
    points: 500,
    completed: false,
  },
  {
    id: 'special-1',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    type: 'special',
    points: 200,
    completed: false,
  },
  {
    id: 'special-2',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    type: 'special',
    points: 300,
    completed: false,
  },
  {
    id: 'special-3',
    title: 'Code Warrior',
    description: 'Complete all Advanced level lessons',
    type: 'special',
    points: 400,
    completed: false,
  },
  // New Challenges
  {
    id: 'special-4',
    title: 'Async Master',
    description: 'Complete the Concurrency lesson',
    type: 'special',
    points: 150,
    completed: false,
  },
  {
    id: 'special-5',
    title: 'Data Handler',
    description: 'Complete the Codable lesson',
    type: 'special',
    points: 150,
    completed: false,
  },
];

export const motivationalQuotes: MotivationalQuote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "It's not a bug, it's an undocumented feature.", author: "Unknown" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fredericks" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Programs must be written for people to read.", author: "Harold Abelson" },
  { text: "The function of good software is to make the complex appear simple.", author: "Grady Booch" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Learning to write programs stretches your mind, and helps you think better.", author: "Bill Gates" },
  { text: "A language that doesn't affect the way you think about programming is not worth knowing.", author: "Alan Perlis" },
  { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
  { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
  { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
];

export const learningTips: string[] = [
  'Practice coding every day, even if just for 15 minutes',
  'Read Swift code from open source projects',
  'Don\'t just watch tutorials - code along and experiment',
  'Break down complex problems into smaller steps',
  'Use print statements to debug and understand flow',
  'Join Swift communities and ask questions',
  'Review and refactor your old code regularly',
  'Build real projects to reinforce learning',
  'Focus on understanding, not memorizing',
  'Take breaks to let concepts sink in',
  'Teach others what you\'ve learned',
  'Use version control to track your progress',
  'Celebrate small wins to stay motivated',
  'Set specific, achievable learning goals',
  'Don\'t compare yourself to others - everyone learns differently',
];

export const getLessonsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): Lesson[] => {
  return swiftLessons.filter(lesson => lesson.level === level).sort((a, b) => a.order - b.order);
};

export const getQuizQuestionsForLesson = (lessonId: string): QuizQuestion[] => {
  return quizQuestions.filter(question => question.lessonId === lessonId);
};

export const getRandomQuote = (): MotivationalQuote => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

export const getRandomTip = (): string => {
  return learningTips[Math.floor(Math.random() * learningTips.length)];
};
// // Swift Programming Lessons Data
// import { Lesson, QuizQuestion, Challenge, MotivationalQuote } from '../types';

// export const swiftLessons: Lesson[] = [
//   // BEGINNER LEVEL
//   {
//     id: 'beginner-1',
//     title: 'Hello Swift',
//     description: 'Learn to print your first message in Swift',
//     content: `Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch. It's designed to give developers the maximum power and control.

// Swift uses safe programming patterns and adds modern features to make programming easier, more flexible, and more fun.

// The print() function is one of the most basic functions in Swift. It allows you to output text to the console.`,
//     codeExample: `// Your first Swift program
// print("Hello, Swift!")

// // Printing multiple values
// print("Welcome to", "Swift Programming!")

// // Using string interpolation
// let name = "Developer"
// print("Hello, \\(name)!")`,
//     explanation: 'String interpolation allows you to insert variables and expressions into strings using \\(...) syntax. This is one of Swift\'s most useful features!',
//     tips: [
//       'Strings in Swift are wrapped in double quotes',
//       'Use \\\\(*) for string interpolation to embed values',
//       'Print statements end with a newline automatically',
//       'Swift is case-sensitive: print and Print are different',
//     ],
//     level: 'beginner',
//     order: 1,
//   },
//   {
//     id: 'beginner-2',
//     title: 'Variables & Constants',
//     description: 'Understanding var, let, and data types',
//     content: `In Swift, you use variables (var) to store values that can change, and constants (let) for values that should never change.

// Constants are great for values you know won't change, like mathematical constants or configuration values. Using let makes your code safer and more efficient.

// Swift is a type-safe language, meaning it helps you catch type errors during development. However, Swift can often infer types automatically, so you don't always need to specify them explicitly.`,
//     codeExample: `// Variables (can be changed)
// var greeting = "Hello"
// greeting = "Welcome"  // This works!

// // Constants (cannot be changed)
// let pi = 3.14159
// // pi = 3.14  // Error! Cannot modify constant

// // Type annotations
// var age: Int = 25
// var temperature: Double = 98.6
// var isActive: Bool = true
// var initials: String = "AS"

// print("Age: \\(age)")
// print("Pi is approximately: \\(pi)")`,
//     explanation: 'Use let for values that won\'t change to make your code safer and help the compiler optimize. Use var for values that need to be modified.',
//     tips: [
//       'Prefer let over var when possible',
//       'Swift infers types from context',
//       'Use descriptive variable names',
//       'Constants cannot be reassigned after declaration',
//     ],
//     level: 'beginner',
//     order: 2,
//   },
//   {
//     id: 'beginner-3',
//     title: 'Basic Data Types',
//     description: 'Explore Int, Double, String, and Bool',
//     content: `Swift provides several basic data types for storing different kinds of data:

// • Int - Integer numbers (whole numbers)
// • Double - Floating-point numbers (decimal numbers)
// • String - Textual data
// • Bool - Boolean values (true/false)
// • Character - Single characters

// Understanding these types is fundamental to programming in Swift. Each type has specific capabilities and use cases.`,
//     codeExample: `// Integer types
// var integerCount: Int = 42
// let negativeNumber: Int = -17

// // Floating-point types
// var price: Double = 19.99
// let pi: Double = 3.14159265359

// // String types
// var welcomeMessage: String = "Hello, World!"
// let singleChar: Character = "A"

// // Boolean types
// var isLoggedIn: Bool = false
// let hasPermission: Bool = true

// // Type conversion
// let explicitDouble: Double = Double(integerCount)
// let stringNumber: String = String(123)

// print("Count: \\(integerCount)")
// print("Price: $\\(price)")
// print("Logged in: \\(isLoggedIn)")`,
//     explanation: 'Swift requires explicit type conversion between different types. You cannot automatically convert Int to Double, for example.',
//     tips: [
//       'Int can store very large numbers',
//       'Double provides about 15 decimal digits of precision',
//       'Use String interpolation instead of string concatenation',
//       'Bool values are strictly true or false',
//     ],
//     level: 'beginner',
//     order: 3,
//   },
//   {
//     id: 'beginner-4',
//     title: 'Operators',
//     description: 'Arithmetic, comparison, and logical operators',
//     content: `Operators are special symbols used to perform operations on values and variables. Swift supports several types of operators.

// Arithmetic operators: +, -, *, /, %
// Comparison operators: ==, !=, <, >, <=, >=
// Logical operators: &&, ||, !
// Assignment operators: =, +=, -=, *=, /=`,
//     codeExample: `// Arithmetic operators
// let sum = 10 + 5        // 15
// let difference = 10 - 3 // 7
// let product = 4 * 3     // 12
// let quotient = 15 / 4   // 3 (integer division)
// let remainder = 15 % 4 // 3

// // Comparison operators
// let isEqual = (5 == 5)      // true
// let isGreater = (10 > 5)    // true
// let isNotEqual = (3 != 4)   // true

// // Logical operators
// let andResult = true && false  // false
// let orResult = true || false   // true
// let notResult = !true           // false

// // Combined operations
// var counter = 10
// counter += 5    // counter is now 15
// counter *= 2    // counter is now 30

// print("Sum: \\(sum)")
// print("Is 5 equal to 5? \\(isEqual)")`,
//     explanation: 'The remainder operator (%) returns the remainder after division. For example, 15 % 4 equals 3 because 4 goes into 15 three times with a remainder of 3.',
//     tips: [
//       'Integer division truncates the decimal part',
//       'Use parentheses to control order of operations',
//       'Avoid floating-point equality comparisons',
//       'Logical operators short-circuit when possible',
//     ],
//     level: 'beginner',
//     order: 4,
//   },
//   {
//     id: 'beginner-5',
//     title: 'Conditionals',
//     description: 'If statements, else clauses, and else if',
//     content: `Conditional statements allow your code to make decisions based on conditions. The if statement is the most common conditional in programming.

// You can chain multiple conditions using else if, and provide a fallback using else. Swift also supports the ternary operator for simple conditions.`,
//     codeExample: `// Basic if statement
// let temperature = 25

// if temperature > 30 {
//     print("It's very hot!")
// }

// // If-else statement
// let age = 16
// if age >= 18 {
//     print("You are an adult")
// } else {
//     print("You are a minor")
// }

// // Else-if chain
// let score = 85
// if score >= 90 {
//     print("Grade: A")
// } else if score >= 80 {
//     print("Grade: B")
// } else if score >= 70 {
//     print("Grade: C")
// } else {
//     print("Grade: F")
// }

// // Ternary operator
// let status = age >= 18 ? "Adult" : "Minor"
// print("Status: \\(status)")

// // Multiple conditions
// let hasID = true
// let hasTicket = true
// if hasID && hasTicket {
//     print("Welcome to the event!")
// }`,
//     explanation: 'The ternary operator (? : ) is a shorthand for simple if-else statements. It returns one of two values based on a condition.',
//     tips: [
//       'Keep if conditions simple and readable',
//       'Use else-if for multiple mutually exclusive conditions',
//       'Avoid deeply nested if statements',
//       'The ternary operator is useful for simple conditions',
//     ],
//     level: 'beginner',
//     order: 5,
//   },
//   {
//     id: 'beginner-6',
//     title: 'Loops',
//     description: 'For-in loops and while loops',
//     content: `Loops allow you to repeat code multiple times. Swift provides two main types of loops:

// For-in loops: Iterate over sequences (arrays, ranges, strings)
// While loops: Repeat until a condition becomes false
// Repeat-while loops: Execute at least once before checking the condition

// Loops are essential for automating repetitive tasks in your code.`,
//     codeExample: `// For-in loop with range
// for i in 1...5 {
//     print("Count: \\(i)")
// }
// // Output: 1, 2, 3, 4, 5

// // For-in loop with array
// let fruits = ["Apple", "Banana", "Orange"]
// for fruit in fruits {
//     print("I like \\(fruit)")
// }

// // For-in loop with index
// for (index, fruit) in fruits.enumerated() {
//     print("\\(index + 1). \\(fruit)")
// }

// // While loop
// var count = 0
// while count < 3 {
//     print("While count: \\(count)")
//     count += 1
// }

// // Repeat-while loop
// var repeatCount = 0
// repeat {
//     print("Repeat count: \\(repeatCount)")
//     repeatCount += 1
// } while repeatCount < 3

// // Breaking out of loops
// for i in 1...10 {
//     if i == 6 {
//         break
//     }
//     print("Breaking at: \\(i)")
// }`,
//     explanation: 'The ... operator creates a closed range including both endpoints (1...5 means 1, 2, 3, 4, 5). Use ..< for half-open ranges (1..<5 means 1, 2, 3, 4).',
//     tips: [
//       'Use for-in loops when you know the number of iterations',
//       'Use while loops when the number of iterations is unknown',
//       'Use break to exit a loop early',
//       'Use continue to skip to the next iteration',
//     ],
//     level: 'beginner',
//     order: 6,
//   },

//   // INTERMEDIATE LEVEL
//   {
//     id: 'intermediate-1',
//     title: 'Functions',
//     description: 'Creating and calling functions in Swift',
//     content: `Functions are self-contained chunks of code that perform a specific task. They help you organize your code, make it reusable, and easier to read.

// In Swift, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.`,
//     codeExample: `// Basic function
// func greet() {
//     print("Hello, World!")
// }
// greet()  // Calls the function

// // Function with parameter
// func greetPerson(name: String) {
//     print("Hello, \\(name)!")
// }
// greetPerson(name: "Alice")

// // Function with return value
// func add(a: Int, b: Int) -> Int {
//     return a + b
// }
// let sum = add(a: 5, b: 3)
// print("Sum: \\(sum)")

// // Function with multiple return values
// func minMax(numbers: [Int]) -> (min: Int, max: Int) {
//     var min = numbers[0]
//     var max = numbers[0]
//     for number in numbers {
//         if number < min { min = number }
//         if number > max { max = number }
//     }
//     return (min, max)
// }

// let result = minMax(numbers: [3, 1, 4, 1, 5])
// print("Min: \\(result.min), Max: \\(result.max)")`,
//     explanation: 'Functions can return tuples, which allow you to return multiple values from a single function. Tuples are created with parentheses and can have named elements.',
//     tips: [
//       'Name functions with verbs that describe their action',
//       'Use external parameter names for clarity',
//       'Functions can have default parameter values',
//       'You can use _ to omit external parameter names',
//     ],
//     level: 'intermediate',
//     order: 1,
//   },
//   {
//     id: 'intermediate-2',
//     title: 'Arrays',
//     description: 'Working with collections in Swift',
//     content: `Arrays are ordered collections of values of the same type. Swift arrays are type-safe, meaning they can only contain elements of a specific type.

// You can create arrays using brackets [] and access elements using subscript notation starting from index 0.`,
//     codeExample: `// Creating arrays
// var numbers: [Int] = [1, 2, 3, 4, 5]
// let names = ["Alice", "Bob", "Charlie"]
// var mixed: [Any] = [1, "two", 3.0]

// // Accessing elements
// let firstNumber = numbers[0]  // 1
// let lastName = names[2]        // "Charlie"

// // Modifying arrays
// numbers.append(6)         // Add to end
// numbers.insert(0, at: 0)  // Insert at index
// numbers.remove(at: 2)      // Remove at index
// numbers.removeLast()       // Remove last element

// // Array properties
// let count = numbers.count   // Number of elements
// let isEmpty = numbers.isEmpty // Boolean check

// // Iterating over arrays
// for number in numbers {
//     print("Number: \\(number)")
// }

// // Using enumerated
// for (index, number) in numbers.enumerated() {
//     print("Index \\(index): \\(number)")
// }

// // Array methods
// let doubled = numbers.map { $0 * 2 }
// let filtered = numbers.filter { $0 > 3 }
// let summed = numbers.reduce(0) { $0 + $1 }

// print("Doubled: \\(doubled)")
// print("Filtered (>3): \\(filtered)")
// print("Sum: \\(summed)")`,
//     explanation: 'Swift arrays have powerful methods like map, filter, and reduce. These functional programming methods help you transform and analyze collections elegantly.',
//     tips: [
//       'Use map to transform each element',
//       'Use filter to select elements meeting a condition',
//       'Use reduce to combine all elements into one value',
//       'Arrays are zero-indexed in Swift',
//     ],
//     level: 'intermediate',
//     order: 2,
//   },
//   {
//     id: 'intermediate-3',
//     title: 'Dictionaries',
//     description: 'Key-value pairs and data organization',
//     content: `Dictionaries store associations between keys and values, where each key uniquely identifies a value. Unlike arrays, dictionaries are unordered collections.

// Swift dictionaries are type-safe, requiring you to specify the types for both keys and values.`,
//     codeExample: `// Creating dictionaries
// var capitals: [String: String] = [
//     "USA": "Washington D.C.",
//     "France": "Paris",
//     "Japan": "Tokyo"
// ]

// var scores: [String: Int] = [:]
// scores["Alice"] = 95
// scores["Bob"] = 87
// scores["Charlie"] = 92

// // Accessing values
// let capital = capitals["France"]  // Optional<String>
// let capitalUSA = capitals["USA", default: "Unknown"]

// // Modifying dictionaries
// capitals["Germany"] = "Berlin"   // Add new entry
// capitals["Japan"] = "Tokyo"      // Update existing
// capitals.removeValue(forKey: "France")

// // Iterating over dictionaries
// for (country, capital) in capitals {
//     print("\\(country): \\(capital)")
// }

// // Dictionary properties
// let count = capitals.count
// let isEmpty = capitals.isEmpty
// let allCountries = Array(capitals.keys)
// let allCapitals = Array(capitals.values)

// // Useful dictionary methods
// let countries = ["USA", "France", "Japan"]
// let foundCapital = capitals["USA"]  // Optional<String>

// // Merging dictionaries
// var defaults: [String: Any] = ["Theme": "Light"]
// let userPrefs: [String: Any] = ["Theme": "Dark", "FontSize": 14]
// defaults.merge(userPrefs) { (_, new) in new }

// print("Countries: \\(countries)")`,
//     explanation: 'Accessing a dictionary returns an Optional because the key might not exist. Use optional binding or provide a default value to handle this safely.',
//     tips: [
//       'Keys must be Hashable (basic types are by default)',
//       'Values can be any type',
//       'Use updateValue to get the old value when updating',
//       'Dictionaries are unordered - use arrays if order matters',
//     ],
//     level: 'intermediate',
//     order: 3,
//   },
//   {
//     id: 'intermediate-4',
//     title: 'Optionals',
//     description: 'Handling nil values safely',
//     content: `Optionals are Swift's way of handling values that might be nil (no value). This is one of Swift's most powerful features for writing safe code.

// An optional can contain a value, or it can be nil. You must unwrap optionals before using them.`,
//     codeExample: `// Declaring optionals
// var name: String? = "Alice"
// var age: Int? = nil
// let result: String? = nil

// // Force unwrapping (use carefully!)
// let unwrappedName = name!  // "Alice"
// // let crash = age!         // Runtime crash!

// // Optional binding (if-let)
// if let actualName = name {
//     print("Name is \\(actualName)")
// } else {
//     print("Name is nil")
// }

// // Guard statement
// func processName(_ name: String?) {
//     guard let name = name else {
//         print("No name provided")
//         return
//     }
//     print("Hello, \\(name)!")
// }

// // Nil coalescing operator
// let displayName = name ?? "Anonymous"
// let displayAge = age ?? 0

// // Optional chaining
// var user: [String: String?] = [
//     "name": "Alice",
//     "email": nil
// ]
// let email = user["email"] ?? "No email"
// let city = user["city"]?.uppercased() ?? "Unknown"

// // Multiple optional binding
// let optional1: Int? = 5
// let optional2: Int? = 10
// if let val1 = optional1, let val2 = optional2 {
//     print("Sum: \\(val1 + val2)")
// }

// processName(name)`,
//     explanation: 'The guard statement is used to exit early if a condition isn\'t met. It\'s particularly useful for unwrapping optionals in functions, ensuring you only proceed with valid values.',
//     tips: [
//       'Prefer optional binding over force unwrapping',
//       'Use guard for early exit patterns',
//       'Use nil coalescing (??) for default values',
//       'Optional chaining (?.) safely accesses nested optionals',
//     ],
//     level: 'intermediate',
//     order: 4,
//   },
//   {
//     id: 'intermediate-5',
//     title: 'Closures',
//     description: 'Anonymous functions and closure expressions',
//     content: `Closures are self-contained blocks of functionality that can be passed around and used in your code. They are similar to lambdas in other languages.

// Swift closures can capture and store references to variables from the surrounding context.`,
//     codeExample: `// Basic closure syntax
// let greet = { (name: String) in
//     print("Hello, \\(name)!")
// }
// greet("World")

// // Closure as function parameter
// func performOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
//     return operation(a, b)
// }

// let add = performOperation(5, 3) { $0 + $1 }
// let multiply = performOperation(5, 3) { $0 * $1 }
// print("Add: \\(add), Multiply: \\(multiply)")

// // Sorted closure
// let names = ["Charlie", "Alice", "Bob"]
// let sorted = names.sorted { $0 > $1 }
// print("Sorted: \\(sorted)")

// // Trailing closure syntax
// let numbers = [1, 2, 3, 4, 5]
// let doubled = numbers.map { $0 * 2 }
// let evens = numbers.filter { $0 % 2 == 0 }
// let sum = numbers.reduce(0) { $0 + $1 }

// // Escaping closures
// var completionHandlers: [() -> Void] = []
// func withEscapingClosure(completion: @escaping () -> Void) {
//     completionHandlers.append(completion)
// }

// // Autoclosures
// var customersInLine = ["Alice", "Bob", "Charlie"]
// let customerProvider = { customersInLine.remove(at: 0) }
// print("Now serving: \\(customerProvider())")

// // Closure capture values
// func makeCounter() -> () -> Int {
//     var count = 0
//     return {
//         count += 1
//         return count
//     }
// }
// let counter = makeCounter()
// print(counter())  // 1
// print(counter())  // 2
// print(counter())  // 3`,
//     explanation: 'Closures capture values from their surrounding context, which allows them to maintain state. This is useful for creating function factories and callbacks.',
//     tips: [
//       'Use $0, $1, etc. for shorthand argument names',
//       'Trailing closures improve readability',
//       'Closures are reference types',
//       'Use @escaping for closures stored for later execution',
//     ],
//     level: 'intermediate',
//     order: 5,
//   },
//   {
//     id: 'intermediate-6',
//     title: 'Enumerations',
//     description: 'Creating custom types with enum',
//     content: `Enumerations (enums) define a common type for a group of related values. They make your code more type-safe and easier to read.

// Swift enums can have associated values and computed properties, making them more powerful than enums in many other languages.`,
//     codeExample: `// Basic enum
// enum Direction {
//     case north
//     case south
//     case east
//     case west
// }

// var direction = Direction.north
// direction = .east  // Type inference

// // Switch with enums
// switch direction {
// case .north:
//     print("Going north")
// case .south:
//     print("Going south")
// case .east:
//     print("Going east")
// case .west:
//     print("Going west")
// }

// // Enum with raw values
// enum Planet: Int {
//     case mercury = 1
//     case venus = 2
//     case earth = 3
//     case mars = 4
// }
// let earth = Planet(rawValue: 3)  // Optional<Planet>

// // Enum with associated values
// enum Result {
//     case success(Int)
//     case failure(String)
// }

// let successResult = Result.success(200)
// let failureResult = Result.failure("Not found")

// switch successResult {
// case .success(let code):
//     print("Success with code: \\(code)")
// case .failure(let message):
//     print("Failed: \\(message)")
// }

// // Enum with multiple associated values
// enum Barcode {
//     case upc(Int, Int, Int, Int)
//     case qrCode(String)
// }

// var productCode = Barcode.upc(1, 23, 45, 6)
// productCode = .qrCode("ABC123")

// // Enum methods
// enum TrafficLight {
//     case red, yellow, green

//     func next() -> TrafficLight {
//         switch self {
//         case .red: return .green
//         case .yellow: return .red
//         case .green: return .yellow
//         }
//     }
// }`,
//     explanation: 'Enums with associated values allow you to attach additional data to each case. This makes enums perfect for modeling states that have related data.',
//     tips: [
//       'Use enums when you have a fixed set of related values',
//       'Raw values must be unique; associated values can repeat',
//       'Enums can have methods and computed properties',
//       'Use OptionSet for combinations of enum values',
//     ],
//     level: 'intermediate',
//     order: 6,
//   },

//   // ADVANCED LEVEL
//   {
//     id: 'advanced-1',
//     title: 'Structs & Classes',
//     description: 'Building custom types and understanding differences',
//     content: `Structs and classes are both used to create custom types in Swift. While they share many features, they have important differences.

// Structs are value types (copied when assigned), while classes are reference types (shared references). This fundamental difference affects how you should use them.`,
//     codeExample: `// Struct definition
// struct Point {
//     var x: Double
//     var y: Double

//     func distance(to other: Point) -> Double {
//         let dx = other.x - x
//         let dy = other.y - y
//         return sqrt(dx * dx + dy * dy)
//     }
// }

// // Class definition
// class Person {
//     var name: String
//     var age: Int

//     init(name: String, age: Int) {
//         self.name = name
//         self.age = age
//     }

//     func introduce() {
//         print("Hi, I'm \\(name) and I'm \\(age)")
//     }
// }

// // Creating instances
// let point1 = Point(x: 0, y: 0)
// let point2 = Point(x: 3, y: 4)
// print("Distance: \\(point1.distance(to: point2))")

// let person = Person(name: "Alice", age: 25)
// person.introduce()

// // Structs: Value type (copy)
// var p1 = Point(x: 1, y: 2)
// var p2 = p1  // Creates a copy
// p2.x = 10    // p1.x is still 1

// // Classes: Reference type
// let alice = Person(name: "Alice", age: 25)
// let bob = alice  // Shares the same reference
// bob.age = 26     // alice.age is also 26!

// // Struct with initializer
// struct Rectangle {
//     var width: Double
//     var height: Double

//     init(width: Double, height: Double) {
//         self.width = width
//         self.height = height
//     }

//     var area: Double {
//         return width * height
//     }
// }`,
//     explanation: 'Swift provides automatic memberwise initializers for structs. Classes require you to define your own init() method. Choose structs for simple data types and classes for more complex objects with inheritance.',
//     tips: [
//       'Prefer structs over classes for data storage',
//       'Use classes when you need reference semantics or inheritance',
//       'Structs get automatic memberwise initializers',
//       'Classes require explicit initialization',
//     ],
//     level: 'advanced',
//     order: 1,
//   },
//   {
//     id: 'advanced-2',
//     title: 'Protocols',
//     description: 'Defining blueprints for types',
//     content: `Protocols define a blueprint of methods, properties, and other requirements that a type must implement. They are similar to interfaces in other languages.

// Protocols enable polymorphism and help you write flexible, reusable code through protocol-oriented programming.`,
//     codeExample: `// Basic protocol
// protocol Describable {
//     var description: String { get }
//     func describe() -> String
// }

// // Protocol implementation
// struct Book: Describable {
//     let title: String
//     let author: String

//     var description: String {
//         return "\\(title) by \\(author)"
//     }

//     func describe() -> String {
//         return "Book: \\(description)"
//     }
// }

// let book = Book(title: "1984", author: "George Orwell")
// print(book.describe())

// // Protocol inheritance
// protocol Printable: Describable {
//     func printInfo()
// }

// protocol Countable {
//     var count: Int { get }
// }

// // Class conforming to multiple protocols
// class Inventory: Printable, Countable {
//     var items: [String]

//     init(items: [String]) {
//         self.items = items
//     }

//     var description: String {
//         return "Inventory with \\(items.count) items"
//     }

//     var count: Int {
//         return items.count
//     }

//     func describe() -> String {
//         return description
//     }

//     func printInfo() {
//         print("Items: \\(items.joined(separator: ", "))")
//     }
// }

// // Protocol extensions
// extension String {
//     var isCapitalized: Bool {
//         return first?.isUppercase == true
//     }
// }

// print("hello".isCapitalized)  // false
// print("Hello".isCapitalized)   // true

// // Default implementations
// protocol Greeting {
//     func sayHello()
// }

// extension Greeting {
//     func sayHello() {
//         print("Hello!")
//     }
// }`,
//     explanation: 'Protocol extensions allow you to provide default implementations for protocol methods. This is powerful for adding functionality to existing types without modifying their source code.',
//     tips: [
//       'Protocols enable type-safe polymorphism',
//       'Use protocol inheritance for combining protocols',
//       'Extensions can add protocol conformance',
//       'Protocol compositions allow multiple protocol conformance',
//     ],
//     level: 'advanced',
//     order: 2,
//   },
//   {
//     id: 'advanced-3',
//     title: 'Generics',
//     description: 'Writing flexible, reusable code',
//     content: `Generics enable you to write flexible, reusable functions and types that can work with any type while maintaining type safety.

// Generics eliminate code duplication by allowing you to write a single implementation that works with multiple types.`,
//     codeExample: `// Generic function
// func swap<T>(_ a: inout T, _ b: inout T) {
//     let temp = a
//     a = b
//     b = temp
// }

// var x = 5
// var y = 10
// swap(&x, &y)
// print("x: \\(x), y: \\(y)")  // x: 10, y: 5

// // Generic struct
// struct Stack<T> {
//     private var items: [T] = []

//     mutating func push(_ item: T) {
//         items.append(item)
//     }

//     mutating func pop() -> T? {
//         return items.popLast()
//     }

//     var isEmpty: Bool {
//         return items.isEmpty
//     }

//     var count: Int {
//         return items.count
//     }
// }

// var intStack = Stack<Int>()
// intStack.push(1)
// intStack.push(2)
// intStack.push(3)
// print("Stack count: \\(intStack.count)")

// var stringStack = Stack<String>()
// stringStack.push("Hello")
// stringStack.push("World")

// // Generic protocol
// protocol Container {
//     associatedtype Item
//     var items: [Item] { get }
//     var count: Int { get }
// }

// // Generic with constraints
// func findMax<T: Comparable>(_ items: [T]) -> T? {
//     guard !items.isEmpty else { return nil }
//     var max = items[0]
//     for item in items {
//         if item > max {
//             max = item
//         }
//     }
//     return max
// }

// let numbers = [3, 1, 4, 1, 5, 9, 2, 6]
// print("Max: \\(findMax(numbers) ?? 0)")

// // Where clauses
// func allEqual<T: Equatable>(_ items: [T]) -> Bool {
//     guard let first = items.first else { return true }
//     return items.allSatisfy { $0 == first }
// }`,
//     explanation: 'Generic constraints (using : or where) allow you to restrict the types that can be used with your generic code. This enables you to require certain capabilities like Comparable or Equatable.',
//     tips: [
//       'Use generics to reduce code duplication',
//       'Constraints restrict what types can be used',
//       'associatedtype defines a placeholder type in protocols',
//       'Where clauses provide additional type constraints',
//     ],
//     level: 'advanced',
//     order: 3,
//   },
//   {
//     id: 'advanced-4',
//     title: 'Error Handling',
//     description: 'Handling errors gracefully with do-try-catch',
//     content: `Swift provides a powerful error handling mechanism that uses the throws, try, and catch keywords. This allows you to handle errors in a way that\'s both safe and readable.

// Errors in Swift are represented by types that conform to the Error protocol.`,
//     codeExample: `// Defining custom errors
// enum ValidationError: Error {
//     case emptyField
//     case invalidEmail
//     case tooShort(minLength: Int)
//     case tooLong(maxLength: Int)
// }

// enum NetworkError: Error {
//     case noConnection
//     case serverError(Int)
//     case timeout
// }

// // Functions that can throw
// func validateEmail(_ email: String) throws {
//     if email.isEmpty {
//         throw ValidationError.emptyField
//     }
//     if !email.contains("@") {
//         throw ValidationError.invalidEmail
//     }
// }

// // Handling errors with do-catch
// func processEmail(_ email: String) {
//     do {
//         try validateEmail(email)
//         print("Valid email: \\(email)")
//     } catch ValidationError.emptyField {
//         print("Email cannot be empty")
//     } catch ValidationError.invalidEmail {
//         print("Invalid email format")
//     } catch ValidationError.tooShort(let min) {
//         print("Email too short, minimum \\(min) characters")
//     } catch {
//         print("Unknown error: \\(error)")
//     }
// }

// // Try? for optional results
// let result = try? validateEmail("invalid")

// // Try! for force unwrapping (use carefully)
// func guaranteedValidation() throws {
//     // Only use try! if you're certain it won't throw
// }

// // Propagating errors
// func validateUser(_ email: String, _ password: String) throws {
//     try validateEmail(email)
//     if password.count < 8 {
//         throw ValidationError.tooShort(minLength: 8)
//     }
// }

// // Result type alternative
// func fetchUser(id: Int, completion: (Result<String, Error>) -> Void) {
//     if id > 0 {
//         completion(.success("User\\(id)"))
//     } else {
//         completion(.failure(ValidationError.invalidEmail))
//     }
// }

// processEmail("test@example.com")`,
//     explanation: 'The Result type provides an alternative to try-catch for asynchronous operations or when you want to handle errors explicitly without cascading them through the call stack.',
//     tips: [
//       'Prefer throwing over force unwrapping',
//       'Use specific error types for better error handling',
//       'Try? converts throwing functions to Optional',
//       'Errors can carry associated values for details',
//     ],
//     level: 'advanced',
//     order: 4,
//   },
//   {
//     id: 'advanced-5',
//     title: 'Extensions',
//     description: 'Adding functionality to existing types',
//     content: 'Extensions allow you to add new functionality to existing types without modifying their original source code. This is one of Swift most powerful features. You can add computed properties, methods, initializers, and protocol conformances to any type using extensions.',
//     codeExample: `// Extension on built-in types
// extension Int {
//     var isEven: Bool {
//         return self % 2 == 0
//     }

//     var isOdd: Bool {
//         return !isEven
//     }

//     func factorial() -> Int {
//         if self <= 1 { return 1 }
//         return self * (self - 1).factorial()
//     }

//     func squared() -> Int {
//         return self * self
//     }
// }

// print("5! = \\(5.factorial())")  // 120
// print("4 is even: \\(4.isEven)")  // true

// // Extension on String
// extension String {
//     var isEmail: Bool {
//         return self.contains("@") && self.contains(".")
//     }

//     var wordCount: Int {
//         return self.split(separator: " ").count
//     }

//     func truncated(to length: Int, trailing: String = "...") -> String {
//         if self.count > length {
//             return String(self.prefix(length)) + trailing
//         }
//         return self
//     }
// }

// let text = "Hello, Swift programming!"
// print("Word count: \\(text.wordCount)")

// // Extension with init
// extension Date {
//     init(year: Int, month: Int, day: Int) {
//         var components = DateComponents()
//         components.year = year
//         components.month = month
//         components.day = day
//         self = Calendar.current.date(from: components) ?? Date()
//     }
// }

// let birthday = Date(year: 1990, month: 1, day: 15)

// // Protocol extension with default implementation
// protocol RandomValue {
//     var randomValue: String { get }
// }

// extension RandomValue where Self == Int {
//     var randomValue: String {
//         return "Int: \\(Int.random(in: 0...100))"
//     }
// }

// // Adding protocol conformance via extension
// protocol PrettyPrintable {
//     func prettyPrint() -> String
// }

// struct User: PrettyPrintable {
//     let name: String
//     let age: Int

//     func prettyPrint() -> String {
//         return "User(name: \\(name), age: \\(age))"
//     }
// }`,
//     explanation: 'Extensions cannot add stored properties, but they can add computed properties. They\'re perfect for adding utility methods to existing types without subclassing.',
//     tips: [
//       'Extensions cannot add stored properties',
//       'Use extensions to organize code by feature',
//       'Extensions can conform types to protocols',
//       'Keep extensions focused and well-organized',
//     ],
//     level: 'advanced',
//     order: 5,
//   },
//   {
//     id: 'advanced-6',
//     title: 'Memory Management',
//     description: 'Understanding ARC and preventing memory leaks',
//     content: `Swift uses Automatic Reference Counting (ARC) to manage memory. Understanding how ARC works is essential for preventing memory leaks and writing efficient code.

// Strong reference cycles occur when two objects hold strong references to each other, preventing ARC from deallocating them.`,
//     codeExample: `// Strong reference cycle example (DO NOT DO THIS)
// class Person {
//     let name: String
//     var apartment: Apartment?  // Strong reference

//     init(name: String) {
//         self.name = name
//     }

//     deinit {
//         print("\\(name) is being deallocated")
//     }
// }

// class Apartment {
//     let unit: String
//     var tenant: Person?  // Strong reference - causes cycle!

//     init(unit: String) {
//         self.unit = unit
//     }

//     deinit {
//         print("Apartment \\(unit) is being deallocated")
//     }
// }

// // Solution 1: weak references
// class PersonWeak {
//     let name: String
//     var apartment: ApartmentWeak?

//     init(name: String) {
//         self.name = name
//     }
// }

// class ApartmentWeak {
//     let unit: String
//     weak var tenant: PersonWeak?  // weak breaks the cycle!

//     init(unit: String) {
//         self.unit = unit
//     }
// }

// // Solution 2: unowned references
// class Customer {
//     let name: String
//     var card: CreditCard?

//     init(name: String) {
//         self.name = name
//     }
// }

// class CreditCard {
//     let number: String
//     unowned let customer: Customer  // unowned for guaranteed non-nil

//     init(number: String, customer: Customer) {
//         self.number = number
//         self.customer = customer
//     }
// }

// // Weak vs Unowned
// class Employee {
//     let name: String
//     weak var company: Company? // weak: Optional, becomes nil when deallocated
// }

// class Company {
//     let name: String
//     // unowned: Non-optional, assumes always has a value
//     unowned let ceo: Employee
// }

// // Closure strong reference cycles
// class ViewController {
//     var name = "ViewController"
//     var onComplete: (() -> Void)?

//     deinit {
//         print("\\(name) deallocated")
//     }
// }

// // Capture list to break cycles
// extension ViewController {
//     func setupCallback() {
//         onComplete = { [weak self] in  // weak self breaks cycle
//             guard let self = self else { return }
//             print("Callback in \\(self.name)")
//         }
//     }
// }`,
//     explanation: 'Use weak when the referenced object might become nil (two-way relationships). Use unowned when the referenced object will never become nil (parent-child relationships where the parent outlives the child).',
//     tips: [
//       'Use weak for optional references that might become nil',
//       'Use unowned for non-optional references that won\'t become nil',
//       'Always use [weak self] in closure callbacks',
//       'Profile your app with Instruments to detect leaks',
//     ],
//     level: 'advanced',
//     order: 6,
//   },
// ];

// export const quizQuestions: QuizQuestion[] = [
//   // Beginner Quiz Questions
//   {
//     id: 'quiz-b1',
//     lessonId: 'beginner-1',
//     question: 'What function is used to print output in Swift?',
//     options: ['echo()', 'print()', 'console.log()', 'printf()'],
//     correctAnswer: 1,
//     explanation: 'The print() function is used to output text to the console in Swift.',
//   },
//   {
//     id: 'quiz-b2',
//     lessonId: 'beginner-2',
//     question: 'Which keyword declares a constant in Swift?',
//     options: ['var', 'let', 'const', 'final'],
//     correctAnswer: 1,
//     explanation: 'The "let" keyword declares a constant that cannot be modified after initialization.',
//   },
//   {
//     id: 'quiz-b3',
//     lessonId: 'beginner-3',
//     question: 'What type would you use to store a decimal number?',
//     options: ['Int', 'Double', 'String', 'Bool'],
//     correctAnswer: 1,
//     explanation: 'Double is used for floating-point (decimal) numbers in Swift.',
//   },
//   {
//     id: 'quiz-b4',
//     lessonId: 'beginner-4',
//     question: 'What is the result of 17 % 5 in Swift?',
//     options: ['3', '2', '3.4', '0'],
//     correctAnswer: 1,
//     explanation: 'The remainder operator (%) returns 2 because 17 divided by 5 is 3 with remainder 2.',
//   },
//   {
//     id: 'quiz-b5',
//     lessonId: 'beginner-5',
//     question: 'Which syntax is correct for string interpolation in Swift?',
//     options: ['"Hello, $name"', '"Hello, (name)"', '"Hello, \\(name)"', '"Hello, #name#"'],
//     correctAnswer: 2,
//     explanation: 'String interpolation uses \\(...) syntax: "Hello, \\(name)" embeds the variable value.',
//   },
//   {
//     id: 'quiz-b6',
//     lessonId: 'beginner-6',
//     question: 'What does the ... operator create in Swift?',
//     options: ['Half-open range', 'Closed range', 'Array', 'Optional'],
//     correctAnswer: 1,
//     explanation: 'The ... operator creates a closed range that includes both endpoints.',
//   },
//   // Intermediate Quiz Questions
//   {
//     id: 'quiz-i1',
//     lessonId: 'intermediate-1',
//     question: 'What keyword is used for early return in a guard statement?',
//     options: ['exit', 'break', 'return', 'continue'],
//     correctAnswer: 2,
//     explanation: 'The guard statement uses "return" to exit early when a condition is not met.',
//   },
//   {
//     id: 'quiz-i2',
//     lessonId: 'intermediate-2',
//     question: 'What does the map function do?',
//     options: ['Filters elements', 'Transforms each element', 'Combines elements', 'Sorts elements'],
//     correctAnswer: 1,
//     explanation: 'The map function transforms each element in a collection and returns a new collection.',
//   },
//   {
//     id: 'quiz-i3',
//     lessonId: 'intermediate-3',
//     question: 'How do you access a dictionary value that might not exist?',
//     options: ['dict["key"]!', 'dict["key"]', 'Both A and B', 'Neither'],
//     correctAnswer: 2,
//     explanation: 'Accessing dictionary values returns an Optional. You can force unwrap (!) or handle safely.',
//   },
//   {
//     id: 'quiz-i4',
//     lessonId: 'intermediate-4',
//     question: 'What operator provides a default value for nil optionals?',
//     options: ['??', '?:', '&&', '||'],
//     correctAnswer: 0,
//     explanation: 'The nil coalescing operator (??) returns the right-hand value if the left is nil.',
//   },
//   {
//     id: 'quiz-i5',
//     lessonId: 'intermediate-5',
//     question: 'What is the shorthand for closure parameter $0?',
//     options: ['First parameter', 'Last parameter', 'All parameters', 'Return value'],
//     correctAnswer: 0,
//     explanation: '$0 refers to the first closure parameter, $1 to the second, and so on.',
//   },
//   {
//     id: 'quiz-i6',
//     lessonId: 'intermediate-6',
//     question: 'What makes enums more powerful than in other languages?',
//     options: ['Case names', 'Raw values', 'Associated values', 'All of the above'],
//     correctAnswer: 3,
//     explanation: 'Swift enums can have raw values, associated values, methods, and computed properties.',
//   },
//   // Advanced Quiz Questions
//   {
//     id: 'quiz-a1',
//     lessonId: 'advanced-1',
//     question: 'What is the key difference between struct and class?',
//     options: ['Performance', 'Syntax', 'Value vs Reference type', 'Memory'],
//     correctAnswer: 2,
//     explanation: 'Structs are value types (copied), classes are reference types (shared references).',
//   },
//   {
//     id: 'quiz-a2',
//     lessonId: 'advanced-2',
//     question: 'What keyword defines a placeholder type in protocols?',
//     options: ['T', 'Any', 'associatedtype', 'Generic'],
//     correctAnswer: 2,
//     explanation: 'associatedtype declares a placeholder type that must be specified when conforming.',
//   },
//   {
//     id: 'quiz-a3',
//     lessonId: 'advanced-3',
//     question: 'When should you use generics?',
//     options: ['For type safety', 'To reduce code duplication', 'For flexibility', 'All of the above'],
//     correctAnswer: 3,
//     explanation: 'Generics provide type safety, reduce code duplication, and enable flexible reusable code.',
//   },
//   {
//     id: 'quiz-a4',
//     lessonId: 'advanced-4',
//     question: 'How do you mark a function that can throw an error?',
//     options: ['@throws', 'throws', 'throw', 'error'],
//     correctAnswer: 1,
//     explanation: 'The "throws" keyword marks a function that can throw errors.',
//   },
//   {
//     id: 'quiz-a5',
//     lessonId: 'advanced-5',
//     question: 'What cannot be added to types via extension?',
//     options: ['Computed properties', 'Methods', 'Stored properties', 'Protocol conformance'],
//     correctAnswer: 2,
//     explanation: 'Extensions cannot add stored properties, only computed properties and methods.',
//   },
//   {
//     id: 'quiz-a6',
//     lessonId: 'advanced-6',
//     question: 'When should you use "weak" instead of "unowned"?',
//     options: ['For non-optional references', 'When reference might become nil', 'For parent references', 'Never'],
//     correctAnswer: 1,
//     explanation: 'Use weak when the reference might become nil (deallocated), unowned when it won\'t.',
//   },
// ];

// export const challenges: Challenge[] = [
//   {
//     id: 'daily-1',
//     title: 'Daily Challenge: Hello World',
//     description: 'Complete 3 lessons from the Beginner level',
//     type: 'daily',
//     points: 50,
//     completed: false,
//   },
//   {
//     id: 'daily-2',
//     title: 'Function Master',
//     description: 'Complete all lessons in the Intermediate level',
//     type: 'daily',
//     points: 100,
//     completed: false,
//   },
//   {
//     id: 'weekly-1',
//     title: 'Swift Scholar',
//     description: 'Complete all lessons and pass all quizzes',
//     type: 'weekly',
//     points: 500,
//     completed: false,
//   },
//   {
//     id: 'special-1',
//     title: 'Perfect Score',
//     description: 'Get 100% on any quiz',
//     type: 'special',
//     points: 200,
//     completed: false,
//   },
//   {
//     id: 'special-2',
//     title: 'Streak Master',
//     description: 'Maintain a 7-day learning streak',
//     type: 'special',
//     points: 300,
//     completed: false,
//   },
//   {
//     id: 'special-3',
//     title: 'Code Warrior',
//     description: 'Complete all Advanced level lessons',
//     type: 'special',
//     points: 400,
//     completed: false,
//   },
// ];

// export const motivationalQuotes: MotivationalQuote[] = [
//   { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
//   { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
//   { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
//   { text: "It's not a bug, it's an undocumented feature.", author: "Unknown" },
//   { text: "The best error message is the one that never shows up.", author: "Thomas Fredericks" },
//   { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
//   { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
//   { text: "Programs must be written for people to read.", author: "Harold Abelson" },
//   { text: "The function of good software is to make the complex appear simple.", author: "Grady Booch" },
//   { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
//   { text: "Learning to write programs stretches your mind, and helps you think better.", author: "Bill Gates" },
//   { text: "A language that doesn't affect the way you think about programming is not worth knowing.", author: "Alan Perlis" },
//   { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
//   { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
//   { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
// ];

// export const learningTips: string[] = [
//   'Practice coding every day, even if just for 15 minutes',
//   'Read Swift code from open source projects',
//   'Don\'t just watch tutorials - code along and experiment',
//   'Break down complex problems into smaller steps',
//   'Use print statements to debug and understand flow',
//   'Join Swift communities and ask questions',
//   'Review and refactor your old code regularly',
//   'Build real projects to reinforce learning',
//   'Focus on understanding, not memorizing',
//   'Take breaks to let concepts sink in',
//   'Teach others what you\'ve learned',
//   'Use version control to track your progress',
//   'Celebrate small wins to stay motivated',
//   'Set specific, achievable learning goals',
//   'Don\'t compare yourself to others - everyone learns differently',
// ];

// export const getLessonsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): Lesson[] => {
//   return swiftLessons.filter(lesson => lesson.level === level).sort((a, b) => a.order - b.order);
// };

// export const getQuizQuestionsForLesson = (lessonId: string): QuizQuestion[] => {
//   return quizQuestions.filter(question => question.lessonId === lessonId);
// };

// export const getRandomQuote = (): MotivationalQuote => {
//   return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
// };

// export const getRandomTip = (): string => {
//   return learningTips[Math.floor(Math.random() * learningTips.length)];
// };
