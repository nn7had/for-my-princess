const sentences = [
  "Ancaq sənin varlığınla həyatım mənalı, rəngli və tam olur.",
  "Yanımda olmağın mənim üçün ən böyük xoşbəxtlikdir.",
  "Ağ şəhərin işığı kimi parlaq və safsan.",
  "Nə yaxşı ki, səni tanımışam."
];

const CHAR_DELAY = 55;
const LINE_DELAY = 700;

const container = document.getElementById('sentences');
const finalMsg = document.getElementById('finalMsg');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createSentenceLines() {
  container.innerHTML = '';
  sentences.forEach(text => {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let char of text) {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = 0;
      line.appendChild(span);
    }
    container.appendChild(line);
  });
}

async function animateTyping() {
  finalMsg.style.opacity = '0';
  finalMsg.style.transform = 'translateY(15px)';

  const lines = Array.from(container.querySelectorAll('.line'));

  await wait(20);

  for (let line of lines) {
    const spans = Array.from(line.querySelectorAll('span'));

    for (let span of spans) {
      span.style.opacity = '1';
      await wait(CHAR_DELAY);
    }
    await wait(LINE_DELAY);
  }

  await wait(300);

  finalMsg.style.opacity = '1';
  finalMsg.style.transform = 'translateY(0)';
}

function resetTyping() {
  const spans = container.querySelectorAll('span');
  spans.forEach(span => (span.style.opacity = '0'));
  finalMsg.style.opacity = '0';
  finalMsg.style.transform = 'translateY(15px)';
}

async function start() {
  resetTyping();
  await wait(50);
  await animateTyping();
}

createSentenceLines();
start();
