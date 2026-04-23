export class HashMap {
constructor(initalCapacity=16,loadFactor = 0.75 ){
    this.capacity = initalCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

}

 hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode % this.capacity;
} 
set(key,value){
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for(let pair of bucket){
        if(pair[0]=== key){
            pair[1] = value;
            return;
        }
    }
    bucket.push([key,value]);
    this.size++;
    if(this.size / this.capacity > this.loadFactor){
        this._resize();
    }
}
get(key){
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for(let pair of bucket){
        if(pair[0] === key) return pair[1];
    }
    return null;
}
has(key){
    return this.get(key) !== null;
}
remove(key){
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for(let i = 0; i < bucket.length; i++){
        if (bucket[i][0]=== key){
            bucket.splice(i,1);
            this.size--;
            return true;

        }
    }
    return false;
}

length(){
    return this.size;
}

clear(){
    this.buckets = new Array(this.capacity).fill(null).map(()=> []);
    this.size = 0;
}

keys(){
    const keys = [];
    for (let bucket of this.buckets){
        for (let pair of bucket) keys.push(pair[0]);
    }
    return keys;
}

values(){
    const values =[];
    for(let bucket of this.buckets){
        for(let pair of bucket) values.push(pair[1]);
    }
    return values;
}

entries(){
    const entries = [];
    for(let bucket of this.buckets){
        for(let pair of bucket) entries.push([pair[0], pair[1]]);
    }
    return entries;
}

_resize(){
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(()=>[]);
    this.size = 0;

    for(let bucket of oldBuckets){
        for(let [key, value] of bucket){
            this.set(key, value);
        }
    }
}




}


const test = new HashMap();

console.log("=== SET & GET ===");
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");

console.log(test.get("apple"));     
console.log(test.get("banana"));    
console.log(test.get("carrot"));   
console.log(test.get("missing"));  


console.log("\n=== HAS ===");
console.log(test.has("apple"));    
console.log(test.has("banana"));   
console.log(test.has("missing"));  



console.log("\n=== UPDATE EXISTING KEY ===");
test.set("apple", "green");
console.log(test.get("apple"));    



console.log("\n=== REMOVE ===");
console.log(test.remove("banana")); 
console.log(test.has("banana"));    
console.log(test.remove("banana")); 



console.log("\n=== LENGTH ===");
console.log(test.length());   

console.log("\n=== KEYS ===");
console.log(test.keys()); 



console.log("\n=== VALUES ===");
console.log(test.values());      


console.log("\n=== ENTRIES ===");
console.log(test.entries());       


console.log("\n=== CLEAR ===");
test.clear();
console.log(test.length());         
console.log(test.keys());          
console.log(test.values());        


console.log("\n=== RESIZE TEST ===");
const resizeTest = new HashMap();

for (let i = 1; i <= 20; i++) {
  resizeTest.set("key" + i, "value" + i);
}

console.log("Capacity after inserts:", resizeTest.capacity);


console.log("Length:", resizeTest.length());


console.log("Check a few values:");
console.log(resizeTest.get("key1")); 
console.log(resizeTest.get("key10")); 
console.log(resizeTest.get("key20"));  

