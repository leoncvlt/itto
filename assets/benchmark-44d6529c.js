import{g as s,i as e,c as l,t as a,a as p}from"./drawing-c070374e.js";let h=!0,r=!0,n=60;class o{constructor(){this.type=Math.floor(Math.random()*4),this.x=Math.random()*(s.width-24),this.y=Math.random()*(s.height-24),this.dx=Math.random(),this.dy=Math.random(),this.sz=Math.random()+.5,this.speed=(Math.random()-.5)*4}update(d){this.x=this.x+this.dx*(this.speed*d),this.y=this.y+this.dy*(this.speed*d),(this.x>s.width-24||this.x<0)&&(this.dx=-this.dx),(this.y>s.height-24||this.y<0)&&(this.dy=-this.dy)}draw(){p("characters",this.x,this.y,this.type*48,0,24,24,{angle:h?s.elapsed/60*this.speed:0,scale:r?[this.sz,this.sz]:[1,1]})}}const i=[];s.play({settings:{size:[640,360],supersampling:0,assets:{characters:"/characters.png"}},init:()=>{for(let t=0;t<512;t++)i.push(new o)},tick:()=>{if(s.ready){if(e("right"))for(let t=0;t<8;t++)i.push(new o);if(e("left"))for(let t=0;t<8;t++)i.pop();e("a",0)&&(h=!h),e("b",0)&&(r=!r),i.forEach(t=>t.update(s.delta)),s.elapsed%10===0&&(n=60/s.delta)}},draw:()=>{if(!s.ready){l(0);return}l(14),i.forEach(t=>t.draw(s.delta)),a(`⬅️/➡️ Aliens: ${i.length}`,4,12),a(`🅰 Rotate: ${r}`,4,20),a(`🅱️ Scale: ${h}`,4,28),a(`${Math.round(n)}`,4,42,0,{size:16})}});