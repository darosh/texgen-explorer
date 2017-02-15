!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(this,function(){"use strict";function t(t,e){return e}function e(t,e){return t+e}function i(t,e){return t-e}function n(t,e){return t*e}function s(t,e){return t/e}function r(t,e){return t&e}function o(t,e){return t^e}function a(t,e){return Math.min(t,e)}function u(t,e){return Math.max(t,e)}function h(t,e){return(t+e)/2}function l(t,e){return 1-(1-t)*(1-e)}function f(t,e){return e<.5?2*t*e:1-2*(1-t)*(1-e)}function c(t,e){return t+e-1}function p(t,e){return 0===e?e:1-(1-t)/e}function _(t,e){return e>=1?e:t/(1-e)}function v(t,e){return Math.abs(t-e)}function y(t,e){return.5-2*(t-.5)*(e-.5)}function d(t,e){return e<.5?2*(t/2+.25)*e:1-2*(1-(t/2+.25))*(1-e)}function m(t,e){return t<.5?2*e*t:1-2*(1-e)*(1-t)}function g(t,e){return t>.5?1-(1-e)/(2*(t-.5)):e/(1-2*t)}function k(t,e){return e>.5?t+2*(e-.5):t+2*e-1}function O(t,e){return e>.5?Math.max(t,2*(e-.5)):Math.min(t,2*e)}function w(t,e,i){return[t[0]*(1-i)+e[0]*i,t[1]*(1-i)+e[1]*i,t[2]*(1-i)+e[2]*i]}function P(t,e,i){var n=t-e,s=i-e;return(s+n%s)%s+e}function x(t,e,i){var n=t-e,s=2*(i-e);return n=(s+n%s)%s,n>i-e?s-n+e:n+e}function N(t,e,i){return Math.min(Math.max(t,e),i)}function b(t,e,i,n){var s=i-t,r=n-e;return Math.sqrt(s*s+r*r)}function M(t,e,i){var n=N((i-t)/(e-t),0,1);return n*n*(3-2*n)}function z(t,e,i){var n=0===Math.abs(t%2147483648)?1:t,s=(n*(e+1)*777^n*(i+1)*123)%2147483647;return s=61^s^s>>16,s+=s<<3,s^=s>>4,s*=668265261,s^=s>>15,s/=2147483647}function I(t,e,i,n,s){var r=void 0,o=void 0,a=void 0,u=void 0,h=void 0,l=void 0,f=void 0,c=void 0,p=void 0,_=void 0,v=void 0,y=1/0;n=Math.abs(n);for(var d=-2;d<=2;d++)for(var m=-2;m<=2;m++)r=Math.ceil(t/n)+d,o=Math.ceil(e/n)+m,a=z(i,r,o),u=z(2*i,r,o),h=s>0?1+z(3*i,r,o)*s:1,l=(a+r)*n,f=(u+o)*n,c=Math.abs(l-t),p=Math.abs(f-e),_=(c*c+p*p)*h,_<y&&(y=_,v=a);return{dist:Math.sqrt(y),value:v}}function E(t){return t*wt}function T(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,s=n||document.createElement("canvas");s.width=e,s.height=i;for(var r=s.getContext("2d"),o=r.getImageData(0,0,e,i),a=o.data,u=new Uint8Array(t),h=u.length,l=0;l<h;)a[l]=u[l++];return r.putImageData(o,0,0),s}function L(t){return new Function(Lt,St,"return "+t)}var S=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},A=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),j=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},C=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},R=function(){function t(e,i){S(this,t),this.width=e,this.height=i,this.array=new Float32Array(e*i*4),this.color=new Float32Array(4)}return A(t,[{key:"copy",value:function(t){this.array.set(t.array)}},{key:"getPixelNearest",value:function(t,e){for(var i=Math.round(t),n=Math.round(e);n>=this.height;)n-=this.height;for(;n<0;)n+=this.height;for(;i>=this.width;)i-=this.width;for(;i<0;)i+=this.width;var s=this.array,r=this.color,o=n*this.width*4+4*i;return r[0]=s[o],r[1]=s[o+1],r[2]=s[o+2],this.color}},{key:"getPixelBilinear",value:function(t,e){var i=Math.floor(t),n=Math.floor(e),s=i+n*this.width,r=this.array,o=this.color,a=t-i,u=e-n,h=1-a,l=1-u,f=h*l,c=a*l,p=h*u,_=a*u,v=4*s,y=4*(1+s),d=4*(1*this.width+s),m=4*(1+1*this.width+s),g=this.width*this.height*4;return v>=g&&(v-=g),v<0&&(v+=g),y>=g&&(y-=g),y<0&&(y+=g),d>=g&&(d-=g),d<0&&(d+=g),m>=g&&(m-=g),m<0&&(m+=g),o[0]=r[v]*f+r[y]*c+r[d]*p+r[m]*_,o[1]=r[v+1]*f+r[y+1]*c+r[d+1]*p+r[m+1]*_,o[2]=r[v+2]*f+r[y+2]*c+r[d+2]*p+r[m+2]*_,o[3]=r[v+3]*f+r[y+3]*c+r[d+3]*p+r[m+3]*_,this.color}},{key:"getPixelOffset",value:function(t){var e=this.array,i=this.color;return t=parseInt(4*t),i[0]=e[t],i[1]=e[t+1],i[2]=e[t+2],i[3]=e[t+3],this.color}}]),t}(),D=Object.freeze({set:t,add:e,sub:i,mul:n,div:s,and:r,xor:o,min:a,max:u,average:h,screen:l,overlay:f,linearBurn:c,colorBurn:p,colorDodge:_,difference:v,exclusion:y,softLight:d,hardLight:m,vividLight:g,linearLight:k,pinLight:O}),B=function(){function e(t,i){S(this,e),this.color=new Float32Array(4),this.buffer=new R(t,i),this.bufferCopy=new R(t,i)}return A(e,[{key:"toImageData",value:function(t){var e=this.buffer,i=e.array,n=t.createImageData(e.width,e.height),s=n.data,r=void 0,o=i.length;for(r=0;r<o;r+=4)s[r]=255*i[r],s[r+1]=255*i[r+1],s[r+2]=255*i[r+2],s[r+3]=255;return n}},{key:"toCanvas",value:function(t){void 0===t&&(t=document.createElement("canvas")),t.width=this.buffer.width,t.height=this.buffer.height;var e=t.getContext("2d"),i=this.toImageData(e);return e.putImageData(i,0,0),t}},{key:"set",value:function(e,i){this.bufferCopy.copy(this.buffer);var n=void 0===i?t:i,s=this.buffer,r=this.bufferCopy,o=this.color,a=e.tint(),u=s.array,h=s.width,l=s.height,f=u.length,c=1-a[3],p=a[3],_=0,v=0,y=void 0;if(1===a[3])for(y=0;y<f;)e.run(o,_,v,r,h,l),u[y]=n(u[y++],o[0]*a[0]),u[y]=n(u[y++],o[1]*a[1]),u[y]=n(u[y++],o[2]*a[2]),y++,++_===h&&(_=0,v++);else if(0!==a[3])for(y=0;y<f;)e.run(o,_,v,r,h,l),u[y]=u[y]*c+n(u[y++],o[0]*a[0])*p,u[y]=u[y]*c+n(u[y++],o[1]*a[1])*p,u[y]=u[y]*c+n(u[y++],o[2]*a[2])*p,y++,++_===h&&(_=0,v++);return this}},{key:"toArrayBuffer",value:function(){var t=this.buffer.array,e=t.length,i=new ArrayBuffer(e),n=new Uint8ClampedArray(i),s=void 0;for(s=0;s<e;s+=4)n[s]=255*t[s],n[s+1]=255*t[s+1],n[s+2]=255*t[s+2],n[s+3]=255;return i}}],[{key:"isSingleColor",value:function(t){for(var e=new Uint8ClampedArray(t),i=e.length,n=4;n<i;){if(e[0]!==e[n++]||e[1]!==e[n++]||e[2]!==e[n++])return!1;n++}return!0}}]),e}(),G=function(t){B.prototype[t]||(B.prototype[t]=function(e){return this.set(e,D[t])})};for(var q in D)G(q);var F=function(){function t(e){var i=this;S(this,t),this._tint={0:1,1:1,2:1,3:1,set:function(t){this._tint[0]=t[0],this._tint[1]=t[1],this._tint[2]=t[2],this._tint[3]=t[3]}},e&&e.params&&Object.keys(e.params).forEach(function(t){var n=e.params[t].val;null!==n&&(Array.isArray(n)?i[t].apply(i,n):i[t].call(i,n))})}return A(t,[{key:"tint",value:function(t,e,i,n){return arguments.length?(this._tint[0]=t,this._tint[1]=e,this._tint[2]=i,this._tint[3]=arguments.length>3?n:this._tint[3],this):this._tint}}]),t}(),U={NUMBER:0,INT:1,BOOLEAN:2,INTERPOLATION:3,COLOR_POINT:4,COLOR:5,TEXTURE:6,0:"NUMBER",1:"INT",2:"BOOLEAN",3:"INTERPOLATION",4:"COLOR_POINT",5:"COLOR",6:"TEXTURE"},X=Number.EPSILON,V={STEP:0,LINEAR:1,SPLINE:2},Y=function(){function t(e){return S(this,t),this.points=[],this.low=0,this.high=0,this.interpolation="undefined"==typeof e?V.LINEAR:e,this.repeat=!1,this}return A(t,[{key:"set",value:function(t){return this.points=t,this.points.sort(function(t,e){return t.pos-e.pos}),this.low=this.points[0].pos,this.high=this.points[this.points.length-1].pos,this}},{key:"addPoint",value:function(t,e){return this.points.push({pos:t,color:e}),this.points.sort(function(t,e){return t.pos-e.pos}),this.low=this.points[0].pos,this.high=this.points[this.points.length-1].pos,this}},{key:"setRepeat",value:function(t){return this.repeat=t,this}},{key:"setInterpolation",value:function(t){return this.interpolation=t,this}},{key:"getColorAt",value:function(t){if(!this.points.length)return[0,0,0];t=2===this.repeat?x(t,this.low,this.high):this.repeat?P(t,this.low,this.high):N(t,this.low,this.high);for(var e=0,i=this.points;i[e+1].pos<t;)e++;var n=i[e],s=i[e+1],r=(t-n.pos)/(s.pos-n.pos);if(this.interpolation===V.STEP)return n.color;if(this.interpolation===V.LINEAR)return w(n.color,s.color,r);if(this.interpolation===V.SPLINE){var o=2*n.color[0]-2*s.color[0],a=-3*n.color[0]+3*s.color[0],u=n.color[0],h=2*n.color[1]-2*s.color[1],l=-3*n.color[1]+3*s.color[1],f=n.color[1],c=2*n.color[2]-2*s.color[2],p=-3*n.color[2]+3*s.color[2],_=n.color[2],v=r*r,y=v*r;return[o*y+a*v+u,h*y+l*v+f,c*y+p*v+_]}}}]),t}(),H=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return j(e,t),A(e,[{key:"run",value:function(t){t[0]=1,t[1]=1,t[2]=1}}]),e}(F),J=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t){return this._size=Math.max(Number.EPSILON,t)/Math.PI/2,this}},{key:"offset",value:function(t){return this._offset=t,this}},{key:"run",value:function(t,e){var i=Math.sin((e+this._offset)/this._size);t[0]=i,t[1]=i,t[2]=i}}],[{key:"params",get:function(){return{size:{val:16,min:Number.EPSILON,scale:!0},offset:{val:0,scale:!0}}}},{key:"examples",get:function(){return[{size:64,offset:16}]}}]),e}(F),K=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t){return this._size=Math.max(Number.EPSILON,t)/Math.PI/2,this}},{key:"offset",value:function(t){return this._offset=t,this}},{key:"run",value:function(t,e,i){var n=Math.sin((i+this._offset)/this._size);t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{size:{val:16,min:Number.EPSILON,scale:!0},offset:{val:0,scale:!0}}}}]),e}(F),Q=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,F))}return j(e,t),A(e,[{key:"size",value:function(t,e){return this._size=[Math.max(Number.EPSILON,t),Math.max(Number.EPSILON,e)],this}},{key:"run",value:function(t,e,i){var n=(256*e/this._size[0]|256*i/this._size[1])%256/255;t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{size:{val:[256,256],min:Number.EPSILON,scale:!0}}}},{key:"examples",get:function(){return[{size:[64,64]}]}}]),e}(F),W=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t,e){return this._size=[Math.max(Number.EPSILON,t),Math.max(Number.EPSILON,e)],this}},{key:"run",value:function(t,e,i){var n=(256*e/this._size[0]^256*i/this._size[1])%256/255;t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{size:{val:[256,256],min:Number.EPSILON,scale:!0}}}},{key:"examples",get:function(){return[{size:[128,64]}]}}]),e}(F),Z=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"size",value:function(t,e){return this._size=[t,e],this}},{key:"run",value:function(t,e,i){var n=e>=this._offset[0]&&e<=this._offset[0]+this._size[0]&&i<=this._offset[1]+this._size[1]&&i>=this._offset[1]?1:0;t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{offset:{val:[0,0],scale:!0},size:{val:[128,64],min:Number.EPSILON,scale:!0}}}},{key:"examples",get:function(){return[{offset:[64,96],size:[128,64]}]}}]),e}(F),$=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"weight",value:function(t){return this._delta=t,this}},{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"size",value:function(t){return this._size=t,this}},{key:"run",value:function(t,e,i){var n=b(e,i,this._offset[0],this._offset[1]),s=1-M(this._size-this._delta,this._size,n);t[0]=s,t[1]=s,t[2]=s}}],[{key:"params",get:function(){return{offset:{val:[0,0],scale:!0},size:{val:128,min:Number.EPSILON,scale:!0},weight:{val:1,min:0,scale:!0}}}},{key:"examples",get:function(){return[{offset:[128,128],size:128,weight:32},{offset:[128,128],size:128,weight:128}]}}]),e}(F),tt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t,e){return this._size=[t,e],this}},{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"shift",value:function(t){return this._shift=t,this}},{key:"run",value:function(t,e,i){var n=(i+this._offset[1])/this._size[1]&1^(e+this._offset[0]+parseInt(i/this._size[1])*this._shift)/this._size[0]&1?0:1;t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{size:{val:[32,32],min:Number.EPSILON,scale:!0},offset:{val:[0,0],scale:!0},shift:{val:0,scale:!0}}}},{key:"examples",get:function(){return[{size:[16,16],offset:[8,8],shift:0},{size:[64,16],offset:[0,0],shift:8}]}}]),e}(F),et=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t){return this._size=Math.max(e.params.size.min,t),this}},{key:"repeat",value:function(t){return this._gradient=this._gradient||new Y,this._gradient.setRepeat(t),this}},{key:"interpolation",value:function(t){return this._gradient=this._gradient||new Y,this._gradient.setInterpolation(t),this}},{key:"point",value:function(t,e){return this._gradient=this._gradient||new Y,this._gradient.addPoint(t,e),this}},{key:"run",value:function(t,e){t.set(this._gradient.getColorAt(e/this._size))}}],[{key:"params",get:function(){return{size:{val:256,min:Number.EPSILON,scale:!0},repeat:{val:!0,type:U.BOOLEAN},interpolation:{val:1,type:U.INTERPOLATION},point:{val:null,type:U.COLOR_POINT}}}},{key:"examples",get:function(){return[{interpolation:V.STEP},{interpolation:V.SPLINE,size:128},{interpolation:V.SPLINE,repeat:!1,size:32}]}}]),e}(F),it=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"repeat",value:function(t){return this._gradient=this._gradient||new Y,this._gradient.setRepeat(t),this}},{key:"size",value:function(t){return this._size=t,this}},{key:"interpolation",value:function(t){return this._gradient=this._gradient||new Y,this._gradient.setInterpolation(t),this}},{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"point",value:function(t,e){return this._gradient=this._gradient||new Y,this._gradient.addPoint(t,e),this}},{key:"run",value:function(t,e,i){var n=b(e,i,this._offset[0],this._offset[1]);t.set(this._gradient.getColorAt(n/this._size))}}],[{key:"params",get:function(){return{size:{val:128,min:Number.EPSILON,scale:!0},offset:{val:[0,0],scale:!0},repeat:{val:!0,type:U.BOOLEAN},interpolation:{val:1,type:U.INTERPOLATION},point:{val:null,type:U.COLOR_POINT}}}},{key:"examples",get:function(){return[{size:64,offset:[128,128],repeat:!1}]}}]),e}(F),nt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"run",value:function(t,e,i){var n=z(this._seed,e,i);t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535}}}}]),e}(F),st=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._baseFrequency=1/t,this}},{key:"amplitude",value:function(t){return this._amplitude=t,this}},{key:"persistence",value:function(t){return this._persistence=t,this}},{key:"octaves",value:function(t){return this._octaves=Math.max(1,t),this}},{key:"step",value:function(t){return this._step=Math.max(1,t),this}},{key:"interpolation",value:function(t){return this._interpolator=this._interpolator||new Y,this._interpolator.setInterpolation(t),this}},{key:"run",value:function(t,e,i){for(var n=0,s=this._amplitude,r=this._baseFrequency,o=void 0,a=void 0,u=void 0,h=void 0,l=void 0,f=void 0,c=void 0,p=void 0,_=void 0,v=void 0,y=1;y<=this._octaves;y++)o=Math.floor(e*r),a=Math.floor(i*r),this._interpolator.interpolation===V.STEP?n+=z(this._seed*y,o,a)*s:(u=e*r-o,h=i*r-a,l=z(this._seed*y,o,a),f=z(this._seed*y,o+1,a),c=z(this._seed*y,o,a+1),p=z(this._seed*y,o+1,a+1),this._interpolator.set([{pos:0,color:[l]},{pos:1,color:[f]}]),_=this._interpolator.getColorAt(u),this._interpolator.set([{pos:0,color:[c]},{pos:1,color:[p]}]),v=this._interpolator.getColorAt(u),this._interpolator.set([{pos:0,color:[_[0]]},{pos:1,color:[v[0]]}]),n+=this._interpolator.getColorAt(h)[0]*s),r*=this._step,s*=this._persistence;t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:16,min:0},amplitude:{val:.5,min:0,max:2},persistence:{val:.75,min:0,max:2},octaves:{val:3,min:1,max:8},step:{min:1,val:4,max:16},interpolation:{val:1,type:U.INTERPOLATION}}}},{key:"examples",get:function(){return[{seed:1,density:16,amplitude:1,persistence:0,octaves:1,step:4,interpolation:2},{seed:1,density:8,amplitude:1,persistence:1,octaves:1,step:4,interpolation:1},{seed:1,density:64,amplitude:1,persistence:1,octaves:1,step:4,interpolation:0},{seed:1,density:64,amplitude:1,persistence:1,octaves:2,step:2,interpolation:0},{seed:1,density:64,amplitude:.25,persistence:.75,octaves:4,step:2,interpolation:0},{seed:1,density:16,amplitude:.25,persistence:.75,octaves:4,step:2,interpolation:0},{seed:1,density:32,amplitude:.5,persistence:.75,octaves:3,step:4,interpolation:1},{seed:1,density:32,amplitude:.5,persistence:.75,octaves:3,step:4,interpolation:2}]}}]),e}(F),rt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._density=t,this}},{key:"weight",value:function(t){return this._weight=Math.max(0,t),this}},{key:"run",value:function(t,e,i){var n=I(e,i,this._seed,this._density,this._weight),s=1-n.dist/this._density;this._density<0&&(s-=1),t[0]=s,t[1]=s,t[2]=s}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:32,min:0},weight:{val:0,min:0}}}},{key:"examples",get:function(){return[{seed:1,density:16,weight:0},{seed:1,density:16,weight:16},{seed:1,density:64,weight:0},{seed:1,density:64,weight:1},{seed:1,density:64,weight:4},{seed:1,density:64,weight:32}]}}]),e}(F),ot=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._density=t,this}},{key:"weight",value:function(t){return this._weight=Math.max(0,t),this}},{key:"amplitude",value:function(t){return this._amplitude=t,this}},{key:"persistence",value:function(t){return this._persistence=t,this}},{key:"octaves",value:function(t){return this._octaves=Math.max(1,t),this}},{key:"step",value:function(t){return this._step=Math.max(1,t),this}},{key:"scale",value:function(t){return this._scale=t,this}},{key:"run",value:function(t,e,i){for(var n=void 0,s=0,r=this._amplitude,o=this._density,a=1;a<=this._octaves;a++)n=I(e*this._scale,i*this._scale,this._seed*a,o,this._weight),n.dist=1-n.dist/o,o<0&&(n.dist-=1),s+=n.dist*r,o/=this._step,r*=this._persistence;t[0]=s,t[1]=s,t[2]=s}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:64,min:0},weight:{val:0,min:0,max:2},amplitude:{val:.5,min:0,max:2},persistence:{val:.5,min:0,max:2},octaves:{val:4,min:1,max:8},step:{val:2,min:1,max:16},scale:{val:1,scale:!1}}}},{key:"examples",get:function(){return[{seed:1,density:64,weight:2,amplitude:.5,persistence:.5,octaves:4,step:2},{seed:1,density:32,weight:2,amplitude:.5,persistence:.5,octaves:2,step:2}]}}]),e}(F),at=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._density=t,this}},{key:"weight",value:function(t){return this._weight=Math.max(0,t),this}},{key:"run",value:function(t,e,i){var n=I(e,i,this._seed,this._density,this._weight);t[0]=n.value,t[1]=n.value,t[2]=n.value}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:32,min:X},weight:{val:0,min:0}}}},{key:"examples",get:function(){return[{seed:1,density:16,weight:0},{seed:1,density:16,weight:16},{seed:1,density:16,weight:0},{seed:1,density:16,weight:1},{seed:1,density:16,weight:4},{seed:1,density:16,weight:128}]}}]),e}(F),ut=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._density=t,this}},{key:"weight",value:function(t){return this._weight=Math.max(0,t),this}},{key:"amplitude",value:function(t){return this._amplitude=t,this}},{key:"persistence",value:function(t){return this._persistence=t,this}},{key:"octaves",value:function(t){return this._octaves=Math.max(1,t),this}},{key:"step",value:function(t){return this._step=Math.max(1,t),this}},{key:"run",value:function(t,e,i){for(var n=void 0,s=0,r=this._amplitude,o=this._density,a=1;a<=this._octaves;a++)n=I(e,i,this._seed*a,o,this._weight),s+=n.value*r,o/=this._step,r*=this._persistence;t[0]=s,t[1]=s,t[2]=s}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:64,min:X},weight:{val:0,min:X,max:2},amplitude:{val:.5,min:Number.EPSILON,max:2},persistence:{val:.5,min:Number.EPSILON,max:2},octaves:{val:4,min:1,max:8},step:{val:2,min:1,max:16}}}},{key:"examples",get:function(){return[{seed:1,density:64,weight:2,amplitude:.5,persistence:.5,octaves:4,step:2},{seed:1,density:32,weight:2,amplitude:.5,persistence:.5,octaves:2,step:2}]}}]),e}(F),ht=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};S(this,t),e.hasOwnProperty("amplitude")?this.amplitude=e.amplitude:this.amplitude=1,e.hasOwnProperty("frequency")?this.frequency=e.frequency:this.frequency=1,e.hasOwnProperty("octaves")?this.octaves=e.octaves:this.octaves=1,e.hasOwnProperty("persistence")?this.persistence=e.persistence:this.persistence=.5,e.hasOwnProperty("random")?this.random=e.random:this.random=Math.random;var i=void 0;i=e.hasOwnProperty("min")?e.min:-1;var n=void 0;n=e.hasOwnProperty("max")?e.max:1,this.scale=i===-1&&1===n?function(t){return t}:function(t){return i+(t+1)/2*(n-i)};for(var s=new Uint8Array(256),r=0;r<256;r++)s[r]=r;for(var o=void 0,a=void 0,u=255;u>0;u--)o=Math.floor((u+1)*this.random()),a=s[u],s[u]=s[o],s[o]=a;this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var h=0;h<512;h++)this.perm[h]=s[255&h],this.permMod12[h]=this.perm[h]%12}return A(t,[{key:"dot",value:function(t,e){return t.slice(0,Math.min(t.length,e.length)).reduce(function(t,i,n){return t+i*e[n]},0)}},{key:"raw2D",value:function(e,i){var n=.5*(e+i)*(Math.sqrt(3)-1),s=Math.floor(e+n),r=Math.floor(i+n),o=(s+r)*t.G2,a=s-o,u=r-o,h=e-a,l=i-u,f=h>l?1:0,c=h>l?0:1,p=h-f+t.G2,_=l-c+t.G2,v=h-1+2*t.G2,y=l-1+2*t.G2,d=255&s,m=255&r,g=this.permMod12[d+this.perm[m]],k=this.permMod12[d+f+this.perm[m+c]],O=this.permMod12[d+1+this.perm[m+1]],w=.5-h*h-l*l,P=w<0?0:Math.pow(w,4)*this.dot(t.GRAD3D[g],[h,l]),x=.5-p*p-_*_,N=x<0?0:Math.pow(x,4)*this.dot(t.GRAD3D[k],[p,_]),b=.5-v*v-y*y,M=b<0?0:Math.pow(b,4)*this.dot(t.GRAD3D[O],[v,y]);return 70.14805770653952*(P+N+M)}},{key:"scaled2D",value:function(t,e){for(var i=this.amplitude,n=this.frequency,s=0,r=0,o=0;o<this.octaves;o++)r+=this.raw2D(t*n,e*n)*i,s+=i,i*=this.persistence,n*=2;return this.scale(r/s)}}]),t}();ht.G2=(3-Math.sqrt(3))/6,ht.GRAD3D=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,-1],[0,1,-1],[0,-1,-1]];var lt=function(t){function e(){S(this,e);var t=C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e));return t._count=0,t}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._density=t,this}},{key:"persistence",value:function(t){return this._persistence=t,this}},{key:"octaves",value:function(t){return this._octaves=Math.max(1,t),this}},{key:"amplitude",value:function(t){return this._amplitude=t,this}},{key:"run",value:function(t,e,i){this._base=this._base||new ht({min:0,max:1,frequency:1/this._density,octaves:this._octaves,amplitude:this._amplitude,persistence:this._persistence,random:function(){return z(this._seed,this._count++,0)}});var n=this._base.scaled2D(e,i);t[0]=n,t[1]=n,t[2]=n}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:16,min:X},amplitude:{val:1,min:X,max:2},persistence:{val:.5,min:Number.EPSILON,max:2},octaves:{val:1,min:1,max:8}}}},{key:"examples",get:function(){return[{seed:1,density:32,amplitude:.5,persistence:.75,octaves:4},{seed:1,density:128,amplitude:.5,persistence:.75,octaves:8},{seed:1,density:128,amplitude:.5,persistence:.75,octaves:5},{seed:1,density:12,amplitude:.25,persistence:1,octaves:2}]}}]),e}(F),ft=Object.freeze({Number:H,SinX:J,SinY:K,Or:Q,Xor:W,Rect:Z,Circle:$,CheckerBoard:tt,LinearGradient:et,RadialGradient:it,Noise:nt,NoiseFractal:st,CellularNoise:rt,CellularFractal:ot,VoronoiNoise:at,VoronoiFractal:ut,SimplexNoise:lt}),ct=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return j(e,t),A(e,[{key:"run",value:function(t,e,i,n){var s=n.getPixelNearest(e,i);t[0]=Math.abs(s[0]),t[1]=Math.abs(s[1]),t[2]=Math.abs(s[2])}}]),e}(F),pt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return j(e,t),A(e,[{key:"run",value:function(t,e,i,n){var s=n.getPixelNearest(e,i);t.set(s)}}]),e}(F),_t=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"preset",value:function(t){return this._weights=e.Presets[t]||e.Presets[0],this._side=Math.round(Math.sqrt(this._weights.length)),this._halfSide=Math.floor(this._side/2),this}},{key:"run",value:function(t,e,i,n,s,r){for(var o=i,a=e,u=0,h=0,l=0,f=0;f<this._side;f++)for(var c=0;c<this._side;c++){var p=o+f-this._halfSide,_=a+c-this._halfSide,v=this._weights[f*this._side+c],y=n.getPixelNearest(N(_,0,s-1),N(p,0,r-1));u+=y[0]*v,h+=y[1]*v,l+=y[2]*v}t[0]=u,t[1]=h,t[2]=l}}],[{key:"Presets",get:function(){return{0:[0,-1,0,-1,5,-1,0,-1,0],1:[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],2:[.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04,.04],3:[2,1,0,1,1,-1,0,-1,-2],4:[0,1,0,1,-4,1,0,1,0]}}},{key:"params",get:function(){return{preset:{val:0,min:0,max:4,type:U.INT}}}},{key:"examples",get:function(){return[{preset:1},{preset:2},{preset:3}]}}]),e}(F),vt=function(t){function e(){S(this,e);var t=C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e));return t._count=0,t}return j(e,t),A(e,[{key:"seed",value:function(t){return this._seed=t,this}},{key:"density",value:function(t){return this._density=t,this}},{key:"persistence",value:function(t){return this._persistence=t,this}},{key:"octaves",value:function(t){return this._octaves=Math.max(1,t),this}},{key:"amplitude",value:function(t){return this._amplitude=t,this}},{key:"weight",value:function(t){return this._weight=t,this}},{key:"run",value:function(t,e,i,n){this._base=this._base||new ht({min:-1,max:1,frequency:1/this._density,octaves:this._octaves,amplitude:this._amplitude,persistence:this._persistence,random:function(){return z(this._seed,this._count++,0)}});var s=this._base.scaled2D(e,i),r=e+this._weight*s,o=i+this._weight*s;t.set(n.getPixelBilinear(r,o))}}],[{key:"params",get:function(){return{seed:{val:1,type:U.INT,min:1,max:65535},density:{val:32,min:X},amplitude:{val:1,min:X,max:2},persistence:{val:.5,min:Number.EPSILON,max:2},octaves:{val:1,min:1,type:U.INT,max:8},weight:{val:4,min:Number.EPSILON}}}},{key:"examples",get:function(){return[{seed:1,density:32,amplitude:.5,persistence:.75,octaves:4},{seed:1,density:128,amplitude:.5,persistence:.75,octaves:1,weight:32},{seed:1,density:32,amplitude:.5,persistence:.75,octaves:1,weight:32}]}}]),e}(F),yt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return j(e,t),A(e,[{key:"repeat",value:function(t){return this._gradient=this._gradient||new Y,this._gradient.setRepeat(t),this}},{key:"interpolation",value:function(t){return this._gradient=this._gradient||new Y,this._gradient.setInterpolation(t),this}},{key:"point",value:function(t,e){return this._gradient=this._gradient||new Y,this._gradient.addPoint(t,e),this}},{key:"run",value:function(t,e,i,n){var s=n.getPixelNearest(e,i),r=this._gradient.getColorAt(s[0])[0],o=this._gradient.getColorAt(s[1])[1],a=this._gradient.getColorAt(s[2])[2];t[0]=r,t[1]=o,t[2]=a}}],[{key:"params",get:function(){return{repeat:{val:!0,type:U.BOOLEAN},interpolation:{val:1,type:U.INTERPOLATION},point:{val:null,type:U.COLOR_POINT}}}}]),e}(F),dt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return j(e,t),A(e,[{key:"run",value:function(t,e,i,n){var s=n.getPixelNearest(e,i),r=.2126*s[0]+.7152*s[1]+.0722*s[2];t[0]=r,t[1]=r,t[2]=r}}]),e}(F),mt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return j(e,t),A(e,[{key:"multiplier",value:function(t){return this._multiplier=t,this}},{key:"offset",value:function(t){return this._offset=t,this}},{key:"run",value:function(t,e,i,n){if(!this._init){for(var s=-(1/0),r=1/0,o=0,a=n.array.length;o<a;o++)o%4!==3&&(s=n.array[o]>s?n.array[o]:s,r=n.array[o]<r?n.array[o]:r);this._offset=-r,this._multiplier=1/(s-r),this._init=!0}var u=n.getPixelNearest(e,i);t[0]=(u[0]+this._offset)*this._multiplier,t[1]=(u[1]+this._offset)*this._multiplier,t[2]=(u[2]+this._offset)*this._multiplier}}],[{key:"params",get:function(){return{multiplier:{val:1},offset:{val:0}}}}]),e}(F),gt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t,e){return this._size=[t,e],this}},{key:"run",value:function(t,e,i,n){var s=this._size[0]*Math.floor(e/this._size[0]),r=this._size[1]*Math.floor(i/this._size[1]);t.set(n.getPixelNearest(s,r))}}],[{key:"params",get:function(){return{size:{val:[2,2],type:U.INT,min:2,max:256}}}}]),e}(F),kt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"step",value:function(t){return this._step=Math.max(t,2),this}},{key:"run",value:function(t,e,i,n){var s=n.getPixelNearest(e,i);t[0]=Math.floor(255*Math.floor(255*s[0]/(255/this._step))/(this._step-1))/255,t[1]=Math.floor(255*Math.floor(255*s[1]/(255/this._step))/(this._step-1))/255,t[2]=Math.floor(255*Math.floor(255*s[2]/(255/this._step))/(this._step-1))/255}}],[{key:"params",get:function(){return{step:{val:2}}}}]),e}(F),Ot=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"size",value:function(t,e){return this._size=[Math.max(Number.EPSILON,t)/Math.PI/2,Math.max(Number.EPSILON,e)/Math.PI/2],this}},{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"amplitude",value:function(t,e){return this._amplitude=[t,e],this}},{key:"run",value:function(t,e,i,n){var s=e+Math.sin(i/this._size[0]+this._offset[0])*this._amplitude[0],r=i+Math.sin(e/this._size[1]+this._offset[1])*this._amplitude[1];t.set(n.getPixelBilinear(s,r))}}],[{key:"params",get:function(){return{size:{val:[32,32],min:X},offset:{val:[0,0]},amplitude:{val:[8,8],min:X}}}},{key:"examples",get:function(){return[{size:[128,128],offset:[0,0],amplitude:[64,64]},{size:[256,256],offset:[0,0],amplitude:[32,32]}]}}]),e}(F),wt=Math.PI/180,Pt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"angle",value:function(t){return this._angle=E(t),
this}},{key:"scale",value:function(t,e){if(0!==t&&0!==e)return this._scale=[t,e],this}},{key:"run",value:function(t,e,i,n,s,r){var o=e-s/2,a=i-r/2,u=o*(Math.cos(this._angle)/this._scale[0])+a*-(Math.sin(this._angle)/this._scale[0]),h=o*(Math.sin(this._angle)/this._scale[1])+a*(Math.cos(this._angle)/this._scale[1]);u+=this._offset[0]+s/2,h+=this._offset[1]+r/2,t.set(n.getPixelBilinear(u,h))}}],[{key:"params",get:function(){return{offset:{val:[0,0]},angle:{val:0,min:0,max:360},scale:{val:[1,1]}}}},{key:"examples",get:function(){return[{offset:[0,0],angle:45,scale:[2,2]}]}}]),e}(F),xt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"weight",value:function(t){return this._weight=t,this}},{key:"size",value:function(t){return this._size=t,this}},{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"run",value:function(t,e,i,n){var s=b(e,i,this._offset[0],this._offset[1]),r=void 0,o=void 0;if(s<this._size){s=Math.pow(this._size-s,2)/this._size;var a=2*Math.PI*(s/(this._size/this._weight));r=(e-this._offset[0])*Math.cos(a)-(i-this._offset[0])*Math.sin(a)+this._offset[0]+.5,o=(i-this._offset[1])*Math.cos(a)+(e-this._offset[1])*Math.sin(a)+this._offset[1]+.5}else r=e,o=i;t.set(n.getPixelBilinear(r,o))}}],[{key:"params",get:function(){return{weight:{val:.5,min:-1,max:1},size:{val:128},offset:{val:[128,128]}}}}]),e}(F),Nt=Object.freeze({Abs:ct,Copy:pt,Convolution:_t,Distort:vt,GradientMap:yt,Grayscale:dt,Normalize:mt,Pixelate:gt,Posterize:kt,SineDistort:Ot,Transform:Pt,Twirl:xt}),bt=function(t){function e(){return S(this,e),C(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return j(e,t),A(e,[{key:"offset",value:function(t,e){return this._offset=[t,e],this}},{key:"repeat",value:function(t){return this._repeat=t,this}},{key:"texture",value:function(t){return this._srcTex=t.buffer,this}},{key:"run",value:function(t,e,i,n){this._srcTex=this._srcTex||n;var s=this._srcTex.width,r=this._srcTex.height,o=Math.floor(e-this._offset[0]),a=Math.floor(i-this._offset[1]);if(o>=s||a>=r||o<0||a<0)if(this._repeat){var u=void 0,h=void 0,l=s-1,f=r-1;1===this._repeat?(u=P(o,0,s),h=P(a,0,r)):2===this._repeat?(u=x(o,0,l),h=x(a,0,f)):3===this._repeat&&(u=N(o,0,l),h=N(a,0,f)),t.set(this._srcTex.getPixelNearest(u,h))}else t[0]=0,t[1]=0,t[2]=0;else t.set(this._srcTex.getPixelNearest(o,a))}}],[{key:"params",get:function(){return{offset:{val:[0,0]},repeat:{val:!1,type:U.BOOLEAN},texture:{val:null,type:U.TEXTURE}}}}]),e}(F),Mt=Object.freeze({PutTexture:bt}),zt={Generators:ft,Filters:Nt,Mixers:Mt},It=D,Et="2.0.0",Tt=Object.freeze({Operations:It,version:Et,Texture:B,Buffer:R,Program:F,Type:U,EPSILON:X,ColorInterpolatorMethod:V,Programs:zt,bufferToCanvas:T,Number:H,SinX:J,SinY:K,Or:Q,Xor:W,Rect:Z,Circle:$,CheckerBoard:tt,LinearGradient:et,RadialGradient:it,Noise:nt,NoiseFractal:st,CellularNoise:rt,CellularFractal:ot,VoronoiNoise:at,VoronoiFractal:ut,SimplexNoise:lt,Abs:ct,Copy:pt,Convolution:_t,Distort:vt,GradientMap:yt,Grayscale:dt,Normalize:mt,Pixelate:gt,Posterize:kt,SineDistort:Ot,Transform:Pt,Twirl:xt,PutTexture:bt}),Lt="w",St="h";self.TG=Tt,self.addEventListener("message",function(t){var e=t.data,i=L(e.fnc),n=!0,s=void 0,r=void 0,o=void 0;e.test&&(s=i(e.test[0],e.test[1]),n=!B.isSingleColor(s.toArrayBuffer())),n&&(r=performance.now(),o=i(e.width,e.height).toArrayBuffer(),r=performance.now()-r);var a={buffer:o,passed:n,time:r,version:Et};Object.keys(e).forEach(function(t){a[t]=e[t]}),o?self.postMessage(a,[o]):self.postMessage(a)})});
//# sourceMappingURL=texgen-worker.js.map