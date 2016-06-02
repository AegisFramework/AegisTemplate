/**
 * ==============================
 * Aegis JS 0.2.0 | MIT License
 * http://aegisframework.com/
 * ==============================
 */

"use strict";
class Aegis {

	constructor(selector){
		if(typeof selector == "string"){
			this.collection = document.querySelectorAll(selector);
			this.length = this.collection.length;
		}else if(typeof selector == "object"){
			if(selector.length >= 1){
				this.collection = selector;
			}else{
				this.collection = [selector];
			}
			this.length = this.collection.length;
		}else{
			return null;
		}
	}

	hide(){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].display = "none";
		}
	}

	show(){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].display = "block";
		}
	}

	addClass(newClass){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].classList.add(newClass);
		}
	}

	removeClass(oldClass){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].classList.remove(oldClass);
		}
	}

	toggleClass(classes){
		classes = classes.split(" ");
		for(let i = 0; i < this.collection.length; i++){
			for(let j = 0; j < classes.length; j++){
				this.collection[i].classList.toggle(classes[j]);
			}
		}
	}

	value(value){
		if (typeof value === 'undefined'){
			return this.collection[0].value;
		}else{
			this.collection[0].value = value;
		}
	}

	click(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("click", callback, false);
		}
	}

	submit(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("submit", callback, false);
		}
	}

	change(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("change", myScript, false);
		}
	}

	scroll(callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener("scroll", callback, false);
		}
	}

	on(event, callback){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].addEventListener(event, callback, false);
		}
	}

	filter(element){
		return new Aegis(this.collection[0].querySelector(element));
	}

	data(name, value){
		if (typeof value === 'undefined'){
			return this.collection[0].dataset[name];
		}else{
			this.collection[0].dataset[name] = value;
		}
	}

	text(value){
		if (typeof value === 'undefined'){
			return this.collection[0].textContent;
		}else{
			this.collection[0].textContent = value;
		}
	}

	html(value){
		if (typeof value === 'undefined'){
			return this.collection[0].innerHTML;
		}else{
			this.collection[0].innerHTML = value;
		}
	}

	append(data){
		this.collection[0].innerHTML += data;
	}

	each(callback){
		for(let i = 0; i < this.collection.length; i++){
			callback(this.collection[i]);
		}
	}

	get(index){
		return this.collection[index];
	}

	isVisible(){
		return this.collection[0].display != "none" && this.collection[0].offsetWidth > 0 && this.collection[0].offsetHeight > 0;
	}

	parent(){
		return new Aegis(this.collection[0].parentElement);
	}

	find(selector){
		return new Aegis(this.collection[0].querySelectorAll(selector));
	}

	offset(){
		var rect = this.collection[0].getBoundingClientRect();
		var offset = {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		};
		return offset;
	}

	closest(searchSelector){
		var element = this.find(searchSelector);
		while (element) {
			if(element.get(0) != null){
				return element;
			}
			element = this.parent().find(searchSelector);
		}
		return null;
	}

	attribute(attribute, value){
		if (typeof value === 'undefined'){
			this.collection[0].getAttribute(attribute);
		}else{
			return this.collection[0].setAttribute(attribute, value);
		}
	}

	after(content){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].insertAdjacentHTML('afterend', content);
		}
	}

	before(content){
		for(let i = 0; i < this.collection.length; i++){
			this.collection[i].insertAdjacentHTML('beforebegin', content);
		}
	}

	style(properties){
		for(let i = 0; i < this.collection.length; i++){
			for(var property in properties){
				this.collection[i].style[property] = properties[property];
			}
		}
	}

	animate(style, time){
		for(let i = 0; i < this.collection.length; i++){
			for(var property in style){

				var start = new Date().getTime();
				var collection = this.collection;

				if(typeof this.collection[i].style[property] !== "undefined"){
					var initialValue = this.collection[i].style[property];

					var timer = setInterval(function() {
						var step = Math.min(1, (new Date().getTime() - start) / time);

						collection[i].style[property] = (initialValue + step * (style[property] - initialValue));

						if(step == 1){
							clearInterval(timer);
						}
					}, 25);
					this.collection[i].style[property] = initialValue;

				}else if(typeof (this.collection[i])[property] !== "undefined"){
					var initialValue = (this.collection[i])[property];

					var timer = setInterval(function() {
						var step = Math.min(1, (new Date().getTime() - start) / time);

						(collection[i])[property] = (initialValue + step * (style[property] - initialValue));

						if(step == 1){
							clearInterval(timer);
						}
					}, 25);
					(this.collection[i])[property] = initialValue;
				}
			}
		}
	}
}

function $_(selector){
	if(typeof selector != "undefined"){
		return new Aegis(selector);
	}else{
		return Aegis;
	}

}

function $_ready(callback){
	window.addEventListener("load", callback);
}
/**
* ==============================
* Request
* ==============================
*/

class Request {

	static get(url, data, events, responseType = ""){
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = responseType;

		if(typeof events.onload === "function"){
			request.onload = function(){
				events.onload(request);
			}
		}

		if(typeof events.error === "function"){
			request.error = function(){
				events.error(request);
			}
		}

		request.send(data);
	}

	static post(url, data, events, responseType = "", contentType = 'application/x-www-form-urlencoded'){
		var request = new XMLHttpRequest();
		request.open('POST', url, true);
		request.responseType = responseType;
		if(typeof events.onload === "function"){
			request.onload = function(){
				events.onload(request);
			}
		}

		if(typeof events.error === "function"){
			request.error = function(){
				events.error(request);
			}
		}

		request.setRequestHeader('Content-Type', `${contentType}; charset=UTF-8`);
		request.send(data);
	}

	static json(url, events){
		var request = new XMLHttpRequest();

		request.responseType = "json";

		if(typeof events.onload === "function"){
			request.onload = function(){
				events.onload(request);
			}
		}

		if(typeof events.error === "function"){
			request.error = function(){
				events.error(request);
			}
		}

		request.open('GET', url, true);
		request.send();
	}

}
/**
* ==============================
* Screen
* ==============================
*/

class Screen {

	static isRetina(){
		return window.devicePixelRatio >= 2;
	}

	static isPortrait(){
		return window.innerHeight > window.innerWidth;
	}

	static isLandscape(){
		return (window.orientation === 90 || window.orientation === -90);
	}

	static getOrientation(){
		return this.isPortrait ? "Portrait" : "Landscape";
	}

	static getMaximumWidth(){
		return window.screen.availWidth;
	}

	static getMaximumHeight(){
		return window.screen.availHeight;
	}
}
/**
* ==============================
* Storage
* ==============================
*/

class Storage {

	static get(key){
		if(window.localStorage){
			return localStorage.getItem(key);
		}else{
			console.warn("Your browser does not support Local Storage");
		}
	}

	static set(key, value){
		if(window.localStorage){
			localStorage.setItem(key, value);
		}else{
			console.warn("Your browser does not support Local Storage");
		}
	}

	static clear(){
		if(window.localStorage){
			ocalStorage.clear();
		}else{
			console.warn("Your browser does not support Local Storage");
		}
	}
}
/**
* ==============================
* Text
* ==============================
*/

class Text {

    static capitalize(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static getSuffix(text, key){
        var suffix = "";
        var position = text.indexOf(key);
        if(position != -1){
            position += key.length;
            suffix = text.substr(position, text.length - position);
        }
        return suffix;
    }

    static getPrefix(text, key){
        var prefix = "";
        var position = text.indexOf(key);
        if(position != -1){
            prefix = text.substr(0, position);
        }
        return prefix;
    }

    static getSelection(){
	    return window.getSelection().toString();
    }

    static buildText(array, wrapper){
        var result = "";
        if(array[0]){
            for(let i in array){
                result += Text.buildText(array[i], wrapper);
            }
            return result;
        }else{
            var string = wrapper;
            for(let i in array){
                string = string.replace(new RegExp('@' + i, 'g'), array[i]);
            }
            return string;
        }

    }

    static removeSpecialCharacters(text){
        var special = Array("#", ":", "ñ", "í", "ó", "ú", "á", "é", "Í", "Ó", "Ú", "Á", "É", "\(", "\)", "¡", "¿", "\/");
        var common   = Array("", "", "n", "i", "o", "u", "a", "e", "I", "O", "U", "A", "E", "", "", "", "", "");
        for(let character in special){
            text = text.replace(new RegExp(special[character], 'g'), common[character]);
        }
        return text;
    }

    static removePunctuation(text){
        var special = new Array(";", "," ,".", ":");
        for(let character in special){
            text = text.replace(new RegExp(special[character], 'g'), "");
        }
        return text;
    }

    static toFriendlyUrl(text){
		var expressions = {
			'[áàâãªä]'   :   'a',
	        '[ÁÀÂÃÄ]'    :   'A',
	        '[ÍÌÎÏ]'     :   'I',
	        '[íìîï]'     :   'i',
	        '[éèêë]'     :   'e',
	        '[ÉÈÊË]'     :   'E',
	        '[óòôõºö]'   :   'o',
	        '[ÓÒÔÕÖ]'    :   'O',
	        '[úùûü]'     :   'u',
	        '[ÚÙÛÜ]'     :   'U',
	        'ç'          :   'c',
	        'Ç'          :   'C',
	        'ñ'          :   'n',
	        'Ñ'          :   'N',
	        '_'          :   '-',
	        '[’‘‹›<>\']' :   '',
	        '[“”«»„\"]'  :   '',
	        '[\(\)\{\}\[\]]' : '',
	        '[?¿!¡#$%&^*´`~\/°\|]' : '',
	        '[,.:;]'     : '',
	        ' '         :   '-'
	    };

	    for(let regex in expressions){
		   text = text.replace(new RegExp(regex, 'g'), expressions[regex]);
	    }

		return text;
    }

    static toUrl(text){
	    return encodeURI(text);
    }

}