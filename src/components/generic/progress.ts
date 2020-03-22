enum ProgressDisplay {
  digital,
  radial,
}

let progressDisplay: ProgressDisplay = ProgressDisplay.radial;

const progressEl = document.querySelector<HTMLDivElement>(".progress")!;
const meterEl = document.querySelector<SVGElement>(".progress__meter")!;
const circleEl = document.querySelector<SVGCircleElement>(".progress__circle")!;
const circleBackgroundEl = document.querySelector<SVGCircleElement>(
  ".progress__circle-background"
)!;
const timeEl = document.querySelector<HTMLDivElement>(".progress__time")!;

const radius = 1 / 3;
const circumference = 2 * radius * Math.PI;

circleEl.setAttribute("stroke-dasharray", String(circumference));
circleEl.setAttribute("r", String(radius));
circleBackgroundEl.setAttribute("r", String(radius));

export const setProgress = (totalTime: number, remainingTime: number) => {
  const offset = (remainingTime / totalTime) * circumference;
  circleEl.setAttribute("stroke-dashoffset", String(offset));

  timeEl.innerText =
    ("0" + Math.floor(remainingTime / 60)).slice(-2) +
    ":" +
    ("0" + (remainingTime % 60)).slice(-2);
};

export const resetProgress = () => {
  circleEl.classList.remove("progress__circle--transitioning");
  setProgress(1, 1);
  circleEl.classList.add("progress__circle--transitioning");
};

progressEl.onclick = () => {
  if (progressDisplay === ProgressDisplay.digital) {
    progressDisplay = ProgressDisplay.radial;
    timeEl.remove();
    progressEl.appendChild(meterEl);
    return;
  }
  meterEl.remove();
  progressEl.appendChild(timeEl);
  progressDisplay = ProgressDisplay.digital;
};

resetProgress();
timeEl.remove();
