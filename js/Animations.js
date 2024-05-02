const planeDiv = document.getElementById("send");
const plane = document.getElementById("sendClick");

if (planeDiv) { // Check if plane element exists
  planeDiv.addEventListener('click', () => {
    plane.style.animationPlayState = "running";
    console.log("Send Button Clicked");
  });
} else {
  console.error("Element with ID 'send' not found");
}

// const planeDiv = document.getElementById("send");
// const plane = document.getElementById("sendClick");

// planeDiv.addEventListener('click', () => {
//     plane.style.animationPlayState = "running";
//     console.log("Send Button Clicked");
// });