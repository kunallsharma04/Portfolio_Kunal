// Basic interactivity: mobile menu, smooth scroll, theme toggle, contact mailto
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '1rem';
    nav.style.top = '64px';
    nav.style.background = 'rgba(6,10,20,0.98)';
    nav.style.padding = '0.8rem';
    nav.style.borderRadius = '8px';
    nav.style.zIndex = '100';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav
        if(window.innerWidth < 900){
          nav.style.display = 'none';
        }
      }
    });
  });

  // theme toggle (simple)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    if(document.body.classList.contains('light')){
      document.body.style.background = 'linear-gradient(180deg,#f5f8ff,#eef2ff)';
      document.body.style.color = '#0a1724';
    } else {
      document.body.style.background = 'linear-gradient(180deg,#061024 0%, #071428 60%)';
      document.body.style.color = '#e6eef6';
    }
  });

  // copy email button
  document.getElementById('copyEmail').addEventListener('click', async () => {
    const email = 'Kunallsharma04@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      alert('Email copied to clipboard: ' + email);
    } catch (err) {
      // fallback
      prompt('Copy email:', email);
    }
  });
});

// Contact form -> opens mail client
function sendMail(e){
  e.preventDefault();
  const f = e.target;
  const name = encodeURIComponent(f.name.value.trim());
  const from = encodeURIComponent(f.email.value.trim());
  const msg = encodeURIComponent(f.message.value.trim());
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`From: ${name} (${from})\n\n${f.message.value}`);
  const mailto = `mailto:Kunallsharma04@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  return false;
}
