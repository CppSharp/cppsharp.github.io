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

    if (bioContainer.style.display === 'none') {
        bioContainer.style.display = 'block';
        donationContainer.style.display = 'none';
        history.pushState({ page: 'bio' }, 'Bio', '#bio');
    } else {
        bioContainer.style.display = 'none';
        donationContainer.style.display = 'block';
        history.pushState({ page: 'donate' }, 'Donate', '#donate');
    }
}

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('copy', (e) => e.preventDefault());

const typingText = document.getElementById('typing-text');
const text = typingText.innerText;
typingText.innerText = '';

let index = 0;
function type() {
    if (index < text.length) {
        typingText.innerText += text.charAt(index);
        index++;
        setTimeout(type, 150);
    }
}

type();

window.addEventListener('popstate', (event) => {
    if (location.hash === '#bio') {
        document.querySelector('.bio-container').style.display = 'block';
        document.querySelector('.donation-container').style.display = 'none';
    } else if (location.hash === '#donate') {
        document.querySelector('.bio-container').style.display = 'none';
        document.querySelector('.donation-container').style.display = 'block';
    }
});

window.addEventListener('load', () => {
    if (location.hash === '#bio') {
        document.querySelector('.bio-container').style.display = 'block';
        document.querySelector('.donation-container').style.display = 'none';
    } else if (location.hash === '#donate') {
        document.querySelector('.bio-container').style.display = 'none';
        document.querySelector('.donation-container').style.display = 'block';
    }
});

function copyTonkeeperAddress() {
    const address = 'UQAXcD3PT3nz1NY2WZ6c4-tk6W4PlaWqyiGYBVQ8FDbafFha';
    navigator.clipboard.writeText(address).then(() => {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = 'Address copied!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    });
}
