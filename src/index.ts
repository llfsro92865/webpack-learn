const sumfn = (a: number, b: number): number => a + b;

console.log(sumfn(1, 2));

const webpackDom = document.querySelector(".webpack");

webpackDom.addEventListener("click", () => {
  webpackDom.animate(
    [{ backgroundColor: "red" }, { backgroundColor: "blue" }],
    {
      duration: 1000,
      iterations: 1,
    }
  );
});

// const a:string = '';
// // 定义一个获取年月日的函数
// function getYearMonthDay():string {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   return `${year}-${month}-${day}`;
// }
