
export default {}// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// export const download = (element: any) => {
//   // element = document.getElementById('printPage');  // 这个dom元素是要导出的pdf的div容器
//   const w = element?.offsetWidth || 0;  // 获得该容器的宽
//   const h = element?.offsetHeight || 0;  // 获得该容器的高
//   const offsetTop = element?.offsetTop || 0; // 获得该容器到文档顶部的距离  
//   const offsetLeft = element?.offsetLeft || 0; // 获得该容器到文档最左的距离
//   const canvas = document.createElement("canvas");
//   let abs = 0;
//   const win_i = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
//   const win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
//   if (win_o > win_i) {
//     abs = (win_o - win_i) / 2; // 获得滚动条宽度的一半
//   }
//   canvas.width = w * 2; // 将画布宽&&高放大两倍
//   canvas.height = h * 2;
//   const context = canvas.getContext('2d');
//   context && context.scale(2, 2);
//   context && context.translate(-offsetLeft - abs, -offsetTop);
//   const iframe: any = document.getElementById("iframe") || document.createElement("iframe")
//   setTimeout(() => {
//     // 这里默认横向没有滚动条的情况，因为offset.left()，有无滚动条的时候存在差值，因此translate的时候，要把这个差值去掉
//     html2canvas(element || document.createElement("div"), {
//       allowTaint: true,
//       scale: 2 // 提升画面质量，但是会增加文件大小
//     }).then(canvas => {
//       setIsPrint(true)
//       const contentWidth = canvas.width;
//       const contentHeight = canvas.height;
//       // 一页pdf显示html页面生成的canvas高度
//       const pageHeight = contentWidth / 592.28 * 841.89;
//       // 未生成pdf的html页面高度
//       let leftHeight = contentHeight;
//       // 页面偏移
//       let position = 0;
//       // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//       const imgWidth = 595.28;
//       const imgHeight = 592.28 / contentWidth * contentHeight;

//       const pageDate = canvas.toDataURL('image/png');

//       const pdf = new jsPDF('p', 'pt', 'a4', true);
//       // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面的高度（841.89）
//       // 当内容未超过pdf一页显示的范围，无需分页
//       if (leftHeight < pageHeight) {
//         pdf.addImage(pageDate, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
//       } else { // 分页
//         while (leftHeight > 0) {
//           pdf.addImage(pageDate, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST')
//           leftHeight -= pageHeight;
//           position -= 841.89;
//           // 避免添加空白页
//           if (leftHeight > 0) {
//             pdf.addPage()
//           }
//         }
//       }
//       let src = pdf.output('dataurlstring');
//       let arr: any = src.split(',');
//       let mime = arr[0].match(/:(.*?);/)[1];
//       let bstr = atob(arr[1]);
//       let n = bstr.length;
//       let u8arr = new Uint8Array(n);
//       while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//       }
//       let blob = new Blob([u8arr], { type: mime });
//       src = window.URL.createObjectURL(blob)
//       setIframeSrc(src)
//     })
//   });
// }