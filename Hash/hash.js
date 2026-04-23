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




}

const test = new HashMap() 

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.remove('apple')


