// js/main.js
// Nav highlight + mobile menu + typed text + lightbox & modal support

// NAV highlight
// main.js — typed text, nav highlight, mobile menu, modals, lightbox

// NAV highlight
(function activateNav(){
  const links = document.querySelectorAll('.navlinks a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path || (href === 'index.html' && path === '')) a.classList.add('active');
  });
})();

// Mobile menu toggle
(function mobileMenu(){
  const btn = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if(!btn || !mobileMenu) return;
  btn.addEventListener('click', ()=>{
    const visible = mobileMenu.style.display === 'block';
    mobileMenu.style.display = visible ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!visible));
  });
  document.addEventListener('click', (e)=>{
    if(window.innerWidth <= 920){
      const menuOpen = mobileMenu.style.display === 'block';
      if(menuOpen && !mobileMenu.contains(e.target) && !btn.contains(e.target)) {
        mobileMenu.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();

// Typed / rotating text for home page
(function typeCycle(){
  const el = document.querySelector('.type-dynamic');
  if(!el) return;
  const items = [
    'Biomedical Engineer',
    'Frontend Developer',
    'Embedded Systems Enthusiast',
    'AI for Healthcare',
    'Accessibility Advocate'
  ];
  let idx = 0, char = 0, forward = true;
  const interval = 60;
  function tick(){
    const cur = items[idx];
    if(forward){
      char++;
      el.textContent = cur.slice(0, char);
      if(char === cur.length){ forward = false; setTimeout(tick, 1000); return; }
    } else {
      char--;
      el.textContent = cur.slice(0, char);
      if(char === 0){ forward = true; idx = (idx+1) % items.length; setTimeout(tick, 300); return; }
    }
    setTimeout(tick, interval);
  }
  tick();
})();

// Modals for descriptions
(function modals(){
  document.querySelectorAll('[data-open-desc]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = btn.dataset.openDesc;
      const modal = document.getElementById(id);
      if(!modal) return;
      modal.classList.add('show'); document.body.style.overflow='hidden';
    });
  });

  document.addEventListener('click', (e)=>{
    if(e.target.matches('.modal-close')){
      const m = e.target.closest('.modal'); if(m){ m.classList.remove('show'); document.body.style.overflow=''; }
    }
    if(e.target.classList && e.target.classList.contains('modal')){
      e.target.classList.remove('show'); document.body.style.overflow='';
    }
  });

  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ document.querySelectorAll('.modal.show').forEach(m=> m.classList.remove('show')); document.body.style.overflow=''; }});
})();

// Lightbox for images
(function lightbox(){
  const lb = document.getElementById('lightbox'); if(!lb) return;
  const img = lb.querySelector('img');
  document.querySelectorAll('[data-full]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const src = el.dataset.full;
      img.src = src; lb.classList.add('show'); document.body.style.overflow='hidden';
    });
  });
  lb.addEventListener('click', (e)=>{ if(e.target === lb){ lb.classList.remove('show'); img.src=''; document.body.style.overflow=''; }});
})();
