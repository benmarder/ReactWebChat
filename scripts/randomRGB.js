export default function pickRandomColor(){
  return "rgb("+
        (Math.floor(Math.random() * 256))+
        ", "+
        (Math.floor(Math.random() * 256))+
          ", "+
        (Math.floor(Math.random() * 256))+
        ")";
}