window.onload=function(){var d=$id("small"),a=$id("mask"),t=$id("big"),p=$id("bigImg");d.onmouseenter=function(){a.style.display="block",t.style.display="block"},d.onmouseleave=function(){a.style.display="none",t.style.display="none"},d.onmousemove=function(t){var e=window.event||t,o=e.clientX+scroll().left,f=e.clientY+scroll().top,s=o-box.offsetLeft-a.offsetWidth/2,i=f-box.offsetTop-a.offsetHeight/2,l=d.offsetWidth-a.offsetWidth,n=d.offsetHeight-a.offsetHeight;s<0&&(s=0),i<0&&(i=0),l<s&&(s=l),n<i&&(i=n),a.style.left=s+"px",a.style.top=i+"px",p.style.marginLeft=-s/d.offsetWidth*p.offsetWidth+"px",p.style.marginTop=-i/d.offsetHeight*p.offsetHeight+"px"}};