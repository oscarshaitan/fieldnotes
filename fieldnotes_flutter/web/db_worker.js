(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.qT(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.u(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.ln(b)
return new s(c,this)}:function(){if(s===null)s=A.ln(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.ln(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
ls(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ky(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.lq==null){A.qG()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.b(A.l4("Return interceptor for "+A.w(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.jD
if(o==null)o=$.jD=A.kx(n)
p=q[o]}if(p!=null)return p
p=A.qL(a)
if(p!=null)return p
if(typeof a=="function")return B.a8
s=Object.getPrototypeOf(a)
if(s==null)return B.F
if(s===Object.prototype)return B.F
if(typeof q=="function"){o=$.jD
if(o==null)o=$.jD=A.kx(n)
Object.defineProperty(q,o,{value:B.v,enumerable:false,writable:true,configurable:true})
return B.v}return B.v},
lQ(a,b){if(a<0||a>4294967295)throw A.b(A.ac(a,0,4294967295,"length",null))
return J.o1(new Array(a),b)},
o1(a,b){var s=A.u(a,b.h("q<0>"))
s.$flags=1
return s},
o2(a,b){return J.nr(a,b)},
bD(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cI.prototype
return J.ej.prototype}if(typeof a=="string")return J.aS.prototype
if(a==null)return J.cJ.prototype
if(typeof a=="boolean")return J.ei.prototype
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a9.prototype
if(typeof a=="symbol")return J.bM.prototype
if(typeof a=="bigint")return J.a4.prototype
return a}if(a instanceof A.d)return a
return J.ky(a)},
cp(a){if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a9.prototype
if(typeof a=="symbol")return J.bM.prototype
if(typeof a=="bigint")return J.a4.prototype
return a}if(a instanceof A.d)return a
return J.ky(a)},
bE(a){if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a9.prototype
if(typeof a=="symbol")return J.bM.prototype
if(typeof a=="bigint")return J.a4.prototype
return a}if(a instanceof A.d)return a
return J.ky(a)},
qB(a){if(typeof a=="number")return J.bL.prototype
if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(!(a instanceof A.d))return J.bm.prototype
return a},
qC(a){if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(!(a instanceof A.d))return J.bm.prototype
return a},
mR(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.a9.prototype
if(typeof a=="symbol")return J.bM.prototype
if(typeof a=="bigint")return J.a4.prototype
return a}if(a instanceof A.d)return a
return J.ky(a)},
M(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bD(a).T(a,b)},
nq(a,b){if(typeof b==="number")if(Array.isArray(a)||A.mT(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bE(a).n(a,b)},
ly(a,b,c){if(typeof b==="number")if((Array.isArray(a)||A.mT(a,a[v.dispatchPropertyName]))&&!(a.$flags&2)&&b>>>0===b&&b<a.length)return a[b]=c
return J.bE(a).q(a,b,c)},
lz(a,b){return J.bE(a).G(a,b)},
ct(a,b,c){return J.mR(a).dM(a,b,c)},
nr(a,b){return J.qB(a).a_(a,b)},
kP(a,b){return J.bE(a).C(a,b)},
ns(a){return J.mR(a).ga9(a)},
a8(a){return J.bD(a).gv(a)},
an(a){return J.bE(a).gt(a)},
bI(a){return J.cp(a).gj(a)},
nt(a){return J.bD(a).gD(a)},
nu(a,b,c){return J.bE(a).e6(a,b,c)},
nv(a,b,c,d,e){return J.bE(a).F(a,b,c,d,e)},
kQ(a,b){return J.bE(a).U(a,b)},
nw(a,b){return J.qC(a).eu(a,b)},
aN(a){return J.bD(a).i(a)},
ef:function ef(){},
ei:function ei(){},
cJ:function cJ(){},
I:function I(){},
aT:function aT(){},
ex:function ex(){},
bm:function bm(){},
a9:function a9(){},
a4:function a4(){},
bM:function bM(){},
q:function q(a){this.$ti=a},
eh:function eh(){},
hu:function hu(a){this.$ti=a},
dQ:function dQ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bL:function bL(){},
cI:function cI(){},
ej:function ej(){},
aS:function aS(){}},A={kW:function kW(){},
lF(a,b,c){if(t.Q.b(a))return new A.dg(a,b.h("@<0>").N(c).h("dg<1,2>"))
return new A.b9(a,b.h("@<0>").N(c).h("b9<1,2>"))},
lR(a){return new A.be("Field '"+a+"' has been assigned during initialization.")},
lS(a){return new A.be("Field '"+a+"' has not been initialized.")},
o7(a){return new A.be("Field '"+a+"' has already been initialized.")},
aX(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
l3(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dO(a,b,c){return a},
lr(a){var s,r
for(s=$.bB.length,r=0;r<s;++r)if(a===$.bB[r])return!0
return!1},
i_(a,b,c,d){A.aj(b,"start")
if(c!=null){A.aj(c,"end")
if(b>c)A.y(A.ac(b,0,c,"start",null))}return new A.d3(a,b,c,d.h("d3<0>"))},
oc(a,b,c,d){if(t.Q.b(a))return new A.cC(a,b,c.h("@<0>").N(d).h("cC<1,2>"))
return new A.bg(a,b,c.h("@<0>").N(d).h("bg<1,2>"))},
m3(a,b,c){var s="count"
if(t.Q.b(a)){A.fg(b,s)
A.aj(b,s)
return new A.bJ(a,b,c.h("bJ<0>"))}A.fg(b,s)
A.aj(b,s)
return new A.aH(a,b,c.h("aH<0>"))},
eg(){return new A.au("No element")},
lP(){return new A.au("Too few elements")},
b_:function b_(){},
dW:function dW(a,b){this.a=a
this.$ti=b},
b9:function b9(a,b){this.a=a
this.$ti=b},
dg:function dg(a,b){this.a=a
this.$ti=b},
dd:function dd(){},
aA:function aA(a,b){this.a=a
this.$ti=b},
be:function be(a){this.a=a},
kF:function kF(){},
hP:function hP(){},
n:function n(){},
a6:function a6(){},
d3:function d3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bO:function bO(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bg:function bg(a,b,c){this.a=a
this.b=b
this.$ti=c},
cC:function cC(a,b,c){this.a=a
this.b=b
this.$ti=c},
en:function en(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
aF:function aF(a,b,c){this.a=a
this.b=b
this.$ti=c},
d8:function d8(a,b,c){this.a=a
this.b=b
this.$ti=c},
d9:function d9(a,b){this.a=a
this.b=b},
aH:function aH(a,b,c){this.a=a
this.b=b
this.$ti=c},
bJ:function bJ(a,b,c){this.a=a
this.b=b
this.$ti=c},
eE:function eE(a,b){this.a=a
this.b=b},
cD:function cD(a){this.$ti=a},
e6:function e6(){},
cG:function cG(){},
cY:function cY(a,b){this.a=a
this.$ti=b},
dI:function dI(){},
n2(a){var s=A.n1(a)
if(s!=null)return s
return"minified:"+a},
mT(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
w(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.aN(a)
return s},
cW(a){var s,r=$.lT
if(r==null)r=$.lT=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
ey(a){var s,r,q,p
if(a instanceof A.d)return A.af(A.bF(a),null)
s=J.bD(a)
if(s===B.a6||s===B.a9||t.ak.b(a)){r=B.w(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.af(A.bF(a),null)},
m_(a){var s,r,q
if(a==null||typeof a=="number"||A.kn(a))return J.aN(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.ba)return a.i(0)
if(a instanceof A.dv)return a.dH(!0)
s=$.nn()
for(r=0;r<1;++r){q=s[r].i6(a)
if(q!=null)return q}return"Instance of '"+A.ey(a)+"'"},
oj(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
bk(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.a.A(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.ac(a,0,1114111,null,null))},
bj(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
lZ(a){var s=A.bj(a).getFullYear()+0
return s},
lX(a){var s=A.bj(a).getMonth()+1
return s},
lU(a){var s=A.bj(a).getDate()+0
return s},
lV(a){var s=A.bj(a).getHours()+0
return s},
lW(a){var s=A.bj(a).getMinutes()+0
return s},
lY(a){var s=A.bj(a).getSeconds()+0
return s},
oh(a){var s=A.bj(a).getMilliseconds()+0
return s},
oi(a){var s=A.bj(a).getDay()+0
return B.a.ad(s+6,7)+1},
og(a){var s=a.$thrownJsError
if(s==null)return null
return A.W(s)},
ez(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.L(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
lp(a,b){var s,r="index",q=null
if(!A.lj(b))return new A.ah(!0,b,r,q)
s=J.bI(a)
if(b<0||b>=s)return A.ec(b,s,a,q,r)
return new A.bS(q,q,!0,b,r,"Value not in range")},
qy(a,b,c){if(a>c)return A.ac(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ac(b,a,c,"end",null)
return new A.ah(!0,b,"end",null)},
mN(a){return new A.ah(!0,a,null,null)},
b(a){return A.L(a,new Error())},
L(a,b){var s
if(a==null)a=new A.aI()
b.dartException=a
s=A.qV
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
qV(){return J.aN(this.dartException)},
y(a,b){throw A.L(a,b==null?new Error():b)},
r(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.y(A.pt(a,b,c),s)},
pt(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.d5("'"+s+"': Cannot "+o+" "+l+k+n)},
R(a){throw A.b(A.a5(a))},
aJ(a){var s,r,q,p,o,n
a=A.qP(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.u([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.ia(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
ib(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
m9(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
kX(a,b){var s=b==null,r=s?null:b.method
return new A.ek(a,r,s?null:b.receiver)},
S(a){if(a==null)return new A.hE(a)
if(a instanceof A.cE)return A.b5(a,a.a)
if(typeof a!=="object")return a
if("dartException" in a)return A.b5(a,a.dartException)
return A.qb(a)},
b5(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
qb(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.a.A(r,16)&8191)===10)switch(q){case 438:return A.b5(a,A.kX(A.w(s)+" (Error "+q+")",null))
case 445:case 5007:A.w(s)
return A.b5(a,new A.cU())}}if(a instanceof TypeError){p=$.n6()
o=$.n7()
n=$.n8()
m=$.n9()
l=$.nc()
k=$.nd()
j=$.nb()
$.na()
i=$.nf()
h=$.ne()
g=p.X(s)
if(g!=null)return A.b5(a,A.kX(s,g))
else{g=o.X(s)
if(g!=null){g.method="call"
return A.b5(a,A.kX(s,g))}else if(n.X(s)!=null||m.X(s)!=null||l.X(s)!=null||k.X(s)!=null||j.X(s)!=null||m.X(s)!=null||i.X(s)!=null||h.X(s)!=null)return A.b5(a,new A.cU())}return A.b5(a,new A.eG(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d1()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.b5(a,new A.ah(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d1()
return a},
W(a){var s
if(a instanceof A.cE)return a.b
if(a==null)return new A.dz(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dz(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
mW(a){if(a==null)return J.a8(a)
if(typeof a=="object")return A.cW(a)
return J.a8(a)},
pD(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(A.nQ("Unsupported number of arguments for wrapped closure"))},
b4(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.qw(a,b)
a.$identity=s
return s},
qw(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.pD)},
nF(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.hV().constructor.prototype):Object.create(new A.cw(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.lH(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.nB(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.lH(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
nB(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ny)}throw A.b("Error in functionType of tearoff")},
nC(a,b,c,d){var s=A.lE
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
lH(a,b,c,d){if(c)return A.nE(a,b,d)
return A.nC(b.length,d,a,b)},
nD(a,b,c,d){var s=A.lE,r=A.nz
switch(b?-1:a){case 0:throw A.b(new A.eB("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
nE(a,b,c){var s,r
if($.lC==null)$.lC=A.lB("interceptor")
if($.lD==null)$.lD=A.lB("receiver")
s=b.length
r=A.nD(s,c,a,b)
return r},
ln(a){return A.nF(a)},
ny(a,b){return A.dG(v.typeUniverse,A.bF(a.a),b)},
lE(a){return a.a},
nz(a){return a.b},
lB(a){var s,r,q,p=new A.cw("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.X("Field name "+a+" not found.",null))},
kx(a){return v.getIsolateTag(a)},
qX(a,b){var s=$.l
if(s===B.b)return a
return s.cu(a,b)},
n_(){return v.G},
rC(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
qL(a){var s,r,q,p,o,n=$.mS.$1(a),m=$.kw[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kD[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=$.mM.$2(a,n)
if(q!=null){m=$.kw[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kD[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.kE(s)
$.kw[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.kD[n]=s
return s}if(p==="-"){o=A.kE(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.mX(a,s)
if(p==="*")throw A.b(A.l4(n))
if(v.leafTags[n]===true){o=A.kE(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.mX(a,s)},
mX(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.ls(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
kE(a){return J.ls(a,!1,null,!!a.$iaa)},
qN(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.kE(s)
else return J.ls(s,c,null,null)},
qG(){if(!0===$.lq)return
$.lq=!0
A.qH()},
qH(){var s,r,q,p,o,n,m,l
$.kw=Object.create(null)
$.kD=Object.create(null)
A.qF()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.mZ.$1(o)
if(n!=null){m=A.qN(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
qF(){var s,r,q,p,o,n,m=B.L()
m=A.cn(B.M,A.cn(B.N,A.cn(B.x,A.cn(B.x,A.cn(B.O,A.cn(B.P,A.cn(B.Q(B.w),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.mS=new A.kA(p)
$.mM=new A.kB(o)
$.mZ=new A.kC(n)},
cn(a,b){return a(b)||b},
qx(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
o6(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.kS("Illegal RegExp pattern ("+String(o)+")",a,null))},
qP(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
V:function V(a,b){this.a=a
this.b=b},
dw:function dw(a,b){this.a=a
this.b=b},
dx:function dx(a,b){this.a=a
this.b=b},
ce:function ce(a,b){this.a=a
this.b=b},
f_:function f_(a,b){this.a=a
this.b=b},
cz:function cz(){},
cA:function cA(a,b,c){this.a=a
this.b=b
this.$ti=c},
dm:function dm(a,b){this.a=a
this.$ti=b},
eV:function eV(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cZ:function cZ(){},
ia:function ia(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cU:function cU(){},
ek:function ek(a,b,c){this.a=a
this.b=b
this.c=c},
eG:function eG(a){this.a=a},
hE:function hE(a){this.a=a},
cE:function cE(a,b){this.a=a
this.b=b},
dz:function dz(a){this.a=a
this.b=null},
ba:function ba(){},
fs:function fs(){},
ft:function ft(){},
i0:function i0(){},
hV:function hV(){},
cw:function cw(a,b){this.a=a
this.b=b},
eB:function eB(a){this.a=a},
bd:function bd(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hv:function hv(a){this.a=a},
hw:function hw(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aD:function aD(a,b){this.a=a
this.$ti=b},
em:function em(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
bN:function bN(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
cK:function cK(a,b){this.a=a
this.$ti=b},
el:function el(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
kA:function kA(a){this.a=a},
kB:function kB(a){this.a=a},
kC:function kC(a){this.a=a},
dv:function dv(){},
eZ:function eZ(){},
ht:function ht(a,b){var _=this
_.a=a
_.b=b
_.e=_.c=null},
jF:function jF(a){this.b=a},
qT(a){throw A.L(A.lR(a),new Error())},
P(){throw A.L(A.lS(""),new Error())},
n0(){throw A.L(A.o7(""),new Error())},
qU(){throw A.L(A.lR(""),new Error())},
oK(){var s=new A.eK("")
return s.b=s},
iK(a){var s=new A.eK(a)
return s.b=s},
eK:function eK(a){this.a=a
this.b=null},
pr(a){return a},
fb(a,b,c){},
od(a,b,c){var s
A.fb(a,b,c)
s=new DataView(a,b)
return s},
aG(a,b,c){A.fb(a,b,c)
c=B.a.B(a.byteLength-b,4)
return new Int32Array(a,b,c)},
oe(a,b,c){A.fb(a,b,c)
return new Uint32Array(a,b,c)},
of(a){return new Uint8Array(a)},
ai(a,b,c){A.fb(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
aL(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.lp(b,a))},
ps(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.b(A.qy(a,b,c))
return b},
bQ:function bQ(){},
bP:function bP(){},
cS:function cS(){},
f7:function f7(a){this.a=a},
cQ:function cQ(){},
bR:function bR(){},
cR:function cR(){},
ab:function ab(){},
ep:function ep(){},
eq:function eq(){},
er:function er(){},
es:function es(){},
et:function et(){},
eu:function eu(){},
ev:function ev(){},
cT:function cT(){},
bi:function bi(){},
dq:function dq(){},
dr:function dr(){},
ds:function ds(){},
dt:function dt(){},
l0(a,b){var s=b.c
return s==null?b.c=A.dE(a,"x",[b.x]):s},
m1(a){var s=a.w
if(s===6||s===7)return A.m1(a.x)
return s===11||s===12},
oo(a){return a.as},
ar(a){return A.k0(v.typeUniverse,a,!1)},
bA(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bA(a1,s,a3,a4)
if(r===s)return a2
return A.mq(a1,r,!0)
case 7:s=a2.x
r=A.bA(a1,s,a3,a4)
if(r===s)return a2
return A.mp(a1,r,!0)
case 8:q=a2.y
p=A.cm(a1,q,a3,a4)
if(p===q)return a2
return A.dE(a1,a2.x,p)
case 9:o=a2.x
n=A.bA(a1,o,a3,a4)
m=a2.y
l=A.cm(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ld(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cm(a1,j,a3,a4)
if(i===j)return a2
return A.mr(a1,k,i)
case 11:h=a2.x
g=A.bA(a1,h,a3,a4)
f=a2.y
e=A.q7(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.mo(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cm(a1,d,a3,a4)
o=a2.x
n=A.bA(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.le(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.dS("Attempted to substitute unexpected RTI kind "+a0))}},
cm(a,b,c,d){var s,r,q,p,o=b.length,n=A.k4(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bA(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
q8(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.k4(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bA(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
q7(a,b,c,d){var s,r=b.a,q=A.cm(a,r,c,d),p=b.b,o=A.cm(a,p,c,d),n=b.c,m=A.q8(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.eR()
s.a=q
s.b=o
s.c=m
return s},
u(a,b){a[v.arrayRti]=b
return a},
mQ(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.qE(s)
return a.$S()}return null},
qI(a,b){var s
if(A.m1(b))if(a instanceof A.ba){s=A.mQ(a)
if(s!=null)return s}return A.bF(a)},
bF(a){if(a instanceof A.d)return A.A(a)
if(Array.isArray(a))return A.ay(a)
return A.lg(J.bD(a))},
ay(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
A(a){var s=a.$ti
return s!=null?s:A.lg(a)},
lg(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.pB(a,s)},
pB(a,b){var s=a instanceof A.ba?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.p7(v.typeUniverse,s.name)
b.$ccache=r
return r},
qE(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.k0(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
qD(a){return A.bC(A.A(a))},
lm(a){var s
if(a instanceof A.dv)return A.qA(a.$r,a.dk())
s=a instanceof A.ba?A.mQ(a):null
if(s!=null)return s
if(t.dm.b(a))return J.nt(a).a
if(Array.isArray(a))return A.ay(a)
return A.bF(a)},
bC(a){var s=a.r
return s==null?a.r=new A.k_(a):s},
qA(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
s=A.dG(v.typeUniverse,A.lm(q[0]),"@<0>")
for(r=1;r<p;++r)s=A.mt(v.typeUniverse,s,A.lm(q[r]))
return A.dG(v.typeUniverse,s,a)},
as(a){return A.bC(A.k0(v.typeUniverse,a,!1))},
pA(a){var s=this
s.b=A.q5(s)
return s.b(a)},
q5(a){var s,r,q,p
if(a===t.K)return A.pJ
if(A.bG(a))return A.pN
s=a.w
if(s===6)return A.py
if(s===1)return A.mE
if(s===7)return A.pE
r=A.q4(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bG)){a.f="$i"+q
if(q==="t")return A.pH
if(a===t.m)return A.pG
return A.pM}}else if(s===10){p=A.qx(a.x,a.y)
return p==null?A.mE:p}return A.pw},
q4(a){if(a.w===8){if(a===t.S)return A.lj
if(a===t.i||a===t.o)return A.pI
if(a===t.N)return A.pL
if(a===t.y)return A.kn}return null},
pz(a){var s=this,r=A.pv
if(A.bG(s))r=A.pi
else if(s===t.K)r=A.pg
else if(A.cq(s)){r=A.px
if(s===t.I)r=A.pd
else if(s===t.dk)r=A.ph
else if(s===t.a6)r=A.pc
else if(s===t.cg)r=A.pf
else if(s===t.cD)r=A.mx
else if(s===t.A)r=A.my}else if(s===t.S)r=A.a_
else if(s===t.N)r=A.dJ
else if(s===t.y)r=A.by
else if(s===t.o)r=A.pe
else if(s===t.i)r=A.bz
else if(s===t.m)r=A.a0
s.a=r
return s.a(a)},
pw(a){var s=this
if(a==null)return A.cq(s)
return A.qK(v.typeUniverse,A.qI(a,s),s)},
py(a){if(a==null)return!0
return this.x.b(a)},
pM(a){var s,r=this
if(a==null)return A.cq(r)
s=r.f
if(a instanceof A.d)return!!a[s]
return!!J.bD(a)[s]},
pH(a){var s,r=this
if(a==null)return A.cq(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.d)return!!a[s]
return!!J.bD(a)[s]},
pG(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.d)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
mD(a){if(typeof a=="object"){if(a instanceof A.d)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
pv(a){var s=this
if(a==null){if(A.cq(s))return a}else if(s.b(a))return a
throw A.L(A.mz(a,s),new Error())},
px(a){var s=this
if(a==null||s.b(a))return a
throw A.L(A.mz(a,s),new Error())},
mz(a,b){return new A.dC("TypeError: "+A.mj(a,A.af(b,null)))},
mj(a,b){return A.hc(a)+": type '"+A.af(A.lm(a),null)+"' is not a subtype of type '"+b+"'"},
am(a,b){return new A.dC("TypeError: "+A.mj(a,b))},
pE(a){var s=this
return s.x.b(a)||A.l0(v.typeUniverse,s).b(a)},
pJ(a){return a!=null},
pg(a){if(a!=null)return a
throw A.L(A.am(a,"Object"),new Error())},
pN(a){return!0},
pi(a){return a},
mE(a){return!1},
kn(a){return!0===a||!1===a},
by(a){if(!0===a)return!0
if(!1===a)return!1
throw A.L(A.am(a,"bool"),new Error())},
pc(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.L(A.am(a,"bool?"),new Error())},
bz(a){if(typeof a=="number")return a
throw A.L(A.am(a,"double"),new Error())},
mx(a){if(typeof a=="number")return a
if(a==null)return a
throw A.L(A.am(a,"double?"),new Error())},
lj(a){return typeof a=="number"&&Math.floor(a)===a},
a_(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.L(A.am(a,"int"),new Error())},
pd(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.L(A.am(a,"int?"),new Error())},
pI(a){return typeof a=="number"},
pe(a){if(typeof a=="number")return a
throw A.L(A.am(a,"num"),new Error())},
pf(a){if(typeof a=="number")return a
if(a==null)return a
throw A.L(A.am(a,"num?"),new Error())},
pL(a){return typeof a=="string"},
dJ(a){if(typeof a=="string")return a
throw A.L(A.am(a,"String"),new Error())},
ph(a){if(typeof a=="string")return a
if(a==null)return a
throw A.L(A.am(a,"String?"),new Error())},
a0(a){if(A.mD(a))return a
throw A.L(A.am(a,"JSObject"),new Error())},
my(a){if(a==null)return a
if(A.mD(a))return a
throw A.L(A.am(a,"JSObject?"),new Error())},
mJ(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.af(a[q],b)
return s},
pW(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.mJ(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.af(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
mB(a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=", ",a0=null
if(a3!=null){s=a3.length
if(a2==null)a2=A.u([],t.s)
else a0=a2.length
r=a2.length
for(q=s;q>0;--q)a2.push("T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a){o=o+n+a2[a2.length-1-q]
m=a3[q]
l=m.w
if(!(l===2||l===3||l===4||l===5||m===p))o+=" extends "+A.af(m,a2)}o+=">"}else o=""
p=a1.x
k=a1.y
j=k.a
i=j.length
h=k.b
g=h.length
f=k.c
e=f.length
d=A.af(p,a2)
for(c="",b="",q=0;q<i;++q,b=a)c+=b+A.af(j[q],a2)
if(g>0){c+=b+"["
for(b="",q=0;q<g;++q,b=a)c+=b+A.af(h[q],a2)
c+="]"}if(e>0){c+=b+"{"
for(b="",q=0;q<e;q+=3,b=a){c+=b
if(f[q+1])c+="required "
c+=A.af(f[q+2],a2)+" "+f[q]}c+="}"}if(a0!=null){a2.toString
a2.length=a0}return o+"("+c+") => "+d},
af(a,b){var s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){s=a.x
r=A.af(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(m===7)return"FutureOr<"+A.af(a.x,b)+">"
if(m===8){p=A.qa(a.x)
o=a.y
return o.length>0?p+("<"+A.mJ(o,b)+">"):p}if(m===10)return A.pW(a,b)
if(m===11)return A.mB(a,b,null)
if(m===12)return A.mB(a.x,b,a.y)
if(m===13){n=a.x
return b[b.length-1-n]}return"?"},
qa(a){var s=A.n1(a)
if(s!=null)return s
return"minified:"+a},
p8(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
p7(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.k0(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dF(a,5,"#")
q=A.k4(s)
for(p=0;p<s;++p)q[p]=r
o=A.dE(a,b,q)
n[b]=o
return o}else return m},
p6(a,b){return A.mv(a.tR,b)},
p5(a,b){return A.mv(a.eT,b)},
k0(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.ms(a,null,b,!1)
r.set(b,s)
return s},
dG(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.ms(a,b,c,!0)
q.set(c,r)
return r},
mt(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ld(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
ms(a,b,c,d){return A.oX(A.oR(a,b,c,d))},
b2(a,b){b.a=A.pz
b.b=A.pA
return b},
dF(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.ao(null,null)
s.w=b
s.as=c
r=A.b2(a,s)
a.eC.set(c,r)
return r},
mq(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.p3(a,b,r,c)
a.eC.set(r,s)
return s},
p3(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bG(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.cq(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.ao(null,null)
q.w=6
q.x=b
q.as=c
return A.b2(a,q)},
mp(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.p1(a,b,r,c)
a.eC.set(r,s)
return s},
p1(a,b,c,d){var s,r
if(d){s=b.w
if(A.bG(b)||b===t.K)return b
else if(s===1)return A.dE(a,"x",[b])
else if(b===t.P||b===t.T)return t.eH}r=new A.ao(null,null)
r.w=7
r.x=b
r.as=c
return A.b2(a,r)},
p4(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.ao(null,null)
s.w=13
s.x=b
s.as=q
r=A.b2(a,s)
a.eC.set(q,r)
return r},
dD(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
p0(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
dE(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dD(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.ao(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.b2(a,r)
a.eC.set(p,q)
return q},
ld(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dD(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.ao(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.b2(a,o)
a.eC.set(q,n)
return n},
mr(a,b,c){var s,r,q="+"+(b+"("+A.dD(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.ao(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.b2(a,s)
a.eC.set(q,r)
return r},
mo(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dD(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dD(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.p0(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.ao(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.b2(a,p)
a.eC.set(r,o)
return o},
le(a,b,c,d){var s,r=b.as+("<"+A.dD(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.p2(a,b,c,r,d)
a.eC.set(r,s)
return s},
p2(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.k4(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bA(a,b,r,0)
m=A.cm(a,c,r,0)
return A.le(a,n,m,c!==m)}}l=new A.ao(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.b2(a,l)},
oR(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
oX(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.oT(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.ml(a,r,l,k,!1)
else if(q===46)r=A.ml(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bu(a.u,a.e,k.pop()))
break
case 94:k.push(A.p4(a.u,k.pop()))
break
case 35:k.push(A.dF(a.u,5,"#"))
break
case 64:k.push(A.dF(a.u,2,"@"))
break
case 126:k.push(A.dF(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.oV(a,k)
break
case 38:A.oU(a,k)
break
case 63:p=a.u
k.push(A.mq(p,A.bu(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.mp(p,A.bu(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.oS(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.mm(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.oY(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.bu(a.u,a.e,m)},
oT(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
ml(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.p8(s,o.x)[p]
if(n==null)A.y('No "'+p+'" in "'+A.oo(o)+'"')
d.push(A.dG(s,o,n))}else d.push(p)
return m},
oV(a,b){var s,r=a.u,q=A.mk(a,b),p=b.pop()
if(typeof p=="string")b.push(A.dE(r,p,q))
else{s=A.bu(r,a.e,p)
switch(s.w){case 11:b.push(A.le(r,s,q,a.n))
break
default:b.push(A.ld(r,s,q))
break}}},
oS(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.mk(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bu(p,a.e,o)
q=new A.eR()
q.a=s
q.b=n
q.c=m
b.push(A.mo(p,r,q))
return
case-4:b.push(A.mr(p,b.pop(),s))
return
default:throw A.b(A.dS("Unexpected state under `()`: "+A.w(o)))}},
oU(a,b){var s=b.pop()
if(0===s){b.push(A.dF(a.u,1,"0&"))
return}if(1===s){b.push(A.dF(a.u,4,"1&"))
return}throw A.b(A.dS("Unexpected extended operation "+A.w(s)))},
mk(a,b){var s=b.splice(a.p)
A.mm(a.u,a.e,s)
a.p=b.pop()
return s},
bu(a,b,c){if(typeof c=="string")return A.dE(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.oW(a,b,c)}else return c},
mm(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bu(a,b,c[s])},
oY(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bu(a,b,c[s])},
oW(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.dS("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.dS("Bad index "+c+" for "+b.i(0)))},
qK(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.O(a,b,null,c,null)
r.set(c,s)}return s},
O(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bG(d))return!0
s=b.w
if(s===4)return!0
if(A.bG(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.O(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.O(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.O(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.O(a,b.x,c,d,e))return!1
return A.O(a,A.l0(a,b),c,d,e)}if(s===6)return A.O(a,p,c,d,e)&&A.O(a,b.x,c,d,e)
if(q===7){if(A.O(a,b,c,d.x,e))return!0
return A.O(a,b,c,A.l0(a,d),e)}if(q===6)return A.O(a,b,c,p,e)||A.O(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.b8)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.g)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.O(a,j,c,i,e)||!A.O(a,i,e,j,c))return!1}return A.mC(a,b.x,c,d.x,e)}if(q===11){if(b===t.g)return!0
if(p)return!1
return A.mC(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.pF(a,b,c,d,e)}if(o&&q===10)return A.pK(a,b,c,d,e)
return!1},
mC(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.O(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.O(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.O(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.O(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.O(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
pF(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dG(a,b,r[o])
return A.mw(a,p,null,c,d.y,e)}return A.mw(a,b.y,null,c,d.y,e)},
mw(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.O(a,b[s],d,e[s],f))return!1
return!0},
pK(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.O(a,r[s],c,q[s],e))return!1
return!0},
cq(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.bG(a))if(s!==6)r=s===7&&A.cq(a.x)
return r},
bG(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
mv(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
k4(a){return a>0?new Array(a):v.typeUniverse.sEA},
ao:function ao(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
eR:function eR(){this.c=this.b=this.a=null},
k_:function k_(a){this.a=a},
eP:function eP(){},
dC:function dC(a){this.a=a},
oz(){var s,r,q
if(self.scheduleImmediate!=null)return A.qc()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.b4(new A.iB(s),1)).observe(r,{childList:true})
return new A.iA(s,r,q)}else if(self.setImmediate!=null)return A.qd()
return A.qe()},
oA(a){self.scheduleImmediate(A.b4(new A.iC(a),0))},
oB(a){self.setImmediate(A.b4(new A.iD(a),0))},
oC(a){A.m7(B.a0,a)},
m7(a,b){var s=B.a.B(a.a,1000)
return A.oZ(s<0?0:s,b)},
oZ(a,b){var s=new A.f6()
s.eG(a,b)
return s},
p_(a,b){var s=new A.f6()
s.eH(a,b)
return s},
i(a){return new A.db(new A.k($.l,a.h("k<0>")),a.h("db<0>"))},
h(a,b){a.$2(0,null)
b.b=!0
return b.a},
c(a,b){A.pj(a,b)},
f(a,b){b.E(a)},
e(a,b){b.ai(A.S(a),A.W(a))},
pj(a,b){var s,r,q=new A.kh(b),p=new A.ki(b)
if(a instanceof A.k)a.dG(q,p,t.z)
else{s=t.z
if(a instanceof A.k)a.ap(q,p,s)
else{r=new A.k($.l,t.eI)
r.a=8
r.c=a
r.dG(q,p,s)}}},
j(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.l.be(new A.ks(s),t.H,t.S,t.z)},
mn(a,b,c){return 0},
cu(a){var s
if(t.C.b(a)){s=a.ga6()
if(s!=null)return s}return B.i},
ea(a,b){var s,r,q,p,o,n,m,l=null
try{l=a.$0()}catch(q){s=A.S(q)
r=A.W(q)
p=new A.k($.l,b.h("k<0>"))
o=s
n=r
m=A.fc(o,n)
if(m==null)o=new A.H(o,n==null?A.cu(o):n)
else o=m
p.a7(o)
return p}return b.h("x<0>").b(l)?l:A.cc(l,b)},
hk(a,b){var s=a==null?b.a(a):a,r=new A.k($.l,b.h("k<0>"))
r.aW(s)
return r},
lM(a,b){var s,r,q,p,o,n,m,l,k,j,i={},h=null,g=!1,f=new A.k($.l,b.h("k<t<0>>"))
i.a=null
i.b=0
i.c=i.d=null
s=new A.hm(i,h,g,f)
try{for(n=J.an(a),m=t.P;n.k();){r=n.gl()
q=i.b
r.ap(new A.hl(i,q,f,b,h,g),s,m);++i.b}n=i.b
if(n===0){n=f
n.aX(A.u([],b.h("q<0>")))
return n}i.a=A.hx(n,null,!1,b.h("0?"))}catch(l){p=A.S(l)
o=A.W(l)
if(i.b===0||g){n=f
m=p
k=o
j=A.fc(m,k)
if(j==null)m=new A.H(m,k==null?A.cu(m):k)
else m=j
n.a7(m)
return n}else{i.d=p
i.c=o}}return f},
kT(a,b,c,d){var s=new A.hf(d,null,b,c),r=$.l,q=new A.k(r,c.h("k<0>"))
if(r!==B.b)s=r.be(s,c.h("0/"),t.K,t.l)
a.aV(new A.ax(q,2,null,s,a.$ti.h("@<1>").N(c).h("ax<1,2>")))
return q},
nV(a,b){var s,r,q,p=A.u([],b.h("q<dk<0>>"))
for(s=a.length,r=b.h("dk<0>"),q=0;q<a.length;a.length===s||(0,A.R)(a),++q)p.push(new A.dk(a[q],r))
if(p.length===0)return A.hk(A.u([],b.h("q<0>")),b.h("t<0>"))
s=new A.k($.l,b.h("k<t<0>>"))
A.oO(p,new A.hg(new A.F(s,b.h("F<t<0>>")),p,b))
return s},
pQ(a){return a!=null},
oO(a,b){var s,r={},q=r.a=r.b=0,p=new A.jg(r,a,b)
for(s=a.length;q<a.length;a.length===s||(0,A.R)(a),++q)a[q].fD(p)},
fc(a,b){var s,r,q,p=$.l
if(p===B.b)return null
s=p.dY(a,b)
if(s==null)return null
r=s.a
q=s.b
if(t.C.b(r))A.ez(r,q)
return s},
lh(a,b){var s
if($.l!==B.b){s=A.fc(a,b)
if(s!=null)return s}if(b==null)if(t.C.b(a)){b=a.ga6()
if(b==null){A.ez(a,B.i)
b=B.i}}else b=B.i
else if(t.C.b(a))A.ez(a,b)
return new A.H(a,b)},
oN(a,b,c){var s=new A.k(b,c.h("k<0>"))
s.a=8
s.c=a
return s},
cc(a,b){var s=new A.k($.l,b.h("k<0>"))
s.a=8
s.c=a
return s},
jm(a,b,c){var s,r,q,p={},o=p.a=a
while(s=o.a,(s&4)!==0){o=o.c
p.a=o}if(o===b){s=A.m5()
b.a7(new A.H(new A.ah(!0,o,null,"Cannot complete a future with itself"),s))
return}r=b.a&1
s=o.a=s|r
if((s&24)===0){q=b.c
b.a=b.a&1|4
b.c=o
o.dr(q)
return}if(!c)if(b.c==null)o=(s&16)===0||r!==0
else o=!1
else o=!0
if(o){q=b.b0()
b.bp(p.a)
A.bs(b,q)
return}b.a^=2
b.b.ae(new A.jn(p,b))},
bs(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g={},f=g.a=a
for(;;){s={}
r=f.a
q=(r&16)===0
p=!q
if(b==null){if(p&&(r&1)===0){r=f.c
f.b.b9(r.a,r.b)}return}s.a=b
o=b.a
for(f=b;o!=null;f=o,o=n){f.a=null
A.bs(g.a,f)
s.a=o
n=o.a}r=g.a
m=r.c
s.b=p
s.c=m
if(q){l=f.c
l=(l&1)!==0||(l&15)===8}else l=!0
if(l){k=f.b.b
if(p){f=r.b
f=!(f===k||f.ga1()===k.ga1())}else f=!1
if(f){f=g.a
r=f.c
f.b.b9(r.a,r.b)
return}j=$.l
if(j!==k)$.l=k
else j=null
f=s.a.c
if((f&15)===8)new A.jr(s,g,p).$0()
else if(q){if((f&1)!==0)new A.jq(s,m).$0()}else if((f&2)!==0)new A.jp(g,s).$0()
if(j!=null)$.l=j
f=s.c
if(f instanceof A.k){r=s.a.$ti
r=r.h("x<2>").b(f)||!r.y[1].b(f)}else r=!1
if(r){i=s.a.b
if((f.a&24)!==0){h=i.c
i.c=null
b=i.bs(h)
i.a=f.a&30|i.a&1
i.c=f.c
g.a=f
continue}else A.jm(f,i,!0)
return}}i=s.a.b
h=i.c
i.c=null
b=i.bs(h)
f=s.b
r=s.c
if(!f){i.a=8
i.c=r}else{i.a=i.a&1|16
i.c=r}g.a=i
f=i}},
pX(a,b){if(t.R.b(a))return b.be(a,t.z,t.K,t.l)
if(t.E.b(a))return b.aM(a,t.z,t.K)
throw A.b(A.b7(a,"onError",u.c))},
pP(){var s,r
for(s=$.cl;s!=null;s=$.cl){$.dL=null
r=s.b
$.cl=r
if(r==null)$.dK=null
s.a.$0()}},
q6(){$.li=!0
try{A.pP()}finally{$.dL=null
$.li=!1
if($.cl!=null)$.lv().$1(A.mO())}},
mK(a){var s=new A.eH(a),r=$.dK
if(r==null){$.cl=$.dK=s
if(!$.li)$.lv().$1(A.mO())}else $.dK=r.b=s},
q3(a){var s,r,q,p=$.cl
if(p==null){A.mK(a)
$.dL=$.dK
return}s=new A.eH(a)
r=$.dL
if(r==null){s.b=p
$.cl=$.dL=s}else{q=r.b
s.b=q
$.dL=r.b=s
if(q==null)$.dK=s}},
qS(a){var s,r=null,q=$.l
if(B.b===q){A.kr(r,r,B.b,a)
return}if(B.b===q.gcm().a)s=B.b.ga1()===q.ga1()
else s=!1
if(s){A.kr(r,r,q,q.an(a,t.H))
return}s=$.l
s.ae(s.bt(a))},
r8(a){return new A.bw(A.dO(a,"stream",t.K))},
ll(a){var s,r,q
if(a==null)return
try{a.$0()}catch(q){s=A.S(q)
r=A.W(q)
$.l.b9(s,r)}},
lb(a,b,c){var s=b==null?A.qg():b
return a.aM(s,t.H,c)},
mh(a,b){if(b==null)b=A.qi()
if(t.da.b(b))return a.be(b,t.z,t.K,t.l)
if(t.d5.b(b))return a.aM(b,t.z,t.K)
throw A.b(A.X("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
pR(a){},
pT(a,b){$.l.b9(a,b)},
pS(){},
pq(a,b,c){var s=a.p()
if(s!==$.cs())s.K(new A.kj(b,c))
else b.aB(c)},
qR(a,b,c){return A.q2(a,null,b,c)},
q2(a,b,c,d){return $.l.e2(c,b).ao(a,d)},
q0(a,b,c,d,e){A.dM(d,e)},
dM(a,b){A.q3(new A.ko(a,b))},
kp(a,b,c,d){var s,r=$.l
if(r===c)return d.$0()
$.l=c
s=r
try{r=d.$0()
return r}finally{$.l=s}},
kq(a,b,c,d,e){var s,r=$.l
if(r===c)return d.$1(e)
$.l=c
s=r
try{r=d.$1(e)
return r}finally{$.l=s}},
lk(a,b,c,d,e,f){var s,r=$.l
if(r===c)return d.$2(e,f)
$.l=c
s=r
try{r=d.$2(e,f)
return r}finally{$.l=s}},
mH(a,b,c,d){return d},
mI(a,b,c,d){return d},
mG(a,b,c,d){return d},
q_(a,b,c,d,e){return null},
kr(a,b,c,d){var s,r
if(B.b!==c){s=B.b.ga1()
r=c.ga1()
d=s!==r?c.bt(d):c.ct(d,t.H)}A.mK(d)},
pZ(a,b,c,d,e){e=c.ct(e,t.H)
return A.m7(d,e)},
pY(a,b,c,d,e){var s
e=c.iP(e,t.H,t.aF)
s=d.giT()
return A.p_(s.iN(0,0)?0:s,e)},
q1(a,b,c,d){A.mY(d)},
mF(a,b,c,d,e){var s,r=new A.eL(c.gdz(),c.gdB(),c.gdA(),c.gdu(),c.gdv(),c.gdt(),c.gdf(),c.gcm(),c.gd9(),c.gd8(),c.gds(),c.gdh(),c.gcb(),c.gdK(),c),q=d.x
if(q!=null)r.w=new A.fa(r,q)
s=d.a
if(s!=null)r.as=new A.f9(r,s)
return r},
iB:function iB(a){this.a=a},
iA:function iA(a,b,c){this.a=a
this.b=b
this.c=c},
iC:function iC(a){this.a=a},
iD:function iD(a){this.a=a},
f6:function f6(){this.c=0},
jZ:function jZ(a,b){this.a=a
this.b=b},
jY:function jY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
db:function db(a,b){this.a=a
this.b=!1
this.$ti=b},
kh:function kh(a){this.a=a},
ki:function ki(a){this.a=a},
ks:function ks(a){this.a=a},
f4:function f4(a){var _=this
_.a=a
_.e=_.d=_.c=_.b=null},
cf:function cf(a,b){this.a=a
this.$ti=b},
H:function H(a,b){this.a=a
this.b=b},
hm:function hm(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hl:function hl(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hf:function hf(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hg:function hg(a,b,c){this.a=a
this.b=b
this.c=c},
cV:function cV(a,b){this.c=a
this.d=b},
dk:function dk(a,b){var _=this
_.a=a
_.c=_.b=null
_.$ti=b},
jh:function jh(a,b){this.a=a
this.b=b},
ji:function ji(a,b){this.a=a
this.b=b},
jg:function jg(a,b,c){this.a=a
this.b=b
this.c=c},
c4:function c4(){},
aw:function aw(a,b){this.a=a
this.$ti=b},
F:function F(a,b){this.a=a
this.$ti=b},
ax:function ax(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
k:function k(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
jj:function jj(a,b){this.a=a
this.b=b},
jo:function jo(a,b){this.a=a
this.b=b},
jn:function jn(a,b){this.a=a
this.b=b},
jl:function jl(a,b){this.a=a
this.b=b},
jk:function jk(a,b){this.a=a
this.b=b},
jr:function jr(a,b,c){this.a=a
this.b=b
this.c=c},
js:function js(a,b){this.a=a
this.b=b},
jt:function jt(a){this.a=a},
jq:function jq(a,b){this.a=a
this.b=b},
jp:function jp(a,b){this.a=a
this.b=b},
eH:function eH(a){this.a=a
this.b=null},
N:function N(){},
hY:function hY(a,b){this.a=a
this.b=b},
hZ:function hZ(a,b){this.a=a
this.b=b},
hW:function hW(a){this.a=a},
hX:function hX(a,b,c){this.a=a
this.b=b
this.c=c},
bv:function bv(){},
jU:function jU(a){this.a=a},
jT:function jT(a){this.a=a},
f5:function f5(){},
eI:function eI(){},
c2:function c2(){},
cg:function cg(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
c7:function c7(a,b){this.a=a
this.$ti=b},
c8:function c8(a,b,c,d,e,f,g){var _=this
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null
_.$ti=g},
ad:function ad(){},
iJ:function iJ(a,b,c){this.a=a
this.b=b
this.c=c},
iI:function iI(a){this.a=a},
dA:function dA(){},
eO:function eO(){},
b0:function b0(a){this.b=a
this.a=null},
de:function de(a,b){this.b=a
this.c=b
this.a=null},
j8:function j8(){},
du:function du(){this.a=0
this.c=this.b=null},
jI:function jI(a,b){this.a=a
this.b=b},
bw:function bw(a){this.a=null
this.b=a
this.c=!1},
aK:function aK(a,b){this.b=a
this.$ti=b},
jG:function jG(a,b){this.a=a
this.b=b},
dp:function dp(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
kj:function kj(a,b){this.a=a
this.b=b},
di:function di(){},
cb:function cb(a,b,c,d,e,f,g){var _=this
_.w=a
_.x=null
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null
_.$ti=g},
bt:function bt(a,b,c){this.b=a
this.a=b
this.$ti=c},
kd:function kd(a,b){this.a=a
this.b=b},
kf:function kf(a,b){this.a=a
this.b=b},
ke:function ke(a,b){this.a=a
this.b=b},
kb:function kb(a,b){this.a=a
this.b=b},
kc:function kc(a,b){this.a=a
this.b=b},
ka:function ka(a,b){this.a=a
this.b=b},
k7:function k7(a,b){this.a=a
this.b=b},
fa:function fa(a,b){this.a=a
this.b=b},
k6:function k6(){},
k5:function k5(){},
k9:function k9(a,b){this.a=a
this.b=b},
k8:function k8(a,b){this.a=a
this.b=b},
f9:function f9(a,b){this.a=a
this.b=b},
kg:function kg(){},
f8:function f8(){},
eL:function eL(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=null
_.ay=o},
j5:function j5(a,b,c){this.a=a
this.b=b
this.c=c},
j4:function j4(a,b){this.a=a
this.b=b},
j6:function j6(a,b,c){this.a=a
this.b=b
this.c=c},
f0:function f0(){},
jM:function jM(a,b,c){this.a=a
this.b=b
this.c=c},
jL:function jL(a,b){this.a=a
this.b=b},
jN:function jN(a,b,c){this.a=a
this.b=b
this.c=c},
cj:function cj(a){this.a=a},
ko:function ko(a,b){this.a=a
this.b=b},
da:function da(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m},
o8(a,b){return new A.bd(a.h("@<0>").N(b).h("bd<1,2>"))},
aE(a,b){return new A.bd(a.h("@<0>").N(b).h("bd<1,2>"))},
cL(a){return new A.dn(a.h("dn<0>"))},
lc(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
oQ(a,b,c){var s=new A.cd(a,b,c.h("cd<0>"))
s.c=a.e
return s},
kZ(a){var s,r
if(A.lr(a))return"{...}"
s=new A.d2("")
try{r={}
$.bB.push(a)
s.a+="{"
r.a=!0
a.bA(0,new A.hz(r,s))
s.a+="}"}finally{$.bB.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
kY(a){return new A.cM(A.hx(A.o9(null),null,!1,a.h("0?")),a.h("cM<0>"))},
o9(a){return 8},
dn:function dn(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
jE:function jE(a){this.a=a
this.c=this.b=null},
cd:function cd(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
bf:function bf(a){var _=this
_.b=_.a=0
_.c=null
_.$ti=a},
eW:function eW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=null
_.d=c
_.e=!1
_.$ti=d},
Y:function Y(){},
v:function v(){},
cO:function cO(){},
hy:function hy(a){this.a=a},
hz:function hz(a,b){this.a=a
this.b=b},
cM:function cM(a,b){var _=this
_.a=a
_.d=_.c=_.b=0
_.$ti=b},
eX:function eX(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null
_.$ti=e},
bU:function bU(){},
dy:function dy(){},
pa(a,b,c){var s,r,q,p=c-b
if(p<=4096)s=$.nk()
else s=new Uint8Array(p)
for(r=0;r<p;++r){q=a[b+r]
if((q&255)!==q)q=255
s[r]=q}return s},
p9(a,b,c,d){var s=a?$.nj():$.ni()
if(s==null)return null
if(0===c&&d===b.length)return A.mu(s,b)
return A.mu(s,b.subarray(c,d))},
mu(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
pb(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
k2:function k2(){},
k1:function k1(){},
dY:function dY(){},
e_:function e_(){},
ha:function ha(){},
ic:function ic(){},
id:function id(){},
k3:function k3(a){this.b=0
this.c=a},
ch:function ch(a){this.a=a
this.b=16
this.c=0},
oG(a,b){var s,r,q=$.aM(),p=a.length,o=4-p%4
if(o===4)o=0
for(s=0,r=0;r<p;++r){s=s*10+a.charCodeAt(r)-48;++o
if(o===4){q=q.bl(0,$.lw()).eg(0,A.iE(s))
s=0
o=0}}if(b)return q.a5(0)
return q},
ma(a){if(48<=a&&a<=57)return a-48
return(a|32)-97+10},
oH(a,b,c){var s,r,q,p,o,n,m,l=a.length,k=l-b,j=B.a7.fM(k/4),i=new Uint16Array(j),h=j-1,g=k-h*4
for(s=b,r=0,q=0;q<g;++q,s=p){p=s+1
o=A.ma(a.charCodeAt(s))
if(o>=16)return null
r=r*16+o}n=h-1
i[h]=r
for(;s<l;n=m){for(r=0,q=0;q<4;++q,s=p){p=s+1
o=A.ma(a.charCodeAt(s))
if(o>=16)return null
r=r*16+o}m=n-1
i[n]=r}if(j===1&&i[0]===0)return $.aM()
l=A.al(j,i)
return new A.Z(l===0?!1:c,i,l)},
oJ(a,b){var s,r,q,p,o
if(a==="")return null
s=$.ng().hn(a)
if(s==null)return null
r=s.b
q=r[1]==="-"
p=r[4]
o=r[3]
if(p!=null)return A.oG(p,q)
if(o!=null)return A.oH(o,2,q)
return null},
al(a,b){for(;;){if(!(a>0&&b[a-1]===0))break;--a}return a},
l9(a,b,c,d){var s,r=new Uint16Array(d),q=c-b
for(s=0;s<q;++s)r[s]=a[b+s]
return r},
iE(a){var s,r,q,p,o=a<0
if(o){if(a===-9223372036854776e3){s=new Uint16Array(4)
s[3]=32768
r=A.al(4,s)
return new A.Z(r!==0,s,r)}a=-a}if(a<65536){s=new Uint16Array(1)
s[0]=a
r=A.al(1,s)
return new A.Z(r===0?!1:o,s,r)}if(a<=4294967295){s=new Uint16Array(2)
s[0]=a&65535
s[1]=B.a.A(a,16)
r=A.al(2,s)
return new A.Z(r===0?!1:o,s,r)}r=B.a.B(B.a.gdQ(a)-1,16)+1
s=new Uint16Array(r)
for(q=0;a!==0;q=p){p=q+1
s[q]=a&65535
a=B.a.B(a,65536)}r=A.al(r,s)
return new A.Z(r===0?!1:o,s,r)},
la(a,b,c,d){var s,r,q
if(b===0)return 0
if(c===0&&d===a)return b
for(s=b-1,r=d.$flags|0;s>=0;--s){q=a[s]
r&2&&A.r(d)
d[s+c]=q}for(s=c-1;s>=0;--s){r&2&&A.r(d)
d[s]=0}return b+c},
oF(a,b,c,d){var s,r,q,p,o,n=B.a.B(c,16),m=B.a.ad(c,16),l=16-m,k=B.a.aQ(1,l)-1
for(s=b-1,r=d.$flags|0,q=0;s>=0;--s){p=a[s]
o=B.a.aR(p,l)
r&2&&A.r(d)
d[s+n+1]=(o|q)>>>0
q=B.a.aQ((p&k)>>>0,m)}r&2&&A.r(d)
d[n]=q},
mb(a,b,c,d){var s,r,q,p,o=B.a.B(c,16)
if(B.a.ad(c,16)===0)return A.la(a,b,o,d)
s=b+o+1
A.oF(a,b,c,d)
for(r=d.$flags|0,q=o;--q,q>=0;){r&2&&A.r(d)
d[q]=0}p=s-1
return d[p]===0?p:s},
oI(a,b,c,d){var s,r,q,p,o=B.a.B(c,16),n=B.a.ad(c,16),m=16-n,l=B.a.aQ(1,n)-1,k=B.a.aR(a[o],n),j=b-o-1
for(s=d.$flags|0,r=0;r<j;++r){q=a[r+o+1]
p=B.a.aQ((q&l)>>>0,m)
s&2&&A.r(d)
d[r]=(p|k)>>>0
k=B.a.aR(q,n)}s&2&&A.r(d)
d[j]=k},
iF(a,b,c,d){var s,r=b-d
if(r===0)for(s=b-1;s>=0;--s){r=a[s]-c[s]
if(r!==0)return r}return r},
oD(a,b,c,d,e){var s,r,q
for(s=e.$flags|0,r=0,q=0;q<d;++q){r+=a[q]+c[q]
s&2&&A.r(e)
e[q]=r&65535
r=B.a.A(r,16)}for(q=d;q<b;++q){r+=a[q]
s&2&&A.r(e)
e[q]=r&65535
r=B.a.A(r,16)}s&2&&A.r(e)
e[b]=r},
eJ(a,b,c,d,e){var s,r,q
for(s=e.$flags|0,r=0,q=0;q<d;++q){r+=a[q]-c[q]
s&2&&A.r(e)
e[q]=r&65535
r=0-(B.a.A(r,16)&1)}for(q=d;q<b;++q){r+=a[q]
s&2&&A.r(e)
e[q]=r&65535
r=0-(B.a.A(r,16)&1)}},
mg(a,b,c,d,e,f){var s,r,q,p,o,n
if(a===0)return
for(s=d.$flags|0,r=0;--f,f>=0;e=o,c=q){q=c+1
p=a*b[c]+d[e]+r
o=e+1
s&2&&A.r(d)
d[e]=p&65535
r=B.a.B(p,65536)}for(;r!==0;e=o){n=d[e]+r
o=e+1
s&2&&A.r(d)
d[e]=n&65535
r=B.a.B(n,65536)}},
oE(a,b,c){var s,r=b[c]
if(r===a)return 65535
s=B.a.cX((r<<16|b[c-1])>>>0,a)
if(s>65535)return 65535
return s},
jf(a,b){var s=$.nh()
s=s==null?null:new s(A.b4(A.qX(a,b),1))
return new A.eQ(s,b.h("eQ<0>"))},
nO(a,b){a=A.L(a,new Error())
a.stack=b.i(0)
throw a},
hx(a,b,c,d){var s,r=J.lQ(a,d)
if(a!==0&&b!=null)for(s=0;s<a;++s)r[s]=b
return r},
ob(a,b,c){var s,r,q=A.u([],c.h("q<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.R)(a),++r)q.push(a[r])
q.$flags=1
return q},
cN(a,b){var s,r=A.u([],b.h("q<0>"))
for(s=J.an(a);s.k();)r.push(s.gl())
return r},
oq(a,b,c){var s,r
A.aj(b,"start")
s=c-b
if(s<0)throw A.b(A.ac(c,b,null,"end",null))
if(s===0)return""
r=A.or(a,b,c)
return r},
or(a,b,c){var s=a.length
if(b>=s)return""
return A.oj(a,b,c==null||c>s?s:c)},
ol(a,b){return new A.ht(a,A.o6(a,!1,!1,!1,!1,""))},
m6(a,b,c){var s=J.an(b)
if(!s.k())return a
if(c.length===0){do a+=A.w(s.gl())
while(s.k())}else{a+=A.w(s.gl())
while(s.k())a=a+c+A.w(s.gl())}return a},
m5(){return A.W(new Error())},
nK(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
lI(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
e5(a){if(a>=10)return""+a
return"0"+a},
lJ(a,b){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(q.b===b)return q}throw A.b(A.b7(b,"name","No enum value with that name"))},
hc(a){if(typeof a=="number"||A.kn(a)||a==null)return J.aN(a)
if(typeof a=="string")return JSON.stringify(a)
return A.m_(a)},
nP(a,b){A.dO(a,"error",t.K)
A.dO(b,"stackTrace",t.l)
A.nO(a,b)},
dS(a){return new A.dR(a)},
X(a,b){return new A.ah(!1,null,b,a)},
b7(a,b,c){return new A.ah(!0,a,b,c)},
fg(a,b){return a},
m0(a){var s=null
return new A.bS(s,s,!1,s,s,a)},
ac(a,b,c,d,e){return new A.bS(b,c,!0,a,d,"Invalid value")},
bT(a,b,c){if(0>a||a>c)throw A.b(A.ac(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.ac(b,a,c,"end",null))
return b}return c},
aj(a,b){if(a<0)throw A.b(A.ac(a,0,null,b,null))
return a},
lO(a,b){var s=b.b
return new A.cH(s,!0,a,null,"Index out of range")},
ec(a,b,c,d,e){return new A.cH(b,!0,a,e,"Index out of range")},
aY(a){return new A.d5(a)},
l4(a){return new A.eF(a)},
C(a){return new A.au(a)},
a5(a){return new A.dZ(a)},
nQ(a){return new A.jc(a)},
kS(a,b,c){return new A.he(a,b,c)},
o_(a,b,c){var s,r
if(A.lr(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.u([],t.s)
$.bB.push(a)
try{A.pO(a,s)}finally{$.bB.pop()}r=A.m6(b,s,", ")+c
return r.charCodeAt(0)==0?r:r},
hs(a,b,c){var s,r
if(A.lr(a))return b+"..."+c
s=new A.d2(b)
$.bB.push(a)
try{r=s
r.a=A.m6(r.a,a,", ")}finally{$.bB.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
pO(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.w(l.gl())
b.push(s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
r=b.pop()
q=b.pop()}else{p=l.gl();++j
if(!l.k()){if(j<=4){b.push(A.w(p))
return}r=A.w(p)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.k();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
k-=b.pop().length+2;--j}b.push("...")
return}}q=A.w(p)
r=A.w(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)b.push(m)
b.push(q)
b.push(r)},
l_(a,b,c,d){var s
if(B.f===c){s=J.a8(a)
b=J.a8(b)
return A.l3(A.aX(A.aX($.kO(),s),b))}if(B.f===d){s=J.a8(a)
b=J.a8(b)
c=J.a8(c)
return A.l3(A.aX(A.aX(A.aX($.kO(),s),b),c))}s=J.a8(a)
b=J.a8(b)
c=J.a8(c)
d=J.a8(d)
d=A.l3(A.aX(A.aX(A.aX(A.aX($.kO(),s),b),c),d))
return d},
Z:function Z(a,b,c){this.a=a
this.b=b
this.c=c},
iG:function iG(){},
iH:function iH(){},
eQ:function eQ(a,b){this.a=a
this.$ti=b},
e4:function e4(a,b,c){this.a=a
this.b=b
this.c=c},
aB:function aB(a){this.a=a},
j9:function j9(){},
E:function E(){},
dR:function dR(a){this.a=a},
aI:function aI(){},
ah:function ah(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bS:function bS(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cH:function cH(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
d5:function d5(a){this.a=a},
eF:function eF(a){this.a=a},
au:function au(a){this.a=a},
dZ:function dZ(a){this.a=a},
ew:function ew(){},
d1:function d1(){},
jc:function jc(a){this.a=a},
he:function he(a,b,c){this.a=a
this.b=b
this.c=c},
ee:function ee(){},
p:function p(){},
a7:function a7(a,b,c){this.a=a
this.b=b
this.$ti=c},
z:function z(){},
d:function d(){},
f3:function f3(){},
d2:function d2(a){this.a=a},
e7:function e7(a){this.a=a},
oa(a){return a},
o3(a){return a},
o5(a){return a},
l2(a){return a},
o0(a,b){var s,r,q,p,o
if(b.length===0)return!1
s=b.split(".")
r=v.G
for(q=s.length,p=0;p<q;++p,r=o){o=r[s[p]]
A.my(o)
if(o==null)return!1}return a instanceof t.g.a(r)},
nW(a){return new v.G.Promise(A.ae(new A.hj(a)))},
hD:function hD(a){this.a=a},
hj:function hj(a){this.a=a},
hh:function hh(a){this.a=a},
hi:function hi(a){this.a=a},
kl(a){var s
if(typeof a=="function")throw A.b(A.X("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(){return b(c)}}(A.pk,a)
s[$.bH()]=a
return s},
az(a){var s
if(typeof a=="function")throw A.b(A.X("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.pl,a)
s[$.bH()]=a
return s},
ae(a){var s
if(typeof a=="function")throw A.b(A.X("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d,e){return b(c,d,e,arguments.length)}}(A.pm,a)
s[$.bH()]=a
return s},
km(a){var s
if(typeof a=="function")throw A.b(A.X("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d,e,f){return b(c,d,e,f,arguments.length)}}(A.pn,a)
s[$.bH()]=a
return s},
ck(a){var s
if(typeof a=="function")throw A.b(A.X("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d,e,f,g){return b(c,d,e,f,g,arguments.length)}}(A.po,a)
s[$.bH()]=a
return s},
lf(a){var s
if(typeof a=="function")throw A.b(A.X("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d,e,f,g,h){return b(c,d,e,f,g,h,arguments.length)}}(A.pp,a)
s[$.bH()]=a
return s},
pk(a){return a.$0()},
pl(a,b,c){if(c>=1)return a.$1(b)
return a.$0()},
pm(a,b,c,d){if(d>=2)return a.$2(b,c)
if(d===1)return a.$1(b)
return a.$0()},
pn(a,b,c,d,e){if(e>=3)return a.$3(b,c,d)
if(e===2)return a.$2(b,c)
if(e===1)return a.$1(b)
return a.$0()},
po(a,b,c,d,e,f){if(f>=4)return a.$4(b,c,d,e)
if(f===3)return a.$3(b,c,d)
if(f===2)return a.$2(b,c)
if(f===1)return a.$1(b)
return a.$0()},
pp(a,b,c,d,e,f,g){if(g>=5)return a.$5(b,c,d,e,f)
if(g===4)return a.$4(b,c,d,e)
if(g===3)return a.$3(b,c,d)
if(g===2)return a.$2(b,c)
if(g===1)return a.$1(b)
return a.$0()},
kz(a,b){return a[b]},
mP(a,b,c){return a[b].apply(a,c)},
qu(a,b){var s,r
if(b==null)return new a()
if(b instanceof Array)switch(b.length){case 0:return new a()
case 1:return new a(b[0])
case 2:return new a(b[0],b[1])
case 3:return new a(b[0],b[1],b[2])
case 4:return new a(b[0],b[1],b[2],b[3])}s=[null]
B.c.a8(s,b)
r=a.bind.apply(a,s)
String(r)
return new r()},
a1(a,b){var s=new A.k($.l,b.h("k<0>")),r=new A.aw(s,b.h("aw<0>"))
a.then(A.b4(new A.kH(r),1),A.b4(new A.kI(r),1))
return s},
kH:function kH(a){this.a=a},
kI:function kI(a){this.a=a},
jB:function jB(){},
jC:function jC(a){this.a=a},
op(a){var s
A:{if(18===a){s=B.ai
break A}if(23===a){s=B.aj
break A}if(9===a){s=B.ak
break A}s=null
break A}return s},
d0:function d0(a,b){this.a=a
this.b=b},
ap:function ap(a,b,c){this.a=a
this.b=b
this.c=c},
m4(a,b,c,d,e,f,g){return new A.bW(d,b,c,e,f,a,g)},
bW:function bW(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
hU:function hU(){},
fU:function fU(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.f=_.e=_.d=null
_.r=!1},
h2:function h2(a){this.a=a},
h1:function h1(a){this.a=a},
h3:function h3(a){this.a=a},
h_:function h_(a){this.a=a},
fZ:function fZ(a){this.a=a},
h0:function h0(a){this.a=a},
fW:function fW(a){this.a=a},
fV:function fV(a){this.a=a},
fX:function fX(a){this.a=a},
fY:function fY(a,b){this.a=a
this.b=b},
b1:function b1(a,b,c,d,e){var _=this
_.a=a
_.b=!1
_.c=b
_.d=null
_.e=c
_.f=d
_.w=_.r=null
_.$ti=e},
jV:function jV(a,b){this.a=a
this.b=b},
jW:function jW(a,b,c){this.a=a
this.b=b
this.c=c},
jX:function jX(a,b,c){this.a=a
this.b=b
this.c=c},
hT:function hT(){},
bX:function bX(a,b,c){var _=this
_.a=a
_.b=b
_.d=c
_.e=null
_.f=!0
_.r=!1},
kU(a,b){var s=$.fe()
return new A.eb(A.aE(t.N,t.fN),s,a)},
eb:function eb(a,b,c){this.d=a
this.b=b
this.a=c},
eS:function eS(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=0},
qO(a){var s=J.nw(new v.G.URL(a,"file:///").pathname,"/")
return new A.d8(s,new A.kG(),A.ay(s).h("d8<1>"))},
kG:function kG(){},
hF:function hF(a,b){this.a=a
this.b=b},
ok(a){var s=a.f=!1,r=a.a
r=r.c.d.sqlite3_step(r.b)
A:{if(100===r){s=!0
break A}if(101===r||0===r)break A
s=a.a4(r,"step")}return s},
bb:function bb(){},
hr:function hr(){},
cB:function cB(a){this.a=a},
bZ(a){return new A.aZ(a)},
lA(a,b){var s,r,q,p
if(b==null)b=$.fe()
for(s=a.length,r=a.$flags|0,q=0;q<s;++q){p=b.bN(256)
r&2&&A.r(a)
a[q]=p}},
aZ:function aZ(a){this.a=a},
d_:function d_(a){this.a=a},
T:function T(){},
dV:function dV(){},
dU:function dU(){},
qQ(a,b){var s=null,r=new A.bf(t.bN)
return A.qR(a,new A.da(s,s,s,s,s,s,s,s,new A.kK(new A.kJ(r,A.kl(new A.kL(r)))),s,s,s,s),b)},
bq:function bq(a){var _=this
_.d=a
_.c=_.b=_.a=null},
kL:function kL(a){this.a=a},
kJ:function kJ(a,b){this.a=a
this.b=b},
kK:function kK(a){this.a=a},
iq:function iq(a){this.a=a},
ik:function ik(a,b,c){this.a=a
this.b=b
this.c=c},
is:function is(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ir:function ir(a,b,c){this.b=a
this.c=b
this.d=c},
bn:function bn(){},
bo:function bo(){},
c0:function c0(a,b,c){this.a=a
this.b=b
this.c=c},
ag(a){var s,r,q
try{a.$0()
return 0}catch(r){q=A.S(r)
if(q instanceof A.aZ){s=q
return s.a}else return 1}},
e1:function e1(a){this.b=this.a=$
this.d=a},
fI:function fI(a,b,c){this.a=a
this.b=b
this.c=c},
fF:function fF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fK:function fK(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fM:function fM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fO:function fO(a,b){this.a=a
this.b=b},
fH:function fH(a){this.a=a},
fN:function fN(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fS:function fS(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fQ:function fQ(a,b){this.a=a
this.b=b},
fP:function fP(a,b){this.a=a
this.b=b},
fJ:function fJ(a,b,c){this.a=a
this.b=b
this.c=c},
fL:function fL(a,b){this.a=a
this.b=b},
fR:function fR(a,b){this.a=a
this.b=b},
fG:function fG(a,b,c){this.a=a
this.b=b
this.c=c},
cv:function cv(a,b){this.a=a
this.$ti=b},
fh:function fh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fj:function fj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fi:function fi(a,b,c){this.a=a
this.b=b
this.c=c},
at(a,b){var s=new A.k($.l,b.h("k<0>")),r=new A.F(s,b.h("F<0>")),q=t.m
A.a3(a,"success",new A.fw(r,a,b),!1,q)
A.a3(a,"error",new A.fx(r,a),!1,q)
return s},
nJ(a,b){var s=new A.k($.l,b.h("k<0>")),r=new A.F(s,b.h("F<0>")),q=t.m
A.a3(a,"success",new A.fB(r,a,b),!1,q)
A.a3(a,"error",new A.fC(r,a),!1,q)
A.a3(a,"blocked",new A.fD(r),!1,q)
return s},
br:function br(a,b){var _=this
_.c=_.b=_.a=null
_.d=a
_.$ti=b},
j2:function j2(a,b){this.a=a
this.b=b},
j3:function j3(a,b){this.a=a
this.b=b},
fw:function fw(a,b,c){this.a=a
this.b=b
this.c=c},
fx:function fx(a,b){this.a=a
this.b=b},
fB:function fB(a,b,c){this.a=a
this.b=b
this.c=c},
fC:function fC(a,b){this.a=a
this.b=b},
fD:function fD(a){this.a=a},
kM(){var s=v.G.navigator
if("storage" in s)return s.storage
return null},
lK(a,b,c){var s=a.read(b,c)
return s},
lL(a,b,c){var s=a.write(b,c)
return s},
nR(a){var s=t.cO
if(!(v.G.Symbol.asyncIterator in a))A.y(A.X("Target object does not implement the async iterable interface",null))
return new A.bt(new A.hd(),new A.cv(a,s),s.h("bt<N.T,m>"))},
hd:function hd(){},
il:function il(a){this.a=a},
im:function im(a){this.a=a},
ip(a,b){var s=0,r=A.i(t.n),q,p,o
var $async$ip=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:p=v.G
o=A
s=3
return A.c(A.a1(p.fetch(new p.URL(a,A.a0(p.location).href),null),t.m),$async$ip)
case 3:q=o.io(d,null)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$ip,r)},
io(a,b){var s=0,r=A.i(t.n),q,p,o,n,m
var $async$io=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:p=new A.e1(A.aE(t.S,t.b9))
o=A
n=A
m=A
s=3
return A.c(new A.il(p).bL(a),$async$io)
case 3:q=new o.c_(new n.iq(m.ox(d,p)))
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$io,r)},
c_:function c_(a){this.a=a},
oP(a){var s=new A.dl(a,new A.F(new A.k($.l,t.D),t.F),a.objectStore("files"),a.objectStore("blocks"))
s.eE(a)
return s},
ed(a,b,c){var s=0,r=A.i(t.bd),q,p,o,n,m,l
var $async$ed=A.j(function(d,e){if(d===1)return A.e(e,r)
for(;;)switch(s){case 0:p=t.N
o=new A.fo(a)
n=A.kU("dart-memory",null)
m=$.fe()
l=new A.aR(o,n,new A.bf(t.au),A.cL(p),A.aE(p,t.S),m,b)
l.r=!1
s=3
return A.c(o.bO(),$async$ed)
case 3:s=4
return A.c(l.b_(),$async$ed)
case 4:q=l
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$ed,r)},
fo:function fo(a){this.a=null
this.b=a},
fr:function fr(a){this.a=a},
fq:function fq(a,b,c){this.a=a
this.b=b
this.c=c},
fp:function fp(a){this.a=a},
dl:function dl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=!1
_.d=c
_.e=d},
jw:function jw(a){this.a=a},
jx:function jx(a){this.a=a},
jv:function jv(a){this.a=a},
jy:function jy(a,b,c){this.a=a
this.b=b
this.c=c},
jA:function jA(a,b){this.a=a
this.b=b},
jz:function jz(a,b){this.a=a
this.b=b},
jd:function jd(a,b,c){this.a=a
this.b=b
this.c=c},
je:function je(a,b){this.a=a
this.b=b},
eY:function eY(a,b){this.a=a
this.b=b},
aR:function aR(a,b,c,d,e,f,g){var _=this
_.d=a
_.e=!1
_.f=null
_.r=!0
_.w=b
_.x=c
_.y=d
_.z=e
_.b=f
_.a=g},
hp:function hp(a,b,c){this.a=a
this.b=b
this.c=c},
hq:function hq(){},
ho:function ho(a,b){this.a=a
this.b=b},
eT:function eT(a,b,c){this.a=a
this.b=b
this.c=c},
ju:function ju(a,b){this.a=a
this.b=b},
U:function U(){},
dj:function dj(a,b){var _=this
_.w=a
_.d=b
_.c=_.b=_.a=null},
df:function df(a,b,c){var _=this
_.w=a
_.x=b
_.d=c
_.c=_.b=_.a=null},
c9:function c9(a,b,c){var _=this
_.w=a
_.x=b
_.d=c
_.c=_.b=_.a=null},
ci:function ci(a,b,c,d,e){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.d=e
_.c=_.b=_.a=null},
m2(a){var s=A.kU("dart-memory",null),r=$.fe()
return new A.bV(s,r,a)},
eC(a,b){var s=0,r=A.i(t.cf),q,p,o,n,m,l,k,j
var $async$eC=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:j=A.kM()
if(j==null)throw A.b(A.bZ(1))
p=t.m
s=3
return A.c(A.a1(j.getDirectory(),p),$async$eC)
case 3:o=d
n=A.qO(a),m=J.an(n.a),n=new A.d9(m,n.b),l=null
case 4:if(!n.k()){s=6
break}s=7
return A.c(A.a1(o.getDirectoryHandle(m.gl(),{create:!0}),p),$async$eC)
case 7:k=d
case 5:l=o,o=k
s=4
break
case 6:q=new A.V(l,o)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$eC,r)},
eD(a){var s=0,r=A.i(t.m),q
var $async$eD=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:s=3
return A.c(A.eC(a,!0),$async$eD)
case 3:q=c.b
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$eD,r)},
hR(a,b){var s=0,r=A.i(t.v),q,p
var $async$hR=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:if(A.kM()==null)throw A.b(A.bZ(1))
p=A
s=3
return A.c(A.eD(a),$async$hR)
case 3:q=p.hQ(d,!1,b)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$hR,r)},
hQ(a,b,c){var s=0,r=A.i(t.v),q,p
var $async$hQ=A.j(function(d,e){if(d===1)return A.e(e,r)
for(;;)switch(s){case 0:p=A.m2(c)
s=3
return A.c(p.ab(a,!1),$async$hQ)
case 3:q=p
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$hQ,r)},
bK:function bK(a,b,c){this.c=a
this.a=b
this.b=c},
bV:function bV(a,b,c){var _=this
_.d=null
_.e=a
_.b=b
_.a=c},
hS:function hS(a,b){this.a=a
this.b=b},
f2:function f2(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=0},
jH:function jH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ox(a,b){var s=A.a0(a.exports.memory)
b.b!==$&&A.n0()
b.b=s
s=new A.ie(s,b,a.exports)
s.eC(a,b)
return s},
iz(a,b){var s,r=A.ai(a.buffer,b,null)
for(s=0;r[s]!==0;)++s
return s},
c1(a,b){var s=a.buffer,r=A.iz(a,b)
return B.y.dW(A.ai(s,b,r))},
l5(a,b,c){var s
if(b===0)return null
s=a.buffer
return B.y.dW(A.ai(s,b,c==null?A.iz(a,b):c))},
ie:function ie(a,b,c){var _=this
_.b=a
_.c=b
_.d=c
_.w=_.r=null},
ig:function ig(a){this.a=a},
ih:function ih(a){this.a=a},
ii:function ii(a){this.a=a},
ij:function ij(a){this.a=a},
kv(){var s=0,r=A.i(t.eJ),q,p,o,n,m,l
var $async$kv=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:m=new v.G.MessageChannel()
l=$.dP()
s=l!=null?3:5
break
case 3:p=A.pV()
s=6
return A.c(A.d7(l,p,null,null,!1),$async$kv)
case 6:o=b
s=4
break
case 5:o=null
p=null
case 4:n=m.port2
q=new A.V({port:m.port1,lockName:p},new A.cy(n,p,o))
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$kv,r)},
pV(){var s,r
for(s=0,r="channel-close-";s<16;++s)r+=A.bk(97+$.nm().bN(26))
return r.charCodeAt(0)==0?r:r},
nA(a){return new A.dX(a)},
cy:function cy(a,b,c){this.a=a
this.b=b
this.c=c},
hH:function hH(){},
hL:function hL(a){this.a=a},
hM:function hM(a){this.a=a},
hK:function hK(a){this.a=a},
hJ:function hJ(a){this.a=a},
hI:function hI(a){this.a=a},
dX:function dX(a){this.a=a},
fT:function fT(){},
e0:function e0(a){this.a=a},
fE:function fE(a,b){this.c=a
this.a=b},
bp:function bp(){},
e9(a,b,c){var s=0,r=A.i(t.gk),q,p,o
var $async$e9=A.j(function(d,e){if(d===1)return A.e(e,r)
for(;;)switch(s){case 0:s=3
return A.c(A.eD(a),$async$e9)
case 3:p=e
o=A.m2(c)
s=b?4:5
break
case 4:s=6
return A.c(o.ab(p,!0),$async$e9)
case 6:case 5:q=new A.e8(o,p,b)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$e9,r)},
e8:function e8(a,b,c){this.a=a
this.b=b
this.c=c},
hn:function hn(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=0},
d7(a,b,c,d,e){var s,r,q={},p=new A.k($.l,t.cp),o=new A.F(p,t.eP)
q.a=null
s={steal:e}
if(c!=null)s.signal=c
r=t.X
A.kT(A.a1(a.request(b,s,A.az(new A.it(q,o))),r),new A.iu(q,d,o),r,t.K)
return p},
it:function it(a,b){this.a=a
this.b=b},
iu:function iu(a,b,c){this.a=a
this.b=b
this.c=c},
aC:function aC(a){this.a=a},
e2:function e2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=_.e=null},
h5:function h5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h4:function h4(a,b){this.a=a
this.b=b},
h6:function h6(a){this.a=a},
cP:function cP(a){this.a=!1
this.b=a},
hC:function hC(a,b){this.a=a
this.b=b},
hB:function hB(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hA:function hA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
nG(a){var s,r,q,p,o=A.u([],t.gQ),n=t.c.a(a.a),m=t.r.b(n)?n:new A.aA(n,A.ay(n).h("aA<1,B>"))
for(s=J.cp(m),r=0;r<s.gj(m)/2;++r){q=r*2
o.push(new A.V(A.lJ(B.ae,s.n(m,q)),s.n(m,q+1)))}s=A.by(a.b)
q=A.by(a.c)
p=A.by(a.d)
return new A.bc(o,s,q,A.by(a.g),p)},
bc:function bc(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
om(a){var s
if(J.M(a.t,"errorResponse")){s=A.nL(a)
if(s!=null&&s instanceof A.b6)return s
else return new A.cX(a.e)}else return new A.cX("Did not respond with expected type, got "+A.w(a))},
nL(a){var s=a.s,r=s==null?null:A.a_(s)
A:{if(0===r){s=A.nM(t.c.a(a.r))
break A}if(1===r){s=B.j
break A}s=null
break A}return s},
nM(a){var s,r,q,p,o=null,n=a.length>=8,m=o,l=o,k=o,j=o,i=o,h=o,g=o
if(n){s=a[0]
m=a[1]
l=a[2]
k=a[3]
j=a[4]
i=a[5]
h=a[6]
g=a[7]}else s=o
if(!n)throw A.b(A.C("Pattern matching error"))
n=new A.hb()
l=A.a_(A.bz(l))
A.dJ(s)
r=n.$1(m)
q=n.$1(j)
if(i!=null&&h!=null){t.c.a(i)
t.a.a(h)
p=new A.aP(i,h,A.ai(h,0,o))}else p=o
n=n.$1(k)
A.mx(g)
return new A.bW(s,r,l,g==null?o:A.a_(g),n,q,p)},
nN(a){var s,r,q,p,o,n,m=null,l=a.r
A:{if(l==null){s=m
break A}s=A.m8(l)
break A}r=a.b
if(r==null)r=m
q=a.e
if(q==null)q=m
p=a.f
if(p==null)p=m
o=s==null
n=o?m:s.a
s=o?m:s.b
o=a.d
if(o==null)o=m
return[a.a,r,a.c,q,p,n,s,o]},
on(a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null,a1=v.G,a2=new a1.Array(),a3=new a1.ArrayBuffer(512),a4=new A.hn(a3,512,"transfer" in a3)
a6.dP(a5)
for(s=a5.a,r=s.c,q=s.b,p=r.d,r=r.b,o=0,n=!0;A.ok(a5);){if(n){o=p.sqlite3_column_count(q)
n=!1}m=a4.d
l=a4.d=m+o
if(l>a4.b)a4.eX(l)
l=new a1.DataView(a4.a,m,o)
k=new a1.Array(o)
for(j=0;j<o;++j){switch(p.sqlite3_column_type(q,j)){case 1:i=p.sqlite3_column_int64(q,j)
h=a1.Number(i)
if(a1.Number.isSafeInteger(h)){i=h
g=B.o}else g=B.p
break
case 2:i=p.sqlite3_column_double(q,j)
g=B.q
break
case 3:f=p.sqlite3_column_text(q,j)
e=r.buffer
d=A.iz(r,f)
f=new Uint8Array(e,f,d)
c=new A.ch(!1).bq(f,0,a0,!0)
i=c
g=B.r
break
case 4:f=p.sqlite3_column_bytes(q,j)
b=new Uint8Array(f)
e=p.sqlite3_column_bytes(q,j)
A.bT(0,e,f)
s.ev(j,b,0,e)
i=b
g=B.t
break
case 5:default:i=a0
g=B.u}k[j]=i
l.setUint8(j,g.a)}a2.push(k)}a=new a1.Array(o)
for(j=0;j<o;++j){a1=p.sqlite3_column_name(q,j)
s=r.buffer
l=A.iz(r,a1)
a1=new Uint8Array(s,a1,l)
a[j]=new A.ch(!1).bq(a1,0,a0,!0)}return A.mU(!1,a,0,0,a2,a0,a4.i4(0))},
qJ(a){if(a==="sharedCompatibilityCheck"||a==="dedicatedCompatibilityCheck"||a==="dedicatedInSharedCompatibilityCheck")return!0
else return!1},
hb:function hb(){},
mU(a,b,c,d,e,f,g){return{c:b,n:f,v:g,r:e,x:a,y:c,i:d,t:"rowsResponse"}},
co(a){var s,r,q,p,o=v.G,n=new o.Array()
switch(a.t){case"connect":n.push(a.r.port)
break
case"fileSystemAccess":s=a.b
if(s!=null)n.push(s)
break
case"runQuery":n.push(a.v)
break
case"simpleSuccessResponse":r=a.r
if(r!=null){o=o.ArrayBuffer
o=r instanceof o
q=r}else{q=null
o=!1}if(o)n.push(q)
break
case"endpointResponse":n.push(a.r.port)
break
case"rowsResponse":p=a.v
if(p!=null)n.push(p)
break}return n},
qz(a,b,c,d,e){switch(a.t){case"abort":return b.$1(a)
case"notifyUpdate":case"notifyCommit":case"notifyRollback":return c.$1(a)
case"simpleSuccessResponse":case"endpointResponse":case"rowsResponse":case"errorResponse":return e.$1(a)
default:return d.$1(a)}},
eo:function eo(a,b){this.a=a
this.b=b},
hO:function hO(){},
nS(a){var s,r
for(s=0;s<5;++s){r=B.ab[s]
if(r.c===a)return r}throw A.b(A.X("Unknown FS implementation: "+a,null))},
ot(a){var s,r,q,p,o,n,m,l,k,j=null
A:{if(a==null){s=j
r=B.u
break A}q=A.lj(a)
p=q?a:j
if(q){s=p
r=B.o
break A}q=a instanceof A.Z
if(q)o=a
else o=j
if(q){s=v.G.BigInt(o.i(0))
r=B.p
break A}q=typeof a=="number"
n=q?a:j
if(q){s=n
r=B.q
break A}q=typeof a=="string"
m=q?a:j
if(q){s=m
r=B.r
break A}q=t.p.b(a)
l=q?a:j
if(q){s=l
r=B.t
break A}q=A.kn(a)
k=q?a:j
if(q){s=k
r=B.I
break A}throw A.b(A.X("Unsupported value: "+A.w(a),j))}return new A.V(r,s)},
m8(a){var s,r,q,p,o,n
if(a instanceof A.aP)return new A.V(a.a,a.b)
s=[]
r=J.cp(a)
q=r.gj(a)
p=new Uint8Array(q)
for(o=0;o<r.gj(a);++o){n=A.ot(r.n(a,o))
p[o]=n.a.a
s.push(n.b)}return new A.V(s,t.a.a(B.d.ga9(p)))},
aQ:function aQ(a,b,c){this.c=a
this.a=b
this.b=c},
aq:function aq(a,b){this.a=a
this.b=b},
aP:function aP(a,b,c){this.a=a
this.b=b
this.c=c},
fd(){var s=0,r=A.i(t.y),q,p=2,o=[],n=[],m,l,k,j,i,h
var $async$fd=A.j(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:i=v.G
if(!("indexedDB" in i)||!("FileReader" in i)){q=!1
s=1
break}m=A.a0(i.indexedDB)
i=$.dP()
i=i==null?null:A.d7(i,"drift_mock_db",null,null,!1)
s=3
return A.c(t.U.b(i)?i:A.cc(i,t.J),$async$fd)
case 3:l=b
p=5
s=8
return A.c(A.nI(m.open("drift_mock_db"),t.m),$async$fd)
case 8:k=b
k.close()
m.deleteDatabase("drift_mock_db")
n.push(7)
s=6
break
case 5:p=4
h=o.pop()
q=!1
n=[1]
s=6
break
n.push(7)
s=6
break
case 4:n=[2]
case 6:p=2
i=l
if(i!=null)i.a.M()
s=n.pop()
break
case 7:q=!0
s=1
break
case 1:return A.f(q,r)
case 2:return A.e(o.at(-1),r)}})
return A.h($async$fd,r)},
kt(a){return A.qv(a)},
qv(a){var s=0,r=A.i(t.y),q,p=2,o=[],n,m,l,k,j,i
var $async$kt=A.j(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:j={}
j.a=null
p=4
n=A.a0(v.G.indexedDB)
m=n.open(a,1)
m.onupgradeneeded=A.az(new A.ku(j,m))
s=7
return A.c(A.nH(m,t.m),$async$kt)
case 7:l=c
if(j.a==null)j.a=!0
l.close()
p=2
s=6
break
case 4:p=3
i=o.pop()
s=6
break
case 3:s=2
break
case 6:j=j.a
q=j===!0
s=1
break
case 1:return A.f(q,r)
case 2:return A.e(o.at(-1),r)}})
return A.h($async$kt,r)},
cr(){var s=0,r=A.i(t.r),q,p=2,o=[],n=[],m,l,k,j,i,h,g
var $async$cr=A.j(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:h=A.kM()
if(h==null){q=B.E
s=1
break}j=t.m
s=3
return A.c(A.a1(h.getDirectory(),j),$async$cr)
case 3:m=b
p=5
s=8
return A.c(A.a1(m.getDirectoryHandle("drift_db",{create:!1}),j),$async$cr)
case 8:m=b
p=2
s=7
break
case 5:p=4
g=o.pop()
q=B.E
s=1
break
s=7
break
case 4:s=2
break
case 7:l=A.u([],t.s)
j=new A.bw(A.dO(A.nR(m),"stream",t.K))
p=9
case 12:s=14
return A.c(j.k(),$async$cr)
case 14:if(!b){s=13
break}k=j.gl()
if(J.M(k.kind,"directory"))J.lz(l,k.name)
s=12
break
case 13:n.push(11)
s=10
break
case 9:n=[2]
case 10:p=2
s=15
return A.c(j.p(),$async$cr)
case 15:s=n.pop()
break
case 11:q=l
s=1
break
case 1:return A.f(q,r)
case 2:return A.e(o.at(-1),r)}})
return A.h($async$cr,r)},
nH(a,b){var s=new A.k($.l,b.h("k<0>")),r=new A.F(s,b.h("F<0>")),q=t.m
A.a3(a,"success",new A.fu(r,a,b),!1,q)
A.a3(a,"error",new A.fv(r,a),!1,q)
return s},
nI(a,b){var s=new A.k($.l,b.h("k<0>")),r=new A.F(s,b.h("F<0>")),q=t.m
A.a3(a,"success",new A.fy(r,a,b),!1,q)
A.a3(a,"error",new A.fz(r,a),!1,q)
A.a3(a,"blocked",new A.fA(r,a),!1,q)
return s},
ku:function ku(a,b){this.a=a
this.b=b},
fu:function fu(a,b,c){this.a=a
this.b=b
this.c=c},
fv:function fv(a,b){this.a=a
this.b=b},
fy:function fy(a,b,c){this.a=a
this.b=b
this.c=c},
fz:function fz(a,b){this.a=a
this.b=b},
fA:function fA(a,b){this.a=a
this.b=b},
hG:function hG(a,b){this.a=a
this.b=b},
cF:function cF(a,b){this.a=a
this.b=b},
aW:function aW(a,b){this.a=a
this.b=b},
cX:function cX(a){this.a=a},
b6:function b6(a){this.a=a},
pu(a){var s=a.ge3()
return new A.bt(new A.kk(),s,A.A(s).h("bt<N.T,m>"))},
mi(a,b){var s=A.u([],t.W),r=b==null?a.b:b
return new A.c5(a,r,new A.dB(),new A.dB(),new A.dB(),s)},
oL(a,b,c){var s=t.S
s=new A.c3(c,A.u([],t.bZ),a.a,new A.aw(new A.k($.l,t.D),t.h),A.aE(s,t.dn),A.aE(s,t.m))
s.eB(a)
s.eD(a,b,c)
return s},
mA(a){var s
switch(a.a){case 0:s="/database"
break
case 1:s="/database-journal"
break
default:s=null}return s},
b3(){var s=0,r=A.i(t.eN),q,p=2,o=[],n=[],m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$b3=A.j(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:b=A.kM()
if(b==null){q=B.m
s=1
break}m=null
l=null
k=null
j=null
i=!1
p=4
d=$.dP()
d=d==null?null:A.d7(d,"_drift_feature_detection",null,null,!1)
s=7
return A.c(t.U.b(d)?d:A.cc(d,t.J),$async$b3)
case 7:j=a1
d=t.m
s=8
return A.c(A.a1(b.getDirectory(),d),$async$b3)
case 8:m=a1
s=9
return A.c(A.a1(m.getFileHandle("_drift_feature_detection",{create:!0}),d),$async$b3)
case 9:l=a1
s=10
return A.c(A.dN(l),$async$b3)
case 10:h=a1
g=null
f=null
g=h.a
f=h.b
i=g
k=f
e=A.kV(k,"getSize",null,null,null,null)
s=typeof e==="object"?11:12
break
case 11:s=13
return A.c(A.a1(A.a0(e),t.X),$async$b3)
case 13:q=B.m
n=[1]
s=5
break
case 12:g=i
q=new A.dw(!0,g)
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a=o.pop()
q=B.m
n=[1]
s=5
break
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
g=j
if(g!=null)g.a.M()
if(k!=null)k.close()
s=m!=null&&l!=null?14:15
break
case 14:s=16
return A.c(A.a1(m.removeEntry("_drift_feature_detection",{recursive:!1}),t.X),$async$b3)
case 16:case 15:s=n.pop()
break
case 6:case 1:return A.f(q,r)
case 2:return A.e(o.at(-1),r)}})
return A.h($async$b3,r)},
dN(a){return A.q9(a)},
q9(a){var s=0,r=A.i(t.f9),q,p=2,o=[],n,m,l,k,j,i
var $async$dN=A.j(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:j=null
p=4
l=t.m
s=7
return A.c(A.a1(a.createSyncAccessHandle({mode:"readwrite-unsafe"}),l),$async$dN)
case 7:j=c
s=8
return A.c(A.a1(a.createSyncAccessHandle({mode:"readwrite-unsafe"}),l),$async$dN)
case 8:n=c
n.close()
l=j
q=new A.V(!0,l)
s=1
break
p=2
s=6
break
case 4:p=3
i=o.pop()
l=j
if(l!=null)l.close()
s=9
return A.c(A.a1(a.createSyncAccessHandle(),t.m),$async$dN)
case 9:m=c
q=new A.V(!1,m)
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.f(q,r)
case 2:return A.e(o.at(-1),r)}})
return A.h($async$dN,r)},
kk:function kk(){},
dB:function dB(){this.a=null},
c5:function c5(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=null
_.r=1
_.w=f},
iY:function iY(a){this.a=a},
j1:function j1(a,b){this.a=a
this.b=b},
iZ:function iZ(a,b){this.a=a
this.b=b},
j_:function j_(a){this.a=a},
j0:function j0(a,b){this.a=a
this.b=b},
c3:function c3(a,b,c,d,e,f){var _=this
_.w=a
_.x=b
_.a=c
_.b=d
_.d=_.c=null
_.e=0
_.f=e
_.r=f},
iM:function iM(a){this.a=a},
iP:function iP(a,b,c){this.a=a
this.b=b
this.c=c},
iS:function iS(a,b){this.a=a
this.b=b},
iV:function iV(a,b,c){this.a=a
this.b=b
this.c=c},
iO:function iO(a,b){this.a=a
this.b=b},
iN:function iN(a,b){this.a=a
this.b=b},
iU:function iU(a,b){this.a=a
this.b=b},
iT:function iT(a,b){this.a=a
this.b=b},
iX:function iX(a,b){this.a=a
this.b=b},
iW:function iW(a,b){this.a=a
this.b=b},
iQ:function iQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iR:function iR(a,b){this.a=a
this.b=b},
iL:function iL(a){this.a=a},
e3:function e3(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=1
_.Q=_.z=_.y=_.x=null},
h9:function h9(a){this.a=a},
h8:function h8(a){this.a=a},
h7:function h7(a,b){this.a=a
this.b=b},
iv:function iv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=0
_.e=d
_.f=0
_.w=_.r=null
_.x=e
_.y=f
_.Q=$},
iw:function iw(a,b){this.a=a
this.b=b},
ix:function ix(a,b){this.a=a
this.b=b},
iy:function iy(a){this.a=a},
oy(){var s=v.G
if(A.o0(s,"DedicatedWorkerGlobalScope"))return new A.eM(s,new A.eN(s.location.href))
else return new A.f1(s,new A.eN(s.location.href))},
dH:function dH(){},
eM:function eM(a,b){this.a=a
this.b=b},
f1:function f1(a,b){this.a=a
this.b=b},
jR:function jR(a){this.a=a},
jS:function jS(a,b,c){this.a=a
this.b=b
this.c=c},
jQ:function jQ(a){this.a=a},
jO:function jO(a){this.a=a},
jP:function jP(a){this.a=a},
eN:function eN(a){this.a=a},
j7:function j7(a){this.a=a},
os(a){var s={},r=A.u([],t.ey),q=A.cL(t.N)
s.a=A.u([],t.x)
return new A.aK(new A.i7(new A.i2(s,r,a,new A.i8(q),new A.i5(r,q),new A.i6(q)),new A.i9(s,r)),t.aT)},
i8:function i8(a){this.a=a},
i5:function i5(a,b){this.a=a
this.b=b},
i6:function i6(a){this.a=a},
i2:function i2(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
i3:function i3(a){this.a=a},
i4:function i4(a){this.a=a},
i9:function i9(a,b){this.a=a
this.b=b},
i7:function i7(a,b){this.a=a
this.b=b},
i1:function i1(a,b){this.a=a
this.b=b},
bx:function bx(a,b){this.a=a
this.b=b},
aO:function aO(a,b){this.a=a
this.b=b},
oM(){return new A.c6()},
fk:function fk(){},
dT:function dT(a,b,c){this.a=a
this.b=b
this.c=c},
fl:function fl(a){this.a=a},
fm:function fm(a,b){this.a=a
this.b=b},
fn:function fn(a,b,c){this.a=a
this.b=b
this.c=c},
c6:function c6(){this.a=!1
this.b=null},
bY:function bY(){},
eU:function eU(){},
av:function av(a,b){this.a=a
this.b=b},
a3(a,b,c,d,e){var s
if(c==null)s=null
else{s=A.mL(new A.ja(c),t.m)
s=s==null?null:A.az(s)}s=new A.dh(a,b,s,!1,e.h("dh<0>"))
s.cn()
return s},
mL(a,b){var s=$.l
if(s===B.b)return a
return s.cu(a,b)},
kR:function kR(a,b){this.a=a
this.$ti=b},
ca:function ca(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
dh:function dh(a,b,c,d,e){var _=this
_.a=0
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
ja:function ja(a){this.a=a},
jb:function jb(a){this.a=a},
n1(a){return v.mangledGlobalNames[a]},
mY(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
o4(a,b){return b in a},
kV(a,b,c,d,e,f){var s
if(c==null)return a[b]()
else if(d==null)return a[b](c)
else if(e==null)return a[b](c,d)
else{s=a[b](c,d,e)
return s}},
lo(a,b,c,d,e,f){var s,r=b.a,q=b.b,p=r.d,o=p.sqlite3_extended_errcode(q),n=p.sqlite3_error_offset(q)
A:{if(n<0){n=null
break A}break A}s=a.a
return new A.bW(A.c1(r.b,p.sqlite3_errmsg(q)),A.c1(s.b,s.d.sqlite3_errstr(o))+" (code "+A.w(o)+")",c,n,d,e,f)},
lt(a,b,c,d,e){throw A.b(A.lo(a.a,a.b,b,c,d,e))},
lN(a,b){var s,r
for(s=b,r=0;r<16;++r)s+=A.bk("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789".charCodeAt(a.bN(61)))
return s.charCodeAt(0)==0?s:s},
hN(a){var s=0,r=A.i(t.dI),q
var $async$hN=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:s=3
return A.c(A.a1(a.arrayBuffer(),t.a),$async$hN)
case 3:q=c
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$hN,r)},
qM(){var s=A.oy(),r=t.L
new A.iv(s,new A.fk(),A.u([],t.bj),A.aE(t.S,t.eX),new A.cP(A.kY(r)),new A.cP(A.kY(r))).aK()
return null}},B={}
var w=[A,J,B]
var $={}
A.kW.prototype={}
J.ef.prototype={
T(a,b){return a===b},
gv(a){return A.cW(a)},
i(a){return"Instance of '"+A.ey(a)+"'"},
gD(a){return A.bC(A.lg(this))}}
J.ei.prototype={
i(a){return String(a)},
gv(a){return a?519018:218159},
gD(a){return A.bC(t.y)},
$iD:1,
$iQ:1}
J.cJ.prototype={
T(a,b){return null==b},
i(a){return"null"},
gv(a){return 0},
$iD:1,
$iz:1}
J.I.prototype={$im:1}
J.aT.prototype={
gv(a){return 0},
i(a){return String(a)}}
J.ex.prototype={}
J.bm.prototype={}
J.a9.prototype={
i(a){var s=a[$.n3()]
if(s==null)s=a[$.bH()]
if(s==null)return this.ey(a)
return"JavaScript function for "+J.aN(s)}}
J.a4.prototype={
gv(a){return 0},
i(a){return String(a)}}
J.bM.prototype={
gv(a){return 0},
i(a){return String(a)}}
J.q.prototype={
G(a,b){a.$flags&1&&A.r(a,29)
a.push(b)},
u(a,b){var s
a.$flags&1&&A.r(a,"remove",1)
for(s=0;s<a.length;++s)if(J.M(a[s],b)){a.splice(s,1)
return!0}return!1},
a8(a,b){var s
a.$flags&1&&A.r(a,"addAll",2)
if(Array.isArray(b)){this.eK(a,b)
return}for(s=J.an(b);s.k();)a.push(s.gl())},
eK(a,b){var s,r=b.length
if(r===0)return
if(a===b)throw A.b(A.a5(a))
for(s=0;s<r;++s)a.push(b[s])},
W(a){a.$flags&1&&A.r(a,"clear","clear")
a.length=0},
e6(a,b,c){return new A.aF(a,b,A.ay(a).h("@<1>").N(c).h("aF<1,2>"))},
U(a,b){return A.i_(a,b,null,A.ay(a).c)},
e0(a,b){var s,r,q=a.length
for(s=0;s<q;++s){r=a[s]
if(b.$1(r))return r
if(a.length!==q)throw A.b(A.a5(a))}throw A.b(A.eg())},
C(a,b){return a[b]},
gaa(a){if(a.length>0)return a[0]
throw A.b(A.eg())},
F(a,b,c,d,e){var s,r,q,p,o
a.$flags&2&&A.r(a,5)
A.bT(b,c,a.length)
s=c-b
if(s===0)return
A.aj(e,"skipCount")
if(t.j.b(d)){r=d
q=e}else{r=J.kQ(d,e).cJ(0,!1)
q=0}p=J.cp(r)
if(q+s>p.gj(r))throw A.b(A.lP())
if(q<b)for(o=s-1;o>=0;--o)a[b+o]=p.n(r,q+o)
else for(o=0;o<s;++o)a[b+o]=p.n(r,q+o)},
er(a,b){var s,r,q,p,o
a.$flags&2&&A.r(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.pC()
if(s===2){r=a[0]
q=a[1]
if(b.$2(r,q)>0){a[0]=q
a[1]=r}return}p=0
if(A.ay(a).c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.b4(b,2))
if(p>0)this.fp(a,p)},
eq(a){return this.er(a,null)},
fp(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
i(a){return A.hs(a,"[","]")},
gt(a){return new J.dQ(a,a.length,A.ay(a).h("dQ<1>"))},
gv(a){return A.cW(a)},
gj(a){return a.length},
n(a,b){if(!(b>=0&&b<a.length))throw A.b(A.lp(a,b))
return a[b]},
q(a,b,c){a.$flags&2&&A.r(a)
if(!(b>=0&&b<a.length))throw A.b(A.lp(a,b))
a[b]=c},
$in:1,
$it:1}
J.eh.prototype={
i6(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.ey(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.hu.prototype={}
J.dQ.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.b(A.R(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0}}
J.bL.prototype={
a_(a,b){var s
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gcC(b)
if(this.gcC(a)===s)return 0
if(this.gcC(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcC(a){return a===0?1/a<0:a<0},
fM(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.b(A.aY(""+a+".ceil()"))},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
ad(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
cX(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.dF(a,b)},
B(a,b){return(a|0)===a?a/b|0:this.dF(a,b)},
dF(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.aY("Result of truncating division is "+A.w(s)+": "+A.w(a)+" ~/ "+b))},
aQ(a,b){if(b<0)throw A.b(A.mN(b))
return b>31?0:a<<b>>>0},
aR(a,b){var s
if(b<0)throw A.b(A.mN(b))
if(a>0)s=this.dC(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
A(a,b){var s
if(a>0)s=this.dC(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
dC(a,b){return b>31?0:a>>>b},
gD(a){return A.bC(t.o)},
$iK:1}
J.cI.prototype={
gdQ(a){var s,r=a<0?-a-1:a,q=r
for(s=32;q>=4294967296;){q=this.B(q,4294967296)
s+=32}return s-Math.clz32(q)},
gD(a){return A.bC(t.S)},
$iD:1,
$ia:1}
J.ej.prototype={
gD(a){return A.bC(t.i)},
$iD:1}
J.aS.prototype={
eu(a,b){var s=A.u(a.split(b),t.s)
return s},
cV(a,b,c){return a.substring(b,A.bT(b,c,a.length))},
bl(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.R)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
hZ(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bl(c,s)+a},
a_(a,b){var s
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gv(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gD(a){return A.bC(t.N)},
gj(a){return a.length},
$iD:1,
$iB:1}
A.b_.prototype={
gt(a){return new A.dW(J.an(this.gaH()),A.A(this).h("dW<1,2>"))},
gj(a){return J.bI(this.gaH())},
U(a,b){var s=A.A(this)
return A.lF(J.kQ(this.gaH(),b),s.c,s.y[1])},
C(a,b){return A.A(this).y[1].a(J.kP(this.gaH(),b))},
i(a){return J.aN(this.gaH())}}
A.dW.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())}}
A.b9.prototype={
gaH(){return this.a}}
A.dg.prototype={$in:1}
A.dd.prototype={
n(a,b){return this.$ti.y[1].a(J.nq(this.a,b))},
q(a,b,c){J.ly(this.a,b,this.$ti.c.a(c))},
F(a,b,c,d,e){var s=this.$ti
J.nv(this.a,b,c,A.lF(d,s.y[1],s.c),e)},
Y(a,b,c,d){return this.F(0,b,c,d,0)},
$in:1,
$it:1}
A.aA.prototype={
gaH(){return this.a}}
A.be.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.kF.prototype={
$0(){return A.hk(null,t.H)},
$S:4}
A.hP.prototype={}
A.n.prototype={}
A.a6.prototype={
gt(a){var s=this
return new A.bO(s,s.gj(s),A.A(s).h("bO<a6.E>"))},
e5(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.w(p.C(0,0))
if(o!==p.gj(p))throw A.b(A.a5(p))
for(r=s,q=1;q<o;++q){r=r+b+A.w(p.C(0,q))
if(o!==p.gj(p))throw A.b(A.a5(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.w(p.C(0,q))
if(o!==p.gj(p))throw A.b(A.a5(p))}return r.charCodeAt(0)==0?r:r}},
hL(a){return this.e5(0,"")},
U(a,b){return A.i_(this,b,null,A.A(this).h("a6.E"))}}
A.d3.prototype={
geT(){var s=J.bI(this.a),r=this.c
if(r==null||r>s)return s
return r},
gfz(){var s=J.bI(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.bI(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
C(a,b){var s=this,r=s.gfz()+b
if(b<0||r>=s.geT())throw A.b(A.ec(b,s.gj(0),s,null,"index"))
return J.kP(s.a,r)},
U(a,b){var s,r,q=this
A.aj(b,"count")
s=q.b+b
r=q.c
if(r!=null&&s>=r)return new A.cD(q.$ti.h("cD<1>"))
return A.i_(q.a,s,r,q.$ti.c)},
cJ(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.cp(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.lQ(0,p.$ti.c)
return n}r=A.hx(s,m.C(n,o),!1,p.$ti.c)
for(q=1;q<s;++q){r[q]=m.C(n,o+q)
if(m.gj(n)<l)throw A.b(A.a5(p))}return r}}
A.bO.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.cp(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a5(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.C(q,s);++r.c
return!0}}
A.bg.prototype={
gt(a){var s=this.a
return new A.en(s.gt(s),this.b,A.A(this).h("en<1,2>"))},
gj(a){var s=this.a
return s.gj(s)},
C(a,b){var s=this.a
return this.b.$1(s.C(s,b))}}
A.cC.prototype={$in:1}
A.en.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s}}
A.aF.prototype={
gj(a){return J.bI(this.a)},
C(a,b){return this.b.$1(J.kP(this.a,b))}}
A.d8.prototype={
gt(a){return new A.d9(J.an(this.a),this.b)}}
A.d9.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()}}
A.aH.prototype={
U(a,b){A.fg(b,"count")
A.aj(b,"count")
return new A.aH(this.a,this.b+b,A.A(this).h("aH<1>"))},
gt(a){var s=this.a
return new A.eE(s.gt(s),this.b)}}
A.bJ.prototype={
gj(a){var s=this.a,r=s.gj(s)-this.b
if(r>=0)return r
return 0},
U(a,b){A.fg(b,"count")
A.aj(b,"count")
return new A.bJ(this.a,this.b+b,this.$ti)},
$in:1}
A.eE.prototype={
k(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.k()
this.b=0
return s.k()},
gl(){return this.a.gl()}}
A.cD.prototype={
gt(a){return B.J},
gj(a){return 0},
C(a,b){throw A.b(A.ac(b,0,0,"index",null))},
U(a,b){A.aj(b,"count")
return this}}
A.e6.prototype={
k(){return!1},
gl(){throw A.b(A.eg())}}
A.cG.prototype={}
A.cY.prototype={
gj(a){return J.bI(this.a)},
C(a,b){var s=this.a,r=J.cp(s)
return r.C(s,r.gj(s)-1-b)}}
A.dI.prototype={}
A.V.prototype={$r:"+(1,2)",$s:1}
A.dw.prototype={$r:"+basicSupport,supportsReadWriteUnsafe(1,2)",$s:2}
A.dx.prototype={$r:"+controller,sync(1,2)",$s:3}
A.ce.prototype={$r:"+file,outFlags(1,2)",$s:4}
A.f_.prototype={$r:"+result,resultCode(1,2)",$s:5}
A.cz.prototype={
i(a){return A.kZ(this)},
gby(){return new A.cf(this.hh(),A.A(this).h("cf<a7<1,2>>"))},
hh(){var s=this
return function(){var r=0,q=1,p=[],o,n,m
return function $async$gby(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gba(),o=o.gt(o),n=A.A(s).h("a7<1,2>")
case 2:if(!o.k()){r=3
break}m=o.gl()
r=4
return a.b=new A.a7(m,s.n(0,m),n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iaU:1}
A.cA.prototype={
gj(a){return this.b.length},
gdm(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
a0(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
n(a,b){if(!this.a0(b))return null
return this.b[this.a[b]]},
bA(a,b){var s,r,q=this.gdm(),p=this.b
for(s=q.length,r=0;r<s;++r)b.$2(q[r],p[r])},
gba(){return new A.dm(this.gdm(),this.$ti.h("dm<1>"))}}
A.dm.prototype={
gj(a){return this.a.length},
gt(a){var s=this.a
return new A.eV(s,s.length,this.$ti.h("eV<1>"))}}
A.eV.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0}}
A.cZ.prototype={}
A.ia.prototype={
X(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.cU.prototype={
i(a){return"Null check operator used on a null value"}}
A.ek.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eG.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hE.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cE.prototype={}
A.dz.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iJ:1}
A.ba.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.n2(r==null?"unknown":r)+"'"},
giM(){return this},
$C:"$1",
$R:1,
$D:null}
A.fs.prototype={$C:"$0",$R:0}
A.ft.prototype={$C:"$2",$R:2}
A.i0.prototype={}
A.hV.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.n2(s)+"'"}}
A.cw.prototype={
T(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cw))return!1
return this.$_target===b.$_target&&this.a===b.a},
gv(a){return(A.mW(this.a)^A.cW(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.ey(this.a)+"'")}}
A.eB.prototype={
i(a){return"RuntimeError: "+this.a}}
A.bd.prototype={
gj(a){return this.a},
gba(){return new A.aD(this,A.A(this).h("aD<1>"))},
gby(){return new A.cK(this,A.A(this).h("cK<1,2>"))},
a0(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.hH(a)},
hH(a){var s=this.d
if(s==null)return!1
return this.bJ(this.dj(s,a),a)>=0},
a8(a,b){b.bA(0,new A.hv(this))},
n(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.hI(b)},
hI(a){var s,r,q=this.d
if(q==null)return null
s=this.dj(q,a)
r=this.bJ(s,a)
if(r<0)return null
return s[r].b},
q(a,b,c){var s,r,q=this
if(typeof b=="string"){s=q.b
q.cY(s==null?q.b=q.cd():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cY(r==null?q.c=q.cd():r,b,c)}else q.hK(b,c)},
hK(a,b){var s,r,q,p=this,o=p.d
if(o==null)o=p.d=p.cd()
s=p.cA(a)
r=o[s]
if(r==null)o[s]=[p.c0(a,b)]
else{q=p.bJ(r,a)
if(q>=0)r[q].b=b
else r.push(p.c0(a,b))}},
ea(a,b){var s,r,q=this
if(q.a0(a)){s=q.n(0,a)
return s==null?A.A(q).y[1].a(s):s}r=b.$0()
q.q(0,a,r)
return r},
u(a,b){var s=this
if(typeof b=="string")return s.dw(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.dw(s.c,b)
else return s.hJ(b)},
hJ(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.cA(a)
r=n[s]
q=o.bJ(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.dI(p)
if(r.length===0)delete n[s]
return p.b},
W(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.c_()}},
bA(a,b){var s=this,r=s.e,q=s.r
while(r!=null){b.$2(r.a,r.b)
if(q!==s.r)throw A.b(A.a5(s))
r=r.c}},
cY(a,b,c){var s=a[b]
if(s==null)a[b]=this.c0(b,c)
else s.b=c},
dw(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.dI(s)
delete a[b]
return s.b},
c_(){this.r=this.r+1&1073741823},
c0(a,b){var s,r=this,q=new A.hw(a,b)
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.d=s
r.f=s.c=q}++r.a
r.c_()
return q},
dI(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.c_()},
cA(a){return J.a8(a)&1073741823},
dj(a,b){return a[this.cA(b)]},
bJ(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.M(a[r].a,b))return r
return-1},
i(a){return A.kZ(this)},
cd(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s}}
A.hv.prototype={
$2(a,b){this.a.q(0,a,b)},
$S(){return A.A(this.a).h("~(1,2)")}}
A.hw.prototype={}
A.aD.prototype={
gj(a){return this.a.a},
gt(a){var s=this.a
return new A.em(s,s.r,s.e)}}
A.em.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}}}
A.bN.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}}}
A.cK.prototype={
gj(a){return this.a.a},
gt(a){var s=this.a
return new A.el(s,s.r,s.e,this.$ti.h("el<1,2>"))}}
A.el.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a7(s.a,s.b,r.$ti.h("a7<1,2>"))
r.c=s.c
return!0}}}
A.kA.prototype={
$1(a){return this.a(a)},
$S:35}
A.kB.prototype={
$2(a,b){return this.a(a,b)},
$S:32}
A.kC.prototype={
$1(a){return this.a(a)},
$S:33}
A.dv.prototype={
i(a){return this.dH(!1)},
dH(a){var s,r,q,p,o,n=this.eU(),m=this.dk(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
o=m[q]
l=a?l+A.m_(o):l+A.w(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
eU(){var s,r=this.$s
while($.jJ.length<=r)$.jJ.push(null)
s=$.jJ[r]
if(s==null){s=this.eO()
$.jJ[r]=s}return s},
eO(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.u(new Array(l),t.f)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
k[q]=r[s]}}k=A.ob(k,!1,t.K)
k.$flags=3
return k}}
A.eZ.prototype={
dk(){return[this.a,this.b]},
T(a,b){if(b==null)return!1
return b instanceof A.eZ&&this.$s===b.$s&&J.M(this.a,b.a)&&J.M(this.b,b.b)},
gv(a){return A.l_(this.$s,this.a,this.b,B.f)}}
A.ht.prototype={
i(a){return"RegExp/"+this.a+"/"+this.b.flags},
hn(a){var s=this.b.exec(a)
if(s==null)return null
return new A.jF(s)}}
A.jF.prototype={}
A.eK.prototype={
P(){var s=this.b
if(s===this)throw A.b(A.lS(this.a))
return s}}
A.bQ.prototype={
gD(a){return B.am},
dM(a,b,c){A.fb(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iD:1,
$ib8:1}
A.bP.prototype={$ibP:1}
A.cS.prototype={
ga9(a){if(((a.$flags|0)&2)!==0)return new A.f7(a.buffer)
else return a.buffer},
f9(a,b,c,d){var s=A.ac(b,0,c,d,null)
throw A.b(s)},
d3(a,b,c,d){if(b>>>0!==b||b>c)this.f9(a,b,c,d)}}
A.f7.prototype={
dM(a,b,c){var s=A.ai(this.a,b,c)
s.$flags=3
return s},
$ib8:1}
A.cQ.prototype={
gD(a){return B.an},
$iD:1}
A.bR.prototype={
gj(a){return a.length},
fw(a,b,c,d,e){var s,r,q=a.length
this.d3(a,b,q,"start")
this.d3(a,c,q,"end")
if(b>c)throw A.b(A.ac(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.X(e,null))
r=d.length
if(r-e<s)throw A.b(A.C("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iaa:1}
A.cR.prototype={
n(a,b){A.aL(b,a,a.length)
return a[b]},
q(a,b,c){a.$flags&2&&A.r(a)
A.aL(b,a,a.length)
a[b]=c},
F(a,b,c,d,e){a.$flags&2&&A.r(a,5)
this.cW(a,b,c,d,e)},
Y(a,b,c,d){return this.F(a,b,c,d,0)},
$in:1,
$it:1}
A.ab.prototype={
q(a,b,c){a.$flags&2&&A.r(a)
A.aL(b,a,a.length)
a[b]=c},
F(a,b,c,d,e){a.$flags&2&&A.r(a,5)
if(t.eB.b(d)){this.fw(a,b,c,d,e)
return}this.cW(a,b,c,d,e)},
Y(a,b,c,d){return this.F(a,b,c,d,0)},
$in:1,
$it:1}
A.ep.prototype={
gD(a){return B.ao},
$iD:1}
A.eq.prototype={
gD(a){return B.ap},
$iD:1}
A.er.prototype={
gD(a){return B.aq},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1}
A.es.prototype={
gD(a){return B.ar},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1}
A.et.prototype={
gD(a){return B.as},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1}
A.eu.prototype={
gD(a){return B.au},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1}
A.ev.prototype={
gD(a){return B.av},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1}
A.cT.prototype={
gD(a){return B.aw},
gj(a){return a.length},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1}
A.bi.prototype={
gD(a){return B.ax},
gj(a){return a.length},
n(a,b){A.aL(b,a,a.length)
return a[b]},
$iD:1,
$ibi:1,
$ibl:1}
A.dq.prototype={}
A.dr.prototype={}
A.ds.prototype={}
A.dt.prototype={}
A.ao.prototype={
h(a){return A.dG(v.typeUniverse,this,a)},
N(a){return A.mt(v.typeUniverse,this,a)}}
A.eR.prototype={}
A.k_.prototype={
i(a){return A.af(this.a,null)}}
A.eP.prototype={
i(a){return this.a}}
A.dC.prototype={$iaI:1}
A.iB.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:17}
A.iA.prototype={
$1(a){var s,r
this.a.a=a
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:79}
A.iC.prototype={
$0(){this.a.$0()},
$S:2}
A.iD.prototype={
$0(){this.a.$0()},
$S:2}
A.f6.prototype={
eG(a,b){if(self.setTimeout!=null)self.setTimeout(A.b4(new A.jZ(this,b),0),a)
else throw A.b(A.aY("`setTimeout()` not found."))},
eH(a,b){if(self.setTimeout!=null)self.setInterval(A.b4(new A.jY(this,a,Date.now(),b),0),a)
else throw A.b(A.aY("Periodic timer."))}}
A.jZ.prototype={
$0(){this.a.c=1
this.b.$0()},
$S:0}
A.jY.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.a.cX(s,o)}q.c=p
r.d.$1(q)},
$S:2}
A.db.prototype={
E(a){var s,r=this
if(a==null)a=r.$ti.c.a(a)
if(!r.b)r.a.aW(a)
else{s=r.a
if(r.$ti.h("x<1>").b(a))s.d2(a)
else s.aX(a)}},
ai(a,b){var s
if(b==null)b=A.cu(a)
s=this.a
if(this.b)s.L(new A.H(a,b))
else s.a7(new A.H(a,b))},
I(a){return this.ai(a,null)},
$icx:1}
A.kh.prototype={
$1(a){return this.a.$2(0,a)},
$S:8}
A.ki.prototype={
$2(a,b){this.a.$2(1,new A.cE(a,b))},
$S:36}
A.ks.prototype={
$2(a,b){this.a(a,b)},
$S:42}
A.f4.prototype={
gl(){return this.b},
fq(a,b){var s,r,q
a=a
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
k(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.k()){o.b=s.gl()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.fq(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.mn
return!1}o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.mn
throw n
return!1}o.a=p.pop()
m=1
continue}throw A.b(A.C("sync*"))}return!1},
iO(a){var s,r,q=this
if(a instanceof A.cf){s=a.a()
r=q.e
if(r==null)r=q.e=[]
r.push(q.a)
q.a=s
return 2}else{q.d=J.an(a)
return 2}}}
A.cf.prototype={
gt(a){return new A.f4(this.a())}}
A.H.prototype={
i(a){return A.w(this.a)},
$iE:1,
ga6(){return this.b}}
A.hm.prototype={
$2(a,b){var s=this,r=s.a,q=--r.b
if(r.a!=null){r.a=null
r.d=a
r.c=b
if(q===0||s.c)s.d.L(new A.H(a,b))}else if(q===0&&!s.c){q=r.d
q.toString
r=r.c
r.toString
s.d.L(new A.H(q,r))}},
$S:9}
A.hl.prototype={
$1(a){var s,r,q,p,o,n,m=this,l=m.a,k=--l.b,j=l.a
if(j!=null){J.ly(j,m.b,a)
if(J.M(k,0)){l=m.d
s=A.u([],l.h("q<0>"))
for(q=j,p=q.length,o=0;o<q.length;q.length===p||(0,A.R)(q),++o){r=q[o]
n=r
if(n==null)n=l.a(n)
J.lz(s,n)}m.c.aX(s)}}else if(J.M(k,0)&&!m.f){s=l.d
s.toString
l=l.c
l.toString
m.c.L(new A.H(s,l))}},
$S(){return this.d.h("z(0)")}}
A.hf.prototype={
$2(a,b){if(!this.a.b(a))throw A.b(a)
return this.c.$2(a,b)},
$S(){return this.d.h("0/(d,J)")}}
A.hg.prototype={
$1(a){var s,r,q,p,o,n,m=this
if(a===0){s=A.u([],m.c.h("q<0>"))
for(r=m.b,q=r.length,p=0;p<r.length;r.length===q||(0,A.R)(r),++p){o=r[p]
n=o.b
if(n==null)o.$ti.c.a(n)
s.push(n)}m.a.E(s)}else{s=A.u([],t.gz)
for(r=m.b,q=r.length,p=0;p<r.length;r.length===q||(0,A.R)(r),++p)s.push(r[p].c)
q=A.u([],m.c.h("q<0?>"))
for(n=r.length,p=0;p<r.length;r.length===n||(0,A.R)(r),++p)q.push(r[p].b)
m.a.I(new A.cV(B.c.e0(s,A.qf()),a))}},
$S:3}
A.cV.prototype={
i(a){var s,r,q="ParallelWaitError",p=this.c
if(p==null){p=this.d
s=p<=1
if(s)return q
return"ParallelWaitError("+p+" errors)"}s=this.d
r=s>1
if(r)s="("+s+" errors)"
else s=""
return q+s+": "+A.w(p.a)},
ga6(){var s=this.c
s=s==null?null:s.b
return s==null?A.E.prototype.ga6.call(this):s}}
A.dk.prototype={
fD(a){this.a.ap(new A.jh(this,a),new A.ji(this,a),t.P)}}
A.jh.prototype={
$1(a){this.a.b=a
this.b.$1(0)},
$S(){return this.a.$ti.h("z(1)")}}
A.ji.prototype={
$2(a,b){this.a.c=new A.H(a,b)
this.b.$1(1)},
$S:10}
A.jg.prototype={
$1(a){var s=this.a,r=s.a+=a
if(++s.b===this.b.length)this.c.$1(r)},
$S:3}
A.c4.prototype={
ai(a,b){if((this.a.a&30)!==0)throw A.b(A.C("Future already completed"))
this.L(A.lh(a,b))},
I(a){return this.ai(a,null)},
$icx:1}
A.aw.prototype={
E(a){var s=this.a
if((s.a&30)!==0)throw A.b(A.C("Future already completed"))
s.aW(a)},
M(){return this.E(null)},
L(a){this.a.a7(a)}}
A.F.prototype={
E(a){var s=this.a
if((s.a&30)!==0)throw A.b(A.C("Future already completed"))
s.aB(a)},
M(){return this.E(null)},
L(a){this.a.L(a)}}
A.ax.prototype={
hT(a){if((this.c&15)!==6)return!0
return this.b.b.bg(this.d,a.a,t.y,t.K)},
hv(a){var s,r=this.e,q=null,p=t.z,o=t.K,n=a.a,m=this.b.b
if(t.R.b(r))q=m.cI(r,n,a.b,p,o,t.l)
else q=m.bg(r,n,p,o)
try{p=q
return p}catch(s){if(t.eK.b(A.S(s))){if((this.c&1)!==0)throw A.b(A.X("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.X("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.k.prototype={
ap(a,b,c){var s,r,q=$.l
if(q===B.b){if(b!=null&&!t.R.b(b)&&!t.E.b(b))throw A.b(A.b7(b,"onError",u.c))}else{a=q.aM(a,c.h("0/"),this.$ti.c)
if(b!=null)b=A.pX(b,q)}s=new A.k($.l,c.h("k<0>"))
r=b==null?1:3
this.aV(new A.ax(s,r,a,b,this.$ti.h("@<1>").N(c).h("ax<1,2>")))
return s},
bi(a,b){return this.ap(a,null,b)},
dG(a,b,c){var s=new A.k($.l,c.h("k<0>"))
this.aV(new A.ax(s,19,a,b,this.$ti.h("@<1>").N(c).h("ax<1,2>")))
return s},
K(a){var s=this.$ti,r=$.l,q=new A.k(r,s)
if(r!==B.b)a=r.an(a,t.z)
this.aV(new A.ax(q,8,a,null,s.h("ax<1,1>")))
return q},
fu(a){this.a=this.a&1|16
this.c=a},
bp(a){this.a=a.a&30|this.a&1
this.c=a.c},
aV(a){var s=this,r=s.a
if(r<=3){a.a=s.c
s.c=a}else{if((r&4)!==0){r=s.c
if((r.a&24)===0){r.aV(a)
return}s.bp(r)}s.b.ae(new A.jj(s,a))}},
dr(a){var s,r,q,p,o,n=this,m={}
m.a=a
if(a==null)return
s=n.a
if(s<=3){r=n.c
n.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){s=n.c
if((s.a&24)===0){s.dr(a)
return}n.bp(s)}m.a=n.bs(a)
n.b.ae(new A.jo(m,n))}},
b0(){var s=this.c
this.c=null
return this.bs(s)},
bs(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aB(a){var s,r=this
if(r.$ti.h("x<1>").b(a))A.jm(a,r,!0)
else{s=r.b0()
r.a=8
r.c=a
A.bs(r,s)}},
aX(a){var s=this,r=s.b0()
s.a=8
s.c=a
A.bs(s,r)},
eN(a){var s,r,q,p=this
if((a.a&16)!==0){s=p.b
r=a.b
s=!(s===r||s.ga1()===r.ga1())}else s=!1
if(s)return
q=p.b0()
p.bp(a)
A.bs(p,q)},
L(a){var s=this.b0()
this.fu(a)
A.bs(this,s)},
eM(a,b){this.L(new A.H(a,b))},
aW(a){if(this.$ti.h("x<1>").b(a)){this.d2(a)
return}this.d0(a)},
d0(a){this.a^=2
this.b.ae(new A.jl(this,a))},
d2(a){A.jm(a,this,!1)
return},
a7(a){this.a^=2
this.b.ae(new A.jk(this,a))},
$ix:1}
A.jj.prototype={
$0(){A.bs(this.a,this.b)},
$S:0}
A.jo.prototype={
$0(){A.bs(this.b,this.a.a)},
$S:0}
A.jn.prototype={
$0(){A.jm(this.a.a,this.b,!0)},
$S:0}
A.jl.prototype={
$0(){this.a.aX(this.b)},
$S:0}
A.jk.prototype={
$0(){this.a.L(this.b)},
$S:0}
A.jr.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.ao(q.d,t.z)}catch(p){s=A.S(p)
r=A.W(p)
if(k.c&&k.b.a.c.a===s){q=k.a
q.c=k.b.a.c}else{q=s
o=r
if(o==null)o=A.cu(q)
n=k.a
n.c=new A.H(q,o)
q=n}q.b=!0
return}if(j instanceof A.k&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=j.c
q.b=!0}return}if(j instanceof A.k){m=k.b.a
l=new A.k(m.b,m.$ti)
j.ap(new A.js(l,m),new A.jt(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.js.prototype={
$1(a){this.a.eN(this.b)},
$S:17}
A.jt.prototype={
$2(a,b){this.a.L(new A.H(a,b))},
$S:10}
A.jq.prototype={
$0(){var s,r,q,p,o,n
try{q=this.a
p=q.a
o=p.$ti
q.c=p.b.b.bg(p.d,this.b,o.h("2/"),o.c)}catch(n){s=A.S(n)
r=A.W(n)
q=s
p=r
if(p==null)p=A.cu(q)
o=this.a
o.c=new A.H(q,p)
o.b=!0}},
$S:0}
A.jp.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=l.a.a.c
p=l.b
if(p.a.hT(s)&&p.a.e!=null){p.c=p.a.hv(s)
p.b=!1}}catch(o){r=A.S(o)
q=A.W(o)
p=l.a.a.c
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.cu(p)
m=l.b
m.c=new A.H(p,n)
p=m}p.b=!0}},
$S:0}
A.eH.prototype={}
A.N.prototype={
gj(a){var s={},r=new A.k($.l,t.B)
s.a=0
this.J(new A.hY(s,this),!0,new A.hZ(s,r),r.gd7())
return r},
gaa(a){var s=new A.k($.l,A.A(this).h("k<N.T>")),r=this.J(null,!0,new A.hW(s),s.gd7())
r.e7(new A.hX(this,r,s))
return s}}
A.hY.prototype={
$1(a){++this.a.a},
$S(){return A.A(this.b).h("~(N.T)")}}
A.hZ.prototype={
$0(){this.b.aB(this.a.a)},
$S:0}
A.hW.prototype={
$0(){var s,r=A.m5(),q=new A.au("No element")
A.ez(q,r)
s=A.fc(q,r)
if(s==null)s=new A.H(q,r)
this.a.L(s)},
$S:0}
A.hX.prototype={
$1(a){A.pq(this.b,this.c,a)},
$S(){return A.A(this.a).h("~(N.T)")}}
A.bv.prototype={
gfh(){if((this.b&8)===0)return this.a
return this.a.gcq()},
aY(){var s,r=this
if((r.b&8)===0){s=r.a
return s==null?r.a=new A.du():s}s=r.a.gcq()
return s},
gS(){var s=this.a
return(this.b&8)!==0?s.gcq():s},
af(){if((this.b&4)!==0)return new A.au("Cannot add event after closing")
return new A.au("Cannot add event while adding a stream")},
de(){var s=this.c
if(s==null)s=this.c=(this.b&2)!==0?$.cs():new A.k($.l,t.D)
return s},
G(a,b){var s=this,r=s.b
if(r>=4)throw A.b(s.af())
if((r&1)!==0)s.ag(b)
else if((r&3)===0)s.aY().G(0,new A.b0(b))},
dL(a,b){var s,r,q=this
if(q.b>=4)throw A.b(q.af())
s=A.lh(a,b)
a=s.a
b=s.b
r=q.b
if((r&1)!==0)q.b2(a,b)
else if((r&3)===0)q.aY().G(0,new A.de(a,b))},
fG(a){return this.dL(a,null)},
m(){var s=this,r=s.b
if((r&4)!==0)return s.de()
if(r>=4)throw A.b(s.af())
r=s.b=r|4
if((r&1)!==0)s.b1()
else if((r&3)===0)s.aY().G(0,B.k)
return s.de()},
dE(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i=this
if((i.b&3)!==0)throw A.b(A.C("Stream has already been listened to."))
s=A.A(i)
r=$.l
q=d?1:0
p=b!=null?32:0
o=A.lb(r,a,s.c)
n=A.mh(r,b)
m=c==null?A.qh():c
l=new A.c8(i,o,n,r.an(m,t.H),r,q|p,s.h("c8<1>"))
k=i.gfh()
if(((i.b|=1)&8)!==0){j=i.a
j.scq(l)
j.aN()}else i.a=l
l.fv(k)
l.c9(new A.jU(i))
return l},
fm(a){var s,r,q,p,o,n,m,l=this,k=null
if((l.b&8)!==0)k=l.a.p()
l.a=null
l.b=l.b&4294967286|2
s=l.r
if(s!=null)if(k==null)try{r=s.$0()
if(r instanceof A.k)k=r}catch(o){q=A.S(o)
p=A.W(o)
n=new A.k($.l,t.D)
n.a7(new A.H(q,p))
k=n}else k=k.K(s)
m=new A.jT(l)
if(k!=null)k=k.K(m)
else m.$0()
return k}}
A.jU.prototype={
$0(){A.ll(this.a.d)},
$S:0}
A.jT.prototype={
$0(){var s=this.a.c
if(s!=null&&(s.a&30)===0)s.aW(null)},
$S:0}
A.f5.prototype={
ag(a){this.gS().aA(a)},
b2(a,b){this.gS().aU(a,b)},
b1(){this.gS().d4()}}
A.eI.prototype={
ag(a){this.gS().az(new A.b0(a))},
b2(a,b){this.gS().az(new A.de(a,b))},
b1(){this.gS().az(B.k)}}
A.c2.prototype={}
A.cg.prototype={}
A.c7.prototype={
gv(a){return(A.cW(this.a)^892482866)>>>0},
T(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.c7&&b.a===this.a}}
A.c8.prototype={
cf(){return this.w.fm(this)},
aE(){var s=this.w
if((s.b&8)!==0)s.a.bP()
A.ll(s.e)},
aF(){var s=this.w
if((s.b&8)!==0)s.a.aN()
A.ll(s.f)}}
A.ad.prototype={
fv(a){var s=this
if(a==null)return
s.r=a
if(a.c!=null){s.e=(s.e|128)>>>0
a.bm(s)}},
e7(a){this.a=A.lb(this.d,a,A.A(this).h("ad.T"))},
bQ(a){var s,r=this,q=r.e
if((q&8)!==0)return
r.e=(q+256|4)>>>0
if(a!=null)a.K(r.gi0())
if(q<256){s=r.r
if(s!=null)if(s.a===1)s.a=3}if((q&4)===0&&(r.e&64)===0)r.c9(r.gcg())},
bP(){return this.bQ(null)},
aN(){var s=this,r=s.e
if((r&8)!==0)return
if(r>=256){r=s.e=r-256
if(r<256)if((r&128)!==0&&s.r.c!=null)s.r.bm(s)
else{r=(r&4294967291)>>>0
s.e=r
if((r&64)===0)s.c9(s.gci())}}},
p(){var s=this,r=(s.e&4294967279)>>>0
s.e=r
if((r&8)===0)s.c2()
r=s.f
return r==null?$.cs():r},
c2(){var s,r=this,q=r.e=(r.e|8)>>>0
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.cf()},
aA(a){var s=this.e
if((s&8)!==0)return
if(s<64)this.ag(a)
else this.az(new A.b0(a))},
aU(a,b){var s
if(t.C.b(a))A.ez(a,b)
s=this.e
if((s&8)!==0)return
if(s<64)this.b2(a,b)
else this.az(new A.de(a,b))},
d4(){var s=this,r=s.e
if((r&8)!==0)return
r=(r|2)>>>0
s.e=r
if(r<64)s.b1()
else s.az(B.k)},
aE(){},
aF(){},
cf(){return null},
az(a){var s,r=this,q=r.r
if(q==null)q=r.r=new A.du()
q.G(0,a)
s=r.e
if((s&128)===0){s=(s|128)>>>0
r.e=s
if(s<256)q.bm(r)}},
ag(a){var s=this,r=s.e
s.e=(r|64)>>>0
s.d.bh(s.a,a,A.A(s).h("ad.T"))
s.e=(s.e&4294967231)>>>0
s.c3((r&4)!==0)},
b2(a,b){var s,r=this,q=r.e,p=new A.iJ(r,a,b)
if((q&1)!==0){r.e=(q|16)>>>0
r.c2()
s=r.f
if(s!=null&&s!==$.cs())s.K(p)
else p.$0()}else{p.$0()
r.c3((q&4)!==0)}},
b1(){var s,r=this,q=new A.iI(r)
r.c2()
r.e=(r.e|16)>>>0
s=r.f
if(s!=null&&s!==$.cs())s.K(q)
else q.$0()},
c9(a){var s=this,r=s.e
s.e=(r|64)>>>0
a.$0()
s.e=(s.e&4294967231)>>>0
s.c3((r&4)!==0)},
c3(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=(p&4294967167)>>>0
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p=(p&4294967291)>>>0
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=(p^64)>>>0
if(r)q.aE()
else q.aF()
p=(q.e&4294967231)>>>0
q.e=p}if((p&128)!==0&&p<256)q.r.bm(q)},
$iak:1}
A.iJ.prototype={
$0(){var s,r,q,p=this.a,o=p.e
if((o&8)!==0&&(o&16)===0)return
p.e=(o|64)>>>0
s=p.b
o=this.b
r=t.K
q=p.d
if(t.da.b(s))q.ed(s,o,this.c,r,t.l)
else q.bh(s,o,r)
p.e=(p.e&4294967231)>>>0},
$S:0}
A.iI.prototype={
$0(){var s=this.a,r=s.e
if((r&16)===0)return
s.e=(r|74)>>>0
s.d.bR(s.c)
s.e=(s.e&4294967231)>>>0},
$S:0}
A.dA.prototype={
J(a,b,c,d){return this.a.dE(a,d,c,b===!0)},
bb(a,b,c){return this.J(a,null,b,c)}}
A.eO.prototype={
gam(){return this.a},
sam(a){return this.a=a}}
A.b0.prototype={
cG(a){a.ag(this.b)}}
A.de.prototype={
cG(a){a.b2(this.b,this.c)}}
A.j8.prototype={
cG(a){a.b1()},
gam(){return null},
sam(a){throw A.b(A.C("No events after a done."))}}
A.du.prototype={
bm(a){var s=this,r=s.a
if(r===1)return
if(r>=1){s.a=1
return}A.qS(new A.jI(s,a))
s.a=1},
G(a,b){var s=this,r=s.c
if(r==null)s.b=s.c=b
else{r.sam(b)
s.c=b}}}
A.jI.prototype={
$0(){var s,r,q=this.a,p=q.a
q.a=0
if(p===3)return
s=q.b
r=s.gam()
q.b=r
if(r==null)q.c=null
s.cG(this.b)},
$S:0}
A.bw.prototype={
gl(){if(this.c)return this.b
return null},
k(){var s,r=this,q=r.a
if(q!=null){if(r.c){s=new A.k($.l,t.k)
r.b=s
r.c=!1
q.aN()
return s}throw A.b(A.C("Already waiting for next."))}return r.f8()},
f8(){var s,r,q=this,p=q.b
if(p!=null){s=new A.k($.l,t.k)
q.b=s
r=p.J(q.gfb(),!0,q.gfd(),q.gff())
if(q.b!=null)q.a=r
return s}return $.n4()},
p(){var s=this,r=s.a,q=s.b
s.b=null
if(r!=null){s.a=null
if(!s.c)q.aW(!1)
else s.c=!1
return r.p()}return $.cs()},
fc(a){var s,r,q=this
if(q.a==null)return
s=q.b
q.b=a
q.c=!0
s.aB(!0)
if(q.c){r=q.a
if(r!=null)r.bP()}},
fg(a,b){var s=this,r=s.a,q=s.b
s.b=s.a=null
if(r!=null)q.L(new A.H(a,b))
else q.a7(new A.H(a,b))},
fe(){var s=this,r=s.a,q=s.b
s.b=s.a=null
if(r!=null)q.aX(!1)
else q.d0(!1)}}
A.aK.prototype={
J(a,b,c,d){var s=null,r=new A.dp(s,s,s,s,this.$ti.h("dp<1>"))
r.d=new A.jG(this,r)
return r.dE(a,d,c,b===!0)},
bb(a,b,c){return this.J(a,null,b,c)},
al(a){return this.J(a,null,null,null)}}
A.jG.prototype={
$0(){this.a.b.$1(this.b)},
$S:0}
A.dp.prototype={
fJ(a){var s=this.b
if(s>=4)throw A.b(this.af())
if((s&1)!==0)this.gS().aA(a)},
$ibh:1}
A.kj.prototype={
$0(){return this.a.aB(this.b)},
$S:0}
A.di.prototype={
J(a,b,c,d){var s=this.$ti,r=$.l,q=b===!0?1:0,p=A.lb(r,a,s.y[1]),o=A.mh(r,d)
s=new A.cb(this,p,o,r.an(c,t.H),r,q|32,s.h("cb<1,2>"))
s.x=this.a.bb(s.geZ(),s.gf1(),s.gf3())
return s},
bb(a,b,c){return this.J(a,null,b,c)}}
A.cb.prototype={
aA(a){if((this.e&2)!==0)return
this.ez(a)},
aU(a,b){if((this.e&2)!==0)return
this.eA(a,b)},
aE(){var s=this.x
if(s!=null)s.bP()},
aF(){var s=this.x
if(s!=null)s.aN()},
cf(){var s=this.x
if(s!=null){this.x=null
return s.p()}return null},
f_(a){this.w.f0(a,this)},
f4(a,b){this.aU(a,b)},
f2(){this.d4()}}
A.bt.prototype={
f0(a,b){var s,r,q,p,o,n,m=null
try{m=this.b.$1(a)}catch(q){s=A.S(q)
r=A.W(q)
p=s
o=r
n=A.fc(p,o)
if(n!=null){p=n.a
o=n.b}b.aU(p,o)
return}b.aA(m)}}
A.kd.prototype={}
A.kf.prototype={}
A.ke.prototype={}
A.kb.prototype={}
A.kc.prototype={}
A.ka.prototype={}
A.k7.prototype={}
A.fa.prototype={}
A.k6.prototype={}
A.k5.prototype={}
A.k9.prototype={}
A.k8.prototype={}
A.f9.prototype={
hp(a,b,c,d,e){return this.b.$5(a,b,c,d,e)}}
A.kg.prototype={}
A.f8.prototype={
aZ(a,b,c){var s,r,q,p,o,n,m=this.gcb(),l=m.a
if(l===B.b){A.dM(b,c)
return}o=l.ge8()
o.toString
s=o
r=$.l
try{$.l=s
m.hp(l,l.gO(),a,b,c)
$.l=r}catch(n){q=A.S(n)
p=A.W(n)
$.l=r
o=b===q?c:p
s.aZ(l,q,o)}},
$io:1}
A.eL.prototype={
gdc(){var s=this.ax
return s==null?this.ax=new A.cj(this):s},
gO(){return this.ay.gdc()},
ga1(){return this.as.a},
bR(a){var s,r,q
try{this.ao(a,t.H)}catch(q){s=A.S(q)
r=A.W(q)
this.aZ(this,s,r)}},
bh(a,b,c){var s,r,q
try{this.bg(a,b,t.H,c)}catch(q){s=A.S(q)
r=A.W(q)
this.aZ(this,s,r)}},
ed(a,b,c,d,e){var s,r,q
try{this.cI(a,b,c,t.H,d,e)}catch(q){s=A.S(q)
r=A.W(q)
this.aZ(this,s,r)}},
ct(a,b){return new A.j5(this,this.an(a,b),b)},
bt(a){return new A.j4(this,this.an(a,t.H))},
cu(a,b){return new A.j6(this,this.aM(a,t.H,b),b)},
b9(a,b){this.aZ(this,a,b)},
e2(a,b){var s=this.Q,r=s.a
return s.b.$5(r,r.gO(),this,a,b)},
ao(a,b){var s=this.a,r=s.a
return s.b.$1$4(r,r.gO(),this,a,b)},
bg(a,b,c,d){var s=this.b,r=s.a
return s.b.$2$5(r,r.gO(),this,a,b,c,d)},
cI(a,b,c,d,e,f){var s=this.c,r=s.a
return s.b.$3$6(r,r.gO(),this,a,b,c,d,e,f)},
an(a,b){var s=this.d,r=s.a
return s.b.$1$4(r,r.gO(),this,a,b)},
aM(a,b,c){var s=this.e,r=s.a
return s.b.$2$4(r,r.gO(),this,a,b,c)},
be(a,b,c,d){var s=this.f,r=s.a
return s.b.$3$4(r,r.gO(),this,a,b,c,d)},
dY(a,b){var s=this.r,r=s.a
if(r===B.b)return null
return s.b.$5(r,r.gO(),this,a,b)},
ae(a){var s=this.w,r=s.a
return s.b.$4(r,r.gO(),this,a)},
gdz(){return this.a},
gdB(){return this.b},
gdA(){return this.c},
gdu(){return this.d},
gdv(){return this.e},
gdt(){return this.f},
gdf(){return this.r},
gcm(){return this.w},
gd9(){return this.x},
gd8(){return this.y},
gds(){return this.z},
gdh(){return this.Q},
gcb(){return this.as},
gdK(){return this.at},
ge8(){return this.ay}}
A.j5.prototype={
$0(){return this.a.ao(this.b,this.c)},
$S(){return this.c.h("0()")}}
A.j4.prototype={
$0(){return this.a.bR(this.b)},
$S:0}
A.j6.prototype={
$1(a){return this.a.bh(this.b,a,this.c)},
$S(){return this.c.h("~(0)")}}
A.f0.prototype={
gdz(){return B.aK},
gdB(){return B.aJ},
gdA(){return B.aI},
gdu(){return B.aG},
gdv(){return B.aH},
gdt(){return B.aF},
gdf(){return B.aB},
gcm(){return B.aL},
gd9(){return B.U},
gd8(){return B.T},
gds(){return B.aE},
gdh(){return B.aC},
gcb(){return B.aD},
gdK(){return B.V},
ge8(){return null},
gdc(){var s=$.jK
return s==null?$.jK=new A.cj(this):s},
gO(){var s=$.jK
return s==null?$.jK=new A.cj(this):s},
ga1(){return this},
bR(a){var s,r,q
try{if(B.b===$.l){a.$0()
return}A.kp(null,null,this,a)}catch(q){s=A.S(q)
r=A.W(q)
A.dM(s,r)}},
bh(a,b){var s,r,q
try{if(B.b===$.l){a.$1(b)
return}A.kq(null,null,this,a,b)}catch(q){s=A.S(q)
r=A.W(q)
A.dM(s,r)}},
ed(a,b,c){var s,r,q
try{if(B.b===$.l){a.$2(b,c)
return}A.lk(null,null,this,a,b,c)}catch(q){s=A.S(q)
r=A.W(q)
A.dM(s,r)}},
ct(a,b){return new A.jM(this,a,b)},
bt(a){return new A.jL(this,a)},
cu(a,b){return new A.jN(this,a,b)},
b9(a,b){A.dM(a,b)},
e2(a,b){return A.mF(null,null,this,a,b)},
ao(a){if($.l===B.b)return a.$0()
return A.kp(null,null,this,a)},
bg(a,b){if($.l===B.b)return a.$1(b)
return A.kq(null,null,this,a,b)},
cI(a,b,c){if($.l===B.b)return a.$2(b,c)
return A.lk(null,null,this,a,b,c)},
an(a){return a},
aM(a){return a},
be(a){return a},
dY(a,b){return null},
ae(a){A.kr(null,null,this,a)}}
A.jM.prototype={
$0(){return this.a.ao(this.b,this.c)},
$S(){return this.c.h("0()")}}
A.jL.prototype={
$0(){return this.a.bR(this.b)},
$S:0}
A.jN.prototype={
$1(a){return this.a.bh(this.b,a,this.c)},
$S(){return this.c.h("~(0)")}}
A.cj.prototype={$iG:1}
A.ko.prototype={
$0(){A.nP(this.a,this.b)},
$S:0}
A.da.prototype={}
A.dn.prototype={
gt(a){var s=this,r=new A.cd(s,s.r,s.$ti.h("cd<1>"))
r.c=s.e
return r},
gj(a){return this.a},
dS(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return s[b]!=null}else{r=this.eP(b)
return r}},
eP(a){var s=this.d
if(s==null)return!1
return this.c8(s[B.h.gv(a)&1073741823],a)>=0},
G(a,b){var s,r,q=this
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.d_(s==null?q.b=A.lc():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.d_(r==null?q.c=A.lc():r,b)}else return q.eJ(b)},
eJ(a){var s,r,q=this,p=q.d
if(p==null)p=q.d=A.lc()
s=J.a8(a)&1073741823
r=p[s]
if(r==null)p[s]=[q.ce(a)]
else{if(q.c8(r,a)>=0)return!1
r.push(q.ce(a))}return!0},
u(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.d5(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.d5(s.c,b)
else return s.cl(b)},
cl(a){var s,r,q,p,o=this.d
if(o==null)return!1
s=J.a8(a)&1073741823
r=o[s]
q=this.c8(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete o[s]
this.d6(p)
return!0},
W(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.cc()}},
d_(a,b){if(a[b]!=null)return!1
a[b]=this.ce(b)
return!0},
d5(a,b){var s
if(a==null)return!1
s=a[b]
if(s==null)return!1
this.d6(s)
delete a[b]
return!0},
cc(){this.r=this.r+1&1073741823},
ce(a){var s,r=this,q=new A.jE(a)
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cc()
return q},
d6(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cc()},
c8(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.M(a[r].a,b))return r
return-1}}
A.jE.prototype={}
A.cd.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a5(q))
else if(r==null){s.d=null
return!1}else{s.d=r.a
s.c=r.b
return!0}}}
A.bf.prototype={
gt(a){var s=this
return new A.eW(s,s.a,s.c,s.$ti.h("eW<1>"))},
gj(a){return this.b},
W(a){var s,r,q,p=this;++p.a
if(p.b===0)return
s=p.c
s.toString
r=s
do{q=r.b
q.toString
r.b=r.c=r.a=null
if(q!==s){r=q
continue}else break}while(!0)
p.c=null
p.b=0},
gaa(a){var s
if(this.b===0)throw A.b(A.C("No such element"))
s=this.c
s.toString
return s},
gcD(a){var s
if(this.b===0)throw A.b(A.C("No such element"))
s=this.c.c
s.toString
return s},
gaL(a){return this.b===0},
br(a,b,c){var s,r,q=this
if(b.a!=null)throw A.b(A.C("LinkedListEntry is already in a LinkedList"));++q.a
b.a=q
s=q.b
if(s===0){b.b=b
q.c=b.c=b
q.b=s+1
return}r=a.c
r.toString
b.c=r
b.b=a
a.c=r.b=b
q.b=s+1},
co(a){var s,r,q=this;++q.a
s=a.b
s.c=a.c
a.c.b=s
r=--q.b
a.a=a.b=a.c=null
if(r===0)q.c=null
else if(a===q.c)q.c=s}}
A.eW.prototype={
gl(){var s=this.c
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.a
if(s.b!==r.a)throw A.b(A.a5(s))
if(r.b!==0)r=s.e&&s.d===r.gaa(0)
else r=!0
if(r){s.c=null
return!1}s.e=!0
r=s.d
s.c=r
s.d=r.b
return!0}}
A.Y.prototype={
gbd(){var s=this.a
if(s==null||this===s.gaa(0))return null
return this.c}}
A.v.prototype={
gt(a){return new A.bO(a,this.gj(a),A.bF(a).h("bO<v.E>"))},
C(a,b){return this.n(a,b)},
e6(a,b,c){return new A.aF(a,b,A.bF(a).h("@<v.E>").N(c).h("aF<1,2>"))},
U(a,b){return A.i_(a,b,null,A.bF(a).h("v.E"))},
e_(a,b,c,d){var s
A.bT(b,c,this.gj(a))
for(s=b;s<c;++s)this.q(a,s,d)},
F(a,b,c,d,e){var s,r,q,p
A.bT(b,c,this.gj(a))
s=c-b
if(s===0)return
A.aj(e,"skipCount")
if(t.j.b(d)){r=e
q=d}else{q=J.kQ(d,e).cJ(0,!1)
r=0}if(r+s>q.length)throw A.b(A.lP())
if(r<b)for(p=s-1;p>=0;--p)this.q(a,b+p,q[r+p])
else for(p=0;p<s;++p)this.q(a,b+p,q[r+p])},
Y(a,b,c,d){return this.F(a,b,c,d,0)},
aP(a,b,c){this.Y(a,b,b+c.length,c)},
i(a){return A.hs(a,"[","]")},
$in:1,
$it:1}
A.cO.prototype={
bA(a,b){var s,r,q,p
for(s=this.gba(),s=s.gt(s),r=A.A(this).y[1];s.k();){q=s.gl()
p=this.n(0,q)
b.$2(q,p==null?r.a(p):p)}},
gby(){var s=this.gba()
return A.oc(s,new A.hy(this),A.A(s).h("p.E"),A.A(this).h("a7<1,2>"))},
gj(a){var s=this.gba()
return s.gj(s)},
i(a){return A.kZ(this)},
$iaU:1}
A.hy.prototype={
$1(a){var s=this.a,r=s.n(0,a)
if(r==null)r=A.A(s).y[1].a(r)
return new A.a7(a,r,A.A(s).h("a7<1,2>"))},
$S(){return A.A(this.a).h("a7<1,2>(1)")}}
A.hz.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.w(a)
r.a=(r.a+=s)+": "
s=A.w(b)
r.a+=s},
$S:38}
A.cM.prototype={
gt(a){var s=this
return new A.eX(s,s.c,s.d,s.b,s.$ti.h("eX<1>"))},
gaL(a){return this.b===this.c},
gj(a){return(this.c-this.b&this.a.length-1)>>>0},
C(a,b){var s=this,r=s.gj(0)
if(0>b||b>=r)A.y(A.ec(b,r,s,null,"index"))
r=s.a
r=r[(s.b+b&r.length-1)>>>0]
return r==null?s.$ti.c.a(r):r},
u(a,b){var s,r=this
for(s=r.b;s!==r.c;s=(s+1&r.a.length-1)>>>0)if(J.M(r.a[s],b)){r.cl(s);++r.d
return!0}return!1},
i(a){return A.hs(this,"{","}")},
cl(a){var s,r,q,p=this,o=p.a,n=o.length-1,m=p.b,l=p.c
if((a-m&n)>>>0<(l-a&n)>>>0){for(s=a;s!==m;s=r){r=(s-1&n)>>>0
o[s]=o[r]}o[m]=null
p.b=(m+1&n)>>>0
return(a+1&n)>>>0}else{m=p.c=(l-1&n)>>>0
for(s=a;s!==m;s=q){q=(s+1&n)>>>0
o[s]=o[q]}o[m]=null
return a}}}
A.eX.prototype={
gl(){var s=this.e
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a
if(r.c!==q.d)A.y(A.a5(q))
s=r.d
if(s===r.b){r.e=null
return!1}q=q.a
r.e=q[s]
r.d=(s+1&q.length-1)>>>0
return!0}}
A.bU.prototype={
a8(a,b){var s
for(s=J.an(b);s.k();)this.G(0,s.gl())},
i(a){return A.hs(this,"{","}")},
U(a,b){return A.m3(this,b,this.$ti.c)},
C(a,b){var s,r,q,p=this
A.aj(b,"index")
s=A.oQ(p,p.r,p.$ti.c)
for(r=b;s.k();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.ec(b,b-r,p,null,"index"))},
$in:1,
$iaV:1}
A.dy.prototype={}
A.k2.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:19}
A.k1.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:19}
A.dY.prototype={}
A.e_.prototype={}
A.ha.prototype={}
A.ic.prototype={
dW(a){return new A.ch(!1).bq(a,0,null,!0)}}
A.id.prototype={
aj(a){var s,r,q,p=A.bT(0,null,a.length)
if(p===0)return new Uint8Array(0)
s=p*3
r=new Uint8Array(s)
q=new A.k3(r)
if(q.eW(a,0,p)!==p)q.cr()
return new Uint8Array(r.subarray(0,A.ps(0,q.b,s)))}}
A.k3.prototype={
cr(){var s=this,r=s.c,q=s.b,p=s.b=q+1
r.$flags&2&&A.r(r)
r[q]=239
q=s.b=p+1
r[p]=191
s.b=q+1
r[q]=189},
fE(a,b){var s,r,q,p,o=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=o.c
q=o.b
p=o.b=q+1
r.$flags&2&&A.r(r)
r[q]=s>>>18|240
q=o.b=p+1
r[p]=s>>>12&63|128
p=o.b=q+1
r[q]=s>>>6&63|128
o.b=p+1
r[p]=s&63|128
return!0}else{o.cr()
return!1}},
eW(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c&&(a.charCodeAt(c-1)&64512)===55296)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=b;p<c;++p){o=a.charCodeAt(p)
if(o<=127){n=k.b
if(n>=q)break
k.b=n+1
r&2&&A.r(s)
s[n]=o}else{n=o&64512
if(n===55296){if(k.b+4>q)break
m=p+1
if(k.fE(o,a.charCodeAt(m)))p=m}else if(n===56320){if(k.b+3>q)break
k.cr()}else if(o<=2047){n=k.b
l=n+1
if(l>=q)break
k.b=l
r&2&&A.r(s)
s[n]=o>>>6|192
k.b=l+1
s[l]=o&63|128}else{n=k.b
if(n+2>=q)break
l=k.b=n+1
r&2&&A.r(s)
s[n]=o>>>12|224
n=k.b=l+1
s[l]=o>>>6&63|128
k.b=n+1
s[n]=o&63|128}}}return p}}
A.ch.prototype={
bq(a,b,c,d){var s,r,q,p,o,n,m=this,l=A.bT(b,c,a.length)
if(b===l)return""
if(a instanceof Uint8Array){s=a
r=s
q=0}else{r=A.pa(a,b,l)
l-=b
q=b
b=0}if(l-b>=15){p=m.a
o=A.p9(p,r,b,l)
if(o!=null){if(!p)return o
if(o.indexOf("\ufffd")<0)return o}}o=m.c5(r,b,l,!0)
p=m.b
if((p&1)!==0){n=A.pb(p)
m.b=0
throw A.b(A.kS(n,a,q+m.c))}return o},
c5(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.a.B(b+c,2)
r=q.c5(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.c5(a,s,c,d)}return q.fQ(a,b,c,d)},
fQ(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=65533,j=l.b,i=l.c,h=new A.d2(""),g=b+1,f=a[b]
A:for(s=l.a;;){for(;;g=p){r="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE".charCodeAt(f)&31
i=j<=32?f&61694>>>r:(f&63|i<<6)>>>0
j=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA".charCodeAt(j+r)
if(j===0){q=A.bk(i)
h.a+=q
if(g===c)break A
break}else if((j&1)!==0){if(s)switch(j){case 69:case 67:q=A.bk(k)
h.a+=q
break
case 65:q=A.bk(k)
h.a+=q;--g
break
default:q=A.bk(k)
h.a=(h.a+=q)+q
break}else{l.b=j
l.c=g-1
return""}j=0}if(g===c)break A
p=g+1
f=a[g]}p=g+1
f=a[g]
if(f<128){for(;;){if(!(p<c)){o=c
break}n=p+1
f=a[p]
if(f>=128){o=n-1
p=n
break}p=n}if(o-g<20)for(m=g;m<o;++m){q=A.bk(a[m])
h.a+=q}else{q=A.oq(a,g,o)
h.a+=q}if(o===c)break A
g=p}else g=p}if(d&&j>32)if(s){s=A.bk(k)
h.a+=s}else{l.b=77
l.c=c
return""}l.b=j
l.c=i
s=h.a
return s.charCodeAt(0)==0?s:s}}
A.Z.prototype={
a5(a){var s,r,q=this,p=q.c
if(p===0)return q
s=!q.a
r=q.b
p=A.al(p,r)
return new A.Z(p===0?!1:s,r,p)},
eS(a){var s,r,q,p,o,n,m,l=this,k=l.c
if(k===0)return $.aM()
s=k-a
if(s<=0)return l.a?$.lx():$.aM()
r=l.b
q=new Uint16Array(s)
for(p=a;p<k;++p)q[p-a]=r[p]
o=l.a
n=A.al(s,q)
m=new A.Z(n===0?!1:o,q,n)
if(o)for(p=0;p<a;++p)if(r[p]!==0)return m.bZ(0,$.ff())
return m},
aR(a,b){var s,r,q,p,o,n,m,l,k,j=this
if(b<0)throw A.b(A.X("shift-amount must be posititve "+b,null))
s=j.c
if(s===0)return j
r=B.a.B(b,16)
q=B.a.ad(b,16)
if(q===0)return j.eS(r)
p=s-r
if(p<=0)return j.a?$.lx():$.aM()
o=j.b
n=new Uint16Array(p)
A.oI(o,s,b,n)
s=j.a
m=A.al(p,n)
l=new A.Z(m===0?!1:s,n,m)
if(s){if((o[r]&B.a.aQ(1,q)-1)>>>0!==0)return l.bZ(0,$.ff())
for(k=0;k<r;++k)if(o[k]!==0)return l.bZ(0,$.ff())}return l},
a_(a,b){var s,r=this.a
if(r===b.a){s=A.iF(this.b,this.c,b.b,b.c)
return r?0-s:s}return r?-1:1},
c1(a,b){var s,r,q,p=this,o=p.c,n=a.c
if(o<n)return a.c1(p,b)
if(o===0)return $.aM()
if(n===0)return p.a===b?p:p.a5(0)
s=o+1
r=new Uint16Array(s)
A.oD(p.b,o,a.b,n,r)
q=A.al(s,r)
return new A.Z(q===0?!1:b,r,q)},
bo(a,b){var s,r,q,p=this,o=p.c
if(o===0)return $.aM()
s=a.c
if(s===0)return p.a===b?p:p.a5(0)
r=new Uint16Array(o)
A.eJ(p.b,o,a.b,s,r)
q=A.al(o,r)
return new A.Z(q===0?!1:b,r,q)},
eg(a,b){var s,r,q=this,p=q.c
if(p===0)return b
s=b.c
if(s===0)return q
r=q.a
if(r===b.a)return q.c1(b,r)
if(A.iF(q.b,p,b.b,s)>=0)return q.bo(b,r)
return b.bo(q,!r)},
bZ(a,b){var s,r,q=this,p=q.c
if(p===0)return b.a5(0)
s=b.c
if(s===0)return q
r=q.a
if(r!==b.a)return q.c1(b,r)
if(A.iF(q.b,p,b.b,s)>=0)return q.bo(b,r)
return b.bo(q,!r)},
bl(a,b){var s,r,q,p,o,n,m,l=this.c,k=b.c
if(l===0||k===0)return $.aM()
s=l+k
r=this.b
q=b.b
p=new Uint16Array(s)
for(o=0;o<k;){A.mg(q[o],r,0,p,o,l);++o}n=this.a!==b.a
m=A.al(s,p)
return new A.Z(m===0?!1:n,p,m)},
eR(a){var s,r,q,p
if(this.c<a.c)return $.aM()
this.dd(a)
s=$.l7.P()-$.dc.P()
r=A.l9($.l6.P(),$.dc.P(),$.l7.P(),s)
q=A.al(s,r)
p=new A.Z(!1,r,q)
return this.a!==a.a&&q>0?p.a5(0):p},
fo(a){var s,r,q,p=this
if(p.c<a.c)return p
p.dd(a)
s=A.l9($.l6.P(),0,$.dc.P(),$.dc.P())
r=A.al($.dc.P(),s)
q=new A.Z(!1,s,r)
if($.l8.P()>0)q=q.aR(0,$.l8.P())
return p.a&&q.c>0?q.a5(0):q},
dd(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=c.c
if(b===$.md&&a.c===$.mf&&c.b===$.mc&&a.b===$.me)return
s=a.b
r=a.c
q=16-B.a.gdQ(s[r-1])
if(q>0){p=new Uint16Array(r+5)
o=A.mb(s,r,q,p)
n=new Uint16Array(b+5)
m=A.mb(c.b,b,q,n)}else{n=A.l9(c.b,0,b,b+2)
o=r
p=s
m=b}l=p[o-1]
k=m-o
j=new Uint16Array(m)
i=A.la(p,o,k,j)
h=m+1
g=n.$flags|0
if(A.iF(n,m,j,i)>=0){g&2&&A.r(n)
n[m]=1
A.eJ(n,h,j,i,n)}else{g&2&&A.r(n)
n[m]=0}f=new Uint16Array(o+2)
f[o]=1
A.eJ(f,o+1,p,o,f)
e=m-1
while(k>0){d=A.oE(l,n,e);--k
A.mg(d,f,0,n,k,o)
if(n[e]<d){i=A.la(f,o,k,j)
A.eJ(n,h,j,i,n)
while(--d,n[e]<d)A.eJ(n,h,j,i,n)}--e}$.mc=c.b
$.md=b
$.me=s
$.mf=r
$.l6.b=n
$.l7.b=h
$.dc.b=o
$.l8.b=q},
gv(a){var s,r,q,p=new A.iG(),o=this.c
if(o===0)return 6707
s=this.a?83585:429689
for(r=this.b,q=0;q<o;++q)s=p.$2(s,r[q])
return new A.iH().$1(s)},
T(a,b){if(b==null)return!1
return b instanceof A.Z&&this.a_(0,b)===0},
i(a){var s,r,q,p,o,n=this,m=n.c
if(m===0)return"0"
if(m===1){if(n.a)return B.a.i(-n.b[0])
return B.a.i(n.b[0])}s=A.u([],t.s)
m=n.a
r=m?n.a5(0):n
while(r.c>1){q=$.lw()
if(q.c===0)A.y(B.K)
p=r.fo(q).i(0)
s.push(p)
o=p.length
if(o===1)s.push("000")
if(o===2)s.push("00")
if(o===3)s.push("0")
r=r.eR(q)}s.push(B.a.i(r.b[0]))
if(m)s.push("-")
return new A.cY(s,t.bJ).hL(0)}}
A.iG.prototype={
$2(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
$S:43}
A.iH.prototype={
$1(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
$S:48}
A.eQ.prototype={
dN(a,b,c){var s=this.a
if(s!=null)s.register(a,b,c)},
dX(a){var s=this.a
if(s!=null)s.unregister(a)}}
A.e4.prototype={
T(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.e4)if(this.a===b.a)s=this.b===b.b
return s},
gv(a){return A.l_(this.a,this.b,B.f,B.f)},
a_(a,b){var s=B.a.a_(this.a,b.a)
if(s!==0)return s
return B.a.a_(this.b,b.b)},
i(a){var s=this,r=A.nK(A.lZ(s)),q=A.e5(A.lX(s)),p=A.e5(A.lU(s)),o=A.e5(A.lV(s)),n=A.e5(A.lW(s)),m=A.e5(A.lY(s)),l=A.lI(A.oh(s)),k=s.b,j=k===0?"":A.lI(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j}}
A.aB.prototype={
T(a,b){if(b==null)return!1
return b instanceof A.aB&&this.a===b.a},
gv(a){return B.a.gv(this.a)},
a_(a,b){return B.a.a_(this.a,b.a)},
i(a){var s,r,q,p,o,n=this.a,m=B.a.B(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.a.B(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.a.B(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.h.hZ(B.a.i(n%1e6),6,"0")}}
A.j9.prototype={
i(a){return this.Z()}}
A.E.prototype={
ga6(){return A.og(this)}}
A.dR.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.hc(s)
return"Assertion failed"}}
A.aI.prototype={}
A.ah.prototype={
gc7(){return"Invalid argument"+(!this.a?"(s)":"")},
gc6(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.w(p),n=s.gc7()+q+o
if(!s.a)return n
return n+s.gc6()+": "+A.hc(s.gcB())},
gcB(){return this.b}}
A.bS.prototype={
gcB(){return this.b},
gc7(){return"RangeError"},
gc6(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.w(q):""
else if(q==null)s=": Not greater than or equal to "+A.w(r)
else if(q>r)s=": Not in inclusive range "+A.w(r)+".."+A.w(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.w(r)
return s}}
A.cH.prototype={
gcB(){return this.b},
gc7(){return"RangeError"},
gc6(){if(this.b<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.d5.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.eF.prototype={
i(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.au.prototype={
i(a){return"Bad state: "+this.a}}
A.dZ.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.hc(s)+"."}}
A.ew.prototype={
i(a){return"Out of Memory"},
ga6(){return null},
$iE:1}
A.d1.prototype={
i(a){return"Stack Overflow"},
ga6(){return null},
$iE:1}
A.jc.prototype={
i(a){return"Exception: "+this.a}}
A.he.prototype={
i(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.h.cV(e,0,75)+"..."
return g+"\n"+e}for(r=1,q=0,p=!1,o=0;o<f;++o){n=e.charCodeAt(o)
if(n===10){if(q!==o||!p)++r
q=o+1
p=!1}else if(n===13){++r
q=o+1
p=!0}}g=r>1?g+(" (at line "+r+", character "+(f-q+1)+")\n"):g+(" (at character "+(f+1)+")\n")
m=e.length
for(o=f;o<m;++o){n=e.charCodeAt(o)
if(n===10||n===13){m=o
break}}l=""
if(m-q>78){k="..."
if(f-q<75){j=q+75
i=q}else{if(m-f<75){i=m-75
j=m
k=""}else{i=f-36
j=f+36}l="..."}}else{j=m
i=q
k=""}return g+l+B.h.cV(e,i,j)+k+"\n"+B.h.bl(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.w(f)+")"):g}}
A.ee.prototype={
ga6(){return null},
i(a){return"IntegerDivisionByZeroException"},
$iE:1}
A.p.prototype={
cJ(a,b){var s=A.A(this).h("p.E")
if(b)s=A.cN(this,s)
else{s=A.cN(this,s)
s.$flags=1
s=s}return s},
gj(a){var s,r=this.gt(this)
for(s=0;r.k();)++s
return s},
U(a,b){return A.m3(this,b,A.A(this).h("p.E"))},
gaa(a){var s=this.gt(this)
if(!s.k())throw A.b(A.eg())
return s.gl()},
C(a,b){var s,r
A.aj(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.b(A.ec(b,b-r,this,null,"index"))},
i(a){return A.o_(this,"(",")")}}
A.a7.prototype={
i(a){return"MapEntry("+A.w(this.a)+": "+A.w(this.b)+")"}}
A.z.prototype={
gv(a){return A.d.prototype.gv.call(this,0)},
i(a){return"null"}}
A.d.prototype={$id:1,
T(a,b){return this===b},
gv(a){return A.cW(this)},
i(a){return"Instance of '"+A.ey(this)+"'"},
gD(a){return A.qD(this)},
toString(){return this.i(this)}}
A.f3.prototype={
i(a){return""},
$iJ:1}
A.d2.prototype={
gj(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.e7.prototype={
i(a){return"Expando:null"}}
A.hD.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.hj.prototype={
$2(a,b){this.a.ap(new A.hh(a),new A.hi(b),t.X)},
$S:51}
A.hh.prototype={
$1(a){var s=this.a
return s.call(s)},
$S:53}
A.hi.prototype={
$2(a,b){var s,r,q=t.g.a(v.G.Error),p=A.qu(q,["Dart exception thrown from converted Future. Use the properties 'error' to fetch the boxed error and 'stack' to recover the stack trace."])
if(t.aX.b(a))A.y("Attempting to box non-Dart object.")
s={}
s[$.nl()]=a
p.error=s
p.stack=b.i(0)
r=this.a
r.call(r,p)},
$S:10}
A.kH.prototype={
$1(a){return this.a.E(a)},
$S:8}
A.kI.prototype={
$1(a){if(a==null)return this.a.I(new A.hD(a===undefined))
return this.a.I(a)},
$S:8}
A.jB.prototype={
bN(a){if(a<=0||a>4294967296)throw A.b(A.m0(u.g+a))
return Math.random()*a>>>0}}
A.jC.prototype={
eF(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.aY("No source of cryptographically secure random numbers available."))},
bN(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.m0(u.g+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.r(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.a_(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.ct(B.ag.ga9(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.d0.prototype={
Z(){return"SqliteUpdateKind."+this.b}}
A.ap.prototype={
gv(a){return A.l_(this.a,this.b,this.c,B.f)},
T(a,b){if(b==null)return!1
return b instanceof A.ap&&b.a===this.a&&b.b===this.b&&b.c===this.c},
i(a){return"SqliteUpdate: "+this.a.i(0)+" on "+this.b+", rowid = "+this.c}}
A.bW.prototype={
i(a){var s,r,q=this,p=q.e
p=p==null?"":"while "+p+", "
p="SqliteException("+q.c+"): "+p+q.a
s=q.b
if(s!=null)p=p+", "+s
s=q.f
if(s!=null){r=q.d
r=r!=null?" (at position "+A.w(r)+"): ":": "
s=p+"\n  Causing statement"+r+s
p=q.r
p=p!=null?s+(", parameters: "+J.nu(p,new A.hU(),t.N).e5(0,", ")):s}return p.charCodeAt(0)==0?p:p}}
A.hU.prototype={
$1(a){if(t.p.b(a))return"blob ("+a.length+" bytes)"
else return J.aN(a)},
$S:69}
A.fU.prototype={
dJ(){var s=this,r=s.d
return r==null?s.d=new A.b1(s,A.u([],t.fS),new A.h2(s),new A.h3(s),t.fs):r},
fs(){var s=this,r=s.e
return r==null?s.e=new A.b1(s,A.u([],t.e),new A.h_(s),new A.h0(s),t.bq):r},
c4(){var s=this,r=s.f
return r==null?s.f=new A.b1(s,A.u([],t.e),new A.fW(s),new A.fX(s),t.fK):r},
m(){var s,r,q,p=this
if(p.r)return
p.r=!0
s=p.d
if(s!=null)s.m()
s=p.f
if(s!=null)s.m()
s=p.e
if(s!=null)s.m()
s=p.b
r=s.cT()
q=r!==0?A.lo(p.a,s,r,"closing database",null,null):null
if(q!=null)throw A.b(q)},
hi(a,b){var s,r,q
if(this.r)A.y(A.C("This database has already been closed"))
s=this.b
r=s.a
q=r.b4(B.e.aj(a),1)
r=r.d
s=A.mP(r,"sqlite3_exec",[s.b,q,0,0,0])
r.dart_sqlite3_free(q)
if(s!==0)A.lt(this,s,"executing",a,b)},
fj(a,b,c,d,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.r)A.y(A.C("This database has already been closed"))
s=B.e.aj(a)
r=e.b
q=r.a
p=q.cs(s)
o=q.d
n=o.dart_sqlite3_malloc(4)
o=o.dart_sqlite3_malloc(4)
m=new A.is(r,p,n,o)
l=A.u([],t.bb)
k=new A.fY(m,l)
for(r=s.length,q=q.b,j=0;j<r;j=g){i=m.cU(j,r-j,0)
n=i.b
if(n!==0){k.$0()
A.lt(e,n,"preparing statement",a,null)}n=q.buffer
h=B.a.B(n.byteLength,4)
g=new Int32Array(n,0,h)[B.a.A(o,2)]-p
f=i.a
if(f!=null)l.push(new A.bX(f,e,new A.ch(!1).bq(s,j,g,!0)))
if(l.length===c){j=g
break}}if(b)while(j<r){i=m.cU(j,r-j,0)
n=q.buffer
h=B.a.B(n.byteLength,4)
j=new Int32Array(n,0,h)[B.a.A(o,2)]-p
f=i.a
if(f!=null){l.push(new A.bX(f,e,""))
k.$0()
throw A.b(A.b7(a,"sql","Had an unexpected trailing statement."))}else if(i.b!==0){k.$0()
throw A.b(A.b7(a,"sql","Has trailing data after the first sql statement:"))}}m.m()
return l},
e9(a,b){var s=this.fj(a,b,1,!1,!0)
if(s.length===0)throw A.b(A.b7(a,"sql","Must contain an SQL statement."))
return B.c.gaa(s)},
i_(a){return this.e9(a,!1)}}
A.h2.prototype={
$0(){var s=this.a,r=s.b
r.a.dV(r.b,new A.h1(s))},
$S:0}
A.h1.prototype={
$3(a,b,c){var s=A.op(a)
if(s==null)return
this.a.d.cv(new A.ap(s,b,c))},
$S:70}
A.h3.prototype={
$0(){var s=this.a.b
s.a.dV(s.b,null)
return null},
$S:0}
A.h_.prototype={
$0(){var s=this.a,r=s.b
r.a.dU(r.b,new A.fZ(s))
return null},
$S:0}
A.fZ.prototype={
$0(){this.a.e.cv(null)},
$S:0}
A.h0.prototype={
$0(){var s=this.a.b
s.a.dU(s.b,null)
return null},
$S:0}
A.fW.prototype={
$0(){var s=this.a,r=s.b
r.a.dT(r.b,new A.fV(s))
return null},
$S:0}
A.fV.prototype={
$0(){var s=this.a.f
s.cv(null)
return 0},
$S:72}
A.fX.prototype={
$0(){var s=this.a.b
s.a.dT(s.b,null)
return null},
$S:0}
A.fY.prototype={
$0(){var s,r,q,p,o,n
this.a.m()
for(s=this.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q){p=s[q]
if(!p.r){p.r=!0
if(!p.f){o=p.a
o.c.d.sqlite3_reset(o.b)
p.f=!0}o=p.a
n=o.c
n.d.sqlite3_finalize(o.b)
n=n.w
if(n!=null){n=n.a
if(n!=null)n.unregister(o.d)}}}},
$S:0}
A.b1.prototype={
gaT(){var s=this.r
return s==null?this.r=this.di(!1):s},
di(a){return new A.aK(new A.jV(this,a),this.$ti.h("aK<1>"))},
cv(a){var s,r,q,p,o,n,m
for(s=this.c,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q){p=s[q]
o=p.a
if(p.b){n=o.b
if(n>=4)A.y(o.af())
if((n&1)!==0)o.gS().aA(a)}else{n=o.b
if(n>=4)A.y(o.af())
if((n&1)!==0)o.ag(a)
else if((n&3)===0){o=o.aY()
n=new A.b0(a)
m=o.c
if(m==null)o.b=o.c=n
else{m.sam(n)
o.c=n}}}}},
m(){var s,r,q,p=this
for(s=p.c,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q)s[q].a.m()
p.d=null
if(p.b){p.f.$0()
p.b=!1}}}
A.jV.prototype={
$1(a){var s,r,q=this.a
if(q.a.r){a.m()
return}s=this.b
r=new A.jW(q,a,s)
a.r=a.e=new A.jX(q,a,s)
a.f=r
r.$0()},
$S(){return this.a.$ti.h("~(bh<1>)")}}
A.jW.prototype={
$0(){var s=this.a,r=s.c,q=r.length
r.push(new A.dx(this.b,this.c))
if(q===0){s.e.$0()
s.b=!0}},
$S:0}
A.jX.prototype={
$0(){var s=this.a,r=s.c
B.c.u(r,new A.dx(this.b,this.c))
r=r.length
if(r===0&&!s.a.r){s.f.$0()
s.b=!1}},
$S:0}
A.hT.prototype={
e4(){var s=null,r=this.a.a.d.sqlite3_initialize()
if(r!==0)throw A.b(A.m4(s,s,r,"Error returned by sqlite3_initialize",s,s,s))},
hW(a,b){var s,r,q,p,o,n,m,l,k,j
this.e4()
switch(2){case 2:break}s=this.a
r=s.a
q=r.b4(B.e.aj(a),1)
p=r.d
o=p.dart_sqlite3_malloc(4)
n=r.b4(B.e.aj(b),1)
m=p.sqlite3_open_v2(q,o,6,n)
l=A.aG(r.b.buffer,0,null)[B.a.A(o,2)]
p.dart_sqlite3_free(q)
p.dart_sqlite3_free(n)
p.dart_sqlite3_free(n)
o=new A.d()
k=new A.ik(r,l,o)
r=r.r
if(r!=null)r.dN(k,l,o)
if(m!==0){j=A.lo(s,k,m,"opening the database",null,null)
k.cT()
throw A.b(j)}p.sqlite3_extended_result_codes(l,1)
return new A.fU(s,k,!1)}}
A.bX.prototype={
a4(a,b){A.lt(this.b,a,b,this.d,this.e)},
dg(){var s,r=this,q=r.f=!1,p=r.a,o=p.b
p=p.c.d
do s=p.sqlite3_step(o)
while(s===100)
r.bf()
if(s!==0?s!==101:q)r.a4(s,"executing statement")},
eL(a){var s=this.a
s=s.c.d.sqlite3_bind_parameter_count(s.b)
if(0!==s)A.y(A.b7(a,"parameters","Expected "+A.w(s)+" parameters, got 0"))
return},
d1(a){A:{if(a instanceof A.hr){this.eL(a.a)
break A}if(a instanceof A.cB)a.a.$1(this)}},
bf(){if(!this.f){var s=this.a
s.c.d.sqlite3_reset(s.b)
this.f=!0}},
m(){var s,r,q=this
if(!q.r){q.r=!0
q.bf()
s=q.a
r=s.c
r.d.sqlite3_finalize(s.b)
r=r.w
if(r!=null)r.dX(s.d)}},
hk(a){var s=this
if(s.r||s.b.r)A.y(A.C(u.n))
s.bf()
s.d1(a)
s.dg()}}
A.eb.prototype={
bU(a,b){return this.d.a0(a)?1:0},
cN(a,b){this.d.u(0,a)},
cO(a){return new v.G.URL(a,"file:///").pathname},
au(a,b){var s,r=a.a
if(r==null)r=A.lN(this.b,"/")
s=this.d
if(!s.a0(r))if((b&4)!==0)s.q(0,r,new A.av(new Uint8Array(0),0))
else throw A.b(A.bZ(14))
return new A.ce(new A.eS(this,r,(b&8)!==0),0)},
cQ(a){}}
A.eS.prototype={
eb(a,b){var s,r=this.a.d.n(0,this.b)
if(r==null||r.b<=b)return 0
s=Math.min(a.length,r.b-b)
B.d.F(a,0,s,J.ct(B.d.ga9(r.a),0,r.b),b)
return s},
cM(){return this.d>=2?1:0},
bV(){if(this.c)this.a.d.u(0,this.b)},
bj(){return this.a.d.n(0,this.b).b},
cP(a){this.d=a},
cR(a){},
bk(a){var s=this.a.d,r=this.b,q=s.n(0,r)
if(q==null){s.q(0,r,new A.av(new Uint8Array(0),0))
s.n(0,r).sj(0,a)}else q.sj(0,a)},
cS(a){this.d=a},
aO(a,b){var s,r=this.a.d,q=this.b,p=r.n(0,q)
if(p==null){p=new A.av(new Uint8Array(0),0)
r.q(0,q,p)}s=b+a.length
if(s>p.b)p.sj(0,s)
p.Y(0,b,s,a)}}
A.kG.prototype={
$1(a){return a.length!==0},
$S:75}
A.hF.prototype={
Z(){return"OpenMode."+this.b}}
A.bb.prototype={}
A.hr.prototype={}
A.cB.prototype={}
A.aZ.prototype={
i(a){return"VfsException("+this.a+")"}}
A.d_.prototype={}
A.T.prototype={}
A.dV.prototype={}
A.dU.prototype={
gbW(){return 0},
ef(a,b){return 12},
gbY(){return 4096},
bX(a,b){var s=this.eb(a,b),r=a.length
if(s<r){B.d.e_(a,s,r,0)
throw A.b(B.az)}},
$ia2:1,
$id6:1}
A.bq.prototype={}
A.kL.prototype={
$0(){var s,r,q
for(s=this.a;!s.gaL(0);){if(s.b===0)A.y(A.C("No such element"))
r=s.c
q=r.a
q.toString
q.co(A.A(r).h("Y.E").a(r))
r.d.$0()}},
$S:0}
A.kJ.prototype={
$1(a){var s=this.a,r=s.b
s.br(s.c,new A.bq(a),!1)
if(r===0)v.G.Promise.resolve().then(this.b)},
$S:5}
A.kK.prototype={
$4(a,b,c,d){this.a.$1(c.bt(d))},
$S:28}
A.iq.prototype={}
A.ik.prototype={
cT(){var s=this.a,r=s.r
if(r!=null)r.dX(this.c)
return s.d.sqlite3_close_v2(this.b)}}
A.is.prototype={
m(){var s=this,r=s.a.a.d
r.dart_sqlite3_free(s.b)
r.dart_sqlite3_free(s.c)
r.dart_sqlite3_free(s.d)},
cU(a,b,c){var s,r,q=this,p=q.a,o=p.a,n=q.c
p=A.mP(o.d,"sqlite3_prepare_v3",[p.b,q.b+a,b,c,n,q.d])
s=A.aG(o.b.buffer,0,null)[B.a.A(n,2)]
if(s===0)r=null
else{n=new A.d()
r=new A.ir(s,o,n)
o=o.w
if(o!=null)o.dN(r,s,n)}return new A.f_(r,p)}}
A.ir.prototype={
ev(a,b,c,d){var s,r
if(d===0)return
s=this.c
r=s.d.sqlite3_column_blob(this.b,a)
B.d.Y(b,c,c+d,A.ai(s.b.buffer,r,d))}}
A.bn.prototype={}
A.bo.prototype={}
A.c0.prototype={
n(a,b){A.aG(this.a.b.buffer,0,null)
B.a.A(this.c+b*4,2)
return new A.bo()},
q(a,b,c){throw A.b(A.aY("Setting element in WasmValueList"))},
gj(a){return this.b}}
A.e1.prototype={
hS(a){var s,r,q=this.b
q===$&&A.P()
s="[sqlite3] "+A.c1(q,a)
r=$.pU
if(r==null)A.mY(s)
else r.$1(s)},
hQ(a,b){var s,r,q,p=A.a_(v.G.Number(a))*1000
if(p<-864e13||p>864e13)A.y(A.ac(p,-864e13,864e13,"millisecondsSinceEpoch",null))
A.dO(!1,"isUtc",t.y)
s=new A.e4(p,0,!1)
r=this.b
r===$&&A.P()
q=A.oe(r.buffer,b,8)
q.$flags&2&&A.r(q)
q[0]=A.lY(s)
q[1]=A.lW(s)
q[2]=A.lV(s)
q[3]=A.lU(s)
q[4]=A.lX(s)-1
q[5]=A.lZ(s)-1900
q[6]=B.a.ad(A.oi(s),7)},
iw(a,b,c,d,e){var s,r,q,p,o,n,m,l,k=null,j=this.b
j===$&&A.P()
s=new A.d_(A.l5(j,b,k))
try{r=a.au(s,d)
if(e!==0){p=r.b
o=A.aG(j.buffer,0,k)
n=B.a.A(e,2)
o.$flags&2&&A.r(o)
o[n]=p}p=A.aG(j.buffer,0,k)
o=B.a.A(c,2)
p.$flags&2&&A.r(p)
p[o]=0
m=r.a
return m}catch(l){p=A.S(l)
if(p instanceof A.aZ){q=p
p=q.a
j=A.aG(j.buffer,0,k)
o=B.a.A(c,2)
j.$flags&2&&A.r(j)
j[o]=p}else{j=j.buffer
j=A.aG(j,0,k)
p=B.a.A(c,2)
j.$flags&2&&A.r(j)
j[p]=1}}return k},
ik(a,b,c){var s=this.b
s===$&&A.P()
return A.ag(new A.fI(a,A.c1(s,b),c))},
ia(a,b,c,d){var s=this.b
s===$&&A.P()
return A.ag(new A.fF(this,a,A.c1(s,b),c,d))},
is(a,b,c,d){var s=this.b
s===$&&A.P()
return A.ag(new A.fK(this,a,A.c1(s,b),c,d))},
iy(a,b,c){return A.ag(new A.fM(this,c,b,a))},
iD(a,b){return A.ag(new A.fO(a,b))},
ii(a,b){var s,r=Date.now(),q=this.b
q===$&&A.P()
s=v.G.BigInt(r)
A.kV(A.od(q.buffer,0,null),"setBigInt64",b,s,!0,null)
return 0},
ig(a){return A.ag(new A.fH(a))},
iA(a,b,c,d){return A.ag(new A.fN(this,a,b,c,d))},
iL(a,b,c,d){return A.ag(new A.fS(this,a,b,c,d))},
iH(a,b){return A.ag(new A.fQ(a,b))},
iF(a,b){return A.ag(new A.fP(a,b))},
iq(a,b){return A.ag(new A.fJ(this,a,b))},
iu(a,b){return A.ag(new A.fL(a,b))},
iJ(a,b){return A.ag(new A.fR(a,b))},
ic(a,b){return A.ag(new A.fG(this,a,b))},
il(a){return a.gbW()},
io(a,b,c){if(t.b.b(a))return a.ef(b,c)
return 12},
iB(a){if(t.b.b(a))return a.gbY()
return 4096},
h3(a){a.$0()},
fZ(a){return a.$0()},
h1(a,b,c,d,e){var s=this.b
s===$&&A.P()
a.$3(b,A.c1(s,d),A.a_(v.G.Number(e)))},
h9(a,b,c,d){var s=a.giV(),r=this.a
r===$&&A.P()
s.$2(new A.bn(),new A.c0(r,c,d))},
hd(a,b,c,d){var s=a.giX(),r=this.a
r===$&&A.P()
s.$2(new A.bn(),new A.c0(r,c,d))},
hb(a,b,c,d){var s=a.giW(),r=this.a
r===$&&A.P()
s.$2(new A.bn(),new A.c0(r,c,d))},
hf(a,b){var s=a.giY()
this.a===$&&A.P()
s.$1(new A.bn())},
h7(a,b){var s=a.giU()
this.a===$&&A.P()
s.$1(new A.bn())},
h5(a,b,c,d,e){var s,r,q=this.b
q===$&&A.P()
s=A.l5(q,c,b)
r=A.l5(q,e,d)
return a.giQ().$2(s,r)},
fX(a,b){return a.$1(b)},
fV(a,b){return a.giS().$1(b)},
fT(a,b,c){return a.giR().$2(b,c)}}
A.fI.prototype={
$0(){return this.a.cN(this.b,this.c)},
$S:0}
A.fF.prototype={
$0(){var s,r=this,q=r.b.bU(r.c,r.d),p=r.a.b
p===$&&A.P()
p=A.aG(p.buffer,0,null)
s=B.a.A(r.e,2)
p.$flags&2&&A.r(p)
p[s]=q},
$S:0}
A.fK.prototype={
$0(){var s,r,q=this,p=B.e.aj(q.b.cO(q.c)),o=p.length
if(o>q.d)throw A.b(A.bZ(14))
s=q.a.b
s===$&&A.P()
s=A.ai(s.buffer,0,null)
r=q.e
B.d.aP(s,r,p)
s.$flags&2&&A.r(s)
s[r+o]=0},
$S:0}
A.fM.prototype={
$0(){var s,r=this,q=r.a.b
q===$&&A.P()
s=A.ai(q.buffer,r.b,r.c)
q=r.d
if(q!=null)A.lA(s,q.b)
else return A.lA(s,null)},
$S:0}
A.fO.prototype={
$0(){this.a.cQ(new A.aB(this.b))},
$S:0}
A.fH.prototype={
$0(){return this.a.bV()},
$S:0}
A.fN.prototype={
$0(){var s=this,r=s.a.b
r===$&&A.P()
s.b.bX(A.ai(r.buffer,s.c,s.d),A.a_(v.G.Number(s.e)))},
$S:0}
A.fS.prototype={
$0(){var s=this,r=s.a.b
r===$&&A.P()
s.b.aO(A.ai(r.buffer,s.c,s.d),A.a_(v.G.Number(s.e)))},
$S:0}
A.fQ.prototype={
$0(){return this.a.bk(A.a_(v.G.Number(this.b)))},
$S:0}
A.fP.prototype={
$0(){return this.a.cR(this.b)},
$S:0}
A.fJ.prototype={
$0(){var s,r=this.b.bj(),q=this.a.b
q===$&&A.P()
q=A.aG(q.buffer,0,null)
s=B.a.A(this.c,2)
q.$flags&2&&A.r(q)
q[s]=r},
$S:0}
A.fL.prototype={
$0(){return this.a.cP(this.b)},
$S:0}
A.fR.prototype={
$0(){return this.a.cS(this.b)},
$S:0}
A.fG.prototype={
$0(){var s,r=this.b.cM(),q=this.a.b
q===$&&A.P()
q=A.aG(q.buffer,0,null)
s=B.a.A(this.c,2)
q.$flags&2&&A.r(q)
q[s]=r},
$S:0}
A.cv.prototype={
J(a,b,c,d){var s,r=null,q={},p=A.a0(A.kV(this.a,v.G.Symbol.asyncIterator,r,r,r,r)),o=this.$ti.h("cg<1>"),n=new A.cg(r,r,r,r,o)
q.a=null
s=new A.fh(q,this,p,n)
n.d=s
n.f=new A.fi(q,n,s)
return new A.c7(n,o.h("c7<1>")).J(a,b,c,d)},
bb(a,b,c){return this.J(a,null,b,c)}}
A.fh.prototype={
$0(){var s,r=this,q=r.c.next(),p=r.a
p.a=q
s=r.d
A.a1(q,t.m).ap(new A.fj(p,r.b,s,r),s.gfF(),t.P)},
$S:0}
A.fj.prototype={
$1(a){var s,r,q=this,p=a.done
if(p==null)p=null
s=a.value
r=q.c
if(p===!0){r.m()
q.a.a=null}else{r.G(0,s==null?q.b.$ti.c.a(s):s)
q.a.a=null
p=r.b
if(!((p&1)!==0?(r.gS().e&4)!==0:(p&2)===0))q.d.$0()}},
$S:7}
A.fi.prototype={
$0(){var s,r
if(this.a.a==null){s=this.b
r=s.b
s=!((r&1)!==0?(s.gS().e&4)!==0:(r&2)===0)}else s=!1
if(s)this.c.$0()},
$S:0}
A.br.prototype={
p(){var s=0,r=A.i(t.H),q=this,p
var $async$p=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:p=q.b
if(p!=null)p.p()
p=q.c
if(p!=null)p.p()
q.c=q.b=null
return A.f(null,r)}})
return A.h($async$p,r)},
gl(){var s=this.a
return s==null?A.y(A.C("Await moveNext() first")):s},
k(){var s,r,q,p=this,o=p.a
if(o!=null)o.continue()
o=new A.k($.l,t.k)
s=new A.F(o,t.fa)
r=p.d
q=t.m
p.b=A.a3(r,"success",new A.j2(p,s),!1,q)
p.c=A.a3(r,"error",new A.j3(p,s),!1,q)
return o}}
A.j2.prototype={
$1(a){var s,r=this.a
r.p()
s=r.$ti.h("1?").a(r.d.result)
r.a=s
this.b.E(s!=null)},
$S:1}
A.j3.prototype={
$1(a){var s=this.a
s.p()
s=s.d.error
if(s==null)s=a
this.b.I(s)},
$S:1}
A.fw.prototype={
$1(a){this.a.E(this.c.a(this.b.result))},
$S:1}
A.fx.prototype={
$1(a){var s=this.b.error
if(s==null)s=a
this.a.I(s)},
$S:1}
A.fB.prototype={
$1(a){this.a.E(this.c.a(this.b.result))},
$S:1}
A.fC.prototype={
$1(a){var s=this.b.error
if(s==null)s=a
this.a.I(s)},
$S:1}
A.fD.prototype={
$1(a){this.a.I(new A.au("IndexedDB open blocked"))},
$S:1}
A.hd.prototype={
$1(a){return A.a0(a[1])},
$S:50}
A.il.prototype={
fO(){var s={}
s.dart=new A.im(this).$0()
return s},
bL(a){return this.hM(a)},
hM(a){var s=0,r=A.i(t.m),q,p=this,o,n
var $async$bL=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:s=3
return A.c(A.a1(v.G.WebAssembly.instantiateStreaming(a,p.fO()),t.m),$async$bL)
case 3:o=c
n=o.instance.exports
if("_initialize" in n)t.g.a(n._initialize).call()
q=o.instance
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bL,r)}}
A.im.prototype={
$0(){var s=this.a.a,r=A.a0(v.G.Object),q=A.a0(r.create.apply(r,[null]))
q.error_log=A.az(s.ghR())
q.localtime=A.ae(s.ghP())
q.xOpen=A.lf(s.giv())
q.xDelete=A.km(s.gij())
q.xAccess=A.ck(s.gi9())
q.xFullPathname=A.ck(s.gir())
q.xRandomness=A.km(s.gix())
q.xSleep=A.ae(s.giC())
q.xCurrentTimeInt64=A.ae(s.gih())
q.xClose=A.az(s.gie())
q.xRead=A.ck(s.giz())
q.xWrite=A.ck(s.giK())
q.xTruncate=A.ae(s.giG())
q.xSync=A.ae(s.giE())
q.xFileSize=A.ae(s.gip())
q.xLock=A.ae(s.git())
q.xUnlock=A.ae(s.giI())
q.xCheckReservedLock=A.ae(s.gib())
q.xDeviceCharacteristics=A.az(s.gbW())
q.xFileControl=A.km(s.gim())
q.xSectorSize=A.az(s.gbY())
q["dispatch_()v"]=A.az(s.gh2())
q["dispatch_()i"]=A.az(s.gfY())
q.dispatch_update=A.lf(s.gh0())
q.dispatch_xFunc=A.ck(s.gh8())
q.dispatch_xStep=A.ck(s.ghc())
q.dispatch_xInverse=A.ck(s.gha())
q.dispatch_xValue=A.ae(s.ghe())
q.dispatch_xFinal=A.ae(s.gh6())
q.dispatch_compare=A.lf(s.gh4())
q.dispatch_busy=A.ae(s.gfW())
q.changeset_apply_filter=A.ae(s.gfU())
q.changeset_apply_conflict=A.km(s.gfS())
return q},
$S:15}
A.c_.prototype={}
A.fo.prototype={
bO(){var s=0,r=A.i(t.H),q=this,p,o
var $async$bO=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:p=new A.k($.l,t._)
o=v.G.indexedDB.open(q.b,1)
o.onupgradeneeded=A.az(new A.fr(o))
new A.F(p,t.G).E(A.nJ(o,t.m))
s=2
return A.c(p,$async$bO)
case 2:q.a=b
return A.f(null,r)}})
return A.h($async$bO,r)},
aG(a,b){return this.ft(a,b)},
ft(a,b){var s=0,r=A.i(t.H),q=this,p,o,n
var $async$aG=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:n=q.a
n.toString
p=n.transaction($.no(),b)
o=A.oP(p)
s=2
return A.c(A.qQ(new A.fq(a,o,p),t.aQ),$async$aG)
case 2:s=3
return A.c(o.b.a,$async$aG)
case 3:if(o.c){n=q.a
if(n!=null)n.close()
q.a=null}return A.f(null,r)}})
return A.h($async$aG,r)},
fi(a){return this.aG(new A.fp(a),"readwrite")}}
A.fr.prototype={
$1(a){var s=A.a0(this.a.result)
if(J.M(a.oldVersion,0)){s.createObjectStore("files",{autoIncrement:!0}).createIndex("fileName","name",{unique:!0})
s.createObjectStore("blocks")}},
$S:7}
A.fq.prototype={
$0(){var s=0,r=A.i(t.P),q=1,p=[],o=this,n,m
var $async$$0=A.j(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
s=6
return A.c(o.a.$1(o.b),$async$$0)
case 6:q=1
s=5
break
case 3:q=2
m=p.pop()
o.c.abort()
throw m
s=5
break
case 2:s=1
break
case 5:o.c.commit()
return A.f(null,r)
case 1:return A.e(p.at(-1),r)}})
return A.h($async$$0,r)},
$S:52}
A.fp.prototype={
$1(a){return this.eh(a)},
eh(a){var s=0,r=A.i(t.H),q=this,p,o,n
var $async$$1=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:p=q.a,o=p.length,n=0
case 2:if(!(n<p.length)){s=4
break}s=5
return A.c(p[n].H(a),$async$$1)
case 5:case 3:p.length===o||(0,A.R)(p),++n
s=2
break
case 4:return A.f(null,r)}})
return A.h($async$$1,r)},
$S:11}
A.dl.prototype={
eE(a){var s=A.kl(new A.jw(this)),r=this.a
r.oncomplete=s
r.onabort=s
r.onerror=A.kl(new A.jx(this))},
cj(a,b,c){var s=t.t
return v.G.IDBKeyRange.bound(A.u([a,c],s),A.u([a,b],s))},
fk(a){return this.cj(a,9007199254740992,0)},
fl(a,b){return this.cj(a,9007199254740992,b)},
bK(){var s=0,r=A.i(t.g6),q,p=this,o,n,m,l,k
var $async$bK=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:l=A.aE(t.N,t.S)
k=new A.br(p.d.index("fileName").openKeyCursor(),t.O)
case 3:s=5
return A.c(k.k(),$async$bK)
case 5:if(!b){s=4
break}o=k.a
if(o==null)o=A.y(A.C("Await moveNext() first"))
n=o.key
n.toString
A.dJ(n)
m=o.primaryKey
m.toString
l.q(0,n,A.a_(A.bz(m)))
s=3
break
case 4:q=l
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bK,r)},
bz(a){return this.hl(a)},
hl(a){var s=0,r=A.i(t.I),q,p=this,o
var $async$bz=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:o=A
s=3
return A.c(A.at(p.d.index("fileName").getKey(a),t.i),$async$bz)
case 3:q=o.a_(c)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bz,r)},
ck(a){return A.at(this.d.get(a),t.A).bi(new A.jv(a),t.m)},
aS(a,b){return this.ew(a,b)},
ew(a,b){var s=0,r=A.i(t.fQ),q,p=this,o,n,m,l,k,j,i,h,g,f,e
var $async$aS=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:s=3
return A.c(p.ck(a),$async$aS)
case 3:h=d
g=h.length
f=new A.av(new Uint8Array(g),g)
e=new A.br(p.e.openCursor(p.fk(a)),t.O)
g=t.a,o=v.G,n=t.c,m=t.H
case 4:s=6
return A.c(e.k(),$async$aS)
case 6:if(!d){s=5
break}l=e.a
if(l==null)l=A.y(A.C("Await moveNext() first"))
k=n.a(l.key)
j=A.a_(A.bz(k[1]))
if(j>=h.length){s=5
break}i=new A.jy(f,j,Math.min(4096,h.length-j))
if(l.value instanceof o.Blob)b.push(A.hN(A.a0(l.value)).bi(i,m))
else i.$1(g.a(l.value))
s=4
break
case 5:q=f
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$aS,r)},
bv(a){return this.fN(a)},
fN(a){var s=0,r=A.i(t.S),q,p=this,o
var $async$bv=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:if((p.b.a.a&30)!==0)A.y(A.C("IDB transaction already completed"))
o=A
s=3
return A.c(A.at(p.d.put({name:a,length:0}),t.i),$async$bv)
case 3:q=o.a_(c)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bv,r)},
ar(a,b){return this.i8(a,b)},
i8(a,b){var s=0,r=A.i(t.H),q=this,p,o,n,m,l
var $async$ar=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:if((q.b.a.a&30)!==0)A.y(A.C("IDB transaction already completed"))
s=2
return A.c(q.ck(a),$async$ar)
case 2:p=d
o=b.b
n=A.A(o).h("aD<1>")
m=A.cN(new A.aD(o,n),n.h("p.E"))
B.c.eq(m)
s=3
return A.c(A.lM(new A.aF(m,new A.jz(new A.jA(q,a),b),A.ay(m).h("aF<1,x<~>>")),t.H),$async$ar)
case 3:s=b.c!==p.length?4:5
break
case 4:l=new A.br(q.d.openCursor(a),t.O)
s=6
return A.c(l.k(),$async$ar)
case 6:s=7
return A.c(A.at(l.gl().update({name:p.name,length:b.c}),t.X),$async$ar)
case 7:case 5:return A.f(null,r)}})
return A.h($async$ar,r)},
aq(a,b,c){return this.i5(0,b,c)},
i5(a,b,c){var s=0,r=A.i(t.H),q=this,p,o
var $async$aq=A.j(function(d,e){if(d===1)return A.e(e,r)
for(;;)switch(s){case 0:if((q.b.a.a&30)!==0)A.y(A.C("IDB transaction already completed"))
s=2
return A.c(q.ck(b),$async$aq)
case 2:p=e
s=p.length>c?3:4
break
case 3:s=5
return A.c(A.at(q.e.delete(q.fl(b,B.a.B(c,4096)*4096)),t.X),$async$aq)
case 5:case 4:o=new A.br(q.d.openCursor(b),t.O)
s=6
return A.c(o.k(),$async$aq)
case 6:s=7
return A.c(A.at(o.gl().update({name:p.name,length:c}),t.X),$async$aq)
case 7:return A.f(null,r)}})
return A.h($async$aq,r)},
bx(a){return this.fR(a)},
fR(a){var s=0,r=A.i(t.H),q=this,p
var $async$bx=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:if((q.b.a.a&30)!==0)A.y(A.C("IDB transaction already completed"))
p=t.X
s=2
return A.c(A.lM(A.u([A.at(q.e.delete(q.cj(a,9007199254740992,0)),p),A.at(q.d.delete(a),p)],t.M),t.H),$async$bx)
case 2:return A.f(null,r)}})
return A.h($async$bx,r)}}
A.jw.prototype={
$0(){this.a.b.M()},
$S:2}
A.jx.prototype={
$0(){var s=this.a,r=s.a.error
if(r==null)r=new v.G.DOMException("IDB transaction error")
s.b.I(r)},
$S:2}
A.jv.prototype={
$1(a){if(a==null)throw A.b(A.b7(this.a,"fileId","File not found in database"))
else return a},
$S:54}
A.jy.prototype={
$1(a){var s=this.a
s.aP(s,this.b,J.ct(a,0,this.c))},
$S:55}
A.jA.prototype={
en(a,b){var s=0,r=A.i(t.H),q=this,p,o,n,m,l,k
var $async$$2=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:p=q.a.e
o=q.b
n=t.t
s=2
return A.c(A.at(p.openCursor(v.G.IDBKeyRange.only(A.u([o,a],n))),t.A),$async$$2)
case 2:m=d
l=t.a.a(B.d.ga9(b))
k=t.X
s=m==null?3:5
break
case 3:s=6
return A.c(A.at(p.put(l,A.u([o,a],n)),k),$async$$2)
case 6:s=4
break
case 5:s=7
return A.c(A.at(m.update(l),k),$async$$2)
case 7:case 4:return A.f(null,r)}})
return A.h($async$$2,r)},
$2(a,b){return this.en(a,b)},
$S:56}
A.jz.prototype={
$1(a){var s=this.b.b.n(0,a)
s.toString
return this.a.$2(a,s)},
$S:57}
A.jd.prototype={
fC(a,b,c){B.d.aP(this.b.ea(a,new A.je(this,a)),b,c)},
fK(a,b){var s,r,q,p,o,n,m,l
for(s=b.length,r=0;r<s;r=l){q=a+r
p=B.a.B(q,4096)
o=B.a.ad(q,4096)
n=s-r
if(o!==0)m=Math.min(4096-o,n)
else{m=Math.min(4096,n)
o=0}l=r+m
this.fC(p*4096,o,J.ct(B.d.ga9(b),b.byteOffset+r,m))}this.c=Math.max(this.c,a+s)}}
A.je.prototype={
$0(){var s=new Uint8Array(4096),r=this.a.a,q=r.length,p=this.b
if(q>p)B.d.aP(s,0,J.ct(B.d.ga9(r),r.byteOffset+p,Math.min(4096,q-p)))
return s},
$S:58}
A.eY.prototype={}
A.aR.prototype={
b3(a){var s=this
if(s.e||s.d.a==null)A.y(A.bZ(10))
if(a.cz(s.x)){s.ah(!0)
return a.d.a}else return A.hk(null,t.H)},
ah(a){return this.fA(a)},
fA(a){var s=0,r=A.i(t.H),q,p=this,o,n
var $async$ah=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:if(a&&!p.r){s=1
break}s=p.f==null&&!p.x.gaL(0)?3:4
break
case 3:o=p.x
n=A.cN(o,o.$ti.h("p.E"))
o.W(0)
o=p.d.fi(n).K(new A.hp(p,n,a))
p.f=o
s=5
return A.c(o,$async$ah)
case 5:case 4:case 1:return A.f(q,r)}})
return A.h($async$ah,r)},
m(){var s=0,r=A.i(t.H),q,p=this,o,n
var $async$m=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:if(!p.e){o=p.b3(new A.dj(new A.hq(),new A.F(new A.k($.l,t.D),t.F)))
p.e=!0
p.ah(!1)
q=o
s=1
break}else{n=p.x
if(!n.gaL(0)){q=n.gcD(0).d.a
s=1
break}}case 1:return A.f(q,r)}})
return A.h($async$m,r)},
aC(a,b){return this.eV(a,b)},
eV(a,b){var s=0,r=A.i(t.S),q,p=this,o,n
var $async$aC=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:n=p.z
s=n.a0(b)?3:5
break
case 3:n=n.n(0,b)
n.toString
q=n
s=1
break
s=4
break
case 5:s=6
return A.c(a.bz(b),$async$aC)
case 6:o=d
o.toString
n.q(0,b,o)
q=o
s=1
break
case 4:case 1:return A.f(q,r)}})
return A.h($async$aC,r)},
b_(){var s=0,r=A.i(t.H),q=this,p
var $async$b_=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:p=A.u([],t.M)
s=2
return A.c(q.d.aG(new A.ho(q,p),"readonly"),$async$b_)
case 2:s=3
return A.c(A.nV(p,t.H),$async$b_)
case 3:return A.f(null,r)}})
return A.h($async$b_,r)},
e1(){var s=this.f
return s==null?this.ah(!1):s},
bU(a,b){return this.w.d.a0(a)?1:0},
cN(a,b){var s=this
s.w.d.u(0,a)
if(!s.y.u(0,a))s.b3(new A.df(s,a,new A.F(new A.k($.l,t.D),t.F)))},
cO(a){return new v.G.URL(a,"file:///").pathname},
au(a,b){var s,r,q,p=this,o=a.a
if(o==null)o=A.lN(p.b,"/")
s=p.w
r=s.d.a0(o)?1:0
q=s.au(new A.d_(o),b)
if(r===0)if((b&8)!==0)p.y.G(0,o)
else p.b3(new A.c9(p,o,new A.F(new A.k($.l,t.D),t.F)))
return new A.ce(new A.eT(p,q.a,o),0)},
cQ(a){}}
A.hp.prototype={
$0(){var s,r,q,p,o=this.a
o.f=null
for(s=this.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q){p=s[q].d.a
if((p.a&30)!==0)A.y(A.C("Future already completed"))
p.aB(null)}o.ah(this.c)},
$S:2}
A.hq.prototype={
$1(a){return this.ej(a)},
ej(a){var s=0,r=A.i(t.H)
var $async$$1=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:a.c=!0
return A.f(null,r)}})
return A.h($async$$1,r)},
$S:11}
A.ho.prototype={
$1(a){return this.ei(a)},
ei(a){var s=0,r=A.i(t.H),q=this,p,o,n,m,l,k,j
var $async$$1=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:s=2
return A.c(a.bK(),$async$$1)
case 2:m=c
l=q.a
l.z.a8(0,m)
p=m.gby(),p=p.gt(p),o=q.b,l=l.w.d
case 3:if(!p.k()){s=4
break}n=p.gl()
k=l
j=n.a
s=5
return A.c(a.aS(n.b,o),$async$$1)
case 5:k.q(0,j,c)
s=3
break
case 4:return A.f(null,r)}})
return A.h($async$$1,r)},
$S:11}
A.eT.prototype={
bX(a,b){this.b.bX(a,b)},
gbW(){return 0},
gbY(){return 4096},
cM(){return this.b.d>=2?1:0},
bV(){},
bj(){return this.b.bj()},
cP(a){this.b.d=a
return null},
cR(a){},
ef(a,b){return 12},
bk(a){var s=this,r=s.a
if(r.e||r.d.a==null)A.y(A.bZ(10))
s.b.bk(a)
if(!r.y.dS(0,s.c))r.b3(new A.dj(new A.ju(s,a),new A.F(new A.k($.l,t.D),t.F)))},
cS(a){this.b.d=a
return null},
aO(a,b){var s,r,q,p,o,n,m=this,l=m.a
if(l.e||l.d.a==null)A.y(A.bZ(10))
s=m.c
if(l.y.dS(0,s)){m.b.aO(a,b)
return}r=l.w.d.n(0,s)
if(r==null)r=new A.av(new Uint8Array(0),0)
q=J.ct(B.d.ga9(r.a),0,r.b)
m.b.aO(a,b)
p=new Uint8Array(a.length)
B.d.aP(p,0,a)
o=A.u([],t.f6)
n=$.l
o.push(new A.eY(b,p))
l.b3(new A.ci(l,s,q,o,new A.F(new A.k(n,t.D),t.F)))},
$ia2:1,
$id6:1}
A.ju.prototype={
$1(a){return this.em(a)},
em(a){var s=0,r=A.i(t.H),q,p=this,o,n
var $async$$1=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:o=p.a
n=a
s=3
return A.c(o.a.aC(a,o.c),$async$$1)
case 3:q=n.aq(0,c,p.b)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$1,r)},
$S:11}
A.U.prototype={
cz(a){a.br(a.c,this,!1)
return!0}}
A.dj.prototype={
H(a){return this.w.$1(a)}}
A.df.prototype={
cz(a){var s,r,q,p
if(!a.gaL(0)){s=a.gcD(0)
for(r=this.x;s!=null;)if(s instanceof A.df)if(s.x===r)return!1
else s=s.gbd()
else if(s instanceof A.ci){q=s.gbd()
if(s.x===r){p=s.a
p.toString
p.co(A.A(s).h("Y.E").a(s))}s=q}else if(s instanceof A.c9){if(s.x===r){r=s.a
r.toString
r.co(A.A(s).h("Y.E").a(s))
return!1}s=s.gbd()}else break}a.br(a.c,this,!1)
return!0},
H(a){return this.i2(a)},
i2(a){var s=0,r=A.i(t.H),q=this,p,o,n
var $async$H=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:p=q.w
o=q.x
s=2
return A.c(p.aC(a,o),$async$H)
case 2:n=c
p.z.u(0,o)
s=3
return A.c(a.bx(n),$async$H)
case 3:return A.f(null,r)}})
return A.h($async$H,r)}}
A.c9.prototype={
H(a){return this.i1(a)},
i1(a){var s=0,r=A.i(t.H),q=this,p,o,n
var $async$H=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:p=q.x
o=q.w.z
n=p
s=2
return A.c(a.bv(p),$async$H)
case 2:o.q(0,n,c)
return A.f(null,r)}})
return A.h($async$H,r)}}
A.ci.prototype={
cz(a){var s,r=a.b===0?null:a.gcD(0)
for(s=this.x;r!=null;)if(r instanceof A.ci)if(r.x===s){B.c.a8(r.z,this.z)
return!1}else r=r.gbd()
else if(r instanceof A.c9){if(r.x===s)break
r=r.gbd()}else break
a.br(a.c,this,!1)
return!0},
H(a){return this.i3(a)},
i3(a){var s=0,r=A.i(t.H),q=this,p,o,n,m,l,k
var $async$H=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:m=q.y
l=new A.jd(m,A.aE(t.S,t.p),m.length)
for(m=q.z,p=m.length,o=0;o<m.length;m.length===p||(0,A.R)(m),++o){n=m[o]
l.fK(n.a,n.b)}k=a
s=3
return A.c(q.w.aC(a,q.x),$async$H)
case 3:s=2
return A.c(k.ar(c,l),$async$H)
case 2:return A.f(null,r)}})
return A.h($async$H,r)}}
A.bK.prototype={
Z(){return"FileType."+this.b}}
A.bV.prototype={
V(){var s=this.d
if(s!=null)return s
throw A.b(A.C("VFS closed"))},
bU(a,b){var s=$.kN().n(0,a)
if(s==null)return this.e.d.a0(a)?1:0
else return this.V().dZ(s)?1:0},
cN(a,b){var s=$.kN().n(0,a)
if(s==null){this.e.d.u(0,a)
return null}else this.V().bc(s,!1)},
cO(a){return new v.G.URL(a,"file:///").pathname},
au(a,b){var s,r,q=this,p=a.a
if(p==null)return q.e.au(a,b)
s=$.kN().n(0,p)
if(s==null)return q.e.au(a,b)
r=q.V()
if(!r.dZ(s))if((b&4)!==0){r.ak(s).truncate(0)
r.bc(s,!0)}else throw A.b(B.ay)
return new A.ce(new A.f2(q,s,(b&8)!==0),0)},
cQ(a){},
m(){var s=this.d
if(s!=null){s.b.close()
s.c.close()
s.d.close()}this.d=null},
ab(a,b){return this.hX(a,b)},
hV(a){return this.ab(a,!1)},
hX(a,b){var s=0,r=A.i(t.H),q=this,p,o,n,m,l,k
var $async$ab=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:m=new A.hS(a,b)
s=2
return A.c(m.$1("meta"),$async$ab)
case 2:l=d
k=J.M(l.getSize(),0)
l.truncate(2)
s=3
return A.c(m.$1("database"),$async$ab)
case 3:p=d
s=4
return A.c(m.$1("journal"),$async$ab)
case 4:o=d
n=q.d=new A.jH(new Uint8Array(2),l,p,o)
if(k){n.bc(B.A,p.getSize()>0)
n.bc(B.B,o.getSize()>0)}return A.f(null,r)}})
return A.h($async$ab,r)}}
A.hS.prototype={
el(a){var s=0,r=A.i(t.m),q,p=this,o,n
var $async$$1=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:o=t.m
s=3
return A.c(A.a1(p.a.getFileHandle(a,{create:!0}),o),$async$$1)
case 3:n=c
s=4
return A.c(A.a1(p.b?n.createSyncAccessHandle({mode:"readwrite-unsafe"}):n.createSyncAccessHandle(),o),$async$$1)
case 4:q=c
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$1,r)},
$1(a){return this.el(a)},
$S:59}
A.f2.prototype={
eb(a,b){return A.lK(this.a.V().ak(this.b),a,{at:b})},
cM(){return this.d>=2?1:0},
bV(){var s=this.a,r=this.b
s.V().ak(r).flush()
if(this.c)s.V().bc(r,!1)},
bj(){return this.a.V().ak(this.b).getSize()},
cP(a){this.d=a},
cR(a){this.a.V().ak(this.b).flush()},
bk(a){this.a.V().ak(this.b).truncate(a)},
cS(a){this.d=a},
aO(a,b){if(A.lL(this.a.V().ak(this.b),a,{at:b})<a.length)throw A.b(B.aA)}}
A.jH.prototype={
dZ(a){var s=this.a
A.lK(this.b,s,{at:0})
return s[a.a]!==0},
bc(a,b){var s=this.a,r=b?1:0
s.$flags&2&&A.r(s)
s[a.a]=r
A.lL(this.b,s,{at:0})},
ak(a){var s
switch(a.a){case 0:s=this.c
break
case 1:s=this.d
break
default:s=null}return s}}
A.ie.prototype={
eC(a,b){var s=this,r=s.c
r.a!==$&&A.n0()
r.a=s
r=t.S
A.jf(new A.ig(s),r)
A.jf(new A.ih(s),r)
s.r=A.jf(new A.ii(s),r)
s.w=A.jf(new A.ij(s),r)},
b4(a,b){var s=a.length,r=this.d.dart_sqlite3_malloc(s+b),q=A.ai(this.b.buffer,0,null)
s=r+s
B.d.Y(q,r,s,a)
B.d.e_(q,s,s+b,0)
return r},
cs(a){return this.b4(a,0)},
dV(a,b){var s=b==null?null:b
return this.d.dart_sqlite3_updates(a,s)},
dT(a,b){var s=b==null?null:b
return this.d.dart_sqlite3_commits(a,s)},
dU(a,b){var s=b==null?null:b
return this.d.dart_sqlite3_rollbacks(a,s)}}
A.ig.prototype={
$1(a){return this.a.d.sqlite3changeset_finalize(a)},
$S:3}
A.ih.prototype={
$1(a){return this.a.d.sqlite3session_delete(a)},
$S:3}
A.ii.prototype={
$1(a){return this.a.d.sqlite3_close_v2(a)},
$S:3}
A.ij.prototype={
$1(a){return this.a.d.sqlite3_finalize(a)},
$S:3}
A.cy.prototype={}
A.hH.prototype={
eB(a){var s,r=this,q=r.a
q.start()
r.c=A.a3(q,"message",new A.hL(r),!1,t.m)
s=a.b
if(a.c==null&&s!=null){q=$.dP()
q.toString
A.d7(q,s,null,null,!1).bi(new A.hM(r),t.P)}},
ca(a){return this.f5(a)},
f5(a){var s=0,r=A.i(t.H),q=this
var $async$ca=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:A.qz(a,new A.hI(q),q.ghA(),new A.hJ(q),new A.hK(q))
return A.f(null,r)}})
return A.h($async$ca,r)},
bn(a,b,c){return this.ep(a,b,c,c)},
ep(a,b,c,d){var s=0,r=A.i(d),q,p=this,o,n,m
var $async$bn=A.j(function(e,f){if(e===1)return A.e(f,r)
for(;;)switch(s){case 0:if((p.b.a.a&30)!==0)throw A.b(A.nA(null))
o=p.e++
n=new A.k($.l,t._)
p.f.q(0,o,new A.F(n,t.G))
a.i=o
p.a.postMessage(a,A.co(a))
s=3
return A.c(n,$async$bn)
case 3:m=f
if(J.M(m.t,b.b)){q=c.a(m)
s=1
break}else throw A.b(A.om(m))
case 1:return A.f(q,r)}})
return A.h($async$bn,r)},
fa(a){var s,r,q=this,p=q.b
if((p.a.a&30)!==0)return
q.a.postMessage("_disconnect")
s=q.c
if(s!=null)s.p()
s=q.d
if(s!=null)s.p()
for(s=q.f,r=new A.bN(s,s.r,s.e);r.k();)r.d.I(new A.dX(a))
s.W(0)
p.M()},
dn(){return this.fa(null)}}
A.hL.prototype={
$1(a){if(a.data=="_disconnect"){this.a.dn()
return}this.a.ca(A.a0(a.data))},
$S:1}
A.hM.prototype={
$1(a){this.a.dn()
a.a.M()},
$S:60}
A.hK.prototype={
$1(a){var s=this.a.f.u(0,a.i)
if(s!=null)s.E(a)},
$S:7}
A.hJ.prototype={
$1(a){return this.ek(a)},
ek(a1){var s=0,r=A.i(t.P),q=1,p=[],o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$$1=A.j(function(a2,a3){if(a2===1){p.push(a3)
s=q}for(;;)switch(s){case 0:f=null
e=a1.i
d=n.a
c=d.r
b=v.G
a=new b.AbortController()
c.q(0,e,a)
m=a
q=3
j=d.h_(a1,m.signal)
s=6
return A.c(t.em.b(j)?j:A.cc(j,t.m),$async$$1)
case 6:f=a3
o.push(5)
s=4
break
case 3:q=2
a0=p.pop()
l=A.S(a0)
k=A.W(a0)
if(!(l instanceof A.b6)){b.console.error("Error in worker: "+J.aN(l))
b.console.error("Original trace: "+A.w(k))}b=l
if(b instanceof A.bW){h=A.nN(b)
g=0}else{g=b instanceof A.b6?1:null
h=null}f={e:J.aN(b),s:g,r:h,i:e,t:"errorResponse"}
o.push(5)
s=4
break
case 2:o=[1]
case 4:q=1
c.u(0,e)
s=o.pop()
break
case 5:c=f
d.a.postMessage(c,A.co(c))
return A.f(null,r)
case 1:return A.e(p.at(-1),r)}})
return A.h($async$$1,r)},
$S:61}
A.hI.prototype={
$1(a){var s=this.a.r.u(0,a.i)
if(s!=null)s.abort()},
$S:7}
A.dX.prototype={
i(a){return"Channel to database worker is closed: "+A.w(this.a)}}
A.fT.prototype={
a2(a){return this.hN(a)},
hN(a){var s=0,r=A.i(t.n),q
var $async$a2=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:q=A.ip(a,null)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$a2,r)}}
A.e0.prototype={}
A.fE.prototype={}
A.bp.prototype={}
A.e8.prototype={
bM(){var s=0,r=A.i(t.H),q=this
var $async$bM=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:s=!q.c?2:3
break
case 2:s=4
return A.c(q.a.hV(q.b),$async$bM)
case 4:case 3:return A.f(null,r)}})
return A.h($async$bM,r)},
cH(){var s=0,r=A.i(t.H),q=this
var $async$cH=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:if(!q.c)q.a.m()
return A.f(null,r)}})
return A.h($async$cH,r)}}
A.hn.prototype={
i4(a){var s=this.a,r=this.d
if(this.c)return s.transfer(r)
else return s.slice(0,r)},
eX(a){var s,r,q,p=this,o=p.b
for(s=o;s<a;){s*=2
p.b=s}if(p.c)p.a=p.a.transfer(s)
else{r=v.G
q=new r.ArrayBuffer(s)
new r.Uint8Array(q,0,p.b).set(new r.Uint8Array(p.a,0,o))
p.a=q}}}
A.it.prototype={
$1(a){var s=new A.k($.l,t.D),r=new A.aC(new A.F(s,t.F))
this.a.a=r
this.b.E(r)
return A.nW(s)},
$S:62}
A.iu.prototype={
$2(a,b){var s,r,q
A.a0(a)
s=J.M(a.name,"AbortError")
r=this.a.a
if(r!=null){if((r.a.a.a&30)===0){q=this.b
if(q!=null)q.$0()}}else{q=this.c
if(s)q.ai(new A.b6("Operation was cancelled"),b)
else q.ai(a,b)}return null},
$S:63}
A.aC.prototype={}
A.e2.prototype={
gfL(){if(this.c.a)return!1
return!this.d||this.f!=null},
aw(a){return this.eI(a)},
eI(a){var s=0,r=A.i(t.H),q=1,p=[],o=this,n,m,l,k,j,i
var $async$aw=A.j(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:j=$.dP()
j.toString
n=j
m=null
l=null
q=3
s=6
return A.c(A.d7(n,o.a,null,o.gf6(),!0),$async$aw)
case 6:m=c
s=7
return A.c(A.d7(n,o.b,a,null,!1),$async$aw)
case 7:l=c
j=o.e
j=j==null?null:j.bM()
s=8
return A.c(j instanceof A.k?j:A.cc(j,t.H),$async$aw)
case 8:o.f=new A.V(m,l)
q=1
s=5
break
case 3:q=2
i=p.pop()
j=m
if(j!=null)j.a.M()
j=l
if(j!=null)j.a.M()
throw i
s=5
break
case 2:s=1
break
case 5:return A.f(null,r)
case 1:return A.e(p.at(-1),r)}})
return A.h($async$aw,r)},
f7(){this.ec()},
cE(a,b,c){return this.c.bT(new A.h5(this,a,b,c),b,c)},
ec(){return this.c.cL(new A.h6(this),t.H)}}
A.h5.prototype={
$0(){var s,r=this,q=r.a
if(!q.d||q.f!=null)return r.b.$0()
s=r.d
return q.aw(r.c).bi(new A.h4(r.b,s),s)},
$S(){return this.d.h("0/()")}}
A.h4.prototype={
$1(a){return this.a.$0()},
$S(){return this.b.h("0/(~)")}}
A.h6.prototype={
$0(){var s,r,q,p=this.a,o=p.f
if(o!=null){s=o.a
r=o.b
q=p.e
if(q!=null)q.cH()
s.a.M()
r.a.M()
p.f=null}},
$S:2}
A.cP.prototype={
bT(a,b,c){return this.i7(a,b,c,c)},
cL(a,b){return this.bT(a,null,b)},
i7(a,b,c,d){var s=0,r=A.i(d),q,p=this,o,n,m,l,k,j,i,h,g
var $async$bT=A.j(function(e,f){if(e===1)return A.e(f,r)
for(;;)switch(s){case 0:h={}
g=b==null
if(J.M(g?null:b.aborted,!0))throw A.b(B.j)
h.a=!1
o=new A.hC(h,p)
if(!p.a){h.a=p.a=!0
q=A.ea(a,c).K(o)
s=1
break}else{n={}
m=new A.k($.l,c.h("k<0>"))
l=new A.F(m,c.h("F<0>"))
n.a=null
h=new A.hB(h,n,l,a,c)
if(!g)n.a=A.a3(b,"abort",new A.hA(n,p,l,h),!1,t.m)
g=p.b
n=g.a
k=g.c
n[k]=h
n=n.length
k=(k+1&n-1)>>>0
g.c=k
if(g.b===k){j=A.hx(n*2,null,!1,g.$ti.h("1?"))
h=g.a
n=g.b
i=h.length-n
B.c.F(j,0,i,h,n)
B.c.F(j,i,i+g.b,g.a,0)
g.b=0
g.c=g.a.length
g.a=j}++g.d
q=m.K(o)
s=1
break}case 1:return A.f(q,r)}})
return A.h($async$bT,r)}}
A.hC.prototype={
$0(){var s,r,q,p
if(!this.a.a)return
s=this.b
r=s.b
if(!r.gaL(0)){s=r.b
if(s===r.c)A.y(A.eg());++r.d
q=r.a
p=q[s]
if(p==null)p=r.$ti.c.a(p)
q[s]=null
r.b=(s+1&q.length-1)>>>0
p.$0()}else s.a=!1},
$S:0}
A.hB.prototype={
$0(){var s,r=this
r.a.a=!0
s=r.b.a
if(s!=null)s.p()
r.c.E(A.ea(r.d,r.e))},
$S:0}
A.hA.prototype={
$1(a){var s,r=this
r.a.a.p()
s=r.c
if((s.a.a&30)===0){r.b.b.u(0,r.d)
s.I(B.j)}},
$S:1}
A.bc.prototype={
gee(){var s,r,q,p,o,n=this,m=t.s,l=A.u([],m)
for(s=n.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q){p=s[q]
B.c.a8(l,A.u([p.a.b,p.b],m))}o={}
o.a=l
o.b=n.b
o.c=n.c
o.d=n.e
o.e=!1
o.f=!1
o.g=n.d
return o}}
A.hb.prototype={
$1(a){if(a!=null)return A.dJ(a)
return null},
$S:64}
A.eo.prototype={
Z(){return"MessageType."+this.b}}
A.hO.prototype={
h_(a,b){var s,r,q,p=this,o=null
switch(a.t){case"open":return p.bE(a,b)
case"connect":return p.cw(a,b)
case"custom":return p.aI(a,b)
case"fileSystemExists":return p.b7(a,b)
case"fileSystemFlush":return p.b8(a,b)
case"fileSystemAccess":return p.b6(a,b)
case"runQuery":return p.bH(a,b)
case"exclusiveLock":return p.bD(a,b)
case"releaseLock":s=p.R(a)
r=a.z
q=s.f
if((q==null?o:q.a)!==r)A.y(A.C("Lock to be released is not active."))
q.b.M()
s.f=null
return{r:null,i:a.i,t:"simpleSuccessResponse"}
case"closeDatabase":return p.bB(a,b)
case"openAdditionalConnection":return p.bF(a,b)
case"updateRequest":return p.bI(a,b)
case"rollbackRequest":return p.bG(a,b)
case"commitRequest":return p.bC(a,b)
case"dedicatedCompatibilityCheck":return p.aD(a,b)
case"sharedCompatibilityCheck":return p.aD(a,b)
case"dedicatedInSharedCompatibilityCheck":return p.aD(a,b)
default:r=A.lh(new A.ah(!1,o,o,"Unsupported request "+A.w(a.t)),o)
q=new A.k($.l,t.gp)
q.a7(r)
return q}}}
A.aQ.prototype={
Z(){return"FileSystemImplementation."+this.b}}
A.aq.prototype={
Z(){return"TypeCode."+this.b},
fP(a){var s,r=null,q=r
switch(this.a){case 0:q=A.y(A.X("Unsupported type code",r))
break
case 1:a=A.a_(A.bz(a))
q=a
break
case 2:q=t.V.a(a).toString()
s=A.oJ(q,r)
if(s==null)A.y(A.kS("Could not parse BigInt",q,r))
q=s
break
case 3:A.bz(a)
q=a
break
case 4:A.dJ(a)
q=a
break
case 5:t.Z.a(a)
q=a
break
case 7:A.by(a)
q=a
break
case 6:break}return q}}
A.aP.prototype={
dP(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="binding parameter",d=a.a,c=d.c
d=d.b
s=c.d
r=s.sqlite3_bind_parameter_count(d)
q=this.a
p=q.length
if(p!==r)throw A.b(A.X("Expected "+A.w(r)+" parameters, got "+A.w(p),null))
a.e=this
for(r=this.c,o=v.G,n=t.Z,m=t.V,l=0;l<p;l=i){k=r[l]
j=k>=8?B.n:B.C[k]
i=l+1
h=q[l]
switch(j.a){case 1:k=s.sqlite3_bind_int64(d,i,o.BigInt(A.a_(A.bz(h))))
if(k!==0)a.a4(k,e)
break
case 2:k=s.sqlite3_bind_int64(d,i,m.a(h))
if(k!==0)a.a4(k,e)
break
case 3:k=s.sqlite3_bind_double(d,i,A.bz(h))
if(k!==0)a.a4(k,e)
break
case 4:g=B.e.aj(A.dJ(h))
k=s.dart_sqlite3_bind_text(d,i,c.cs(g),g.length)
if(k!==0)a.a4(k,e)
break
case 5:n.a(h)
k=s.dart_sqlite3_bind_blob(d,i,c.cs(h),h.length)
if(k!==0)a.a4(k,e)
break
case 6:k=s.sqlite3_bind_null(d,i)
if(k!==0)a.a4(k,e)
break
case 7:f=A.by(h)?1:0
k=s.sqlite3_bind_int64(d,i,o.BigInt(f))
if(k!==0)a.a4(k,e)
break
case 0:throw A.b(A.aY("Unknown type code"))}}},
gj(a){return this.a.length},
n(a,b){var s=this.c[b],r=s>=8?B.n:B.C[s]
return r.fP(this.a[b])},
q(a,b,c){this.fB()},
fB(){throw A.b(A.aY("decodeValues list is unmodifiable"))}}
A.ku.prototype={
$1(a){this.b.transaction.abort()
this.a.a=!1},
$S:7}
A.fu.prototype={
$1(a){this.a.E(this.c.a(this.b.result))},
$S:1}
A.fv.prototype={
$1(a){var s=this.b.error
if(s==null)s=a
this.a.I(s)},
$S:1}
A.fy.prototype={
$1(a){this.a.E(this.c.a(this.b.result))},
$S:1}
A.fz.prototype={
$1(a){var s=this.b.error
if(s==null)s=a
this.a.I(s)},
$S:1}
A.fA.prototype={
$1(a){var s=this.b.error
if(s==null)s=a
this.a.I(s)},
$S:1}
A.hG.prototype={
hg(){var s,r,q,p
for(s=this.b,r=new A.bN(s,s.r,s.e);r.k();){q=r.d
if(!q.r){q.r=!0
if(!q.f){p=q.a
p.c.d.sqlite3_reset(p.b)
q.f=!0}q=q.a
p=q.c
p.d.sqlite3_finalize(q.b)
p=p.w
if(p!=null){p=p.a
if(p!=null)p.unregister(q.d)}}}s.W(0)}}
A.cF.prototype={
Z(){return"FileType."+this.b}}
A.aW.prototype={
Z(){return"StorageMode."+this.b}}
A.cX.prototype={
i(a){return"Remote error: "+this.a}}
A.b6.prototype={}
A.kk.prototype={
$1(a){return A.a0(a.data)},
$S:66}
A.dB.prototype={
p(){var s=this.a
if(s!=null)s.p()
this.a=null}}
A.c5.prototype={
m(){var s=0,r=A.i(t.H),q=this,p,o,n
var $async$m=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:q.c.p()
q.d.p()
q.e.p()
for(p=q.w,o=p.length,n=0;n<p.length;p.length===o||(0,A.R)(p),++n)p[n].abort()
B.c.W(p)
p=q.f
if(p!=null)p.b.M()
s=2
return A.c(q.a.b5(),$async$m)
case 2:return A.f(null,r)}})
return A.h($async$m,r)},
dD(a){var s=new v.G.AbortController()
a.onabort=A.kl(new A.iY(s))
this.w.push(s)
return s},
bS(a,b,c,d){var s,r,q,p=this,o=null
if(a==null){s=p.a.f
if(!s.gfL()){r=p.dD(b)
o=s.cE(c,r.signal,d).K(new A.j1(p,r))}}else{s=p.f
if((s==null?null:s.a)!==a)throw A.b(A.C("Requested operation on inactive lock state."))}if(o==null)o=A.ea(c,d)
q=p.a.z
return q instanceof A.aR?o.K(q.gho()):o},
hU(a){var s=this,r=s.dD(a),q=new A.k($.l,t.B),p=new A.aw(q,t.bS),o=t.H
A.kT(s.a.f.cE(new A.iZ(s,p),r.signal,o),new A.j_(p),o,t.K)
return q.K(new A.j0(s,r))}}
A.iY.prototype={
$0(){return this.a.abort()},
$S:0}
A.j1.prototype={
$0(){B.c.u(this.a.w,this.b)},
$S:2}
A.iZ.prototype={
$0(){var s=this.a,r=s.r++,q=new A.k($.l,t.D)
s.f=new A.V(r,new A.aw(q,t.h))
this.b.E(r)
return q},
$S:4}
A.j_.prototype={
$2(a,b){var s=this.a
if((s.a.a&30)===0)s.ai(a,b)},
$S:10}
A.j0.prototype={
$0(){B.c.u(this.a.w,this.b)},
$S:2}
A.c3.prototype={
eD(a,b,c){this.b.a.K(new A.iM(this))},
aD(a,b){return this.eY(a,b)},
eY(a,b){var s=0,r=A.i(t.m),q,p=this
var $async$aD=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:s=3
return A.c(p.w.dR(a),$async$aD)
case 3:q={r:d.gee(),i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$aD,r)},
cw(a,b){return this.hs(a,b)},
hs(a,b){var s=0,r=A.i(t.m),q,p=this,o,n
var $async$cw=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:n=p.w.gdl()
n.toString
o={r:a.r,i:0,d:null,t:"connect"}
n.a.postMessage(o,A.co(o))
q={r:null,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$cw,r)},
aI(a,b){return this.ht(a,b)},
ht(a,b){var s=0,r=A.i(t.m),q,p=this,o,n,m,l,k
var $async$aI=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:k=a.d
s=k!=null?3:5
break
case 3:o=p.da(k)
n=a.z
m=a.r
s=7
return A.c(o.a.ga3(),$async$aI)
case 7:s=6
return A.c(d.aJ(p,new A.fE(new A.iP(o,n,b),m)),$async$aI)
case 6:l=d
s=4
break
case 5:s=8
return A.c(p.w.b.aJ(p,new A.e0(a)),$async$aI)
case 8:l=d
case 4:q={r:l,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$aI,r)},
bE(a,b){return this.hC(a,b)},
hC(a,b){var s=0,r=A.i(t.m),q,p=this
var $async$bE=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:s=3
return A.c(p.w.y.cL(new A.iS(p,a),t.m),$async$bE)
case 3:q=d
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bE,r)},
bH(a,b){return this.hF(a,b)},
hF(a,b){var s=0,r=A.i(t.m),q,p=this,o,n,m
var $async$bH=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
n=o.a
s=3
return A.c(n.ga3(),$async$bH)
case 3:m=d
q=o.bS(a.z,b,new A.iV(m,a,n),t.m)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bH,r)},
bD(a,b){return this.hw(a,b)},
hw(a,b){var s=0,r=A.i(t.m),q,p=this
var $async$bD=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:s=3
return A.c(p.R(a).hU(b),$async$bD)
case 3:q={r:d,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bD,r)},
bC(a,b){return this.hr(a,b)},
hr(a,b){var s=0,r=A.i(t.m),q,p=this,o,n
var $async$bC=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
n=o.e
s=a.a?3:5
break
case 3:s=6
return A.c(p.av(n,new A.iO(p,o),a),$async$bC)
case 6:q=d
s=1
break
s=4
break
case 5:n.p()
q={r:null,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 4:case 1:return A.f(q,r)}})
return A.h($async$bC,r)},
bG(a,b){return this.hE(a,b)},
hE(a,b){var s=0,r=A.i(t.m),q,p=this,o,n
var $async$bG=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
n=o.d
s=a.a?3:5
break
case 3:s=6
return A.c(p.av(n,new A.iU(p,o),a),$async$bG)
case 6:q=d
s=1
break
s=4
break
case 5:n.p()
q={r:null,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 4:case 1:return A.f(q,r)}})
return A.h($async$bG,r)},
bI(a,b){return this.hG(a,b)},
hG(a,b){var s=0,r=A.i(t.m),q,p=this,o,n
var $async$bI=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
n=o.c
s=a.a?3:5
break
case 3:s=6
return A.c(p.av(n,new A.iX(p,o),a),$async$bI)
case 6:q=d
s=1
break
s=4
break
case 5:n.p()
q={r:null,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 4:case 1:return A.f(q,r)}})
return A.h($async$bI,r)},
bF(a,b){return this.hD(a,b)},
hD(a,b){var s=0,r=A.i(t.m),q,p=this,o,n,m
var $async$bF=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:m=p.R(a).a;++m.w
s=3
return A.c(A.kv(),$async$bF)
case 3:o=d
n=o.a
p.w.cZ(o.b).x.push(A.mi(m,0))
q={r:n,i:a.i,t:"endpointResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bF,r)},
bB(a,b){return this.hq(a,b)},
hq(a,b){var s=0,r=A.i(t.m),q,p=this,o
var $async$bB=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
B.c.u(p.x,o)
s=3
return A.c(o.m(),$async$bB)
case 3:q={r:null,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bB,r)},
b8(a,b){return this.hz(a,b)},
hz(a,b){var s=0,r=A.i(t.m),q,p=this,o
var $async$b8=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:s=3
return A.c(p.R(a).a.gac(),$async$b8)
case 3:o=d
s=o instanceof A.aR?4:5
break
case 4:s=6
return A.c(o.e1(),$async$b8)
case 6:case 5:q={r:null,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$b8,r)},
b6(a,b){return this.hx(a,b)},
hx(a,b){var s=0,r=A.i(t.m),q,p=this,o,n,m,l,k,j
var $async$b6=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
n=B.D[a.f]
m=a.b
l=o
k=b
j=A
s=4
return A.c(o.a.gac(),$async$b6)
case 4:s=3
return A.c(l.bS(null,k,new j.iQ(d,n,m,a),t.m),$async$b6)
case 3:q=d
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$b6,r)},
b7(a,b){return this.hy(a,b)},
hy(a,b){var s=0,r=A.i(t.m),q,p=this,o,n,m,l
var $async$b7=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:o=p.R(a)
n=o
m=b
l=A
s=4
return A.c(o.a.gac(),$async$b7)
case 4:s=3
return A.c(n.bS(null,m,new l.iR(d,a),t.y),$async$b7)
case 3:q={r:d,i:a.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$b7,r)},
av(a,b,c){return this.ex(a,b,c)},
ex(a,b,c){var s=0,r=A.i(t.m),q,p
var $async$av=A.j(function(d,e){if(d===1)return A.e(e,r)
for(;;)switch(s){case 0:s=a.a==null?3:4
break
case 3:p=a
s=5
return A.c(b.$0(),$async$av)
case 5:p.a=e
case 4:q={r:null,i:c.i,t:"simpleSuccessResponse"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$av,r)},
hB(a){},
bw(a){var s=0,r=A.i(t.X),q,p=this
var $async$bw=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:s=3
return A.c(p.bn({r:a,z:null,i:0,d:null,t:"custom"},B.af,t.m),$async$bw)
case 3:q=c.r
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$bw,r)},
da(a){return B.c.e0(this.x,new A.iL(a))},
R(a){var s=a.d
if(s!=null)return this.da(s)
else throw A.b(A.X("Request requires database id",null))},
$ilG:1}
A.iM.prototype={
$0(){var s=0,r=A.i(t.H),q=this,p,o,n
var $async$$0=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:p=q.a.x,o=p.length,n=0
case 2:if(!(n<p.length)){s=4
break}s=5
return A.c(p[n].m(),$async$$0)
case 5:case 3:p.length===o||(0,A.R)(p),++n
s=2
break
case 4:B.c.W(p)
return A.f(null,r)}})
return A.h($async$$0,r)},
$S:4}
A.iP.prototype={
$1$1(a,b){return this.a.bS(this.b,this.c,a,b)},
$1(a){return this.$1$1(a,t.z)},
$S:67}
A.iS.prototype={
$0(){var s=0,r=A.i(t.m),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$$0=A.j(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:j=n.a
i=j.w
h=n.b
s=3
return A.c(i.a2(h.u),$async$$0)
case 3:m=null
l=null
p=5
m=i.hm(h.d,A.nS(h.s),h.c,h.a)
s=8
return A.c(h.o?m.gac():m.ga3(),$async$$0)
case 8:l=A.mi(m,null)
j.x.push(l)
i={r:m.b,i:h.i,t:"simpleSuccessResponse"}
q=i
s=1
break
p=2
s=7
break
case 5:p=4
g=o.pop()
s=m!=null?9:10
break
case 9:B.c.u(j.x,l)
s=11
return A.c(m.b5(),$async$$0)
case 11:case 10:throw g
s=7
break
case 4:s=2
break
case 7:case 1:return A.f(q,r)
case 2:return A.e(o.at(-1),r)}})
return A.h($async$$0,r)},
$S:68}
A.iV.prototype={
$0(){var s,r,q,p,o,n,m=null,l=this.a.a,k=this.b
if(k.c){s=l.b
s=s.a.d.sqlite3_get_autocommit(s.b)!==0}else s=!1
if(s)throw A.b(A.C("Database is not in a transaction"))
s=k.p
r=k.v
r.toString
q=new A.aP(s,r,A.ai(r,0,m))
s=this.c
r=v.G
p=l.b
o=p.a
p=p.b
if(k.r){n=s.eo(l,k.s,q)
n.i=k.i
k=o.d
n.x=k.sqlite3_get_autocommit(p)!==0
n.y=A.a_(r.Number(k.sqlite3_last_insert_rowid(p)))
return n}else{s.hj(l,k.s,q)
s=o.d
return A.mU(s.sqlite3_get_autocommit(p)!==0,m,A.a_(r.Number(s.sqlite3_last_insert_rowid(p))),k.i,m,m,m)}},
$S:15}
A.iO.prototype={
$0(){var s=0,r=A.i(t.w),q,p=this,o
var $async$$0=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:o=p.b
s=3
return A.c(o.a.ga3(),$async$$0)
case 3:q=b.a.c4().gaT().al(new A.iN(p.a,o))
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$0,r)},
$S:24}
A.iN.prototype={
$1(a){var s={d:this.b.b,t:"notifyCommit"}
this.a.a.postMessage(s,A.co(s))},
$S:12}
A.iU.prototype={
$0(){var s=0,r=A.i(t.w),q,p=this,o
var $async$$0=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:o=p.b
s=3
return A.c(o.a.ga3(),$async$$0)
case 3:q=b.a.fs().gaT().al(new A.iT(p.a,o))
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$0,r)},
$S:24}
A.iT.prototype={
$1(a){var s={d:this.b.b,t:"notifyRollback"}
this.a.a.postMessage(s,A.co(s))},
$S:12}
A.iX.prototype={
$0(){var s=0,r=A.i(t.aY),q,p=this,o
var $async$$0=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:o=p.b
s=3
return A.c(o.a.ga3(),$async$$0)
case 3:q=b.a.dJ().gaT().al(new A.iW(p.a,o))
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$0,r)},
$S:71}
A.iW.prototype={
$1(a){var s={k:a.a.a,u:a.b,r:a.c,d:this.b.b,t:"notifyUpdate"}
this.a.a.postMessage(s,A.co(s))},
$S:25}
A.iQ.prototype={
$0(){var s,r,q,p=this,o=p.a.au(new A.d_(A.mA(p.b)),4).a
try{q=p.c
if(q!=null){s=q
o.bk(s.byteLength)
o.aO(A.ai(s,0,null),0)
q={r:null,i:p.d.i,t:"simpleSuccessResponse"}
return q}else{q=o.bj()
r=new Uint8Array(q)
o.bX(r,0)
q={r:t.a.a(J.ns(r)),i:p.d.i,t:"simpleSuccessResponse"}
return q}}finally{o.bV()}},
$S:15}
A.iR.prototype={
$0(){return this.a.bU(A.mA(B.D[this.b.f]),0)===1},
$S:73}
A.iL.prototype={
$1(a){return a.b===this.a},
$S:74}
A.e3.prototype={
gac(){var s=0,r=A.i(t.fL),q,p=this,o
var $async$gac=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:o=p.y
s=3
return A.c(o==null?p.y=A.ea(new A.h9(p),t.H):o,$async$gac)
case 3:o=p.z
o.toString
q=o
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$gac,r)},
ga3(){var s=0,r=A.i(t.u),q,p=this,o
var $async$ga3=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:o=p.x
s=3
return A.c(o==null?p.x=A.ea(new A.h8(p),t.u):o,$async$ga3)
case 3:q=b
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$ga3,r)},
b5(){var s=0,r=A.i(t.H),q=this
var $async$b5=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:s=--q.w===0?2:3
break
case 2:s=4
return A.c(q.m(),$async$b5)
case 4:case 3:return A.f(null,r)}})
return A.h($async$b5,r)},
m(){var s=0,r=A.i(t.H),q=this,p,o,n,m,l,k,j
var $async$m=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:j=q.a.r
j.toString
s=2
return A.c(j,$async$m)
case 2:p=b
o=q.x
s=o!=null?3:4
break
case 3:s=5
return A.c(o,$async$m)
case 5:n=b
j=q.r
if(j!=null)j.hg()
n.a.m()
m=q.z
if(m!=null){j=p.a
l=$.lu()
k=l.a.get(m)
if(k==null)A.y(A.C("vfs has not been registered"))
j.a.d.dart_sqlite3_unregister_vfs(k)}case 4:j=q.Q
j=j==null?null:j.$0()
s=6
return A.c(j instanceof A.k?j:A.cc(j,t.H),$async$m)
case 6:q.f.ec()
return A.f(null,r)}})
return A.h($async$m,r)},
dq(a,b){var s,r,q,p,o=this.r,n=o==null
if(n)s=null
else{r=o.b
q=r.u(0,b)
if(q!=null)r.q(0,b,q)
s=q}if(s!=null)return new A.V(s,!0)
p=a.e9(b,!0)
if(!n){n=p.a
n=n.c.d.sqlite3_stmt_isexplain(n.b)===0}else n=!1
if(n){n=o.b
if(n.a===o.a)n.u(0,new A.aD(n,A.A(n).h("aD<1>")).gaa(0)).m()
n.q(0,p.d,p)
return new A.V(p,!0)}return new A.V(p,!1)},
hj(a,b,c){var s,r,q
if(c.gj(0)===0)return a.hi(b,B.ac)
else{s=null
r=null
q=this.dq(a,b)
s=q.a
r=q.b
try{s.hk(new A.cB(c.gdO()))}finally{if(r)s.bf()
else s.m()}}},
eo(a,b,c){var s,r=null,q=null,p=this.dq(a,b)
r=p.a
q=p.b
try{s=A.on(r,c)
return s}finally{if(q)r.bf()
else r.m()}}}
A.h9.prototype={
$0(){var s=0,r=A.i(t.H),q=this,p,o,n,m,l,k
var $async$$0=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:l=q.a
k=l.d
case 2:switch(k.a){case 0:s=4
break
case 1:s=5
break
case 2:s=6
break
case 3:s=7
break
case 4:s=8
break
default:s=3
break}break
case 4:s=9
return A.c(A.hR("drift_db/"+l.c,"vfs-web-"+l.b),$async$$0)
case 9:p=b
l.z=p
l.Q=p.gbu()
s=3
break
case 5:case 6:s=10
return A.c(A.e9("drift_db/"+l.c,k===B.l,"vfs-web-"+l.b),$async$$0)
case 10:o=b
l.f.e=o
n=o.a
l.z=n
l.Q=n.gbu()
s=3
break
case 7:s=11
return A.c(A.ed(l.c,"vfs-web-"+l.b,!1),$async$$0)
case 11:m=b
l.z=m
l.Q=m.gbu()
s=3
break
case 8:l.z=A.kU("vfs-web-"+l.b,null)
s=3
break
case 3:return A.f(null,r)}})
return A.h($async$$0,r)},
$S:4}
A.h8.prototype={
$0(){var s=0,r=A.i(t.u),q,p=this,o,n,m,l,k
var $async$$0=A.j(function(a,b){if(a===1)return A.e(b,r)
for(;;)switch(s){case 0:l=p.a
k=l.a.r
k.toString
s=3
return A.c(k,$async$$0)
case 3:o=b
s=4
return A.c(l.gac(),$async$$0)
case 4:n=b
o.e4()
k=o.a
k=k.a
m=k.d.dart_sqlite3_register_vfs(k.b4(B.e.aj(n.a),1),n,0)
if(m===0)A.y(A.C("could not register vfs"))
k=$.lu()
k.a.set(n,m)
s=5
return A.c(l.f.cE(new A.h7(l,o),null,t.u),$async$$0)
case 5:q=b
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$0,r)},
$S:26}
A.h7.prototype={
$0(){var s=this.a
return s.a.b.cF(this.b,"/database","vfs-web-"+s.b,s.e)},
$S:26}
A.iv.prototype={
gdl(){var s,r=this,q=r.Q
if(q===$){s=r.a.b.es()
r.Q!==$&&A.qU()
r.Q=s
q=s}return q},
aK(){var s=0,r=A.i(t.H),q=1,p=[],o=[],n=this,m,l,k,j,i,h
var $async$aK=A.j(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:h=new A.bw(A.dO(A.pu(n.a),"stream",t.K))
q=2
j=v.G
case 5:s=7
return A.c(h.k(),$async$aK)
case 7:if(!b){s=6
break}m=h.gl()
s=J.M(m.t,"connect")?8:10
break
case 8:i=m.r
l=new A.cy(i.port,i.lockName,null)
n.cZ(l)
s=9
break
case 10:s=A.qJ(m.t)?11:12
break
case 11:s=13
return A.c(n.dR(m),$async$aK)
case 13:k=b
j.postMessage(k.gee())
case 12:case 9:s=5
break
case 6:o.push(4)
s=3
break
case 2:o=[1]
case 3:q=1
s=14
return A.c(h.p(),$async$aK)
case 14:s=o.pop()
break
case 4:return A.f(null,r)
case 1:return A.e(p.at(-1),r)}})
return A.h($async$aK,r)},
cZ(a){var s=this,r=A.oL(a,s.d++,s)
s.c.push(r)
r.b.a.K(new A.iw(s,r))
return r},
dR(a){return this.x.cL(new A.ix(this,a),t.d)},
a2(a){return this.hO(a)},
hO(a){var s=0,r=A.i(t.H),q=this,p,o,n,m
var $async$a2=A.j(function(b,c){if(b===1)return A.e(c,r)
for(;;)switch(s){case 0:n=v.G
m=new n.URL(a,A.a0(n.location).href).href
n=q.r
s=n!=null?2:4
break
case 2:p=q.w
if(p!==m)throw A.b(A.C("Workers only support a single sqlite3 wasm module, provided different URI (has "+A.w(p)+", got "+m+")"))
s=5
return A.c(t.bU.b(n)?n:A.cc(n,t.ex),$async$a2)
case 5:s=3
break
case 4:o=A.kT(q.b.a2(m),new A.iy(q),t.n,t.K)
q.r=o
s=6
return A.c(o,$async$a2)
case 6:q.w=m
case 3:return A.f(null,r)}})
return A.h($async$a2,r)},
hm(a,b,c,d){var s,r,q,p,o,n
for(s=this.e,r=new A.bN(s,s.r,s.e);r.k();){q=r.d
p=q.w
if(p!==0&&q.c===a&&q.d===b){q.w=p+1
return q}}r=this.f++
q="pkg-sqlite3-web-"+a
p=b===B.l||b===B.z
o=A.kY(t.L)
n=c===0?null:new A.hG(c,A.o8(t.N,t.eT))
n=new A.e3(this,r,a,b,d,new A.e2(q+"-outer",q,new A.cP(o),p),n)
s.q(0,r,n)
return n}}
A.iw.prototype={
$0(){var s=this.a,r=s.c
B.c.u(r,this.b)
if(r.length===0)s.a.m()
return null},
$S:0}
A.ix.prototype={
$0(){var s=0,r=A.i(t.d),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$$0=A.j(function(a0,a1){if(a0===1)return A.e(a1,r)
for(;;)switch(s){case 0:d=p.b
c=d.d
s=J.M(d.t,"dedicatedCompatibilityCheck")||J.M(d.t,"dedicatedInSharedCompatibilityCheck")?3:5
break
case 3:s=6
return A.c(A.b3(),$async$$0)
case 6:o=a1
n=o.a
m=o.b
l=m
k=n
s=4
break
case 5:k=!1
l=!1
case 4:b=J.M(d.t,"dedicatedCompatibilityCheck")||J.M(d.t,"sharedCompatibilityCheck")
if(b){s=7
break}else a1=b
s=8
break
case 7:s=9
return A.c(A.fd(),$async$$0)
case 9:case 8:j=a1
i=A.cL(t.ab)
s=J.M(d.t,"sharedCompatibilityCheck")?10:12
break
case 10:h=p.a.gdl()
g=h!=null
s=g?13:14
break
case 13:d={d:c,i:0,t:"dedicatedInSharedCompatibilityCheck"}
f=A.co(d)
n=h.a
n.postMessage(d,f)
b=A
a=A
s=15
return A.c(new A.ca(n,"message",!1,t.Y).gaa(0),$async$$0)
case 15:e=b.nG(a.a0(a1.data))
k=e.c
l=e.d
i.a8(0,e.a)
case 14:s=11
break
case 12:g=!1
case 11:s=k?16:17
break
case 16:b=J
s=18
return A.c(A.cr(),$async$$0)
case 18:d=b.an(a1)
case 19:if(!d.k()){s=20
break}i.G(0,new A.V(B.G,d.gl()))
s=19
break
case 20:case 17:s=j&&c!=null?21:22
break
case 21:s=23
return A.c(A.kt(c),$async$$0)
case 23:if(a1)i.G(0,new A.V(B.H,c))
case 22:d=A.cN(i,i.$ti.c)
q=new A.bc(d,g,k,l,j)
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$$0,r)},
$S:76}
A.iy.prototype={
$2(a,b){this.a.r=null
throw A.b(a)},
$S:77}
A.dH.prototype={}
A.eM.prototype={
ge3(){return new A.ca(this.a,"message",!1,t.Y)},
m(){return this.a.close()}}
A.f1.prototype={
ge3(){return new A.aK(new A.jR(this),t.c3)},
m(){}}
A.jR.prototype={
$1(a){var s=A.u([],t.W),r=A.u([],t.db)
r.push(A.a3(this.a.a,"connect",new A.jO(new A.jS(s,r,a)),!1,t.m))
a.r=new A.jP(r)},
$S:78}
A.jS.prototype={
$1(a){this.a.push(a)
a.start()
this.b.push(A.a3(a,"message",new A.jQ(this.c),!1,t.m))},
$S:1}
A.jQ.prototype={
$1(a){this.a.fJ(a)},
$S:1}
A.jO.prototype={
$1(a){var s,r=a.ports
r=J.an(t.q.b(r)?r:new A.aA(r,A.ay(r).h("aA<1,m>")))
s=this.a
while(r.k())s.$1(r.gl())},
$S:1}
A.jP.prototype={
$0(){var s,r,q
for(s=this.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q)s[q].p()},
$S:2}
A.eN.prototype={
es(){var s=v.G
if(!("Worker" in s))return null
return new A.j7(new s.Worker(this.a,{name:"sqlite3_worker"}))}}
A.j7.prototype={}
A.i8.prototype={
$1(a){this.a.G(0,a.b)},
$S:25}
A.i5.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.a,r=s.length,q=this.b,p=t.N,o=0;o<s.length;s.length===r||(0,A.R)(s),++o){n=s[o]
n.b.a8(0,q)
m=n.a
l=m.b
k=(l&1)!==0
if(!(k?(m.gS().e&4)!==0:(l&2)===0)){j=n.b
if(j.a!==0){if(l>=4)A.y(m.af())
if(k)m.ag(j)
else if((l&3)===0){m=m.aY()
j=new A.b0(j)
i=m.c
if(i==null)m.b=m.c=j
else{i.sam(j)
m.c=j}}n.b=A.cL(p)}}}q.W(0)},
$S:0}
A.i6.prototype={
$0(){this.a.W(0)},
$S:0}
A.i2.prototype={
$1(a){var s,r,q=this,p=q.b
p.push(a)
if(p.length===1){p=q.c
s=p.dJ()
r=s.w
s=r==null?s.w=s.di(!0):r
q.a.a=A.u([s.al(q.d),p.c4().gaT().al(new A.i3(q.e)),p.c4().gaT().al(new A.i4(q.f))],t.x)}},
$S:16}
A.i3.prototype={
$1(a){return this.a.$0()},
$S:12}
A.i4.prototype={
$1(a){return this.a.$0()},
$S:12}
A.i9.prototype={
$1(a){var s,r,q=this.b
B.c.u(q,a)
if(q.length===0)for(q=this.a.a,s=q.length,r=0;r<q.length;q.length===s||(0,A.R)(q),++r)q[r].p()},
$S:16}
A.i7.prototype={
$1(a){var s=new A.bx(a,A.cL(t.N))
this.a.$1(s)
a.f=s.gfH()
a.r=new A.i1(this.b,s)},
$S:80}
A.i1.prototype={
$0(){return this.a.$1(this.b)},
$S:0}
A.bx.prototype={
fI(){var s=this.b
if(s.a!==0){this.a.G(0,s)
this.b=A.cL(t.N)}}}
A.aO.prototype={
Z(){return"CustomDatabaseMessageKind."+this.b}}
A.fk.prototype={
cF(a,b,c,d){return this.hY(a,b,c,d)},
hY(a,b,c,d){var s=0,r=A.i(t.u),q,p
var $async$cF=A.j(function(e,f){if(e===1)return A.e(f,r)
for(;;)switch(s){case 0:p=a.hW(b,c)
q=new A.dT(p,A.os(p),A.aE(t.fg,t.bD))
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$cF,r)},
aJ(a,b){throw A.b(A.l4(null))}}
A.dT.prototype={
fn(a,b){if(!a.a){a.a=!0
b.b.a.bi(new A.fl(a),t.P)}},
aJ(a,b){return this.hu(a,b)},
hu(a,b){var s=0,r=A.i(t.X),q,p=this,o,n,m,l,k
var $async$aJ=A.j(function(c,d){if(c===1)return A.e(d,r)
for(;;)switch(s){case 0:k=A.a0(b.a)
case 3:switch(A.lJ(B.aa,k.rawKind).a){case 0:s=5
break
case 4:s=6
break
case 1:s=7
break
case 2:s=8
break
case 3:s=9
break
default:s=4
break}break
case 5:case 6:throw A.b(A.aY("This is a response, not a request"))
case 7:o=p.a.b
q=o.a.d.sqlite3_get_autocommit(o.b)!==0
s=1
break
case 8:s=10
return A.c(b.c.$1$1(new A.fm(p,k),t.P),$async$aJ)
case 10:s=4
break
case 9:o=k.rawParameters
n=A.by(o[0])
o=k.rawSql
m=p.c.ea(a,A.qW())
if(n){m.cK()
p.fn(m,a)
l=A.oK()
l.b=m.b=p.b.al(new A.fn(l,a,o))}else m.cK()
s=4
break
case 4:q={rawKind:"ok"}
s=1
break
case 1:return A.f(q,r)}})
return A.h($async$aJ,r)}}
A.fl.prototype={
$1(a){this.a.cK()},
$S:81}
A.fm.prototype={
$0(){var s,r,q,p,o,n,m,l=null,k=this.b
if(k.requireTransaction){q=this.a.a.b
q=q.a.d.sqlite3_get_autocommit(q.b)!==0}else q=!1
if(q)throw A.b(A.m4(A.o5(A.kz(k,"rawSql")),l,0,"Transaction rolled back by earlier statement. Cannot execute",l,l,l))
s=this.a.a.i_(k.rawSql)
try{k=k.parameters
k=J.an(t.q.b(k)?k:new A.aA(k,A.ay(k).h("aA<1,m>")))
while(k.k()){r=k.gl()
q=s
p=r
o=p.parameters
p=p.parameterTypes
p.toString
n=new Uint8Array(p,0)
if(q.r||q.b.r)A.y(A.C(u.n))
if(!q.f){m=q.a
m.c.d.sqlite3_reset(m.b)
q.f=!0}q.d1(new A.cB(new A.aP(o,p,n).gdO()))
q.dg()}}finally{s.m()}},
$S:2}
A.fn.prototype={
$1(a){var s,r=this.a,q=r.b
if(q===r)A.y(new A.be("Local '"+r.a+"' has not been initialized."))
r=A.cN(a,a.$ti.c)
s=A.m8(r)
q.bQ(this.b.bw({rawKind:"notifyUpdates",rawSql:this.c,rawParameters:s.a,typeInfo:s.b}))},
$S:82}
A.c6.prototype={
cK(){var s=this.b
if(s!=null){this.b=null
s.p()}}}
A.bY.prototype={
gj(a){return this.b},
n(a,b){if(b>=this.b)throw A.b(A.lO(b,this))
return this.a[b]},
q(a,b,c){var s
if(b>=this.b)throw A.b(A.lO(b,this))
s=this.a
s.$flags&2&&A.r(s)
s[b]=c},
sj(a,b){var s,r,q,p,o=this,n=o.b
if(b<n)for(s=o.a,r=s.$flags|0,q=b;q<n;++q){r&2&&A.r(s)
s[q]=0}else{n=o.a.length
if(b>n){if(n===0)p=new Uint8Array(b)
else p=o.eQ(b)
B.d.Y(p,0,o.b,o.a)
o.a=p}}o.b=b},
eQ(a){var s=this.a.length*2
if(a!=null&&s<a)s=a
else if(s<8)s=8
return new Uint8Array(s)},
F(a,b,c,d,e){var s=this.b
if(c>s)throw A.b(A.ac(c,0,s,null,null))
B.d.F(this.a,b,c,d,e)},
Y(a,b,c,d){return this.F(0,b,c,d,0)}}
A.eU.prototype={}
A.av.prototype={}
A.kR.prototype={}
A.ca.prototype={
J(a,b,c,d){return A.a3(this.a,this.b,a,!1,this.$ti.c)},
bb(a,b,c){return this.J(a,null,b,c)}}
A.dh.prototype={
p(){var s=this,r=A.hk(null,t.H)
if(s.b==null)return r
s.cp()
s.d=s.b=null
return r},
e7(a){var s,r=this
if(r.b==null)throw A.b(A.C("Subscription has been canceled."))
r.cp()
s=A.mL(new A.jb(a),t.m)
s=s==null?null:A.az(s)
r.d=s
r.cn()},
bQ(a){if(this.b==null)return;++this.a
this.cp()},
bP(){return this.bQ(null)},
aN(){var s=this
if(s.b==null||s.a<=0)return;--s.a
s.cn()},
cn(){var s=this,r=s.d
if(r!=null&&s.a<=0)s.b.addEventListener(s.c,r,!1)},
cp(){var s=this.d
if(s!=null)this.b.removeEventListener(this.c,s,!1)},
$iak:1}
A.ja.prototype={
$1(a){return this.a.$1(a)},
$S:1}
A.jb.prototype={
$1(a){return this.a.$1(a)},
$S:1};(function aliases(){var s=J.aT.prototype
s.ey=s.i
s=A.ad.prototype
s.ez=s.aA
s.eA=s.aU
s=A.v.prototype
s.cW=s.F})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers.installStaticTearOff,o=hunkHelpers._instance_2u,n=hunkHelpers.installInstanceTearOff,m=hunkHelpers._instance_0u,l=hunkHelpers._instance_1u
s(J,"pC","o2",83)
r(A,"qc","oA",5)
r(A,"qd","oB",5)
r(A,"qe","oC",5)
r(A,"qf","pQ",84)
q(A,"mO","q6",0)
r(A,"qg","pR",8)
s(A,"qi","pT",9)
q(A,"qh","pS",0)
p(A,"ql",5,null,["$5"],["q0"],85,0)
p(A,"qq",4,null,["$1$4","$4"],["kp",function(a,b,c,d){return A.kp(a,b,c,d,t.z)}],86,0)
p(A,"qs",5,null,["$2$5","$5"],["kq",function(a,b,c,d,e){var j=t.z
return A.kq(a,b,c,d,e,j,j)}],87,0)
p(A,"qr",6,null,["$3$6"],["lk"],88,0)
p(A,"qo",4,null,["$1$4","$4"],["mH",function(a,b,c,d){return A.mH(a,b,c,d,t.z)}],89,0)
p(A,"qp",4,null,["$2$4","$4"],["mI",function(a,b,c,d){var j=t.z
return A.mI(a,b,c,d,j,j)}],90,0)
p(A,"qn",4,null,["$3$4","$4"],["mG",function(a,b,c,d){var j=t.z
return A.mG(a,b,c,d,j,j,j)}],91,0)
p(A,"qj",5,null,["$5"],["q_"],92,0)
p(A,"qt",4,null,["$4"],["kr"],93,0)
p(A,"rB",5,null,["$5"],["pZ"],94,0)
p(A,"rA",5,null,["$5"],["pY"],95,0)
p(A,"qm",4,null,["$4"],["q1"],96,0)
p(A,"qk",5,null,["$5"],["mF"],97,0)
o(A.k.prototype,"gd7","eM",9)
n(A.bv.prototype,"gfF",0,1,null,["$2","$1"],["dL","fG"],34,0,0)
var k
m(k=A.c8.prototype,"gcg","aE",0)
m(k,"gci","aF",0)
m(k=A.ad.prototype,"gi0","aN",0)
m(k,"gcg","aE",0)
m(k,"gci","aF",0)
l(k=A.bw.prototype,"gfb","fc",18)
o(k,"gff","fg",9)
m(k,"gfd","fe",0)
m(k=A.cb.prototype,"gcg","aE",0)
m(k,"gci","aF",0)
l(k,"geZ","f_",18)
o(k,"gf3","f4",49)
m(k,"gf1","f2",0)
l(k=A.e1.prototype,"ghR","hS",3)
o(k,"ghP","hQ",29)
n(k,"giv",0,5,null,["$5"],["iw"],30,0,0)
n(k,"gij",0,3,null,["$3"],["ik"],31,0,0)
n(k,"gi9",0,4,null,["$4"],["ia"],20,0,0)
n(k,"gir",0,4,null,["$4"],["is"],20,0,0)
n(k,"gix",0,3,null,["$3"],["iy"],27,0,0)
o(k,"giC","iD",21)
o(k,"gih","ii",21)
l(k,"gie","ig",13)
n(k,"giz",0,4,null,["$4"],["iA"],22,0,0)
n(k,"giK",0,4,null,["$4"],["iL"],22,0,0)
o(k,"giG","iH",37)
o(k,"giE","iF",6)
o(k,"gip","iq",6)
o(k,"git","iu",6)
o(k,"giI","iJ",6)
o(k,"gib","ic",6)
l(k,"gbW","il",13)
n(k,"gim",0,3,null,["$3"],["io"],39,0,0)
l(k,"gbY","iB",13)
l(k,"gh2","h3",5)
l(k,"gfY","fZ",40)
n(k,"gh0",0,5,null,["$5"],["h1"],41,0,0)
n(k,"gh8",0,4,null,["$4"],["h9"],14,0,0)
n(k,"ghc",0,4,null,["$4"],["hd"],14,0,0)
n(k,"gha",0,4,null,["$4"],["hb"],14,0,0)
o(k,"ghe","hf",23)
o(k,"gh6","h7",23)
n(k,"gh4",0,5,null,["$5"],["h5"],44,0,0)
o(k,"gfW","fX",45)
o(k,"gfU","fV",46)
n(k,"gfS",0,3,null,["$3"],["fT"],47,0,0)
m(k=A.aR.prototype,"gbu","m",4)
m(k,"gho","e1",4)
m(A.bV.prototype,"gbu","m",0)
m(A.e2.prototype,"gf6","f7",0)
l(A.aP.prototype,"gdO","dP",98)
l(A.c3.prototype,"ghA","hB",1)
m(A.bx.prototype,"gfH","fI",0)
q(A,"qW","oM",65)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.d,null)
q(A.d,[A.kW,J.ef,A.cZ,J.dQ,A.p,A.dW,A.E,A.ba,A.hP,A.bO,A.en,A.d9,A.eE,A.e6,A.cG,A.dv,A.cz,A.eV,A.ia,A.hE,A.cE,A.dz,A.cO,A.hw,A.em,A.bN,A.el,A.ht,A.jF,A.eK,A.f7,A.ao,A.eR,A.k_,A.f6,A.db,A.f4,A.H,A.dk,A.c4,A.ax,A.k,A.eH,A.N,A.bv,A.f5,A.eI,A.ad,A.eO,A.j8,A.du,A.bw,A.kd,A.kf,A.ke,A.kb,A.kc,A.ka,A.k7,A.fa,A.k6,A.k5,A.k9,A.k8,A.f9,A.kg,A.f8,A.cj,A.da,A.bU,A.jE,A.cd,A.eW,A.Y,A.v,A.eX,A.dY,A.e_,A.k3,A.ch,A.Z,A.eQ,A.e4,A.aB,A.j9,A.ew,A.d1,A.jc,A.he,A.ee,A.a7,A.z,A.f3,A.d2,A.e7,A.hD,A.jB,A.jC,A.ap,A.bW,A.fU,A.b1,A.hT,A.bb,A.T,A.dU,A.hr,A.cB,A.aZ,A.d_,A.iq,A.ik,A.is,A.ir,A.bn,A.bo,A.e1,A.br,A.il,A.fo,A.dl,A.jd,A.eY,A.eT,A.jH,A.ie,A.cy,A.hO,A.dX,A.fT,A.e0,A.bp,A.e8,A.hn,A.aC,A.e2,A.cP,A.bc,A.hG,A.cX,A.dB,A.c5,A.e3,A.iv,A.dH,A.eN,A.j7,A.bx,A.c6,A.kR,A.dh])
q(J.ef,[J.ei,J.cJ,J.I,J.a4,J.bM,J.bL,J.aS])
q(J.I,[J.aT,J.q,A.bQ,A.cS])
q(J.aT,[J.ex,J.bm,J.a9])
r(J.eh,A.cZ)
r(J.hu,J.q)
q(J.bL,[J.cI,J.ej])
q(A.p,[A.b_,A.n,A.bg,A.d8,A.aH,A.dm,A.cf,A.bf])
q(A.b_,[A.b9,A.dI])
r(A.dg,A.b9)
r(A.dd,A.dI)
r(A.aA,A.dd)
q(A.E,[A.be,A.aI,A.ek,A.eG,A.eB,A.eP,A.cV,A.dR,A.ah,A.d5,A.eF,A.au,A.dZ])
q(A.ba,[A.fs,A.ft,A.i0,A.kA,A.kC,A.iB,A.iA,A.kh,A.hl,A.hg,A.jh,A.jg,A.js,A.hY,A.hX,A.j6,A.jN,A.hy,A.iH,A.hh,A.kH,A.kI,A.hU,A.h1,A.jV,A.kG,A.kJ,A.kK,A.fj,A.j2,A.j3,A.fw,A.fx,A.fB,A.fC,A.fD,A.hd,A.fr,A.fp,A.jv,A.jy,A.jz,A.hq,A.ho,A.ju,A.hS,A.ig,A.ih,A.ii,A.ij,A.hL,A.hM,A.hK,A.hJ,A.hI,A.it,A.h4,A.hA,A.hb,A.ku,A.fu,A.fv,A.fy,A.fz,A.fA,A.kk,A.iP,A.iN,A.iT,A.iW,A.iL,A.jR,A.jS,A.jQ,A.jO,A.i8,A.i2,A.i3,A.i4,A.i9,A.i7,A.fl,A.fn,A.ja,A.jb])
q(A.fs,[A.kF,A.iC,A.iD,A.jZ,A.jY,A.jj,A.jo,A.jn,A.jl,A.jk,A.jr,A.jq,A.jp,A.hZ,A.hW,A.jU,A.jT,A.iJ,A.iI,A.jI,A.jG,A.kj,A.j5,A.j4,A.jM,A.jL,A.ko,A.k2,A.k1,A.h2,A.h3,A.h_,A.fZ,A.h0,A.fW,A.fV,A.fX,A.fY,A.jW,A.jX,A.kL,A.fI,A.fF,A.fK,A.fM,A.fO,A.fH,A.fN,A.fS,A.fQ,A.fP,A.fJ,A.fL,A.fR,A.fG,A.fh,A.fi,A.im,A.fq,A.jw,A.jx,A.je,A.hp,A.h5,A.h6,A.hC,A.hB,A.iY,A.j1,A.iZ,A.j0,A.iM,A.iS,A.iV,A.iO,A.iU,A.iX,A.iQ,A.iR,A.h9,A.h8,A.h7,A.iw,A.ix,A.jP,A.i5,A.i6,A.i1,A.fm])
q(A.n,[A.a6,A.cD,A.aD,A.cK])
q(A.a6,[A.d3,A.aF,A.cY,A.cM])
r(A.cC,A.bg)
r(A.bJ,A.aH)
r(A.eZ,A.dv)
q(A.eZ,[A.V,A.dw,A.dx,A.ce,A.f_])
r(A.cA,A.cz)
r(A.cU,A.aI)
q(A.i0,[A.hV,A.cw])
r(A.bd,A.cO)
q(A.ft,[A.hv,A.kB,A.ki,A.ks,A.hm,A.hf,A.ji,A.jt,A.hz,A.iG,A.hj,A.hi,A.jA,A.iu,A.j_,A.iy])
r(A.bP,A.bQ)
q(A.cS,[A.cQ,A.bR])
q(A.bR,[A.dq,A.ds])
r(A.dr,A.dq)
r(A.cR,A.dr)
r(A.dt,A.ds)
r(A.ab,A.dt)
q(A.cR,[A.ep,A.eq])
q(A.ab,[A.er,A.es,A.et,A.eu,A.ev,A.cT,A.bi])
r(A.dC,A.eP)
q(A.c4,[A.aw,A.F])
q(A.bv,[A.c2,A.cg])
q(A.N,[A.dA,A.aK,A.di,A.cv,A.ca])
r(A.c7,A.dA)
q(A.ad,[A.c8,A.cb])
q(A.eO,[A.b0,A.de])
r(A.dp,A.c2)
r(A.bt,A.di)
q(A.f8,[A.eL,A.f0])
r(A.dy,A.bU)
r(A.dn,A.dy)
r(A.ha,A.dY)
r(A.ic,A.ha)
r(A.id,A.e_)
q(A.ah,[A.bS,A.cH])
q(A.j9,[A.d0,A.hF,A.bK,A.eo,A.aQ,A.aq,A.cF,A.aW,A.aO])
r(A.bX,A.bb)
r(A.dV,A.T)
q(A.dV,[A.eb,A.aR,A.bV])
q(A.dU,[A.eS,A.f2])
q(A.Y,[A.bq,A.U])
q(A.v,[A.c0,A.aP,A.bY])
r(A.c_,A.hT)
q(A.U,[A.dj,A.df,A.c9,A.ci])
r(A.hH,A.hO)
r(A.fE,A.e0)
r(A.b6,A.cX)
r(A.c3,A.hH)
q(A.dH,[A.eM,A.f1])
r(A.fk,A.fT)
r(A.dT,A.bp)
r(A.eU,A.bY)
r(A.av,A.eU)
s(A.dI,A.v)
s(A.dq,A.v)
s(A.dr,A.cG)
s(A.ds,A.v)
s(A.dt,A.cG)
s(A.c2,A.eI)
s(A.cg,A.f5)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",K:"double",mV:"num",B:"String",Q:"bool",z:"Null",t:"List",d:"Object",aU:"Map",m:"JSObject"},mangledNames:{},types:["~()","~(m)","z()","~(a)","x<~>()","~(~())","a(a2,a)","z(m)","~(@)","~(d,J)","z(d,J)","x<~>(dl)","~(~)","a(a2)","~(eA,a,a,a)","m()","~(bx)","z(@)","~(d?)","@()","a(T,a,a,a)","a(T,a)","a(a2,a,a,a4)","~(eA,a)","x<ak<~>>()","~(ap)","x<bp>()","a(T?,a,a)","~(o,G,o,~())","~(a4,a)","a2?(T,a,a,a,a)","a(T,a,a)","@(@,B)","@(B)","~(d[J?])","@(@)","z(@,J)","a(a2,a4)","~(d?,d?)","a(a2,a,a)","a(a())","~(~(a,B,a),a,a,a,a4)","~(a,@)","a(a,a)","a(eA,a,a,a,a)","a(a(a),a)","a(l1,a)","a(l1,a,a)","a(a)","~(@,J)","m(q<d?>)","z(a9,a9)","x<z>()","d?(~)","m(m?)","~(b8)","x<~>(a,bl)","x<~>(a)","bl()","x<m>(B)","z(aC)","x<z>(m)","m(d)","z(d?,J)","B?(d?)","c6()","m(m)","x<0^>(0^())<d?>","x<m>()","B(d?)","~(a,B,a)","x<ak<ap>>()","a()","Q()","Q(c5)","Q(B)","x<bc>()","0&(d?,J)","~(bh<m>)","z(~())","~(bh<aV<B>>)","z(~)","~(aV<B>)","a(@,@)","Q(d?)","~(o?,G?,o,d,J)","0^(o?,G?,o,0^())<d?>","0^(o?,G?,o,0^(1^),1^)<d?,d?>","0^(o?,G?,o,0^(1^,2^),1^,2^)<d?,d?,d?>","0^()(o,G,o,0^())<d?>","0^(1^)(o,G,o,0^(1^))<d?,d?>","0^(1^,2^)(o,G,o,0^(1^,2^))<d?,d?,d?>","H?(o,G,o,d,J?)","~(o?,G?,o,~())","d4(o,G,o,aB,~())","d4(o,G,o,aB,~(d4))","~(o,G,o,B)","o(o?,G?,o,da?,aU<d?,d?>?)","~(bb)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.V&&a.b(c.a)&&b.b(c.b),"2;basicSupport,supportsReadWriteUnsafe":(a,b)=>c=>c instanceof A.dw&&a.b(c.a)&&b.b(c.b),"2;controller,sync":(a,b)=>c=>c instanceof A.dx&&a.b(c.a)&&b.b(c.b),"2;file,outFlags":(a,b)=>c=>c instanceof A.ce&&a.b(c.a)&&b.b(c.b),"2;result,resultCode":(a,b)=>c=>c instanceof A.f_&&a.b(c.a)&&b.b(c.b)}}
A.p6(v.typeUniverse,JSON.parse('{"a9":"aT","ex":"aT","bm":"aT","r5":"bQ","q":{"t":["1"],"I":[],"n":["1"],"m":[]},"ei":{"Q":[],"D":[]},"cJ":{"z":[],"D":[]},"I":{"m":[]},"aT":{"I":[],"m":[]},"eh":{"cZ":[]},"hu":{"q":["1"],"t":["1"],"I":[],"n":["1"],"m":[]},"bL":{"K":[]},"cI":{"K":[],"a":[],"D":[]},"ej":{"K":[],"D":[]},"aS":{"B":[],"D":[]},"b_":{"p":["2"]},"b9":{"b_":["1","2"],"p":["2"],"p.E":"2"},"dg":{"b9":["1","2"],"b_":["1","2"],"n":["2"],"p":["2"],"p.E":"2"},"dd":{"v":["2"],"t":["2"],"b_":["1","2"],"n":["2"],"p":["2"]},"aA":{"dd":["1","2"],"v":["2"],"t":["2"],"b_":["1","2"],"n":["2"],"p":["2"],"v.E":"2","p.E":"2"},"be":{"E":[]},"n":{"p":["1"]},"a6":{"n":["1"],"p":["1"]},"d3":{"a6":["1"],"n":["1"],"p":["1"],"a6.E":"1","p.E":"1"},"bg":{"p":["2"],"p.E":"2"},"cC":{"bg":["1","2"],"n":["2"],"p":["2"],"p.E":"2"},"aF":{"a6":["2"],"n":["2"],"p":["2"],"a6.E":"2","p.E":"2"},"d8":{"p":["1"],"p.E":"1"},"aH":{"p":["1"],"p.E":"1"},"bJ":{"aH":["1"],"n":["1"],"p":["1"],"p.E":"1"},"cD":{"n":["1"],"p":["1"],"p.E":"1"},"cY":{"a6":["1"],"n":["1"],"p":["1"],"a6.E":"1","p.E":"1"},"cz":{"aU":["1","2"]},"cA":{"cz":["1","2"],"aU":["1","2"]},"dm":{"p":["1"],"p.E":"1"},"cU":{"aI":[],"E":[]},"ek":{"E":[]},"eG":{"E":[]},"dz":{"J":[]},"eB":{"E":[]},"bd":{"cO":["1","2"],"aU":["1","2"]},"aD":{"n":["1"],"p":["1"],"p.E":"1"},"cK":{"n":["a7<1,2>"],"p":["a7<1,2>"],"p.E":"a7<1,2>"},"bP":{"I":[],"m":[],"b8":[],"D":[]},"bQ":{"I":[],"m":[],"b8":[],"D":[]},"cS":{"I":[],"m":[]},"f7":{"b8":[]},"cQ":{"I":[],"m":[],"D":[]},"bR":{"aa":["1"],"I":[],"m":[]},"cR":{"v":["K"],"t":["K"],"aa":["K"],"I":[],"n":["K"],"m":[]},"ab":{"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[]},"ep":{"v":["K"],"t":["K"],"aa":["K"],"I":[],"n":["K"],"m":[],"D":[],"v.E":"K"},"eq":{"v":["K"],"t":["K"],"aa":["K"],"I":[],"n":["K"],"m":[],"D":[],"v.E":"K"},"er":{"ab":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"es":{"ab":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"et":{"ab":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"eu":{"ab":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"ev":{"ab":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"cT":{"ab":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"bi":{"ab":[],"bl":[],"v":["a"],"t":["a"],"aa":["a"],"I":[],"n":["a"],"m":[],"D":[],"v.E":"a"},"eP":{"E":[]},"dC":{"aI":[],"E":[]},"H":{"E":[]},"db":{"cx":["1"]},"cf":{"p":["1"],"p.E":"1"},"cV":{"E":[]},"c4":{"cx":["1"]},"aw":{"c4":["1"],"cx":["1"]},"F":{"c4":["1"],"cx":["1"]},"k":{"x":["1"]},"c2":{"bv":["1"]},"cg":{"bv":["1"]},"c7":{"dA":["1"],"N":["1"],"N.T":"1"},"c8":{"ad":["1"],"ak":["1"],"ad.T":"1"},"ad":{"ak":["1"],"ad.T":"1"},"dA":{"N":["1"]},"aK":{"N":["1"],"N.T":"1"},"dp":{"c2":["1"],"bv":["1"],"bh":["1"]},"di":{"N":["2"]},"cb":{"ad":["2"],"ak":["2"],"ad.T":"2"},"bt":{"di":["1","2"],"N":["2"],"N.T":"2"},"f8":{"o":[]},"eL":{"o":[]},"f0":{"o":[]},"cj":{"G":[]},"dn":{"bU":["1"],"aV":["1"],"n":["1"]},"bf":{"p":["1"],"p.E":"1"},"v":{"t":["1"],"n":["1"]},"cO":{"aU":["1","2"]},"cM":{"a6":["1"],"n":["1"],"p":["1"],"a6.E":"1","p.E":"1"},"bU":{"aV":["1"],"n":["1"]},"dy":{"bU":["1"],"aV":["1"],"n":["1"]},"t":{"n":["1"]},"aV":{"n":["1"]},"dR":{"E":[]},"aI":{"E":[]},"ah":{"E":[]},"bS":{"E":[]},"cH":{"E":[]},"d5":{"E":[]},"eF":{"E":[]},"au":{"E":[]},"dZ":{"E":[]},"ew":{"E":[]},"d1":{"E":[]},"ee":{"E":[]},"f3":{"J":[]},"bX":{"bb":[]},"eb":{"T":[]},"eS":{"d6":[],"a2":[]},"dV":{"T":[]},"dU":{"d6":[],"a2":[]},"bq":{"Y":["bq"],"Y.E":"bq"},"c0":{"v":["bo"],"t":["bo"],"n":["bo"],"v.E":"bo"},"cv":{"N":["1"],"N.T":"1"},"aR":{"T":[]},"U":{"Y":["U"]},"eT":{"d6":[],"a2":[]},"dj":{"U":[],"Y":["U"],"Y.E":"U"},"df":{"U":[],"Y":["U"],"Y.E":"U"},"c9":{"U":[],"Y":["U"],"Y.E":"U"},"ci":{"U":[],"Y":["U"],"Y.E":"U"},"bV":{"T":[]},"f2":{"d6":[],"a2":[]},"aP":{"v":["d?"],"t":["d?"],"n":["d?"],"v.E":"d?"},"c3":{"lG":[]},"eM":{"dH":["m"]},"f1":{"dH":["m"]},"dT":{"bp":[]},"av":{"bY":["a"],"v":["a"],"t":["a"],"n":["a"],"v.E":"a"},"bY":{"v":["1"],"t":["1"],"n":["1"]},"eU":{"bY":["a"],"v":["a"],"t":["a"],"n":["a"]},"ca":{"N":["1"],"N.T":"1"},"dh":{"ak":["1"]},"nZ":{"t":["a"],"n":["a"]},"bl":{"t":["a"],"n":["a"]},"ow":{"t":["a"],"n":["a"]},"nX":{"t":["a"],"n":["a"]},"ou":{"t":["a"],"n":["a"]},"nY":{"t":["a"],"n":["a"]},"ov":{"t":["a"],"n":["a"]},"nT":{"t":["K"],"n":["K"]},"nU":{"t":["K"],"n":["K"]}}'))
A.p5(v.typeUniverse,JSON.parse('{"d9":1,"eE":1,"e6":1,"cG":1,"dI":2,"em":1,"bN":1,"bR":1,"f4":1,"cV":2,"f5":1,"eI":1,"eO":1,"b0":1,"du":1,"bw":1,"dy":1,"dY":2,"e_":2,"e7":1,"eo":1,"nx":1}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",n:"Tried to operate on a released prepared statement",g:"max must be in range 0 < max \u2264 2^32, was "}
var t=(function rtii(){var s=A.ar
return{b9:s("nx<d?>"),cO:s("cv<q<d?>>"),dI:s("b8"),fg:s("lG"),eT:s("bb"),d:s("bc"),dn:s("cx<m>"),eX:s("e3"),Q:s("n<@>"),C:s("E"),gk:s("e8"),b8:s("r2"),em:s("x<m>"),aQ:s("x<z>"),U:s("x<aC?>"),bU:s("x<c_?>"),bd:s("aR"),M:s("q<x<~>>"),W:s("q<m>"),f:s("q<d>"),fS:s("q<+controller,sync(bh<ap>,Q)>"),e:s("q<+controller,sync(bh<~>,Q)>"),gQ:s("q<+(aW,B)>"),bb:s("q<bX>"),db:s("q<ak<@>>"),x:s("q<ak<~>>"),s:s("q<B>"),bj:s("q<c3>"),bZ:s("q<c5>"),f6:s("q<eY>"),ey:s("q<bx>"),t:s("q<K>"),gn:s("q<@>"),gz:s("q<H?>"),c:s("q<d?>"),T:s("cJ"),m:s("m"),V:s("a4"),g:s("a9"),aU:s("aa<@>"),aX:s("I"),bN:s("bf<bq>"),au:s("bf<U>"),q:s("t<m>"),r:s("t<B>"),j:s("t<@>"),g6:s("aU<B,a>"),a:s("bP"),eB:s("ab"),Z:s("bi"),P:s("z"),K:s("d"),gT:s("r7"),bQ:s("+()"),eJ:s("+(m,cy)"),ab:s("+(aW,B)"),f9:s("+(Q,m)"),eN:s("+basicSupport,supportsReadWriteUnsafe(Q,Q)"),cf:s("+(m?,m)"),bJ:s("cY<B>"),v:s("bV"),l:s("J"),aY:s("ak<ap>"),w:s("ak<~>"),N:s("B"),aF:s("d4"),dm:s("D"),eK:s("aI"),fQ:s("av"),p:s("bl"),ak:s("bm"),fL:s("T"),b:s("d6"),n:s("c_"),u:s("bp"),bS:s("aw<a>"),h:s("aw<~>"),bD:s("c6"),O:s("br<m>"),Y:s("ca<m>"),cp:s("k<aC>"),_:s("k<m>"),gp:s("k<0&>"),k:s("k<Q>"),eI:s("k<@>"),B:s("k<a>"),D:s("k<~>"),c3:s("aK<m>"),aT:s("aK<aV<B>>"),fs:s("b1<ap,~()>"),fK:s("b1<~,Q()>"),bq:s("b1<~,~()>"),eP:s("F<aC>"),G:s("F<m>"),fa:s("F<Q>"),F:s("F<~>"),y:s("Q"),i:s("K"),z:s("@"),E:s("@(d)"),R:s("@(d,J)"),S:s("a"),eH:s("x<z>?"),J:s("aC?"),A:s("m?"),X:s("d?"),dk:s("B?"),fN:s("av?"),ex:s("c_?"),a6:s("Q?"),cD:s("K?"),I:s("a?"),cg:s("mV?"),o:s("mV"),H:s("~"),L:s("~()"),d5:s("~(d)"),da:s("~(d,J)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a6=J.ef.prototype
B.c=J.q.prototype
B.a=J.cI.prototype
B.a7=J.bL.prototype
B.h=J.aS.prototype
B.a8=J.a9.prototype
B.a9=J.I.prototype
B.ag=A.cQ.prototype
B.d=A.bi.prototype
B.F=J.ex.prototype
B.v=J.bm.prototype
B.j=new A.b6("Operation was cancelled")
B.J=new A.e6()
B.K=new A.ee()
B.w=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.L=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.Q=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.M=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.P=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.O=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.N=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.x=function(hooks) { return hooks; }

B.R=new A.ew()
B.f=new A.hP()
B.y=new A.ic()
B.e=new A.id()
B.k=new A.j8()
B.S=new A.jB()
B.b=new A.f0()
B.i=new A.f3()
B.T=new A.k5()
B.U=new A.k6()
B.ah={}
B.aM=new A.cA(B.ah,[],A.ar("cA<d?,d?>"))
B.V=new A.kg()
B.a0=new A.aB(0)
B.l=new A.aQ("x",1,"opfsExternalLocks")
B.z=new A.aQ("y",2,"opfsExternalLocksWorkaround")
B.A=new A.bK("/database",0,"database")
B.B=new A.bK("/database-journal",1,"journal")
B.n=new A.aq(0,"unknown")
B.o=new A.aq(1,"integer")
B.p=new A.aq(2,"bigInt")
B.q=new A.aq(3,"float")
B.r=new A.aq(4,"text")
B.t=new A.aq(5,"blob")
B.u=new A.aq(6,"$null")
B.I=new A.aq(7,"boolean")
B.C=s([B.n,B.o,B.p,B.q,B.r,B.t,B.u,B.I],A.ar("q<aq>"))
B.W=new A.aO(0,"ok")
B.X=new A.aO(1,"getAutoCommit")
B.Y=new A.aO(2,"executeBatch")
B.Z=new A.aO(3,"updateSubscriptionManagement")
B.a_=new A.aO(4,"notifyUpdates")
B.aa=s([B.W,B.X,B.Y,B.Z,B.a_],A.ar("q<aO>"))
B.a4=new A.cF(0,"database")
B.a5=new A.cF(1,"journal")
B.D=s([B.a4,B.a5],A.ar("q<cF>"))
B.a3=new A.aQ("s",0,"opfsShared")
B.a1=new A.aQ("i",3,"indexedDb")
B.a2=new A.aQ("m",4,"inMemory")
B.ab=s([B.a3,B.l,B.z,B.a1,B.a2],A.ar("q<aQ>"))
B.E=s([],t.s)
B.ac=s([],t.c)
B.ad=s([B.A,B.B],A.ar("q<bK>"))
B.G=new A.aW(0,"opfs")
B.H=new A.aW(1,"indexedDb")
B.al=new A.aW(2,"inMemory")
B.ae=s([B.G,B.H,B.al],A.ar("q<aW>"))
B.af=new A.eo(11,"simpleSuccessResponse")
B.aN=new A.hF(2,"readWriteCreate")
B.m=new A.dw(!1,!1)
B.ai=new A.d0(0,"insert")
B.aj=new A.d0(1,"update")
B.ak=new A.d0(2,"delete")
B.am=A.as("b8")
B.an=A.as("qZ")
B.ao=A.as("nT")
B.ap=A.as("nU")
B.aq=A.as("nX")
B.ar=A.as("nY")
B.as=A.as("nZ")
B.at=A.as("d")
B.au=A.as("ou")
B.av=A.as("ov")
B.aw=A.as("ow")
B.ax=A.as("bl")
B.ay=new A.aZ(14)
B.az=new A.aZ(522)
B.aA=new A.aZ(778)
B.aB=new A.k7(B.b,A.qj())
B.aC=new A.k8(B.b,A.qk())
B.aD=new A.f9(B.b,A.ql())
B.aE=new A.k9(B.b,A.qm())
B.aF=new A.ka(B.b,A.qn())
B.aG=new A.kb(B.b,A.qo())
B.aH=new A.kc(B.b,A.qp())
B.aI=new A.ke(B.b,A.qr())
B.aJ=new A.kf(B.b,A.qs())
B.aK=new A.kd(B.b,A.qq())
B.aL=new A.fa(B.b,A.qt())})();(function staticFields(){$.jD=null
$.bB=A.u([],t.f)
$.pU=null
$.lT=null
$.lD=null
$.lC=null
$.mS=null
$.mM=null
$.mZ=null
$.kw=null
$.kD=null
$.lq=null
$.jJ=A.u([],A.ar("q<t<d>?>"))
$.cl=null
$.dK=null
$.dL=null
$.li=!1
$.l=B.b
$.jK=null
$.mc=null
$.md=null
$.me=null
$.mf=null
$.l6=A.iK("_lastQuoRemDigits")
$.l7=A.iK("_lastQuoRemUsed")
$.dc=A.iK("_lastRemUsed")
$.l8=A.iK("_lastRem_nsh")})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"r0","n3",()=>A.kx("_$dart_dartClosure"))
s($,"r_","bH",()=>A.kx("_$dart_dartClosure_dartJSInterop"))
s($,"rD","np",()=>B.b.ao(new A.kF(),A.ar("x<~>")))
s($,"ry","nn",()=>A.u([new J.eh()],A.ar("q<cZ>")))
s($,"r9","n6",()=>A.aJ(A.ib({
toString:function(){return"$receiver$"}})))
s($,"ra","n7",()=>A.aJ(A.ib({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"rb","n8",()=>A.aJ(A.ib(null)))
s($,"rc","n9",()=>A.aJ(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"rf","nc",()=>A.aJ(A.ib(void 0)))
s($,"rg","nd",()=>A.aJ(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"re","nb",()=>A.aJ(A.m9(null)))
s($,"rd","na",()=>A.aJ(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"ri","nf",()=>A.aJ(A.m9(void 0)))
s($,"rh","ne",()=>A.aJ(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"rl","lv",()=>A.oz())
s($,"r4","cs",()=>$.np())
s($,"r3","n4",()=>A.oN(!1,B.b,t.y))
s($,"ru","nk",()=>A.of(4096))
s($,"rs","ni",()=>new A.k2().$0())
s($,"rt","nj",()=>new A.k1().$0())
s($,"rq","aM",()=>A.iE(0))
s($,"rp","ff",()=>A.iE(1))
s($,"rn","lx",()=>$.ff().a5(0))
s($,"rm","lw",()=>A.iE(1e4))
r($,"ro","ng",()=>A.ol("^\\s*([+-]?)((0x[a-f0-9]+)|(\\d+)|([a-z0-9]+))\\s*$",!1))
s($,"rr","nh",()=>typeof FinalizationRegistry=="function"?FinalizationRegistry:null)
s($,"rv","kO",()=>A.mW(B.at))
s($,"rw","nl",()=>Symbol("jsBoxedDartObjectProperty"))
s($,"r6","n5",()=>{var q=new A.jC(new DataView(new ArrayBuffer(A.pr(8))))
q.eF()
return q})
s($,"qY","fe",()=>$.n5())
s($,"rj","lu",()=>new A.e7(new WeakMap()))
s($,"rz","no",()=>A.oa(A.u([A.l2("files"),A.l2("blocks")],t.s)))
s($,"r1","kN",()=>{var q,p,o=A.aE(t.N,A.ar("bK"))
for(q=0;q<2;++q){p=B.ad[q]
o.q(0,p.c,p)}return o})
s($,"rx","nm",()=>B.S)
r($,"rk","dP",()=>{var q="navigator"
return A.o3(A.o4(A.kz(A.n_(),q),A.l2("locks")))?A.kz(A.kz(A.n_(),q),"locks"):null})})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({SharedArrayBuffer:A.bQ,ArrayBuffer:A.bP,ArrayBufferView:A.cS,DataView:A.cQ,Float32Array:A.ep,Float64Array:A.eq,Int16Array:A.er,Int32Array:A.es,Int8Array:A.et,Uint16Array:A.eu,Uint32Array:A.ev,Uint8ClampedArray:A.cT,CanvasPixelArray:A.cT,Uint8Array:A.bi})
hunkHelpers.setOrUpdateLeafTags({SharedArrayBuffer:true,ArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bR.$nativeSuperclassTag="ArrayBufferView"
A.dq.$nativeSuperclassTag="ArrayBufferView"
A.dr.$nativeSuperclassTag="ArrayBufferView"
A.cR.$nativeSuperclassTag="ArrayBufferView"
A.ds.$nativeSuperclassTag="ArrayBufferView"
A.dt.$nativeSuperclassTag="ArrayBufferView"
A.ab.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3$1=function(a){return this(a)}
Function.prototype.$2$1=function(a){return this(a)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$3$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$2$2=function(a,b){return this(a,b)}
Function.prototype.$2$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$1$2=function(a,b){return this(a,b)}
Function.prototype.$5=function(a,b,c,d,e){return this(a,b,c,d,e)}
Function.prototype.$3$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$2$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$3$6=function(a,b,c,d,e,f){return this(a,b,c,d,e,f)}
Function.prototype.$2$5=function(a,b,c,d,e){return this(a,b,c,d,e)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.qM
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=db_worker.js.map
