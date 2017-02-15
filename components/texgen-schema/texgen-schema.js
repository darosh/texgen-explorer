!function(e,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports,require("../texgen/index.js")):"function"==typeof define&&define.amd?define(["exports","../texgen/index.js"],i):i(e.TG=e.TG||{},e.TG)}(this,function(e,i){"use strict";function t(){if(n)return n;var e={type:"object",properties:{render:{$ref:"#/definitions/texture"}},required:["render"],definitions:{operation:{},texture:{type:"array",minItems:3,maxItems:7,items:{type:"object",properties:{operation:{$ref:"#/definitions/operation"},tint:{$ref:"#/definitions/tint"},program:{anyOf:[]}},required:["operation","program"]}},tint:{type:"array",minItems:3,maxItems:4,items:{type:"number",minimum:0,maximum:1,default:.5}},color:{type:"array",minItems:3,maxItems:3,items:{type:"number",minimum:0,maximum:1,default:.5}},point:{type:"array",minItems:2,maxItems:8,items:{type:"array",items:[{type:"number",minimum:0,maximum:1,default:.5},{$ref:"#/definitions/color"}]},default:[[0,[0,0,0]],[.4,[1,1,1]],[.6,[1,1,1]],[1,[0,0,0]]]},interpolation:{enum:[0,1,2],default:1}}};e.definitions.operation.enum=Object.keys(i.Operations);var t=e.definitions.texture.items.properties.program.anyOf;return r(e,"generators",i.Programs.Generators,t,i),r(e,"filters",i.Programs.Filters,t,i),r(e,"mixers",i.Programs.Mixers,t,i),n=e,e}function r(e,i,t,r,n){Object.keys(t).forEach(function(m){r.push({$ref:"#/definitions/"+i+"/definitions/"+m}),e.definitions[i]=e.definitions[i]||{definitions:{}};var a=e.definitions[i].definitions[m]={properties:{type:{enum:[m]}},required:["type"]};t[m].params&&Object.keys(t[m].params).forEach(function(e){var i=a.properties[e]={},r=t[m].params[e],o={isArray:Array.isArray(r.val),type:r.type||0,min:isNaN(r.min)?-256:r.min,max:isNaN(r.max)?256:r.max,length:Array.isArray(r.val)?r.val.length:1,val:r.val};o.isArray?(i.type="array",i.items={type:o.type?"number":"integer",minimum:o.min,maximum:o.max},i.minItems=o.length,i.maxItems=o.length):o.type===n.Type.BOOLEAN?i.type="boolean":o.type===n.Type.COLOR_POINT?i.$ref="#/definitions/point":o.type===n.Type.INTERPOLATION?i.$ref="#/definitions/interpolation":o.type===n.Type.NUMBER?(i.type="number",i.minimum=o.min,i.maximum=o.max):o.type===n.Type.INT&&(i.type="integer",i.minimum=o.min,i.maximum=o.max),i.default=o.val}),"PutTexture"===m&&(a.properties.texture={$ref:"#/definitions/texture"})})}var n=null;e.getSchema=t,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=texgen-schema.js.map