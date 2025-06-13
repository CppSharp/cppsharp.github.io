const ashCount = 30;
const ashGlobalContainer = document.querySelector('.ash-global');

function createParticles(container, className, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add(className);
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        const leftPos = Math.random() * 100;
        particle.style.left = leftPos + '%';
        const duration = Math.random() * 5 + 5;
        particle.style.animationDuration = duration + 's';
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        container.appendChild(particle);
    }
}

createParticles(ashGlobalContainer, 'ash', ashCount);

function toggleContainers() {
    const bioContainer = document.querySelector('.bio-container');
    const donationContainer = document.querySelector('.donation-container');

    if (bioContainer.style.display === 'none' || getComputedStyle(bioContainer).display === 'none') {
        bioContainer.style.display = 'block';
        donationContainer.style.display = 'none';
        history.pushState({ page: 'bio' }, 'Bio', '#bio');
    } else {
        bioContainer.style.display = 'none';
        donationContainer.style.display = 'block';
        history.pushState({ page: 'donate' }, 'Donate', '#donate');
    }
}

// Запрет контекстного меню и копирования
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());

// Текст для эффекта печатания
const typingText = document.getElementById('typing-text');
const text = typingText ? typingText.innerText : '';
if (typingText) typingText.innerText = '';

let index = 0;
function type() {
    if (index < text.length && typingText) {
        typingText.innerText += text.charAt(index);
        index++;
        setTimeout(type, 150);
    }
}

// Обработка навигации по истории и хешу
function updateViewByHash() {
    const bioContainer = document.querySelector('.bio-container');
    const donationContainer = document.querySelector('.donation-container');

    if (location.hash === '#bio') {
        bioContainer.style.display = 'block';
        donationContainer.style.display = 'none';
    } else if (location.hash === '#donate') {
        bioContainer.style.display = 'none';
        donationContainer.style.display = 'block';
    } else {
        // По умолчанию показываем bio
        bioContainer.style.display = 'block';
        donationContainer.style.display = 'none';
    }
}

window.addEventListener('popstate', updateViewByHash);
window.addEventListener('load', () => {
    updateViewByHash();
    type();
});

// Функция копирования адреса Tonkeeper с уведомлением
function copyTonkeeperAddress() {
    const address = 'UQAXcD3PT3nz1NY2WZ6c4-tk6W4PlaWqyiGYBVQ8FDbafFha';
    navigator.clipboard.writeText(address).then(() => {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = 'Address copied!';
        document.body.appendChild(notification);

        // Показ уведомления
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(0)';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    });
}

// Диалог для поочерёдной печати с анимацией появления и исчезновения
const dialogueLines = [
    "— Why did you buy that?",
    "— I don’t know. Maybe I wanted to feel something.",
    "— Did it help?",
    "— Not really...",
    "— Then why?",
    "— I think I wanted to impress someone.",
    "— Someone you like?",
    "— No.",
    "— Then who?",
    "— People I don’t even like.",
    "— So basically:",
    "We buy things",
    "we don’t need",
    "with money",
    "we don’t have",
    "to impress people",
    "we don’t like."
];

const dialogueElement = document.getElementById('typing-dialogue');
let i = 0;

async function typeLineByLine() {
    if (!dialogueElement) return;

    while (i < dialogueLines.length) {
        const line = dialogueLines[i];
        const lineContainer = document.createElement('div');
        lineContainer.classList.add('dialogue-line');
        dialogueElement.appendChild(lineContainer);

        // Появление текста посимвольно с анимацией
        for (let j = 0; j < line.length; j++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = line[j] === ' ' ? '\u00A0' : line[j];
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'scale(0.7)';
            charSpan.style.display = 'inline-block';
            charSpan.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
            lineContainer.appendChild(charSpan);

            await new Promise(r => setTimeout(r, 30));
            charSpan.style.opacity = '1';
            charSpan.style.transform = 'scale(1)';
        }

        await new Promise(r => setTimeout(r, 1500));

        // Анимация исчезновения символов
        const spans = [...lineContainer.children];
        for (let k = 0; k < spans.length; k++) {
            spans[k].style.opacity = '0';
            spans[k].style.transform = 'scale(0.7)';
            await new Promise(r => setTimeout(r, 20));
        }

        // Оставляем один прозрачный span, чтобы блок не менял размер
        lineContainer.textContent = '';
        const emptySpan = document.createElement('span');
        emptySpan.textContent = '\u00A0';
        emptySpan.style.opacity = '0';
        emptySpan.style.display = 'inline-block';
        emptySpan.style.width = '0.6em';
        emptySpan.style.height = '1em';
        lineContainer.appendChild(emptySpan);

        await new Promise(r => setTimeout(r, 500));

        lineContainer.removeChild(emptySpan);

        i++;
    }
}

typeLineByLine();
