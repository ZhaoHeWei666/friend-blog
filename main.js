const lightbox = document.querySelector('#lightbox');
const enlarged = lightbox.querySelector('img');
const closeButton = lightbox.querySelector('button');
let previousFocus;

function closePreview() {
  lightbox.classList.remove('open');
  lightbox.hidden = true;
  enlarged.removeAttribute('src');
  document.body.style.overflow = '';
  previousFocus?.focus();
}

document.querySelectorAll('[data-full]').forEach(button => {
  button.addEventListener('click', () => {
    previousFocus = button;
    enlarged.src = button.dataset.full;
    enlarged.alt = button.querySelector('img').alt;
    lightbox.hidden = false;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
});

closeButton.addEventListener('click', closePreview);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closePreview();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !lightbox.hidden) closePreview();
  if (event.key === 'Tab' && !lightbox.hidden) {
    event.preventDefault();
    closeButton.focus();
  }
});

const navLinks = [...document.querySelectorAll('.site-header nav a')];
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('error', () => {
    const source = video.querySelector('source');
    if (!source || video.nextElementSibling?.classList.contains('video-fallback')) return;
    const link = document.createElement('a');
    link.className = 'video-fallback';
    link.href = source.getAttribute('src');
    link.download = '';
    link.textContent = '此设备暂时无法播放，下载视频观看';
    video.insertAdjacentElement('afterend', link);
  });
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
