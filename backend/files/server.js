function print(){
  const array = [1,2,3,4,5];

  for (let item in array){
    console.log(`item: ${item} ${Math.floor(Math.random() * 1000)}`);
  }
}


print()