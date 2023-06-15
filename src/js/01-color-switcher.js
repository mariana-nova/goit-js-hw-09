const color = document.querySelector("body");
const start = document.querySelector("button[data-start]");
const stop = document.querySelector("button[data-stop]");

let body = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

start.addEventListener("click", () => {
	body = setInterval(() => {
		color.style.backgroundColor = getRandomHexColor();
	}, 1000);
	start.disabled = true;
});

stop.addEventListener("click", () => {
	clearInterval(body);
  console.log(`Interval with id ${body} has stopped!`);
	start.disabled = false;
});
