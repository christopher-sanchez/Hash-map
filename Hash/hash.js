class HashMap {
constructor(initalCapacity=16,loadFactor = 0.75 ){
    this.capacity = initalCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(()=>[]);
    this.size = 0;

}

 hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
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
        this.resize();
    }
}



}

