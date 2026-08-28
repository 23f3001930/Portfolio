const d=portfolioData;
const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const linkHTML=(l)=>`<a href="${l.url}" ${l.external?'target="_blank" rel="noopener"':''}${l.download?' download':''}>${esc(l.label)} ↗</a>`;
$('#profilePhoto').src=d.profile.photo;
$('#heroTagline').textContent=d.profile.tagline;
$('#aboutText').textContent=d.profile.about;
$('#resumeTop').href=d.profile.resume;
$('#linkedinHero').href=d.profile.linkedin;
$('#emailLink').href=`mailto:${d.profile.email}`;
$('#githubLink').href=d.profile.github;
$('#linkedinLink').href=d.profile.linkedin;
$('#year').textContent=new Date().getFullYear();

$('#educationList').innerHTML=d.education.map((e,i)=>`<article class="edu-row"><div class="edu-year">${esc(e.year)}</div><div class="edu-main"><h3>${esc(e.degree)}</h3><p>${esc(e.institute)}</p></div><div class="edu-place">${esc(e.place)}</div></article>`).join('');

// Render projects exactly once. Every card uses the same grid sizing; Placement Portal is highlighted only by a border.
$('#projectList').innerHTML=d.projects.map((p,i)=>`<article class="card project-card ${p.featured?'featured':''}"><div class="card-meta"><span>${String(i+1).padStart(2,'0')} / ${esc(p.category)}</span>${p.featured?'<span>FEATURED</span>':''}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><p class="project-detail">${p.detail}</p><div class="tags">${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="card-footer"><div class="card-links">${(p.links||[]).map(linkHTML).join('')}</div></div></article>`).join('');

$('#certificateList').innerHTML=d.certificates.map((c,i)=>{
 const links=(c.links||[]).map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])} ↗</a>`).join('');
 if(c.folder){ return `<article class="card certificate-card certificate-folder"><div class="card-meta"><span>${String(i+1).padStart(2,'0')}</span><span>${esc(c.issuer)}</span></div><details class="cert-dropdown"><summary><span class="folder-icon" aria-hidden="true">▱</span><span><strong>${esc(c.title)}</strong><small>${esc(c.links?.length||0)} certificates · click to open</small></span><b>+</b></summary><div class="folder-description">${esc(c.description||'')}</div><div class="cert-links folder-links">${links}</div></details></article>`; }
 return `<article class="card certificate-card"><div class="card-meta"><span>${String(i+1).padStart(2,'0')}</span><span>${esc(c.issuer)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.description||'')}</p><div class="cert-links">${links}</div></article>`;
}).join('');

$('#experienceList').innerHTML=d.internships.map((x,i)=>`<article class="card internship-card"><div class="card-meta"><span>${String(i+1).padStart(2,'0')}</span><span>INTERNSHIP</span></div><span class="type">${esc(x.type)}</span><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><div class="card-footer"><div class="card-links">${x.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])} ↗</a>`).join('')}</div></div></article>`).join('');

$('#skillsList').innerHTML=d.skills.map((s,i)=>`<article class="skill-card"><span class="skill-number">0${i+1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></article>`).join('');

$('#highlightList').innerHTML=d.highlights.map((h,i)=>`<article class="card achievement-card"><div class="card-meta"><span>${esc(h[0])}</span><span>HIGHLIGHT</span></div><h3>${esc(h[1])}</h3><p>${esc(h[2])}</p></article>`).join('');

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
// Stagger card entrances for a more polished portfolio feel.
$$('.certificate-card, .project-card, .internship-card, .achievement-card').forEach((card,i)=>{ card.style.setProperty('--delay', `${(i%8)*70}ms`); card.classList.add('card-reveal'); });
$$('.reveal').forEach(x=>observer.observe(x));
const sections=$$('main section[id]'),navLinks=$$('#nav a');
const navObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}),{rootMargin:'-35% 0px -55%'});
sections.forEach(s=>navObs.observe(s));
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=`${max>0?(scrollY/max)*100:0}%`},{passive:true});
$('#menu').addEventListener('click',()=>$('#nav').classList.toggle('open'));
navLinks.forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
